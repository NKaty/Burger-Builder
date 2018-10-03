export function checkInputValidity(value, rules) {
  let isValid = true

  if (rules.required) isValid = value.trim() !== '' && isValid

  if (rules.minLength) isValid = value.length >= rules.minLength && isValid

  if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid

  if (rules.email) {
    const pattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
    isValid = pattern.test(value) && isValid
  }

  return isValid
}

export function checkFormValidity(form) {
  return Object.keys(form).every(
    key => form[key].valid
  )
}
