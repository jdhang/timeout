'use strict'

import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {loadPosts} from '../../redux/modules/posts'
import './Posts.scss'

class Posts extends Component {
  static propTypes = {
    loadPosts: PropTypes.func,
    loading: PropTypes.bool,
    posts: PropTypes.array
  }

  componentDidMount () {
    const {loadPosts} = this.props;
    loadPosts();
  }

  render () {
    const {loading, posts} = this.props;

    if (loading) {
      return <h2>Loading Posts...</h2>
    } else {
      return (
        <div id='posts'>
          <h2>Posts</h2>
        </div>
      )
    }
  }
}

function mapStateToProps (state, ownProps) {
  const {posts} = state;
  return {
    loading: posts.loading,
    posts: posts.data
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({loadPosts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
