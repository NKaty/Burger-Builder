import React, { Fragment } from 'react'

import Button from '../../UI/Button/Button'

const OrderSummary = ({ ingredients, purchaseCanceled, purchaseContinued, price }) => {
  const ingredientSummary = Object.keys(ingredients).map(ingredient => (
    <li key={ingredient}>
      <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>:{' '}
      {ingredients[ingredient]}
    </li>
  ))
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total Price: {price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button clicked={purchaseCanceled} btnType="danger">CANCEL</Button>
      <Button clicked={purchaseContinued} btnType="success">CONTINUE</Button>
    </Fragment>
  )
}

export default OrderSummary
