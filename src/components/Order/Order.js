import React from 'react'

import './Order.css'

const Order = ({ ingredients, price }) => {
  const transformedIngredients = []

  for (let ingredient in ingredients) {
    transformedIngredients.push({
      name: ingredient,
      amount: ingredients[ingredient]
    })
  }

  const ingredientOutput = transformedIngredients.map(ingredient => (
    <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
      key={ingredient.name}
    >
      {ingredient.name} ({ingredient.amount})
    </span>
  ))

  return (
    <div className="order">
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong>
      </p>
    </div>
  )
}

export default Order
