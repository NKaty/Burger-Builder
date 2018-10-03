import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuth ? <Component {...props} /> : <Redirect to="/" />)}
  />
)

export default PrivateRoute
