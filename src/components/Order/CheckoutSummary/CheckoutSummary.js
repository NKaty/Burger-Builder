import React from "react"

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

import './CheckoutSummary.css'

const CheckoutSummary = ({ ingredients, checkoutCancelled, checkoutContinued }) => {
  return (
    <div className="check-summary">
      <h1>We hope it tastes well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="danger" clicked={checkoutCancelled}>CANCEL</Button>
      <Button btnType="success" clicked={checkoutContinued}>CONTINUE</Button>
    </div>
  )
}

export default CheckoutSummary
