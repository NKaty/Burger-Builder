import {
  INGREDIENT_PRICES,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  INIT_INGREDIENTS,
  STOP_BUILDING,
  PURCHASE_BURGER,
  SUCCESS,
  FAIL,
  START
} from '../constants'

const initialStateBurger = {
  ingredients: null,
  totalPrice: INGREDIENT_PRICES.start,
  building: false,
  error: false
}

export default (burgerState = initialStateBurger, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_INGREDIENT:
      return {
        ...burgerState,
        ingredients: {
          ...burgerState.ingredients,
          [payload.ingredient]: burgerState.ingredients[payload.ingredient] + 1
        },
        totalPrice:
          burgerState.totalPrice + INGREDIENT_PRICES[payload.ingredient],
        building: true
      }

    case REMOVE_INGREDIENT:
      return {
        ...burgerState,
        ingredients: {
          ...burgerState.ingredients,
          [payload.ingredient]: burgerState.ingredients[payload.ingredient] - 1
        },
        totalPrice:
          burgerState.totalPrice - INGREDIENT_PRICES[payload.ingredient],
        building: true
      }

    case INIT_INGREDIENTS + SUCCESS:
      return {
        ...burgerState,
        ingredients: payload.ingredients,
        totalPrice: INGREDIENT_PRICES.start,
        building: false,
        error: false
      }

    case INIT_INGREDIENTS + FAIL:
      return {
        ...burgerState,
        error: true
      }

    case STOP_BUILDING:
      return {
        ...burgerState,
        building: false
      }

    case PURCHASE_BURGER + START:
      return {
        ...burgerState,
        building: false
      }

    default:
      return burgerState
  }
}
