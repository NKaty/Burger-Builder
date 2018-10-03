import React, { Component } from "react"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { logout } from '../../../ac'

class Logout extends Component {
  componentDidMount () {
    this.props.logout()
  }

  render () {
    return (
      <Redirect to="/" />
    )
  }
}

export default connect(null, { logout })(Logout)
