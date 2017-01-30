'use strict'

import DataTypes from 'sequelize';
import db from '../_db';

const definitions = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'in-progress'
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'track'
  },
  notes: {
    type: DataTypes.TEXT
  },
  endTime: {
    type: DataTypes.DATE
  }
}

const methods = {}

export default db.define('events', definitions, methods);
