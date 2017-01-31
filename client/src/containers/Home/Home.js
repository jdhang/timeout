'use strict'

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {push} from 'react-router-redux'
import {Button, Tooltip} from 'rebass'
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
    updateEvent: PropTypes.func,
    endEvent: PropTypes.func,
    loaded: PropTypes.bool,
    login: PropTypes.func,
    push: PropTypes.func,
    currentEvent: PropTypes.object,
    loadCurrentEvent: PropTypes.func,
    loadingCurrent: PropTypes.bool,
    creating: PropTypes.bool,
    pathname: PropTypes.string
  }

  state = {
    showEventForm: false,
    showProjectForm: false,
    showNotes: false
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

  toggleProjectForm = () => {
    this.setState({ showProjectForm: !this.state.showProjectForm });
  }

  toggleNotes = () => {
    this.setState({ showNotes: !this.state.showNotes });
  }

  handleCreateEvent = (data) => {
    const {createEvent} = this.props;
    createEvent(data);
    this.setState({ showEventForm: false });
  }

  handleUpdateEvent = (data) => {
    const {updateEvent} = this.props;
    updateEvent(data);
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
    const {showEventForm, showProjectForm, showNotes} = this.state;
    const {currentEvent, loadingCurrent, creating, projects} = this.props;

    if (loadingCurrent || creating) {
      return <h3>Loading...</h3>
    } else if (currentEvent) {
      return (
        <div>
          <Event
            initialValues={currentEvent}
            event={currentEvent}
            show={showNotes}
            toggleForm={this.toggleNotes}
            handleUpdate={this.handleUpdateEvent}
          />
          <Button theme='error' onClick={this.handleEndEvent}>
            <i className='fa fa-times fa-fw'></i> Stop Event
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
          <i className='fa fa-plus fa-fw'></i> New Event
        </Button>
      );
    }
  }

  renderProjectForm = () => {
    const {showProjectForm} = this.state;
    if (showProjectForm) {
      return (
        <div className='form'>
          <ProjectForm
            handleCreateProject={this.handleCreateProject}
            showBorder={true}
          />
        </div>
      )
    }
  }

  renderAddButton = () => {
    const {showProjectForm} = this.state;
    return (
      <span className='button'>
        <Tooltip title={showProjectForm ? 'Hide Form' : 'Add Project'}>
          <Button
            style={{ padding: '3px 5px 2px', minHeight: 0 }}
            theme={showProjectForm ? 'error' : 'success'}
            onClick={this.toggleProjectForm}
          >
            <i className={`fa fa-${showProjectForm ? 'minus' : 'plus'} fa-fw`}></i>
          </Button>
        </Tooltip>
      </span>
    );
  }

  renderContent = () => {
    const {pathname} = this.props;
    const {showEventForm} = this.state;

    if (showEventForm) {
      return <Events pathname={pathname} />
    } else {
      return (
        <div className='content'>
          <div className='left'>
            <h4>
              Projects
              {this.renderAddButton()}
            </h4>
            {this.renderProjectForm()}
            <Projects />
          </div>
          <div className='right'>
            <h4>Today's Events</h4>
            <Events pathname={pathname} />
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
    projects: projects.data,
    pathname: ownProps.location.pathname
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
