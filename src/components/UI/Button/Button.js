import React from 'react'

import './Button.css'

const Button = ({ children, clicked, btnType }) => (
  <button className={`button button--${btnType}`} onClick={clicked}>
    {children}
  </button>
)

export default Button
