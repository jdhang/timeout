'use strict'

import {push} from 'react-router-redux'
import {parseData} from 'utils'
import events from '../api/events'
import _keyBy from 'lodash/keyBy'
import {UPDATE_POST_SUCCESS} from 'modules/posts/ducks/posts'

const LOAD_EVENTS_REQUEST = 'LOAD_EVENTS_REQUEST'
const LOAD_EVENTS_SUCCESS = 'LOAD_EVENTS_SUCCESS'
const LOAD_EVENTS_FAILURE = 'LOAD_EVENTS_FAILURE'

const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST'
const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS'
const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE'

const END_EVENT_REQUEST = 'END_EVENT_REQUEST'
const END_EVENT_SUCCESS = 'END_EVENT_SUCCESS'
const END_EVENT_FAILURE = 'END_EVENT_FAILURE'

const LOAD_CURRENT_EVENT_REQUEST = 'LOAD_CURRENT_EVENT_REQUEST'
const LOAD_CURRENT_EVENT_SUCCESS = 'LOAD_CURRENT_EVENT_SUCCESS'
const LOAD_CURRENT_EVENT_FAILURE = 'LOAD_CURRENT_EVENT_FAILURE'

const LOAD_EVENT_REQUEST = 'LOAD_EVENT_REQUEST'
const LOAD_EVENT_SUCCESS = 'LOAD_EVENT_SUCCESS'
const LOAD_EVENT_FAILURE = 'LOAD_EVENT_FAILURE'

const initialState = {
  loading: false,
  loadingCurrent: false,
  creating: false,
  data: [],
  selected: null,
  current: null,
  error: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS_REQUEST:
    case LOAD_EVENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_EVENT_REQUEST:
      return {
        ...state,
        creating: true
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
    case LOAD_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        selected: action.result.event,
        error: null
      }
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        creating: false,
        current: action.result.event,
        data: action.data,
        error: null
      }
    case END_EVENT_SUCCESS:
      return {
        ...state,
        current: action.result.event,
        data: action.data,
        error: null
      }
    case LOAD_CURRENT_EVENT_SUCCESS:
      return {
        ...state,
        loadingCurrent: false,
        current: action.result.event,
        error: null
      }
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        data: action.data,
        current: action.current
      }
    case LOAD_EVENTS_FAILURE:
    case LOAD_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error.response
      }
    case CREATE_EVENT_FAILURE:
      return {
        ...state,
        creating: false,
        error: action.error.response
      }
    case END_EVENT_FAILURE:
      return {
        ...state,
        error: action.error.response
      }
    case LOAD_CURRENT_EVENT_FAILURE:
      return {
        ...state,
        loadingCurrent: false,
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
export function loadToday () {
  return {
    types: [LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_FAILURE],
    promise: events.getToday()
  }
}

export function loadEvent (eventId) {
  return {
    types: [LOAD_EVENT_REQUEST, LOAD_EVENT_SUCCESS, LOAD_EVENT_FAILURE],
    promise: events.getById(eventId)
  }
}

export function loadCurrentEvent () {
  return {
    types: [LOAD_CURRENT_EVENT_REQUEST, LOAD_CURRENT_EVENT_SUCCESS, LOAD_CURRENT_EVENT_FAILURE],
    promise: events.getCurrent()
  }
}

export const createEvent = (eventData) => (dispatch, getState) => {
  dispatch({ type: CREATE_EVENT_REQUEST });
  const { events: { data } } = getState();

  return events.createEvent(eventData).then(parseData)
  .then(result => {
    const newData = [...data];
    newData.unshift(result.event);
    return dispatch({ type: CREATE_EVENT_SUCCESS, result, data: newData });
  }, error => {
    dispatch({ type: CREATE_EVENT_FAILURE, error })
  })
  .catch(error => {
    dispatch({
      type: CREATE_EVENT_FAILURE,
      error: `ERROR: ${error.messsage}`
    })
  });
}

export const endEvent = (eventId) => (dispatch, getState) => {
  dispatch({ type: END_EVENT_REQUEST });
  const { events: { data } } = getState();
  const eventIdx = data.findIndex(event => event.id === eventId);

  return events.endEvent(eventId).then(parseData)
  .then(result => {
    const newData = [...data];
    newData[eventIdx] = result.event;
    return dispatch({ type: END_EVENT_SUCCESS, result, data: newData });
  }, error => dispatch({ type: END_EVENT_FAILURE, error }))
  .catch(error => {
    dispatch({
      type: END_EVENT_FAILURE,
      error: `ERROR: ${error.messsage}`
    })
  });
}

export const eventActions = {
  loadEvents,
  loadToday,
  loadEvent,
  loadCurrentEvent,
  createEvent,
  endEvent,
}
