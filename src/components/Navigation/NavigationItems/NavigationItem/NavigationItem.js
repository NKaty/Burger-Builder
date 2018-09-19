import React from 'react'

import './NavigationItem.css'

const NavigationItem = ({ children, link, active }) => (
  <li className="nav-items__item">
    <a className={`nav-items__link${active ? ' isActive' : ''}`} href={link}>
      {children}
    </a>
  </li>
)

export default NavigationItem
