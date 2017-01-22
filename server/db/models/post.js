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
  body: {
    type: DataTypes.TEXT
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
}

const methods = {
  classMethods: {
    associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.Event);
    }
  }
}

export default db.define('Pos', definitions, methods);
