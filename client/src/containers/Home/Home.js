'use strict'

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {push} from 'react-router-redux'
import {Button, Glyphicon} from 'react-bootstrap'
import {AuthForm} from '../../shared'
import {EventForm} from '../../containers'
import {Posts} from '../../containers';
import {login} from '../../redux/modules/auth'
import {loadCurrentEvent, addEvent} from '../../redux/modules/events'
import './Home.scss'

class Home extends Component {
  static propTypes = {
    addEvent: PropTypes.func,
    loaded: PropTypes.bool,
    login: PropTypes.func,
    push: PropTypes.func,
    currentEvent: PropTypes.object,
    loadCurrentEvent: PropTypes.func
  }

  constructor (props) {
    super(props);

    this.state = {
      showEventForm: false,
      event: {
        title: ''
      }
    }
  }

  handleEventForm = () => {
    this.setState({ showEventForm: true });
  }

  handleAddEvent = (e) => {
    const {addEvent, push} = this.props;
    e.preventDefault();
    addEvent(this.state.event)
      .then(() => push('/events/detail'));
    this.setState({ showEvenForm: false });
  }

  handleChange = (e) => {
    const newForm = {...this.state.event};
    newForm[e.target.name] = e.target.value;
    this.setState({ event: newForm });
  }

  handleLogin = (credentials) => {
    const {login, push} = this.props;
    login(credentials)
      .then(() => push('/posts'))
  }

  renderEventForm = () => {
    const {showEventForm, event} = this.state;
    const {currentEvent} = this.props;
    if (currentEvent) {
      return (
        <h2>{currentEvent.title}</h2>
      )
    } else if (showEventForm) {
      return (
        <EventForm
          event={event}
          handleSubmit={this.handleAddEvent}
          handleChange={this.handleChange}
        />
      )
    } else {
      return (
        <Button bsStyle='primary' onClick={this.handleEventForm}>
          <Glyphicon glyph='plus' /> New Event
        </Button>
      );
    }
  }

  renderMain = () => {
    const {loaded, push} = this.props;

    if (loaded) {
      return (
        <div>
          {this.renderEventForm()}
          <Button bsStyle='success' onClick={() => push('/addPost')}>
            <Glyphicon glyph='plus' /> New Post
          </Button>
          <Posts />
        </div>
      );
    }
  }

  render () {
    const {loaded, push} = this.props;

    return (
      <div id='home'>
        <h1>Time/Out</h1>
        {this.renderMain()}
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  const {auth, events} = state
  return {
    loaded: auth.loaded,
    user: auth.user,
    currentEvent: events.current
  }
}

function mapDispatchToProps ( dispatch, ownProps) {
  return bindActionCreators({
    push,
    login,
    addEvent,
    loadCurrentEvent
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
