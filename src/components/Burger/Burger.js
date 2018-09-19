import React from 'react'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import './Burger.css'

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients).map(ingredient =>
    [...new Array(props.ingredients[ingredient])]
      .map((item, index) => (
        <BurgerIngredient key={ingredient + index} type={ingredient} />
      ))
  ).reduce((arr, el) => arr.concat(el), [])

  if (!transformedIngredients.length)
    transformedIngredients = <p>Please start adding ingredients!</p>

  return (
    <div className="burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default Burger
