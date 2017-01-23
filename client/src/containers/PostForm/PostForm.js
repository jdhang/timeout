'use strict'

import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {addPost} from '../../redux/modules/posts'

import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap'

class PostForm extends Component {
  static propTypes = {
    addPost: PropTypes.func,
    push: PropTypes.func
  }

  constructor (props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      tags: []
    }
  }

  handleSubmit = (e) => {
    const {addPost, push} = this.props;
    e.preventDefault();
    addPost(this.state)
      .then(() => push('/'));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render () {
    const {title, body, tags} = this.state;

    return (
      <div>
        <h3>New Post</h3>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              type='text'
              name='title'
              placeholder='Title'
              value={title}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              componentClass='textarea'
              name='body'
              placeholder='Body'
              value={body}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type='submit' bsStyle='success'>Add Post</Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) { return {} }

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({addPost, push}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
