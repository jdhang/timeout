'use strict'

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {push} from 'react-router-redux'
import {AuthForm} from '../../shared'
import {login} from '../../redux/modules/auth'
import './Home.scss'

class Home extends Component {
  static propTypes = {
    loaded: PropTypes.bool,
    login: PropTypes.func,
    push: PropTypes.func
  }

  constructor (props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin (credentials) {
    const {login, push} = this.props;
    login(credentials)
      .then(() => push('/posts'))
  }

  render () {
    const {loaded} = this.props;

    if (loaded) {
      return (
        <div id='home'>
          <h1>Time/Out</h1>
          <div>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </div>
        </div>
      )
    } else {
      return (
        <div id='home'>
          <h1>Time/Out</h1>
          <AuthForm
            title='Login'
            buttonLabel='Login'
            buttonStyle='primary'
            onSubmit={this.handleLogin}
          />
        </div>
      )
    }
  }
}

function mapStateToProps (state, ownProps) {
  const {auth} = state
  return {
    loaded: auth.loaded,
    user: auth.user
  }
}

function mapDispatchToProps ( dispatch, ownProps) {
  return bindActionCreators({login, push}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
