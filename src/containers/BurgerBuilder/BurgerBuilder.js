import React, { Component, Fragment } from 'react'
import memoizeOne from 'memoize-one'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
  start: 4,
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: INGREDIENT_PRICES.start,
    purchasing: false,
    error: false
  }

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(res => this.setState({ ingredients: res.data }))
      .catch(error => this.setState({ error: true }))
  }

  addIngredientHelper = type => () => {
    const updateIngredients = { ...this.state.ingredients }
    updateIngredients[type] += 1
    this.setState(({ ingredients, totalPrice }) => ({
      ingredients: updateIngredients,
      totalPrice: totalPrice + INGREDIENT_PRICES[type]
    }))
  }

  removeIngredientHelper = type => () => {
    const updateIngredients = { ...this.state.ingredients }
    if (updateIngredients[type] <= 0) return
    updateIngredients[type] -= 1
    this.setState(({ ingredients, totalPrice }) => ({
      ingredients: updateIngredients,
      totalPrice: totalPrice - INGREDIENT_PRICES[type]
    }))
  }

  openModalHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    const queryParams = []

    for (let ingredient in this.state.ingredients) {
      queryParams.push(
        `${encodeURIComponent(ingredient)}=${encodeURIComponent(
          this.state.ingredients[ingredient]
        )}`
      )
    }

    queryParams.push(`price=${this.state.totalPrice}`)
    const queryString = queryParams.join('&')
    this.props.history.push({ pathname: '/checkout', search: `?${queryString}` })
  }

  get burgerBuilderBody() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHelper}
          ingredientRemoved={this.removeIngredientHelper}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={!(this.state.totalPrice === INGREDIENT_PRICES.start)}
          ordered={this.openModalHandler}
        />
      </Fragment>
    )
  }

  getModalBody = memoizeOne(
    (isLoaded, purchasing) =>
      isLoaded ? (
        <Spinner />
      ) : (
        <OrderSummary
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
        />
      )
  )

  render() {
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalCancel={this.purchaseCancelHandler}
        >
          {this.getModalBody(!this.state.ingredients, this.state.purchasing)}
        </Modal>
        {this.state.ingredients ? (
          this.burgerBuilderBody
        ) : this.state.error ? (
          <p>Ingredients can not be loaded!</p>
        ) : (
          <Spinner />
        )}
      </Fragment>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
