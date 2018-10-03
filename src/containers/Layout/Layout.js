import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { stopBuilding } from '../../ac'

import './Layout.css'

class Layout extends Component {
  state = { showSideDrawer: false }

  sideDrawerClosedHandler = () => this.setState({ showSideDrawer: false })

  sideDrawerOpenHandler = () =>
    this.setState(({ showSideDrawer }) => ({ showSideDrawer: !showSideDrawer }))

  render() {
    return (
      <Fragment>
        <Toolbar
          drawerToggleClicked={this.sideDrawerOpenHandler}
          isAuth={this.props.isAuth}
          stopBuilding={this.props.stopBuilding}
        />
        <SideDrawer
          show={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuth}
          stopBuilding={this.props.stopBuilding}
        />
        <main className="main-content">{this.props.children}</main>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(
  mapStateToProps,
  { stopBuilding }
)(Layout)
