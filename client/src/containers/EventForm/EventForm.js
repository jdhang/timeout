'use strict'

import React, {Component, PropTypes} from 'react'
import {push} from 'react-router-redux'
import {Field, reduxForm} from 'redux-form'
import {Select, TextField} from 'shared'
import {Button, Label, Switch} from 'rebass'

class EventForm extends Component {
  static propTypes = {
    handleCreateEvent: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    hideForm: PropTypes.func,
    projects: PropTypes.object
  }

  state = {
    show: false
  }

  toggleDuration = (e, newValue, oldValue) => {
    this.setState({ show: newValue === 'timed' })
  }

  generateOptions = () => {
    const {projects} = this.props;
    let projectOptions = [{children: 'Select a project...', value: ''}];
    if (Object.keys(projects).length !== 0) {
      projectOptions = projectOptions.concat(Object.keys(projects).map(id => {
        return {children: projects[id].name, value: id}
      }));
    }
    return projectOptions;
  }

  renderDuration = () => {
    const {show} = this.state;

    if (show) {
      return (
        <div>
          Duration Input
        </div>
      );
    }
  }

  renderSwitch = ({ input: { value, onChange }, label, options }) => {
    const checked = value === 'timed';
    const newValue = checked ? 'track' : 'timed';

    return (
      <div>
        <div><Label>{label}</Label></div>
        <span>Tracking</span>
        <Switch checked={checked} onClick={() => onChange(newValue)} />
        <span>Timed</span>
      </div>
    );
  }

  render () {
    const {handleSubmit, handleCreateEvent, hideForm} = this.props;

    return (
      <div>
        <h4>New Event</h4>
        <form onSubmit={handleSubmit(handleCreateEvent)}>
          <TextField name='title' label='Title' type='text' />
          <Select
            name='projectId'
            label='Project'
            options={this.generateOptions()}
          />
          <Field
            name='type'
            label='Type'
            component={this.renderSwitch}
            onChange={this.toggleDuration}
          />
          {this.renderDuration()}
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
