'use strict'

import React, { Component, PropTypes } from 'react'
import {push} from 'react-router-redux';
import {reduxForm} from 'redux-form';
import {Button} from 'rebass';
import {login} from 'modules/auth/ducks/auth';
import {TextField} from 'shared'

class LoginForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
  }

  handleLogin = (data) => {
    const {dispatch} = this.props;
    dispatch(login(data))
    .then(() => dispatch(push('/home')));
  }

  render () {
    const {dispatch, handleSubmit, pristine, submitting} = this.props;

    return (
      <div>
        <h4>Login</h4>
        <form onSubmit={handleSubmit(this.handleLogin)}>
          <TextField name='username' label='Username' type='text' />
          <TextField name='password' label='Password' type='password' />
          <Button type='submit' disabled={pristine || submitting}>Login</Button>
          <Button
            type='button'
            theme='error'
            onClick={() => dispatch(push('/signup'))}
          >
            Create Account
          </Button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'login'
})(LoginForm)
