import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseOrderSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_ORDER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseOrderFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_ORDER_FAILURE,
    }
}

export const purchaseOrderLoading = () => {
    return {
        type: actionTypes.PURCHASE_ORDER_LOADING
    }
}

export const purchaseOrder = (orderData) => {
    return dispatch => {
        dispatch(purchaseOrderLoading());
        axios.post('/orders.json', orderData)
        .then(response => { 
            dispatch(purchaseOrderSuccess(response.data, orderData));
        })
        .catch(error => { 
            dispatch(purchaseOrderFailure(error));
        });
    }
}

export const purchasedOrder = () => {
    return {
        type: actionTypes.PURCHASED_ORDER
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILURE
    }
}

export const fetchOrderLoading = () => {
    return {
        type: actionTypes.FETCH_ORDER_LOADING
    }
}

export const initFetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderLoading());
        axios.get('/orders.json')
        .then(res => {
            const fetchOrders = [];
            for (let key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrderSuccess(fetchOrders));
        })
        .catch(err => {
            dispatch(fetchOrderFailure(err))
        });
    }
}