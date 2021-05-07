import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    componentWillMount() {}

    checkoutProceedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        let summary = (<Redirect to="/" />)
        if (this.props.ings) {
            const purchasedOrderRedirect = this.props.purchased ? (<Redirect to="/" />) : null;
            summary = (
                <div>
                    {purchasedOrderRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings} 
                        checkoutCancel={this.checkoutCancelHandler}
                        checkoutProceed={this.checkoutProceedHandler}/>
                    <Route path={this.props.match.path + '/contact-data'} 
                           component={ContactData}
                    />            
                </div>
            )
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);

