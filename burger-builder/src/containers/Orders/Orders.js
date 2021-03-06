import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Loader/Loader';

class Orders extends Component {

    componentWillMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = this.props.loading ? <Spinner /> : null;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                                                        <Order 
                                                            key={order.id}
                                                            ingredients={order.ingredients}
                                                            price={+order.price}/>

                                                    ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.initFetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));