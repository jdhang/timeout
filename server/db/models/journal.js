'use strict'

import DataTypes from 'sequelize';
import db from '../_db';

const definitions = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  morning: {
    type: DataTypes.TEXT
  },
  night: {
  }
}

const methods = {}

export default db.define('journals', definitions, methods);
