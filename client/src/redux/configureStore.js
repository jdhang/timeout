'use strict'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerMiddleware, routerReducer as routing } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from './middleware/promise'
import {reducers} from  'modules'

export default function configureStore (history, initialState) {

  const reducer = combineReducers({
    ...reducers,
    routing,
    form: formReducer
  })

  const middleware = [thunk, promise, routerMiddleware(history)]
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
  }

  const enhancers = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

  return createStore(reducer, initialState, enhancers)
}
