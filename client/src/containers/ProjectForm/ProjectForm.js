'use strict'

import React, {Component, PropTypes} from 'react'
import {push} from 'react-router-redux'
import {Field, reduxForm} from 'redux-form'
import {Input, Button} from 'rebass'

class ProjectForm extends Component {
  static propTypes = {
    handleCreateProject: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    hideForm: PropTypes.func
  }

  renderInput = ({ input, label, type }) => {
    return (
      <Input
        {...input}
        label={label}
        type={type}
        placeholder={label}
      />
    )
  }

  render () {
    const {handleSubmit, handleCreateProject, hideForm} = this.props;

    return (
      <div>
        <h4>New Project</h4>
        <form onSubmit={handleSubmit(handleCreateProject)}>
          <Field
            name='name'
            label='Name'
            component={this.renderInput}
            type='text'
          />
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
