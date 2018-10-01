import {
  INGREDIENT_PRICES,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  INIT_INGREDIENTS,
  SUCCESS,
  FAIL
} from '../constants'

const initialStateBurger = {
  ingredients: null,
  totalPrice: INGREDIENT_PRICES.start,
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
          burgerState.totalPrice + INGREDIENT_PRICES[payload.ingredient]
      }

    case REMOVE_INGREDIENT:
      return {
        ...burgerState,
        ingredients: {
          ...burgerState.ingredients,
          [payload.ingredient]: burgerState.ingredients[payload.ingredient] - 1
        },
        totalPrice:
          burgerState.totalPrice - INGREDIENT_PRICES[payload.ingredient]
      }

    case INIT_INGREDIENTS + SUCCESS:
      return {
        ...burgerState,
        ingredients: payload.ingredients,
        totalPrice: INGREDIENT_PRICES.start,
        error: false
      }

    case INIT_INGREDIENTS + FAIL:
      return {
        ...burgerState,
        error: true
      }

    default:
      return burgerState
  }
}
