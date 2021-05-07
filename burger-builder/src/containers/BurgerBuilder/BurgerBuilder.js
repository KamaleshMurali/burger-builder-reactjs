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
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount() { 
    this.props.onInitIngredients();
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
    this.props.onPurchased();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = this.props.error ? 'Ingredients can\'t be loaded' : <Loader />
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
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingType) => dispatch(actions.addIngredient(ingType)),
    onRemoveIngredient: (ingType) => dispatch(actions.removeIngredient(ingType)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchased: () => dispatch(actions.purchasedOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));