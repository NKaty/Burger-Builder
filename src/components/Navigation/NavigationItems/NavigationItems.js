import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'

import './NavigationItems.css'

const NavigationItems = ({ isAuth, stopBuilding }) => (
  <ul className="nav-items" onClick={stopBuilding}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {isAuth ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    )}
  </ul>
)

export default NavigationItems
