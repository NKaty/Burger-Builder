import React, { Fragment, Component } from 'react'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import './Layout.css'

class Layout extends Component {
  state = {showSideDrawer: false}

  sideDrawerClosedHandler = () => this.setState({showSideDrawer: false})

  sideDrawerOpenHandler = () => this.setState(({showSideDrawer}) => ({showSideDrawer: !showSideDrawer}))

  render () {
    return (
      <Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerOpenHandler} />
        <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className="main-content">
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

export default Layout
