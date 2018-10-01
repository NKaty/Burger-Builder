import history from '../history'

import axios from '../axios-orders'
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  INIT_INGREDIENTS,
  PURCHASE_BURGER,
  FETCH_ORDERS,
  SUCCESS,
  FAIL,
  START
} from '../constants'

export function addIngredient(ingredient) {
  return {
    type: ADD_INGREDIENT,
    payload: { ingredient }
  }
}

export function removeIngredient(ingredient) {
  return {
    type: REMOVE_INGREDIENT,
    payload: { ingredient }
  }
}

export function initIngredients() {
  return dispatch => {
    axios
      .get('/ingredients.json')
      .then(res =>
        dispatch({
          type: INIT_INGREDIENTS + SUCCESS,
          payload: { ingredients: res.data }
        })
      )
      .catch(error =>
        dispatch({
          type: INIT_INGREDIENTS + FAIL
        })
      )
  }
}

export function purchaseBurger(order) {
  return dispatch => {
    dispatch({
      type: PURCHASE_BURGER + START
    })

    axios
      .post('/orders.json', order)
      .then(res => {
        dispatch({
          type: PURCHASE_BURGER + SUCCESS,
          payload: { order: { ...order, id: res.data.name } }
        })
        history.replace('/')
      })
      .catch(error =>
        dispatch({
          type: PURCHASE_BURGER + FAIL,
          payload: error
        })
      )
  }
}

export function fetchOrders() {
  return (dispatch, getState) => {
    const loaded = getState().order.loadedOrders
    const loading = getState().order.loadingOrders

    if (loading || loaded) return

    dispatch({
      type: FETCH_ORDERS + START
    })

    axios
      .get('/orders.json')
      .then(res => {
        const orders = Object.keys(res.data).map(order => ({
          ...res.data[order],
          id: order
        }))

        dispatch({
          type: FETCH_ORDERS + SUCCESS,
          payload: { orders: orders }
        })
      })
      .catch(error =>
        dispatch({
          type: FETCH_ORDERS + FAIL,
          payload: error
        })
      )
  }
}
