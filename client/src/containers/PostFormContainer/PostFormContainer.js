'use strict'

import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import _find from 'lodash/find'
import {PostForm} from '../../containers'
import {Event} from '../../components'
import {addPost, updatePost} from 'modules/posts/ducks/posts'

class PostFormContainer extends Component {
  static propTypes = {
    addPost: PropTypes.func,
    updatePost: PropTypes.func,
    push: PropTypes.func,
    currentEvent: PropTypes.object,
    showEvent: PropTypes.bool,
    type: PropTypes.string
  }

  static defaultProps = {
    showEvent: true,
    type: 'post'
  }

  handleAddPost = (data) => {
    const {addPost, currentEvent, push} = this.props;
    data.eventId = currentEvent.id;
    addPost(data)
      .then(() => push('/home'));
  }

  handleSaveNotes = (data) => {
    const {addPost, updatePost, currentEvent} = this.props;
    if (data.id) {
      updatePost(data, currentEvent.id);
    } else {
      data.title = `Notes for ${currentEvent.title}`;
      data.eventId = currentEvent.id;
      data.type = 'notes';
      addPost(data);
    }
  }

  render () {
    const {currentEvent, type, showEvent} = this.props;
    let initial;

    console.log(type)

    if (type === 'notes') {
      initial = _find(currentEvent.posts, {type: 'notes'});
    }

    if (currentEvent) {
      return (
        <div>
          {showEvent ? <Event event={currentEvent} /> : null}
          <PostForm
            initialValues={initial}
            type={type}
            event={currentEvent}
            handleAddPost={type === 'notes' ? this.handleSaveNotes : this.handleAddPost}
          />
        </div>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps (state, ownProps) {
  const {events} = state;
  return {
    currentEvent: events.current
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({addPost, updatePost, push}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFormContainer);
