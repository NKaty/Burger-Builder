import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'

import './NavigationItems.css'

const NavigationItems = () => (
  <ul className="nav-items">
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
)

export default NavigationItems
