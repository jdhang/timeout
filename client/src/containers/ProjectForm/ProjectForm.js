'use strict'

import React, {Component, PropTypes} from 'react'
import {push} from 'react-router-redux'
import {reduxForm} from 'redux-form'
import {TextField} from 'shared'
import {Button, Text} from 'rebass'
import './ProjectForm.scss'

class ProjectForm extends Component {
  static propTypes = {
    handleCreateProject: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    hideForm: PropTypes.func,
    showBorder: PropTypes.bool
  }

  static defaultProps = {
    showBorder: false
  }

  render () {
    const {handleSubmit, handleCreateProject, showBorder} = this.props;

    return (
      <div className={showBorder ? 'formBorder' : null}>
        <form onSubmit={handleSubmit(handleCreateProject)}>
          <div className='flexRow'>
            <div className='flexCol'>
              <TextField
                name='name'
                label='Project Name'
                hideLabel={true}
                type='text'
                style={{ marginBottom: 0 }}
              />
            </div>
            <div className='flexColFixed'>
              <Button type='submit' theme='success'>
                <i className='fa fa-plus'></i>
              </Button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'projectForm'
})(ProjectForm)
