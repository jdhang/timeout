'use strict'

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class PostContainer extends Component {
  static propTypes = {
    params: PropTypes.object
  }

  componentDidMount () {
    const { params: { postId } } = this.props;
  }

  render () {
    return (
      <div className='post'>
        <div className='title'>Title</div>
        <div className='body'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
          tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
          vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
          no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </div>
        <div className='bottom'>
          <div className='tags'>#test #nothing #nocontent</div>
          <div className='date'>January 26, 2017 at 11:34 AM</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {}
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
