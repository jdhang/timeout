'use strict'

import React, {Component, PropTypes} from 'react'
import {push} from 'react-router-redux'
import {Field, reduxForm} from 'redux-form'
import {Input, Button, Select} from 'rebass'

class EventForm extends Component {
  static propTypes = {
    handleCreateEvent: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    hideForm: PropTypes.func,
    projects: PropTypes.object
  }

  renderInput = ({ input, label, type }) => {
    return (
      <Input
        {...input}
        label={label}
        type={type}
        placeholder={label}
      />
    );
  }

  renderProjectSelect = ({ input, label }) => {
    const {projects} = this.props;
    let projectOptions;
    if (Object.keys(projects).length === 0) {
      projectOptions = [{children: 'Other', value: 'other'}];
    } else {
      projectOptions = Object.keys(projects).map(id => {
        return {children: projects[id].name, value: id}
      });
    }

    return (
      <Select
        {...input}
        label={label}
        options={projectOptions}
      />
    );
  }

  render () {
    const {handleSubmit, handleCreateEvent, hideForm} = this.props;

    return (
      <div>
        <h4>New Event</h4>
        <form onSubmit={handleSubmit(handleCreateEvent)}>
          <Field
            name='title'
            label='Title'
            component={this.renderInput}
            type='text'
          />
          <Field
            name='projectId'
            label='Project'
            component={this.renderProjectSelect}
          />
          <Button type='submit' theme='success'>Start Event</Button>
          <Button type='button' theme='default' onClick={hideForm}>Cancel</Button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'eventForm'
})(EventForm)
