import React from 'react'

import './Button.css'

const Button = ({ children, clicked, btnType, disabled }) => (
  <button className={`button button--${btnType}`} onClick={clicked} disabled={disabled}>
    {children}
  </button>
)

export default Button
