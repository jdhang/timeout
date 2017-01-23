'use strict'

import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {addEvent} from '../../redux/modules/events'

import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap'

export default function EventForm ({ event, handleSubmit, handleChange }) {
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl
          type='text'
          name='title'
          placeholder='Title'
          value={event.title}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type='submit' bsStyle='primary'>Start Event</Button>
    </form>
  )
}

EventForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  event: PropTypes.object
}
