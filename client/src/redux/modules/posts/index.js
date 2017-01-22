'use strict'

import {push} from 'react-router-redux'
import {posts} from '../../../api'

const LOAD_POSTS_REQUEST = 'LOST_POSTS_REQUEST'
const LOAD_POSTS_SUCCESS = 'LOST_POSTS_SUCCESS'
const LOAD_POSTS_FAILURE = 'LOST_POSTS_FAILURE'

const initialState = {
  loading: false,
  data: [],
  error: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:

  }
}
