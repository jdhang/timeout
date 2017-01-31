'use strict'

import React, {PropTypes} from 'react';
import Moment from 'moment';
import {Field, reduxForm} from 'redux-form';
import {Arrow, Text, Button} from 'rebass';
import {TextArea} from 'shared';
import {PostFormContainer} from 'containers';
import './Event.scss';

function Event ({
  event,
  show,
  toggleForm,
  handleUpdate,
  handleSubmit,
  handleSelect,
  dirty
}) {

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

  function renderNotesToggle () {
    if (event.status === 'in-progress') {
      return (
        <div className='notesRow'>
          <div className='notesToggle' onClick={toggleForm}>
            {show ? 'Hide' : 'Show'} Notes
            <Arrow direction={show ? 'down' : 'up'} />
          </div>
          {renderNotesForm()}
        </div>
      );
    }
  }

  function renderNotesForm () {
    if (show) {
      return (
        <form className='notesForm' onSubmit={handleSubmit(handleUpdate)}>
          <TextArea
            name='notes'
            label='Notes'
            hideLabel={true}
            rows={6}
          />
          {
            dirty
            ? (
              <Button type='submit' theme='success'>
                Save Notes
              </Button>
            )
            : null
          }
        </form>
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
      {renderNotesToggle()}
    </div>
  )
}

Event.propTypes = {
  dirty: PropTypes.bool,
  event: PropTypes.object,
  show: PropTypes.bool,
  toggleForm: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleSelect: PropTypes.func
}

export default reduxForm({
  form: 'currentEventForm',
  enableReinitialize: true
})(Event);
