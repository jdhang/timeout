'use strict'

import React, {Component, PropTypes} from 'react';
import {Field} from 'redux-form';
import {Textarea} from 'rebass';

export default class TextField extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number
  }

  renderTextarea = ({ input, label, placeholder, rows }) => {
    return (
      <Textarea
        {...input}
        label={label}
        placeholder={placeholder || label}
        rows={rows || 10}
      />
    )
  }

  render () {
    return (
      <Field
        {...this.props}
        component={this.renderTextarea}
      />
    );
  }
}
