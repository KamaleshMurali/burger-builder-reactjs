import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Loader/Loader';

class Orders extends Component {

    state = {
        orders: [],
        loading: false
    }

    componentWillMount() {
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchOrders = [];
        //         for (let key in res.data) {
        //             fetchOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             })
        //         }
        //         this.setState({loading: false, orders: fetchOrders})
        //     })
        //     .catch(err => {this.setState({loading: false})});
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