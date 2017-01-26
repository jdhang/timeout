'use strict'

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {push} from 'react-router-redux'
import {Button, Close} from 'rebass'
import {AuthForm} from '../../shared'
import {Posts, Events, EventForm, Projects, ProjectForm} from '../../containers'
import {Event} from '../../components';
import {login} from '../../redux/modules/auth'
import {eventActions} from '../../redux/modules/events'
import {projectActions} from '../../redux/modules/projects'
import './Home.scss'

class Home extends Component {
  static propTypes = {
    loadProjects: PropTypes.func,
    createProject: PropTypes.func,
    projects: PropTypes.object,
    createEvent: PropTypes.func,
    endEvent: PropTypes.func,
    loaded: PropTypes.bool,
    login: PropTypes.func,
    push: PropTypes.func,
    currentEvent: PropTypes.object,
    loadCurrentEvent: PropTypes.func,
    loadingCurrent: PropTypes.bool
  }

  constructor (props) {
    super(props);

    this.state = {
      showEventForm: false,
      showProjectForm: false
    }
  }

  componentDidMount () {
    const {loadCurrentEvent, loadProjects} = this.props;
    loadCurrentEvent();
    loadProjects();
  }

  showEventForm = () => {
    this.setState({ showEventForm: true });
  }

  hideEventForm = () => {
    this.setState({ showEventForm: false });
  }

  showProjectForm = () => {
    this.setState({ showProjectForm: true });
  }

  hideProjectForm = () => {
    this.setState({ showProjectForm: false });
  }


  handleLogin = (credentials) => {
    const {login, push} = this.props;
    login(credentials)
      .then(() => push('/posts'))
  }

  handleCreateEvent = (data) => {
    const {createEvent} = this.props;
    createEvent(data);
    this.setState({ showEventForm: false });
  }

  handleEndEvent = () => {
    const {endEvent, currentEvent, push} = this.props;
    endEvent(currentEvent.id)
      .then(() => push('/addPost'));
  }

  handleCreateProject = (data) => {
    const {createProject} = this.props;
    createProject(data);
    this.setState({ showProjectForm: false });
  }

  renderEventForm = () => {
    const {showEventForm, showProjectForm} = this.state;
    const {currentEvent, loadingCurrent, projects} = this.props;

    if (loadingCurrent) {
      return <h3>Loading...</h3>
    } else if (currentEvent) {
      return (
        <div>
          <Event event={currentEvent} />
          <Button theme='error' onClick={this.handleEndEvent}>
            <span className='cross'>×</span> Stop Event
          </Button>
        </div>
      )
    } else if (showEventForm) {
      return (
        <EventForm
          projects={projects}
          handleCreateEvent={this.handleCreateEvent}
          hideForm={this.hideEventForm}
        />
      )
    } else {
      return (
        <Button onClick={this.showEventForm}>
          + New Event
        </Button>
      );
    }
  }

  renderProjectForm = () => {
    const {showProjectForm} = this.state;
    if (showProjectForm) {
      return (
        <ProjectForm
          handleCreateProject={this.handleCreateProject}
          hideForm={this.hideProjectForm}
        />
      )
    } else {
      return (
        <Button theme='warning' onClick={this.showProjectForm}>
          + New Project
        </Button>
      );
    }
  }

  renderContent = () => {
    const {showEventForm, showProjectForm} = this.state;

    if (showEventForm) {
      return <Events />
    } else if (showProjectForm) {
      return <Projects />
    } else {
      return (
        <div className='content'>
          <div className='left'>
            <h4>Projects</h4>
            <Projects />
          </div>
          <div className='right'>
            <h4>Events</h4>
            <Events />
          </div>
        </div>
      );
    }
  }

  renderMain = () => {
    const {loaded, push} = this.props;

    if (loaded) {
      return (
        <div>
          {this.renderProjectForm()}
          {this.renderEventForm()}
          {this.renderContent()}
        </div>
      );
    } else {
      return <h4>Loading...</h4>
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
  const {auth, events, projects} = state
  return {
    loaded: auth.loaded,
    user: auth.user,
    currentEvent: events.current,
    loadingCurrent: events.loadingCurrent,
    projects: projects.data
  }
}

function mapDispatchToProps ( dispatch, ownProps) {
  return bindActionCreators({
    push,
    login,
    ...eventActions,
    ...projectActions
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
