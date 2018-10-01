import { PURCHASE_BURGER, FETCH_ORDERS, START, SUCCESS, FAIL } from '../constants'

const initialStateOrder = {
  orders: [],
  loadingOrders: false,
  loadingOrder: false,
  loadedOrders: false,
  errorOrder: false,
  errorOrders: false
}

export default (orderState = initialStateOrder, action) => {
  const { type, payload } = action

  switch (type) {
    case PURCHASE_BURGER + START:
      return {
        ...orderState,
        loadingOrder: true,
        errorOrder: false
      }

    case PURCHASE_BURGER + SUCCESS:
      return {
        ...orderState,
        orders: orderState.orders.concat(payload.order),
        loadingOrder: false,
        errorOrder: false
      }

    case PURCHASE_BURGER + FAIL:
      return {
        ...orderState,
        errorOrder: true,
        loadingOrder: false
      }

    case FETCH_ORDERS + START:
      return {
        ...orderState,
        loadingOrders: true,
        errorOrders: false,
        loadedOrders: false
      }

    case FETCH_ORDERS + SUCCESS:
      return {
        ...orderState,
        orders: payload.orders,
        loadingOrders: false,
        errorOrders: false,
        loadedOrders: true
      }

    case FETCH_ORDERS + FAIL:
      return {
        ...orderState,
        errorOrders: true,
        loadingOrders: false,
        loadedOrders: false
      }

    default:
      return orderState
  }
}
