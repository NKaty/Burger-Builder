import React, { Fragment, Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props)

      this.state = {
        error: null
      }

      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null })
        return req
      })
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error })
      })
    }

    // state = {
    //   error: null
    // }

    // componentWillMount() {
    //   this.reqInterceptor = axios.interceptors.request.use(req => {
    //     this.setState({ error: null })
    //     return req
    //   })
    //   this.resInterceptor = axios.interceptors.response.use(res => res, error => {
    //     this.setState({ error })
    //   })
    // }

    componentWillUnmount() {
      console.log('will unmount', this.reqInterceptor, this.resInterceptor)
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <Fragment>
          <Modal modalCancel={this.errorConfirmedHandler} show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      )
    }
  }
}

export default withErrorHandler
