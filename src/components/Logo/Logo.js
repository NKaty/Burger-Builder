import React from 'react'

import burgerLogo from '../../assets/images/burger-logo.png'
import './Logo.css'

const Logo = () => (
  <div className="logo">
    <img className="logo__img" src={burgerLogo} alt="MyBurger"/>
  </div>
)

export default Logo
