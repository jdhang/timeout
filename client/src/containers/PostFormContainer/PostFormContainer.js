'use strict'

import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {PostForm} from '../../containers'
import {Event} from '../../components'
import {addPost} from '../../redux/modules/posts'

class PostFormContainer extends Component {
  static propTypes = {
    addPost: PropTypes.func,
    push: PropTypes.func,
    currentEvent: PropTypes.object
  }

  handleAddPost = (data) => {
    const {addPost, currentEvent, push} = this.props;
    data.eventId = currentEvent.id;
    addPost(data)
      .then(() => push('/'));
  }

  render () {
    const {currentEvent} = this.props;

    if (currentEvent) {
      return (
        <div>
          <Event event={currentEvent} />
          <PostForm event={currentEvent} handleAddPost={this.handleAddPost} />
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
  return bindActionCreators({addPost, push}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFormContainer);
