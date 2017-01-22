'use strict'

import {push} from 'react-router-redux'
import {posts} from '../../../api'

const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

const initialState = {
  loading: false,
  data: [],
  error: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.result.posts,
        error: null
      }
    case LOAD_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error.response
      }
    default:
      return state
  }
}

export function loadPosts () {
  return {
    types: [LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE],
    promise: posts.getAll()
  }
}
