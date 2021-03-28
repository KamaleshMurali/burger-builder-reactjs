import React from 'react';
import BurgerIngredients from './BurgerIngredient/BurgerIngredient';
import classes from '../Burger/Burger.module.css'

const burger = ( props ) => {
    return (
      <div className={classes.Burger}>
        <BurgerIngredients type="bread-top"></BurgerIngredients>
        <BurgerIngredients type="cheese"></BurgerIngredients>
        <BurgerIngredients type="bacon"></BurgerIngredients>
        <BurgerIngredients type="meat"></BurgerIngredients>
        <BurgerIngredients type="salad"></BurgerIngredients>
        <BurgerIngredients type="bread-bottom"></BurgerIngredients>
      </div>
    );
}

export default burger;