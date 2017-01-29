'use strict'

import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import _orderBy from 'lodash/orderBy'
import {Text} from 'rebass'
import {Project} from '../../components'
import {loadProjects} from 'modules/projects/ducks/projects'
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
    const sortedProjects = _orderBy(projects, ['events.length'], ['desc']);

    if (sortedProjects.length > 0) {
      return sortedProjects.map(project => (
        <Project key={project.id} project={project} />
      ));
    } else {
      return <Text>No projects yet.</Text>
    }
  }

  render () {
    const {loading} = this.props;

    if (loading) {
      return <h4>Loading Projects...</h4>
    } else {
      return (
        <div id='projects'>
          {this.renderProjects()}
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
