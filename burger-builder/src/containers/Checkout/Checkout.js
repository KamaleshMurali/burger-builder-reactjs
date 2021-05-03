import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    componentWillMount() {
        // const query = new URLSearchParams(this.props.location.search);
        // let ingredients = {}
        // for (let value of query.entries()) {
        //     if (value[0] === 'price') {
        //         this.setState({totalPrice: +value[1]})
        //     } else {
        //         ingredients[value[0]] = +value[1];
        //     }
        // }
        // this.setState({ingredients: ingredients});

    }

    checkoutProceedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutProceed={this.checkoutProceedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} 
                       component={ContactData}
                />            
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);

