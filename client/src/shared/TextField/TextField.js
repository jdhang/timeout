'use strict'

import React, {Component, PropTypes} from 'react';
import {Field} from 'redux-form';
import {Input} from 'rebass';

export default class TextField extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string
  }

  renderInput = ({ input, label, type, placeholder }) => {
    return (
      <Input
        {...input}
        label={label}
        type={type}
        placeholder={placeholder || label}
      />
    );
  }

  render () {
    return (
      <Field
        {...this.props}
        component={this.renderInput}
      />
    );
  }
}
