import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPin } from '../../store/appActions';
import { createField, defaultOnChange, defaultOnValidate, defaultOnValidateForm, getFieldValues, inString, outString }
  from '../../lib/formkit/formHelpers';
import { PinForm } from './PinForm';

class AddPinBase extends React.Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      fields: {
        url: createField ('url', '', true, [], 'Image location (http...)', inString, outString),
        category: createField ('category', '', true, [], 'Up to 20 characters', inString, outString),
        title: createField ('title', '', true, [], 'Up to 60 characters', inString, outString),
        text: createField ('text', '', true, [], 'Why you like this', inString, outString),
      },
    };
    this.onChange = defaultOnChange.bind (this);
    this.onValidate = defaultOnValidate.bind (this);
    this.onValidateForm = defaultOnValidateForm.bind (this);
    this.onSubmit = this.onSubmit.bind (this);
  }

  async onSubmit (event) {
    event.preventDefault ();
    if (this.onValidateForm ()) {
      const { url, category, title, text } = getFieldValues (this.state.fields);
      try {
        await this.props.dispatch (addPin (category, title, text, url));
        this.props.history.push ('/manage');
      } catch (err) {
        // todo error
      }
    }
  }

  render () {
    return (
      <PinForm
        fields={this.state.fields}
        onChange={this.onChange}
        onValidate={this.onValidate}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export const AddPin = connect () (AddPinBase);

AddPinBase.propTypes = {
  history: PropTypes.shape ({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
