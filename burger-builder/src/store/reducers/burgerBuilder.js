import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

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
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredients = { 
                                        ingredients: {
                                                ...state.ingredients,
                                                ...updatedIngredient
                                            } 
                                        };
            const updatedState = {
                                    ...updatedIngredients,
                                    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
                                }
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngre = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
            const updatedIngres = { 
                                        ingredients: {
                                                ...state.ingredients,
                                                ...updatedIngre
                                            } 
                                        };
            const updateState = {
                                    ...updatedIngres,
                                    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
                                }
            return updateObject(state, updateState);
        case actionTypes.SET_INGREDIENTS:
            const setIngredients = { ingredients: action.ingredients, totalPrice: 4, error: false }
            return updateObject(state, setIngredients);
        case actionTypes.SET_INGREDIENTS_FAILURE:
            return updateObject(state, { error: true })
        default: 
            return state;

    }
}

export default reducer;