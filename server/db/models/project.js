'use strict'

import DataTypes from 'sequelize';
import db from '../_db';

const definitions = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active'
  }
}

const methods = {}

export default db.define('projects', definitions, methods);
