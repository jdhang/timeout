'use strict'

import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Post} from '../../components'
import {loadPosts} from '../../redux/modules/posts'
import './Posts.scss'

class Posts extends Component {
  static propTypes = {
    loadPosts: PropTypes.func,
    loading: PropTypes.bool,
    posts: PropTypes.array
  }

  constructor (props) {
    super(props);

    this.renderPosts = this.renderPosts.bind(this)
  }

  componentDidMount () {
    const {loadPosts} = this.props;
    loadPosts();
  }

  renderPosts () {
    const {posts} = this.props;

    return posts.map((post, i) => {
      return <Post key={i} post={post} />
    });
  }

  render () {
    const {loading} = this.props;

    if (loading) {
      return <h2>Loading Posts...</h2>
    } else {
      return (
        <div id='posts'>
          {this.renderPosts()}
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
