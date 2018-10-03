import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import { authCheckState } from './ac'

const AsyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'))
const AsyncOrders = asyncComponent(() => import('./containers/Orders/Orders'))
const AsyncAuth = asyncComponent(() => import('./containers/Auth/Auth'))
const AsyncLogout = asyncComponent(() => import('./containers/Auth/Logout/Logout'))

class App extends Component {
  componentDidMount () {
    this.props.authCheckState()
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <PrivateRoute path="/checkout" component={AsyncCheckout} isAuth={this.props.isAuth} />
            <PrivateRoute path="/orders" component={AsyncOrders} isAuth={this.props.isAuth} />
            <Route path="/auth" component={AsyncAuth} />
            <PrivateRoute path="/logout" component={AsyncLogout} isAuth={this.props.isAuth} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps, { authCheckState })(App))
