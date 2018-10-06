import React, { Component, Fragment } from 'react'
import memoizeOne from 'memoize-one'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { axiosOrders } from '../../axios-instances'
import { INGREDIENT_PRICES } from '../../constants'
import { addIngredient, removeIngredient, initIngredients } from '../../ac'

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.initIngredients()
  }

  addIngredientHandler = (type) => () => this.props.addIngredient(type)

  removeIngredientHandler = (type) => () => this.props.removeIngredient(type)

  purchaseHandler = () => {
    if (!this.props.isAuth) this.props.history.replace('/auth')
    else this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }

  get burgerBuilderBody() {
    const { ingredients, totalPrice, isAuth } = this.props

    const disabledInfo = { ...ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={!(totalPrice === INGREDIENT_PRICES.start)}
          ordered={this.purchaseHandler}
          isAuth={isAuth}
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
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
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
          {this.getModalBody(!this.props.ingredients, this.state.purchasing)}
        </Modal>
        {this.props.ingredients ? (
          this.burgerBuilderBody
        ) : this.props.error ? (
          <p>Ingredients can not be loaded!</p>
        ) : (
          <Spinner />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps, { addIngredient, removeIngredient, initIngredients })(withErrorHandler(BurgerBuilder, axiosOrders))
