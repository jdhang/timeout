'use strict';

import React, {Component, PropTypes} from 'react';
import Moment from 'moment';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text} from 'rebass';
import {Post} from 'components';
import {loadEvent} from 'modules/events/ducks/events';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import './Event.scss';

class EventDetail extends Component {
  static propTypes = {
    event: PropTypes.object,
    params: PropTypes.object,
    loadEvent: PropTypes.func,
    loading: PropTypes.bool
  }

  componentDidMount () {
    const { params: { eventId }, loadEvent } = this.props;
    loadEvent(eventId);
  }

  renderNotes = () => {
    const {event} = this.props;
    const notes = _find(event.posts, {type: 'notes'});

    return <Post post={notes} />
  }

  renderPosts = () => {
    const {event} = this.props;

    return _filter(event.posts, {type: 'post'}).map(post => {
      return <Post key={post.id} post={post} />
    });
  }

  render () {
    const {loading, event} = this.props;

    if (!event || loading) {
      return <h4>Loading...</h4>
    } else {
      return (
        <div className='eventDetail'>
          <div className='flexRow'>
            <div className='title'>
              <div>{event.project.name}</div>
              <Text bold={true}>{event.title}</Text>
            </div>
            <div className='midCol'>
              <div className='header'>Start</div>
              <span>{Moment(event.createdAt).format('MM/DD/YYYY [at] hh:mm:ss A')}</span>
            </div>
            <div className='midCol'>
              <div className='header'>End</div>
              <span>{Moment(event.endTime).format('MM/DD/YYYY [at] hh:mm:ss A')}</span>
            </div>
            <div className='duration'>
              <div className='header'>Duration</div>
              <span>{Moment.utc(Moment.duration(Moment(event.endTime).diff(event.createdAt)).asMilliseconds()).format('HH:mm:ss')}</span>
            </div>
          </div>
          {this.renderNotes()}
          {this.renderPosts()}
        </div>
      );
    }
  }
}

function mapStateToProps (state, ownProps) {
  const events = state.events;
  return {
    loading: events.loading,
    event: events.selected
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({loadEvent}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
