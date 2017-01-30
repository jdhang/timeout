'use strict'

import React, {Component, PropTypes} from 'react';
import {Field} from 'redux-form';
import {Select as RebassSelect} from 'rebass';

export default class Select extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
    hideLabel: PropTypes.bool,
    style: PropTypes.object
  }

  renderSelect = ({ input, options, label, hideLabel, style }) => {
    return (
      <RebassSelect
        {...input}
        label={label}
        hideLabel={hideLabel}
        options={options}
        style={style}
      />
    );
  }

  render () {
    return (
      <Field
        {...this.props}
        component={this.renderSelect}
      />
    );
  }
}
