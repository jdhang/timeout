'use strict'

import React from 'react'
import Promise from 'bluebird'
import { Route, IndexRoute } from 'react-router'
import {
  isLoaded as isAuthLoaded,
  load as loadAuth
} from 'modules/auth/ducks/auth'
import { About, Docs, MembersOnly, EventDetail } from './components'
import {
  Layout,
  Auth,
  Home,
  Posts,
  PostFormContainer,
  PostContainer,
  Events,
  EventForm
} from './containers'
import {SignupForm, LoginForm} from './containers/Auth'
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
        console.log('redirecting')
        replace('/login');
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
        replace('/home');
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
      <IndexRoute onEnter={requireLogin} component={Home} />

      { /* Authenticated Routes */ }
      <Route onEnter={requireLogin}>
        <Route path='membersOnly' component={MembersOnly} />
        <Route path='home' component={Home} />
        <Route path='p/:postId' component={PostContainer} />
        <Route path='e/:eventId' component={EventDetail} />
        <Route path='e/:eventId/addPost' components={PostFormContainer} />
      </Route>

      { /* Unauthenticated Routes Only */ }
      <Route onEnter={requireNoUser}>
        <Route path='login' component={LoginForm} />
        <Route path='signup' component={SignupForm} />
      </Route>

      { /* Routes */ }
      <Route path='posts' components={Posts} />
      <Route path='events' components={Events} />

      { /* Catch all routes */ }
      <Route path='*' component={NotFound} />
    </Route>
  )
}

export default getRoutes
