'use strict'

import React, {Component, PropTypes} from 'react'
import {push} from 'react-router-redux'
import {reduxForm} from 'redux-form'
import {Button} from 'rebass'
import {TextField} from 'shared'
import {signup} from 'modules/auth/ducks/auth'

class SignupForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
  }

  handleSignup = (data) => {
    const {dispatch} = this.props;
    dispatch(signup(data))
    .then(() => dispatch(push('/home')));
  }

  render () {
    const {handleSubmit, pristine, submitting} = this.props;

    return (
      <div>
        <h4>Signup</h4>
        <form onSubmit={handleSubmit(this.handleSignup)}>
          <TextField name='username' label='Username' type='text' />
          <TextField name='firstName' label='First Name' type='text' />
          <TextField name='lastName' label='Last Name' type='text' />
          <TextField name='password' label='Password' type='password' />
          <Button type='submit' disabled={pristine || submitting}>Signup</Button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'signup'
})(SignupForm)
