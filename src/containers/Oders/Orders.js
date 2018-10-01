import React, { Component } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import { fetchOrders } from '../../ac'

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    return !this.props.loadingOrders ? (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    ) : (
      <Spinner />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    orders: state.order.orders,
    loadingOrders: state.order.loadingOrders
  }
}

export default connect(
  mapStateToProps,
  { fetchOrders }
)(withErrorHandler(Orders, axios))
