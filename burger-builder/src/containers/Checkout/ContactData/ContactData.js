import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Loader/Loader';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as orderActions from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            postalcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest'
            }
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        let customerInfo = {}
        for (let elementName in this.state.orderForm) {
            customerInfo[elementName] = this.state.orderForm[elementName].value;
        }
        console.log(customerInfo);
        const orders = {
            ingredients: this.props.ings,
            price: this.props.price,
            customerInfo: customerInfo
        }

        this.props.onOrderBurger(orders);

    }

    inputChangeHandler = (event, inputIdentified) => {
        console.log(event.target.value);
        let updatedOrderForm = { ...this.state.orderForm };
        let updatedElement = { ...updatedOrderForm[inputIdentified] };
        updatedElement.value = event.target.value;
        updatedOrderForm[inputIdentified] = updatedElement;
        console.log(updatedOrderForm);
        this.setState({orderForm: updatedOrderForm});
    }

    render() { 
        const formElements = [];
        for (let inputElementName in this.state.orderForm) {
            formElements.push({
                id: inputElementName,
                config: this.state.orderForm[inputElementName]
            })
        }
        let form = (          
            <form onSubmit={this.orderHandler}>
                {
                    formElements.map(formElement => 
                        (
                            <Input 
                                key={formElement.id}
                                inputType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                elementValue={formElement.config.value}
                                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                            />
                        )
                    )
                }
                <Button btnType="Success"> ORDER </Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(orderActions.purchaseOrder(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
