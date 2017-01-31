'use strict'

import axios from 'axios';
import {parseData} from 'utils'

const BASE_URL = process.env.URL || 'http://localhost:8080'

export const getAll = () => {
  return axios.get(`${BASE_URL}/api/events`)
}

export const getToday = () => {
  const date = new Date();
  return axios.get(`${BASE_URL}/api/events/today?utcOffset=${date.getTimezoneOffset()}`)
}

export const getById = (id) => {
  return axios.get(`${BASE_URL}/api/events/${id}`)
}

export const getCurrent = () => {
  return axios.get(`${BASE_URL}/api/events/current`)
}

export const createEvent = (eventData) => {
  return axios.post(`${BASE_URL}/api/events`, eventData)
}

export const updateEvent = (eventData) => {
  return axios.post(`${BASE_URL}/api/events/${eventData.id}`, eventData)
}

export const endEvent = (eventId) => {
  return axios.post(`${BASE_URL}/api/events/${eventId}/end`)
}

const events = {
  getAll,
  getToday,
  getById,
  getCurrent,
  createEvent,
  updateEvent,
  endEvent,
}

export default events
