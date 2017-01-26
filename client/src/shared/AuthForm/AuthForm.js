'use strict'

import React, { Component, PropTypes } from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Row,
  Col
} from 'react-bootstrap'

export default class AuthForm extends Component {

  static propTypes = {
    title: PropTypes.string,
    buttonLabel: PropTypes.string,
    buttonStyle: PropTypes.string,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    title: '',
    buttonStyle: 'default',
    buttonLabel: 'Submit'
  }

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({ username: '', password: '' })
  }

  handleChange (e, field) {
    this.setState({ [field]: e.target.value })
  }

  render () {
    const { email, password } = this.state
    const { title, buttonLabel, buttonStyle } = this.props

    return (
      <Col xs={4} xsOffset={4}>
        <h3>{title}</h3>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              type='text'
              placeholder='Username'
              value={email}
              onChange={(e) => this.handleChange(e, 'username')}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => this.handleChange(e, 'password')}
            />
          </FormGroup>
          <Button type='submit' bsStyle={buttonStyle}>{buttonLabel}</Button>
        </form>
      </Col>
    )
  }
}
