'use strict'

import React, {PropTypes} from 'react'
import './Event.scss'

export default function Event ({ event }) {
  return (
    <div className='event'>
      <div className='title'>{event.title}</div>
      <div>Start: {event.startTime}</div>
      <div>End: {event.endTime}</div>
    </div>
  )
}

Event.propTypes = {
  event: PropTypes.object
}
