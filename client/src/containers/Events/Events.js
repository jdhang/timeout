'use strict'

import React, {Component, PropTypes} from 'react'
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Text} from 'rebass'
import {Event} from '../../components'
import {loadEvents, loadToday} from 'modules/events/ducks/events'
import './Events.scss'

class Events extends Component {
  static propTypes = {
    filter: PropTypes.string,
    push: PropTypes.func,
    loadEvents: PropTypes.func,
    loadToday: PropTypes.func,
    loading: PropTypes.bool,
    events: PropTypes.array,
    pathname: PropTypes.string
  }

  static defaultProps = {
    filter: 'today'
  }

  constructor (props) {
    super(props);

    this.renderEvents = this.renderEvents.bind(this)
  }

  componentDidMount () {
    const {filter, pathname, loadEvents, loadToday} = this.props;
    if (filter === 'all' || (/(events)/i).test(pathname)) {
      loadEvents();
    } else if (filter === 'today') {
      loadToday();
    }
  }

  handleEventSelect = (eventId) => {
    const {push} = this.props;
    push(`/e/${eventId}`);
  }

  renderEvents () {
    const {events} = this.props;

    if (events.length > 0) {
      return events.filter(event => event.status === 'completed').map(event => {
        return (
          <Event
            key={event.id}
            event={event}
            handleSelect={this.handleEventSelect.bind(this, event.id)}
          />
        );
      });
    } else {
      return <Text>No events for today yet.</Text>
    }
  }

  render () {
    const {loading} = this.props;

    if (loading) {
      return <h2>Loading Events...</h2>
    } else {
      return (
        <div id='events'>
          {this.renderEvents()}
        </div>
      )
    }
  }
}

function mapStateToProps (state, ownProps) {
  const {events, routing} = state;
  return {
    loading: events.loading,
    events: events.data,
    pathname: ownProps.pathname || ownProps.location.pathname
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({loadEvents, loadToday, push}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
