import React from 'react';
import Aux from '../../../hoc/ReactAux/ReactAux';
import Button from '../../UI/Button/Button';

const orderSummary = ( props ) => {
    const ingredients = props.ingredients;
    const ingredientsSummary = Object.keys(ingredients).map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {ingredients[igKey]}</li>
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.purchasingCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchasingProceed}>PROCEED</Button>
        </Aux>
    );
}

export default orderSummary;