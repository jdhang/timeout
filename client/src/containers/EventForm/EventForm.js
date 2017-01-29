'use strict'

import React, {Component, PropTypes} from 'react'
import {push} from 'react-router-redux'
import {Field, reduxForm} from 'redux-form'
import {TextField} from 'shared'
import {Button, Select} from 'rebass'

class EventForm extends Component {
  static propTypes = {
    handleCreateEvent: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    hideForm: PropTypes.func,
    projects: PropTypes.object
  }

  renderProjectSelect = ({ input, label }) => {
    const {projects} = this.props;
    let projectOptions = [{children: 'Select a project...', value: ''}];
    if (Object.keys(projects).length !== 0) {
      projectOptions = projectOptions.concat(Object.keys(projects).map(id => {
        return {children: projects[id].name, value: id}
      }));
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
    const {handleSubmit, handleCreateEvent, hideForm, projects} = this.props;

    return (
      <div>
        <h4>New Event</h4>
        <form onSubmit={handleSubmit(handleCreateEvent)}>
          <TextField name='title' label='Title' type='text' />
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
