import React, { Component } from 'react'
import { connect } from 'react-redux'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import { checkInputValidity, checkFormValidity } from '../../utils/validation'
import { auth } from '../../ac'

import './Auth.css'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email address',
          name: 'email'
        },
        label: 'Email',
        value: '',
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password',
          name: 'password'
        },
        label: 'Password',
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  }

  inputChangedHandler = event => {
    const authForm = { ...this.state.controls }
    const elementForm = { ...authForm[event.currentTarget.name] }
    elementForm.value = event.currentTarget.value
    elementForm.valid = checkInputValidity(
      elementForm.value,
      elementForm.validation
    )
    elementForm.touched = true
    authForm[event.currentTarget.name] = elementForm
    this.setState({ controls: authForm })
  }

  submitHandler = ev => {
    ev.preventDefault()
    this.props.auth(
      {
        email: this.state.controls.email.value,
        password: this.state.controls.password.value
      },
      this.state.isSignUp
    )
  }

  switchAuthModeHandler = ev => {
    ev.preventDefault()
    this.setState(prevState => ({ isSignUp: !prevState.isSignUp }))
  }

  get form() {
    const formElements = Object.keys(this.state.controls).map(key => ({
      id: key,
      config: this.state.controls[key]
    }))

    return (
      <form onSubmit={this.submitHandler}>
        {formElements.map(element => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            label={element.config.label}
            shouldValidate={element.config.validation}
            invalid={!element.config.valid}
            touched={element.config.touched}
            changed={this.inputChangedHandler}
          />
        ))}
        <Button
          btnType="success"
          disabled={!checkFormValidity(this.state.controls)}
        >
          SUBMIT
        </Button>
        <Button btnType="danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </form>
    )
  }

  render() {
    const { loading, error } = this.props

    return (
      <div className="auth">
        {error && <p>{error.message}</p>}
        {!loading ? this.form : <Spinner />}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
}

export default connect(
  mapStateToProps,
  { auth }
)(Auth)
