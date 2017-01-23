'use strict'

import axios from 'axios';
import {parseData} from '../../utils'

const BASE_URL = process.env.URL || 'http://localhost:8080'

export const getAll = () => {
  return axios.get(`${BASE_URL}/api/posts`)
}

export const addPost = (postData) => {
  return axios.post(`${BASE_URL}/api/posts`, postData)
}

const posts = {
  getAll,
  addPost
}

export default posts
