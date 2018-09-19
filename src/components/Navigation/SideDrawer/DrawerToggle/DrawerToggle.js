import React from "react"

import './DrawerToggle.css'

const DrawerToggle = ({ clicked}) => (
  <div className="drawer-toggle" onClick={clicked}>
    <div className="drawer-toggle__line" />
    <div className="drawer-toggle__line" />
    <div className="drawer-toggle__line" />
  </div>
)

export default DrawerToggle
