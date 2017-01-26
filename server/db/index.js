'use strict'

import db from './_db'

export default db

import User from './models/user'
import Event from './models/event'
import Post from './models/post'
import Project from './models/project'

User.hasMany(Project)
User.hasMany(Event)
User.hasMany(Post)
Project.belongsTo(User)
Project.hasMany(Event)
Event.belongsTo(Project)
Event.belongsTo(User)
Event.hasMany(Post)
Post.belongsTo(User)
Post.belongsTo(Event)
