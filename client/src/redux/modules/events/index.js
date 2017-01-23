'use strict'

import {push} from 'react-router-redux'
import {events} from '../../../api'

const LOAD_EVENTS_REQUEST = 'LOAD_EVENTS_REQUEST'
const LOAD_EVENTS_SUCCESS = 'LOAD_EVENTS_SUCCESS'
const LOAD_EVENTS_FAILURE = 'LOAD_EVENTS_FAILURE'

const ADD_EVENT_REQUEST = 'ADD_EVENT_REQUEST'
const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS'
const ADD_EVENT_FAILURE = 'ADD_EVENT_FAILURE'

const LOAD_CURRENT_EVENT_REQUEST = 'LOAD_CURRENT_EVENT_REQUEST'
const LOAD_CURRENT_EVENT_SUCCESS = 'LOAD_CURRENT_EVENT_SUCCESS'
const LOAD_CURRENT_EVENT_FAILURE = 'LOAD_CURRENT_EVENT_FAILURE'

const initialState = {
  loading: false,
  loadingCurrent: false,
  adding: false,
  data: [],
  selected: null,
  current: null,
  error: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADD_EVENT_REQUEST:
      return {
        ...state,
        adding: true
      }
    case LOAD_CURRENT_EVENT_REQUEST:
      return {
        ...state,
        loadingCurrent: true
      }
    case LOAD_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.result.events,
        error: null
      }
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        adding: false,
        current: action.result.event,
        error: null
      }
    case LOAD_CURRENT_EVENT_SUCCESS:
      return {
        ...state,
        loadingCurrent: false,
        current: action.result.event,
        error: null
      }
    case LOAD_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error.response
      }
    case ADD_EVENT_FAILURE:
      return {
        ...state,
        adding: false,
        error: action.error.response
      }
    default:
      return state
  }
}

export function loadEvents () {
  return {
    types: [LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_FAILURE],
    promise: events.getAll()
  }
}

export function addEvent (eventData) {
  return {
    types: [ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE],
    promise: events.addEvent(eventData)
  }
}

export function loadCurrentEvent () {
  return {
    types: [LOAD_CURRENT_EVENT_REQUEST, LOAD_CURRENT_EVENT_SUCCESS, LOAD_CURRENT_EVENT_FAILURE],
    promise: events.getCurrent()
  }
}
