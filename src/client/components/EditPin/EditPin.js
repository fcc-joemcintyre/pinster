import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePin } from '../../store/appActions';
import { createField, defaultOnChange, defaultOnValidate, defaultOnValidateForm, getFieldValues, inString, outString }
  from '../../lib/formkit/formHelpers';
import { PinForm } from './PinForm';

class EditPinBase extends React.Component {
  constructor (props, context) {
    super (props, context);
    this._id = props.match.params._id;
    const pin = props.pins.find (a => (a._id === this._id));

    this.state = {
      fields: {
        url: createField ('url', pin.url, true, [], 'Image location (http...)', inString, outString),
        category: createField ('category', pin.category, true, [], 'Up to 20 characters', inString, outString),
        title: createField ('title', pin.title, true, [], 'Up to 60 characters', inString, outString),
        text: createField ('text', pin.text, true, [], 'Why you like this', inString, outString),
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
        await this.props.dispatch (updatePin (this._id, category, title, text, url));
        this.props.history.push ('/manage');
      } catch (err) {
        // todo error
      }
    }
  }

  render () {
    return (
      <PinForm
        action='Edit'
        fields={this.state.fields}
        onChange={this.onChange}
        onValidate={this.onValidate}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  pins: state.pins,
});

export const EditPin = connect (mapStateToProps) (EditPinBase);

EditPinBase.propTypes = {
  pins: PropTypes.arrayOf (PropTypes.shape ({
    _id: PropTypes.string.isRequired,
  })).isRequired,
  match: PropTypes.shape ({
    params: PropTypes.shape ({
      _id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape ({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
