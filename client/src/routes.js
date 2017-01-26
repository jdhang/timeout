'use strict'

import React from 'react'
import Promise from 'bluebird'
import { Route, IndexRoute } from 'react-router'
import {
  isLoaded as isAuthLoaded,
  load as loadAuth
} from './redux/modules/auth'
import { About, Docs, MembersOnly } from './components'
import {
  Layout,
  Auth,
  Home,
  Posts,
  PostFormContainer,
  Events,
  EventForm
} from './containers'
import {SignupForm} from './containers/Auth'
import { NotFound } from './shared'

const getRoutes = (store) => {
  const getAuth = (nextState, replace, next) => {
    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth())
      .then(() => next())
    } else {
      next()
    }
  }

  const requireLogin = (nextState, replace, next) => {
    function checkAuth () {
      const { auth: { user } } = store.getState();
      if (!user) {
        replace('/');
      }
      next();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  }

  const requireNoUser = (nextState, replace, next) => {
    function checkAuth () {
      const { auth: { user } } = store.getState();
      if (user) {
        replace('/membersOnly');
      }
      next();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth)
    } else {
      checkAuth();
    }
  }

  return (
    <Route path='/' onEnter={getAuth} component={Layout}>

      { /* Home route */ }
      <IndexRoute component={Home} />

      { /* Authenticated Routes */ }
      <Route onEnter={requireLogin}>
        <Route path='membersOnly' component={MembersOnly} />
      </Route>

      { /* Unauthenticated Routes Only */ }
      <Route onEnter={requireNoUser}>
        <Route path='login' component={Auth} />
        <Route path='signup' component={SignupForm} />
      </Route>

      { /* Routes */ }
      <Route path='posts' components={Posts} />
      <Route path='addPost' components={PostFormContainer} />
      <Route path='events' components={Events} />

      { /* Catch all routes */ }
      <Route path='*' component={NotFound} />
    </Route>
  )
}

export default getRoutes
