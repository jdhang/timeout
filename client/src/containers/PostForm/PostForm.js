'use strict'

import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addPost} from '../../redux/modules/posts'

class PostForm extends Component {
  handleSubmit () {
  }
}

function mapStateToProps (state, ownProps) {}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({addPost}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
