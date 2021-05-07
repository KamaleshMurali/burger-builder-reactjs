import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_ORDER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            }
        case actionTypes.PURCHASE_ORDER_FAILURE:
            return {
                ...state,
                loading: false
            }
        case actionTypes.PURCHASE_ORDER_LOADING:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASED_ORDER:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDER_FAILURE:
            return {
                ...state,
                loading: false
            }
        case actionTypes.FETCH_ORDER_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default reducer;