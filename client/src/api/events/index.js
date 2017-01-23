'use strict'

import axios from 'axios';
import {parseData} from '../../utils'

const BASE_URL = process.env.URL || 'http://localhost:8080'

export const getAll = () => {
  return axios.get(`${BASE_URL}/api/events`)
}

export const addEvent = (eventData) => {
  return axios.post(`${BASE_URL}/api/events`, eventData)
}

export const getCurrent = () => {
  return axios.post(`${BASE_URL}/api/events/current`)
}

const events = {
  getAll,
  addEvent,
  getCurrent
}

export default events
