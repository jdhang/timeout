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
  startTime: {
    type: DataTypes.DATE
  },
  endTime: {
    type: DataTypes.DATE
  }
}

const methods = {}

export default db.define('events', definitions, methods);
