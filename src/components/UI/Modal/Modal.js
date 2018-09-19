import React, { Fragment, Component } from 'react'

import Backdrop from '../Backdrop/Backdrop'

import './Modal.css'

class Modal extends Component {
  // not PureComponent, because we know other prop (modalCancel) does not change
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.show !== nextProps.show || this.props.children !== nextProps.children
  }

  render() {
    console.log('render')
    const { children, show, modalCancel } = this.props
    return (
      <Fragment>
        {show && <Backdrop removeBackdrop={modalCancel} />}
        <div
          className="modal"
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : 0
          }}
        >
          {children}
        </div>
      </Fragment>
    )
  }
}

export default Modal
