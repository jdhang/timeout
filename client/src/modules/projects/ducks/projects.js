'use strict'

import {push} from 'react-router-redux'
import parseData from 'utils'
import projects from '../api/projects'
import _keyBy from 'lodash/keyBy'

const LOAD_PROJECTS_REQUEST = 'LOAD_PROJECTS_REQUEST'
const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS'
const LOAD_PROJECTS_FAILURE = 'LOAD_PROJECTS_FAILURE'

const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST'
const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS'
const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE'

const initialState = {
  loading: false,
  creating: false,
  data: {},
  error: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_PROJECT_REQUEST:
      return {
        ...state,
        creating: true
      }
    case LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: _keyBy(action.result.projects, 'id'),
        error: null
      }
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        creating: false,
        data: action.data,
        error: null
      }
    case LOAD_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error.response
      }
    case CREATE_PROJECT_FAILURE:
      return {
        ...state,
        creating: false,
        error: action.error.response
      }
    default:
      return state
  }
}

export function loadProjects () {
  return {
    types: [LOAD_PROJECTS_REQUEST, LOAD_PROJECTS_SUCCESS, LOAD_PROJECTS_FAILURE],
    promise: projects.getAll()
  }
}

export const createProject = (projectData) => (dispatch, getState) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  const { projects: { data } } = getState();

  return projects.createProject(projectData)
  .then(result => {
    const project = result.project;
    const newData = {...data};
    newData[project.id] = project;
    return dispatch({ type: CREATE_PROJECT_SUCCESS, result, data: newData });
  }, error => dispatch({ type: CREATE_PROJECT_FAILURE, error }))
  .catch(error => {
    dispatch({
      type: CREATE_PROJECT_FAILURE,
      error: `ERROR: ${error.messsage}`
    })
  });
}

export const projectActions = {
  loadProjects,
  createProject
}
