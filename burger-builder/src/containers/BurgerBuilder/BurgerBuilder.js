import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      cheese: 2,
      salad: 1,
      bacon: 1,
      meat: 1
    }
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <div>Burger Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;