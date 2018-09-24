import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'

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
          required: true
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
    },
    loadingOrder: false
  }

  orderHandler = ev => {
    ev.preventDefault()
    this.setState({ loadingOrder: true })
    const formData = {}

    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value
    }

    const { ingredients, price, history } = this.props
    const order = {
      ingredients,
      price,
      orderData: formData
    }
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loadingOrder: false })
        history.push('/')
      })
      .catch(error => this.setState({ loadingOrder: false }))
  }

  checkInputValidity(value, rules) {
    let isValid = true

    if (rules.required) isValid = value.trim() !== '' && isValid

    if (rules.minLength) isValid = value.length >= rules.minLength && isValid

    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid

    return isValid
  }

  inputChangedHandler = event => {
    const orderForm = { ...this.state.orderForm }
    const elementForm = { ...orderForm[event.currentTarget.name] }
    elementForm.value = event.currentTarget.value
    elementForm.valid = this.checkInputValidity(
      elementForm.value,
      elementForm.validation
    )
    elementForm.touched = true
    orderForm[event.currentTarget.name] = elementForm
    this.setState({ orderForm })
  }

  checkFormValidity() {
    return Object.keys(this.state.orderForm).every(
      key => this.state.orderForm[key].valid
    )
  }

  render() {
    const formElements = []

    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    return (
      <div className="contact-data">
        <h4>Enter your Contact Data</h4>
        {!this.state.loadingOrder ? (
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
            <Button btnType="success" disabled={!this.checkFormValidity()}>
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

export default ContactData