'use strict'

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {push} from 'react-router-redux'
import {Button, Close} from 'rebass'
import {Posts, Events, EventForm, Projects, ProjectForm} from '../../containers'
import {Event} from '../../components';
import {login} from 'modules/auth/ducks/auth'
import {eventActions} from 'modules/events/ducks/events'
import {projectActions} from 'modules/projects/ducks/projects'
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
    loadingCurrent: PropTypes.bool,
    creating: PropTypes.bool
  }

  constructor (props) {
    super(props);

    this.state = {
      showEventForm: false,
      showProjectForm: false,
      showPostForm: false
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

  showPostForm = () => {
    this.setState({ showPostForm: true });
  }

  hidePostForm = () => {
    this.setState({ showPostForm: false });
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
      .then(() => push(`/e/${currentEvent.id}/addPost`));
  }

  handleCreateProject = (data) => {
    const {createProject} = this.props;
    createProject(data);
    this.setState({ showProjectForm: false });
  }

  renderEventForm = () => {
    const {showEventForm, showProjectForm, showPostForm} = this.state;
    const {currentEvent, loadingCurrent, creating, projects} = this.props;

    if (loadingCurrent || creating) {
      return <h3>Loading...</h3>
    } else if (currentEvent) {
      return (
        <div>
          <Event
            event={currentEvent}
            show={showPostForm}
            showForm={this.showPostForm}
            hideForm={this.hidePostForm}
          />
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
          + Create Project
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
            <h4>Today's Events</h4>
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
          <div className='form'>
            {this.renderProjectForm()}
          </div>
          <div className='form'>
            {this.renderEventForm()}
          </div>
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
    creating: events.creating,
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
