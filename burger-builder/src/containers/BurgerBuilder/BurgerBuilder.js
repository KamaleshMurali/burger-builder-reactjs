import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Loader from '../../components/UI/Loader/Loader';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

  state = {
    price: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    // axios.get('/ingredients.json')
    //      .then(ingredients => this.setState({ingredients: ingredients.data}))
    //      .catch(error => {});
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => { return sum + el }, 0);
    return sum > 0;
  }

  purchasingState = () => {
    this.setState({ purchasing: true});
  }

  purchasingCancelled = () => {
    this.setState( {purchasing: false} );
  }

  purchasingProceed = () => {
    // let ingredients = this.state.ingredients;
    // let queryParams = [];
    // for (let ingredient in ingredients) {
    //   queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(ingredients[ingredient]));
    // }
    // queryParams.push("price=" + this.state.price);
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = <Loader />
    let orderSummary = null;
    if (this.props.ings) {
      burger = (
                <Aux>
                  <Burger ingredients={this.props.ings}/>
                  <BuildControls
                    added={this.props.onAddIngredient}
                    removed={this.props.onRemoveIngredient}  
                    price={this.props.price}
                    disableRemoveIngredient={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    orderClicked={this.purchasingState}
                  ></BuildControls>
                </Aux>
              );
      orderSummary =  <OrderSummary 
                        ingredients={this.props.ings}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingType) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingType}),
    onRemoveIngredient: (ingType) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingType})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));