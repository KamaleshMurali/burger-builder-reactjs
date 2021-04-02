import React from 'react';
import BurgerIngredients from './BurgerIngredient/BurgerIngredient';
import classes from '../Burger/Burger.module.css'

const burger = ( props ) => {

  let modifiedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, key) => {
      return <BurgerIngredients key={key + igKey} type={igKey}></BurgerIngredients>
    })
  }).reduce((preValue, currentValue) => 
  { return preValue.concat(currentValue)}, []);

  if (modifiedIngredients.length === 0) {
    modifiedIngredients = <p>Please Select the Ingredients</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top"></BurgerIngredients>
      {modifiedIngredients}
      <BurgerIngredients type="bread-bottom"></BurgerIngredients>
    </div>
  );
}

export default burger;