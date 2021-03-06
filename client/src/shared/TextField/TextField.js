'use strict'

import React, {Component, PropTypes} from 'react';
import {Field} from 'redux-form';
import {Input} from 'rebass';

export default class TextField extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    hideLabel: PropTypes.bool,
    style: PropTypes.object
  }

  renderInput = ({ input, label, hideLabel, type, placeholder, style }) => {
    return (
      <Input
        {...input}
        label={label}
        hideLabel={hideLabel}
        type={type}
        placeholder={placeholder || label}
        style={style}
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
