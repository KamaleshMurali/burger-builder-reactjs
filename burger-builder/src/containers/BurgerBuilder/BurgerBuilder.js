import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Loader from '../../components/UI/Loader/Loader';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENTS_PRICE = {
  cheese: 0.4,
  salad: 0.5,
  bacon: 0.7,
  meat: 1.5
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    price: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    axios.get('/ingredients.json')
         .then(ingredients => this.setState({ingredients: ingredients.data}))
         .catch(error => {});
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => { return sum + el }, 0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    const updatedPrice = this.state.price + INGREDIENTS_PRICE[type];
    updatedIngredients[type] = updatedCount;
    this.updatePurchaseState(updatedIngredients);
    this.setState({
      ingredients: updatedIngredients, 
      price: updatedPrice
    });
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    const updatedPrice = this.state.price - INGREDIENTS_PRICE[type];
    updatedIngredients[type] = updatedCount;
    this.updatePurchaseState(updatedIngredients);
    
    this.setState({
      ingredients: updatedIngredients, 
      price: updatedPrice
    });
  }

  purchasingState = () => {
    this.setState({ purchasing: true});
  }

  purchasingCancelled = () => {
    this.setState( {purchasing: false} );
  }

  purchasingProceed = () => {
    this.setState( {loading: true} );
    const orders = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customerInfo: {
        name: 'Kamalesh',
        address: {
          street: 'KK ROAD',
          city: 'Chennai',
          state: 'Tamil Nadu'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders', orders)
         .then(result => { this.setState({loading: false, purchasing: false} )})
         .catch(error => { this.setState({loading: false} )});
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = <Loader />
    let orderSummary = null;
    if (this.state.ingredients) {
      burger = (
                <Aux>
                  <Burger ingredients={this.state.ingredients}/>
                  <BuildControls
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}  
                    price={this.state.price}
                    disableRemoveIngredient={disabledInfo}
                    purchasable={this.state.purchasable}
                    orderClicked={this.purchasingState}
                  ></BuildControls>
                </Aux>
              );
      orderSummary =  <OrderSummary 
                        ingredients={ this.state.ingredients }
                        purchasingCancelled={this.purchasingCancelled}
                        purchasingProceed={this.purchasingProceed}>
                      </OrderSummary>;
    }

    if (this.state.loading) {
      orderSummary = <Loader />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelled}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);