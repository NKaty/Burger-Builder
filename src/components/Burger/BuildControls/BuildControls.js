import React from 'react'

import BuildControl from './BuildControl/BuildControl'

import './BuildControls.css'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const BuildControls = ({
  ingredientAdded,
  ingredientRemoved,
  disabled,
  price,
  purchasable,
  ordered,
  isAuth
}) => (
  <div className="build-controls">
    <p>
      <strong>Current price: {price.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        control={control}
        ingredientAdded={ingredientAdded}
        ingredientRemoved={ingredientRemoved}
        disabled={disabled[control.type]}
      />
    ))}
    <button
      onClick={ordered}
      className="build-controls__order-btn"
      disabled={!purchasable}
    >
      {isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </button>
  </div>
)

export default BuildControls
