'use strict'

import React, {Component, PropTypes} from 'react'
import {push, goBack} from 'react-router-redux'
import {Field, reduxForm} from 'redux-form'
import {TextArea, TextField} from 'shared'
import {Input, Textarea, Button} from 'rebass'

class PostForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleAddPost: PropTypes.func.isRequired,
    event: PropTypes.object,
    type: PropTypes.string
  }

  renderTitle = () => {
    const {type, event} = this.props;
    if (type === 'post') {
      return (
        <h4>Write a post about {event ? ` for ${event.title}` : ''}</h4>
      );
    }
  }

  render () {
    const {dispatch, handleSubmit, handleAddPost, event, type} = this.props;

    return (
      <div>
        {this.renderTitle()}
        <form onSubmit={handleSubmit(handleAddPost)}>
          {
            type === 'post'
              ? <TextField name='title' label='Title' type='text' />
              : null
          }
          <TextArea
            name='body'
            label={type === 'post' ? 'Body' : 'Notes'}
            placeholder={type !== 'post' ? 'Write notes here' : null}
          />
          <Button type='submit' theme='success'>
            {
              type ==='post'
                ? 'Add Post'
                : 'Save Notes'
            }
          </Button>
          {
            type === 'post'
              ? <Button type='button' theme='default' onClick={() => dispatch(goBack())}>Cancel</Button>
              : null
          }
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'postForm'
})(PostForm)
