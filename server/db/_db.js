'use strict'

import path from 'path'
import Sequelize from 'sequelize'
import env from '../env'

const Promise = Sequelize.Promise;
Promise.config({
  warnings: false,
  longStackTraces: false,
  cancellation: true,
  monitoring: true
});

const options = {}

if (process.env.NODE_ENV === 'testing') {
  options.logging = false
}

const db = new Sequelize(env.DATABASE_URI, options)

export default db

