'use strict'

import React, {PropTypes} from 'react'
import Moment from 'moment'
import './Event.scss'

export default function Event ({ event }) {
  function renderDuration () {
    const diff = Moment.utc(Moment.duration(Moment(event.endTime).diff(event.startTime)).asMilliseconds()).format('HH:mm:ss');
    if (!event.endTime) {
      return <span>N/A</span>
    } else {
      return <span>{diff}</span>
    }
  }

  return (
    <div className='event' id={event.status === 'in-progress' ? 'in-progress': ''}>
      <div className='title'>{event.title}</div>
      <div>
        <div className='header'>Start: </div>
        {Moment(event.startTime).format('MM/DD/YYYY [at] hh:mm:ss A')}
      </div>
      <div>
        <div className='header'>End: </div>
        {
          event.endTime
            ? Moment(event.endTime).format('MM/DD/YYYY [at] hh:mm:ss A')
            : 'N/A'
        }
      </div>
      <div>
        <div className='header'>Duration: </div>
        {renderDuration()}
      </div>
    </div>
  )
}

Event.propTypes = {
  event: PropTypes.object
}
