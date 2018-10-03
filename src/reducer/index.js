import { combineReducers } from 'redux'

import burger from './burger'
import order from './order'
import auth from './auth'

export default combineReducers({
  burger,
  order,
  auth
})
