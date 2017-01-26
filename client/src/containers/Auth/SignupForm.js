'use strict'

import React, {Component, PropTypes} from 'react'
import {push} from 'react-router-redux'
import {Field, reduxForm} from 'redux-form'
import {Input, Button} from 'rebass'
import {signup} from '../../redux/modules/auth'

class SignupForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
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

  handleSignup = (data) => {
    const {dispatch} = this.props;
    dispatch(signup(data))
    .then(() => dispatch(push('/')))

  }

  render () {
    const {handleSubmit, pristine, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSignup)}>
        <Field
          name='username'
          label='Username'
          component={this.renderInput}
          type='text'
        />
        <Field
          name='firstName'
          label='First Name'
          component={this.renderInput}
          type='text'
        />
        <Field
          name='lastName'
          label='Last Name'
          component={this.renderInput}
          type='text'
        />
        <Field
          name='password'
          label='Password'
          component={this.renderInput}
          type='password'
        />
        <Button type='submit' disabled={pristine || submitting}>Signup</Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'signup'
})(SignupForm)
