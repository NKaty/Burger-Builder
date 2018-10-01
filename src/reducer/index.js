import { combineReducers } from 'redux'

import burger from './burger'
import order from './order'

export default combineReducers({
  burger,
  order
})
