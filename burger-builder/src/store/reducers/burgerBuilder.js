import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENTS_PRICE = {
    cheese: 0.4,
    salad: 0.5,
    bacon: 0.7,
    meat: 1.5
};

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return  {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return  {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false
            }
        case actionTypes.SET_INGREDIENTS_FAILURE:
            return {
                ...state,
                error: true
            }
        default: 
            return state;

    }
}

export default reducer;