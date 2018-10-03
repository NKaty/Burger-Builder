import React, { Fragment } from "react"

import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'

import './SideDrawer.css'

const SideDrawer = ({ closed, show, isAuth, stopBuilding }) => {
  const attachedClasses = show ? 'side-drawer isOpen' : 'side-drawer isClose'

  return (
    <Fragment>
      {show && <Backdrop removeBackdrop={closed}/>}
      <div className={attachedClasses}>
        <div className="side-drawer__logo">
          <Logo />
        </div>
        <nav onClick={closed}>
          <NavigationItems isAuth={isAuth} stopBuilding={stopBuilding} />
        </nav>
      </div>
    </Fragment>
  )
}

export default SideDrawer
