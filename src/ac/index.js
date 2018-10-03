import history from '../history'

import { axiosOrders, axiosAuth } from '../axios-instances'
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  STOP_BUILDING,
  INIT_INGREDIENTS,
  PURCHASE_BURGER,
  FETCH_ORDERS,
  AUTH,
  AUTH_LOGOUT,
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

export function stopBuilding() {
  return {
    type: STOP_BUILDING
  }
}

export function initIngredients() {
  return dispatch => {
    axiosOrders
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
  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch({
      type: PURCHASE_BURGER + START
    })

    axiosOrders
      .post(`/orders.json?auth=${token}`, order)
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
    const state = getState()
    const loaded = state.order.loadedOrders
    const loading = state.order.loadingOrders

    if (loading || loaded) return

    const token = state.auth.token
    const userId = state.auth.userId

    dispatch({
      type: FETCH_ORDERS + START
    })

    axiosOrders
      .get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then(res => {
        const orders = Object.keys(res.data).map(order => ({
          ...res.data[order],
          id: order
        }))

        dispatch({
          type: FETCH_ORDERS + SUCCESS,
          payload: { orders }
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

export function authSuccess(idToken, userId) {
  return {
    type: AUTH + SUCCESS,
    payload: { idToken, userId }
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function auth(user, isSignUp) {
  return (dispatch, getState) => {
    const { building } = getState().burger

    dispatch({
      type: AUTH + START
    })

    const url = isSignUp
      ? 'signupNewUser?key=AIzaSyB_JsNBPcB_aV4hbLk3xwmVXare1gBbvdQ'
      : 'verifyPassword?key=AIzaSyB_JsNBPcB_aV4hbLk3xwmVXare1gBbvdQ'

    axiosAuth
      .post(url, { ...user, returnSecureToken: true })
      .then(res => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        )
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(res.data.idToken, res.data.localId))

        setTimeout(() => dispatch(logout()), res.data.expiresIn * 1000)

        if (building) history.replace('/checkout')
        else history.replace('/')
      })
      .catch(error => {
        dispatch({
          type: AUTH + FAIL,
          payload: { error: error.response.data.error }
        })
      })
  }
}

export function authCheckState() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) return dispatch(logout())

    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    if (expirationDate <= new Date()) {
      return dispatch(logout())
    }
    const userId = localStorage.getItem('userId')
    dispatch(authSuccess(token, userId))
    setTimeout(
      () => dispatch(logout()),
      expirationDate.getTime() - new Date().getTime()
    )
  }
}
