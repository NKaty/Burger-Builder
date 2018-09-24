import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'

import './NavigationItems.css'

const NavigationItems = () => (
  <ul className="nav-items">
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
)

export default NavigationItems
