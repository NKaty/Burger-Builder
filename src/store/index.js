import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducer'
import thunk from 'redux-thunk'
import history from '../history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history))
  // other store enhancers if any
)

const store = createStore(connectRouter(history)(reducer), enhancer)

export default store
