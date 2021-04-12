import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class FilteredInput extends Component {
  focus () {
    if (this.ref) {
      this.ref.focus ();
    }
  }

  render () {
    // remove FilteredInput props from props to passthrough to <input> element
    const passthrough = {};
    const keys = Reflect.ownKeys (this.props);
    for (const key of keys) {
      if ((key !== 'key') && (key !== 'ref') && (key !== 'filter')) {
        passthrough[key] = this.props[key];
      }
    }

    return (
      <input
        {...passthrough}
        ref={(ref) => { this.ref = ref; }}
        onKeyPress={(e) => {
          if (this.props.filter.test (e.key) === false) {
            e.preventDefault ();
          }
        }}
      />
    );
  }
}

/* eslint react/forbid-prop-types: off */
FilteredInput.propTypes = {
  filter: PropTypes.object.isRequired,
};
