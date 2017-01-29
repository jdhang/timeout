// Reducers
import auth from './auth/ducks/auth'
import events from './events/ducks/events'
import posts from './posts/ducks/posts'
import projects from './projects/ducks/projects'

export const reducers = {
  auth,
  events,
  posts,
  projects
}

// APIs
import authAPI from './auth/api/auth'
import eventsAPI from './events/api/events'
import postsAPI from './posts/api/posts'
import projectsAPI from './projects/api/projects'

export const api = {
  auth: authAPI,
  events: eventsAPI,
  posts: postsAPI,
  projects: projectsAPI
}
