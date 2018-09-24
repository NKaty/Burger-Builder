import React from 'react'
import { NavLink } from "react-router-dom"

import './NavigationItem.css'

const NavigationItem = ({ children, link }) => (
  <li className="nav-items__item">
    <NavLink exact className="nav-items__link" activeClassName="isActive" to={link}>
      {children}
    </NavLink>
  </li>
)

export default NavigationItem
