import React from 'react'

import './BuildControl.css'

const BuildControl = ({
  ingredientAdded,
  ingredientRemoved,
  control,
  disabled
}) => (
  <div className="build-control">
    <div className="build-control__label">{control.label}</div>
    <button
      className="build-control__btn build-control__btn--less"
      disabled={disabled}
      onClick={ingredientRemoved(control.type)}
    >
      Less
    </button>
    <button
      className="build-control__btn build-control__btn--more"
      onClick={ingredientAdded(control.type)}
    >
      More
    </button>
  </div>
)

export default BuildControl
