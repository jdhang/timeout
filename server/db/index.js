'use strict'

import db from './_db'

export default db

import User from './models/user'
import Event from './models/event'
import Post from './models/post'

User.hasMany(Event)
User.hasMany(Post)
Event.belongsTo(User)
Event.hasMany(Post)
Post.belongsTo(User)
Post.belongsTo(Event)
