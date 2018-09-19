import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

import './Toolbar.css'

const Toolbar = ({drawerToggleClicked}) => (
  <header className="toolbar">
    <DrawerToggle clicked={drawerToggleClicked}/>
    <div className="toolbar__logo">
      <Logo />
    </div>
    <nav className="toolbar__nav">
      <NavigationItems />
    </nav>
  </header>
)

export default Toolbar
