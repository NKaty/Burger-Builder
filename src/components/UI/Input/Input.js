import React from 'react'

import './Input.css'

const Input = ({ elementType, elementConfig, value, label, changed, shouldValidate, invalid, touched }) => {
  let inputElement = null

  switch (elementType) {
    case 'input':
      inputElement = (
        <input className={`input__input${shouldValidate && invalid && touched ? ' isInvalid' : ''}`} {...elementConfig} value={value} onChange={changed}/>
      )
      break
    case 'textarea':
      inputElement = (
        <textarea className={`input__input${shouldValidate && invalid && touched ? ' isInvalid' : ''}`} {...elementConfig} value={value} onChange={changed}/>
      )
      break
    case 'select':
      inputElement = (
        <select name={elementConfig.name} className={`input__input${shouldValidate && invalid && touched ? ' isInvalid' : ''}`} value={value} onChange={changed}>
          {elementConfig.options.map(opt => <option key={opt.value} value={opt.value}>
            {opt.displayValue}
          </option>)}
        </select>
      )
      break
    default:
      inputElement = (
        <input className={`input__input${shouldValidate && invalid && touched ? ' isInvalid' : ''}`} {...elementConfig} value={value} onChange={changed}/>
      )
  }

  return (
    <div className="input">
      {/*<label className="input__label">{label}</label>*/}
      {inputElement}
    </div>
  )
}

export default Input
