'use strict'

import React, {PropTypes} from 'react'
import Moment from 'moment'
import {Arrow, Text} from 'rebass'
import {TextArea} from 'shared'
import {PostFormContainer} from 'containers'
import './Event.scss'

export default function Event ({ event, show, showForm, hideForm, handleSelect }) {

  function renderEnd () {
    if (event.endTime) {
      return (
        <div className='midCol'>
          <div className='header'>End</div>
          <span>{Moment(event.endTime).format('MM/DD/YYYY [at] hh:mm:ss A')}</span>
        </div>
      );
    } else {
      return (
        <div className='inProgress'>
          <Text bold={true}>In Progress</Text>
        </div>
      );
    }
  }

  function renderDuration () {
    if (event.endTime) {
      const duration = Moment.utc(Moment.duration(Moment(event.endTime).diff(event.createdAt)).asMilliseconds()).format('HH:mm:ss');
      return (
        <div className='duration'>
          <div className='header'>Duration</div>
          <span>{duration}</span>
        </div>
      )
    }
  }

  function renderNotesForm () {
    if (event.status === 'in-progress') {
      return (
        <div className='notesForm'>
          <div onClick={show ? hideForm : showForm}>
            Take Notes
            <Arrow direction={show ? 'down' : 'up'} />
          </div>
          {show ? <TextArea name='notes' label='Name' /> : null}
        </div>
      );
    }
  }

  return (
    <div
      className={event.status === 'in-progress' ? 'eventDetail' : 'event'}
      id={event.status === 'in-progress' ? 'in-progress': null}
      onClick={handleSelect}
    >
      <div className='flexRow'>
        <div className='title'>
          <div>{event.project.name}</div>
          <Text bold={true}>{event.title}</Text>
        </div>
        <div className='midCol'>
          <div className='header'>Start</div>
          <span>{Moment(event.createdAt).format('MM/DD/YYYY [at] hh:mm:ss A')}</span>
        </div>
        {renderEnd()}
        {renderDuration()}
      </div>
      {renderNotesForm()}
    </div>
  )
}

Event.propTypes = {
  event: PropTypes.object,
  show: PropTypes.bool,
  showForm: PropTypes.func,
  hideForm: PropTypes.func,
  handleSelect: PropTypes.func
}
