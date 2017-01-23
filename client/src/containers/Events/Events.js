'use strict'

import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Event} from '../../components'
import {loadEvents} from '../../redux/modules/events'
import './Events.scss'

class Events extends Component {
  static propTypes = {
    loadEvents: PropTypes.func,
    loading: PropTypes.bool,
    events: PropTypes.array
  }

  constructor (props) {
    super(props);

    this.renderEvents = this.renderEvents.bind(this)
  }

  componentDidMount () {
    const {loadEvents} = this.props;
    loadEvents();
  }

  renderEvents () {
    const {events} = this.props;

    return events.map((event, i) => {
      return <Event key={i} event={event} />
    });
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
  const {events} = state;
  return {
    loading: events.loading,
    events: events.data
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({loadEvents}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
