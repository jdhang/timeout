'use strict'

import React, {Component, PropTypes} from 'react'
import {push, goBack} from 'react-router-redux'
import {Field, reduxForm} from 'redux-form'
import {Input, Textarea, Button} from 'rebass'

class PostForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleAddPost: PropTypes.func,
    event: PropTypes.object
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

  renderTextarea = ({ input, label }) => {
    return (
      <Textarea
        {...input}
        label={label}
        placeholder={label}
        rows={8}
      />
    )
  }

  render () {
    const {dispatch, handleSubmit, handleAddPost, event} = this.props;

    return (
      <div>
        <h4>Write a post about {event ? ` for ${event.title}` : ''}</h4>
        <form onSubmit={handleSubmit(handleAddPost)}>
          <Field
            name='title'
            label='Title'
            component={this.renderInput}
            type='text'
          />
          <Field
            name='body'
            label='Body'
            component={this.renderTextarea}
          />
          <Button type='submit' theme='success'>Add Post</Button>
          <Button type='button' theme='default' onClick={() => dispatch(goBack())}>Cancel</Button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'postForm'
})(PostForm)
