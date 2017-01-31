'use strict'

import React, {PropTypes} from 'react'
import Moment from 'moment'
import {Text} from 'rebass'
import './Project.scss'

export default function Project ({ project }) {

  return (
    <div className='project'>
      <div className='flexRow'>
        <div className='name'>
          <div className='header'>Name</div>
          <Text bold={true}>{project.name}</Text>
        </div>
        <div className='count'>
          <div className='header'>Events</div>
          <Text bold={true}>{project.events.length}</Text>
        </div>
      </div>
    </div>
  )
}

Project.propTypes = {
  project: PropTypes.object
}
