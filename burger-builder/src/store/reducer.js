import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 4
};

const INGREDIENTS_PRICE = {
    cheese: 0.4,
    salad: 0.5,
    bacon: 0.7,
    meat: 1.5
};

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                price: state.price + INGREDIENTS_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENTS:
            return  {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - INGREDIENTS_PRICE[action.ingredientName]
            }
        default: 
            return state;

    }
}

export default reducer;