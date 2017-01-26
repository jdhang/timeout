'use strict'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerMiddleware, routerReducer as routing } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from './middleware/promise'
import auth from './modules/auth'
import events from './modules/events'
import posts from './modules/posts'
import projects from './modules/projects'

export default function configureStore (history, initialState) {

  const reducer = combineReducers({
    auth,
    events,
    posts,
    projects,
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
