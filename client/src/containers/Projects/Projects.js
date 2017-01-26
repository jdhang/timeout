'use strict'

import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Project} from '../../components'
import {loadProjects} from '../../redux/modules/projects'
import './Projects.scss'

class Projects extends Component {
  static propTypes = {
    loadProjects: PropTypes.func,
    loading: PropTypes.bool,
    projects: PropTypes.object
  }

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const {loadProjects} = this.props;
    loadProjects();
  }

  renderProjects = () =>{
    const {projects} = this.props;

    return Object.keys(projects).map(id => (
      <li key={id}>{projects[id].name}</li>
    ));
  }

  render () {
    const {loading} = this.props;

    if (loading) {
      return <h2>Loading Projects...</h2>
    } else {
      return (
        <div id='projects'>
          <ul>
            {this.renderProjects()}
          </ul>
        </div>
      )
    }
  }
}

function mapStateToProps (state, ownProps) {
  const {projects} = state;
  return {
    loading: projects.loading,
    projects: projects.data
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({loadProjects}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
