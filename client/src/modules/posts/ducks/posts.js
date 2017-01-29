'use strict'

import {push} from 'react-router-redux'
import {parseData} from 'utils'
import posts from '../api/posts'

const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST'
const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE'

const initialState = {
  loading: false,
  updating: false,
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
    case UPDATE_POST_REQUEST:
      return {
        ...state,
        updating: true
      }
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.result.posts,
        error: null
      }
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        updating: false
      }
    case LOAD_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error.response
      }
    case UPDATE_POST_FAILURE:
      return {
        ...state,
        updating: false,
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

export function addPost (postData) {
  return {
    types: [ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE],
    promise: posts.addPost(postData)
  }
}

export const updatePost = (postData, eventId) => (dispatch, getState) => {
  dispatch({ type: UPDATE_POST_REQUEST });
  const { events: { data, current } } = getState();

  return posts.updatePost(postData).then(parseData)
  .then(result => {
    const updatedPost = result.post;
    const newData = {...data};
    const newCurrent = {...current};

    if (eventId === current.id) {
      const notesIdx = newCurrent.posts.findIndex(post => post.type === 'notes');
      newCurrent.posts[notesIdx] = updatedPost;
    } else {
      newData[updatedPost.id] = updatedPost;
    }

    return dispatch({
      type: UPDATE_POST_SUCCESS,
      result,
      data: newData,
      current: newCurrent
    });
  }, error => dispatch({ type: UPDATE_POST_FAILURE, error }))
  .catch(error => {
    dispatch({
      type: UPDATE_POST_FAILURE,
      error: `ERROR: ${error.message}`
    })
  })
}
