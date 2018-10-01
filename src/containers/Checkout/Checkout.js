import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  checkoutCancelHandler = () => this.props.history.goBack()

  checkoutContinueHandler = () =>
    this.props.history.replace('/checkout/contact-data')

  render() {
    return this.props.ingredients ? (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelHandler}
          checkoutContinued={this.checkoutContinueHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    ) : (
      <Redirect to="/" />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ingredients: state.burger.ingredients
  }
}

export default connect(mapStateToProps)(Checkout)
