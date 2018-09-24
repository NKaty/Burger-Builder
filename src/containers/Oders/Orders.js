import React, { Component } from 'react'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
  state = {
    orders: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true })
    axios
      .get('orders.json')
      .then(res => {
        const orders = []
        for (let order in res.data) {
          orders.push({ ...res.data[order], id: order })
        }
        this.setState({ orders, loading: false })
      })
      .catch(err => this.setState({ loading: false }))
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)
