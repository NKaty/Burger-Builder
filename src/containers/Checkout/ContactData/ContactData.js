import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { axiosOrders } from '../../../axios-instances'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import { purchaseBurger } from '../../../ac'
import {checkInputValidity, checkFormValidity} from '../../../utils/validation'

import './ContactData.css'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
          name: 'name'
        },
        label: 'Name',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
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
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
          name: 'street'
        },
        label: 'Street',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip code',
          name: 'zipCode'
        },
        label: 'Zip code',
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
          name: 'country'
        },
        label: 'Country',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ],
          name: 'deliveryMethod'
        },
        label: 'Delivery method',
        value: 'fastest',
        validation: {},
        valid: true
      }
    }
  }

  orderHandler = ev => {
    ev.preventDefault()
    const formData = {}

    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value
    }

    const { ingredients, price, purchaseBurger, userId } = this.props
    const order = {
      ingredients,
      price,
      orderData: formData,
      userId
    }

    purchaseBurger(order)
  }

  inputChangedHandler = event => {
    const orderForm = { ...this.state.orderForm }
    const elementForm = { ...orderForm[event.currentTarget.name] }
    elementForm.value = event.currentTarget.value
    elementForm.valid = checkInputValidity(
      elementForm.value,
      elementForm.validation
    )
    elementForm.touched = true
    orderForm[event.currentTarget.name] = elementForm
    this.setState({ orderForm })
  }

  render() {
    const formElements = Object.keys(this.state.orderForm).map(key => ({
      id: key,
      config: this.state.orderForm[key]
    }))

    return (
      <div className="contact-data">
        <h4>Enter your Contact Data</h4>
        {!this.props.loadingOrder ? (
          <form onSubmit={this.orderHandler}>
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
            <Button btnType="success" disabled={!checkFormValidity(this.state.orderForm)}>
              ORDER
            </Button>
          </form>
        ) : (
          <Spinner />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    loadingOrder: state.order.loadingOrder,
    userId: state.auth.userId
  }
}

export default connect(
  mapStateToProps,
  { purchaseBurger }
)(withErrorHandler(ContactData, axiosOrders))
