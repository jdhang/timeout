'use strict'

import axios from 'axios';
import {parseData} from '../../utils'

const BASE_URL = process.env.URL || 'http://localhost:8080'

export const getAll = () => {
  return axios.get(`${BASE_URL}/api/projects`)
}

export const createProject = (projectData) => {
  return axios.post(`${BASE_URL}/api/projects`, projectData)
}

const projects = {
  getAll,
  createProject
}

export default projects
