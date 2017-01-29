'use strict'

import React, {Component, PropTypes} from 'react'
import {push} from 'react-router-redux'
import {reduxForm} from 'redux-form'
import {TextField} from 'shared'
import {Button} from 'rebass'

class ProjectForm extends Component {
  static propTypes = {
    handleCreateProject: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    hideForm: PropTypes.func
  }

  render () {
    const {handleSubmit, handleCreateProject, hideForm} = this.props;

    return (
      <div>
        <h4>New Project</h4>
        <form onSubmit={handleSubmit(handleCreateProject)}>
          <TextField name='name' label='Name' type='text' />
          <Button type='submit' theme='success'>Create Project</Button>
          <Button type='button' theme='default' onClick={hideForm}>Cancel</Button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'projectForm'
})(ProjectForm)
