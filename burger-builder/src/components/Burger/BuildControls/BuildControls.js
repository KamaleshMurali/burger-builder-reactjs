import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'}
]

const buildControls = ( props ) => (
    <div className={classes.BuildControls}>
        <p><strong>Current Price: {props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => 
            <BuildControl 
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.added(ctrl.type)}
                removed={() => props.removed(ctrl.type)}
                disabled={props.disableRemoveIngredient[ctrl.type]}
            ></BuildControl>
        )}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.orderClicked}
        >ORDER BUTTON</button>
    </div>
);

export default buildControls;