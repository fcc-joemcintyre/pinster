import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmail, isPassword } from '@cygns/validators';
import { RegisterForm } from './RegisterForm';
import { register, login } from '../../store/userActions';
import { createField, getFieldValues, inString, outString, defaultOnChange, defaultOnValidate, defaultOnValidateForm }
  from '../../lib/formkit/formHelpers';

const defaultText = 'Enter profile information';

export class RegisterPageBase extends Component {
  constructor (props, context) {
    super (props, context);
    this.isMatching = this.isMatching.bind (this);
    this.state = {
      fields: {
        email: createField ('email', '', true, [isEmail], 'Your email', inString, outString),
        name: createField ('name', '', true, [], 'Your name', inString, outString),
        password: createField ('password', '', true, [isPassword, this.isMatching], '4 to 20 characters',
          inString, outString),
        verifyPassword: createField ('verifyPassword', '', true, [isPassword, this.isMatching],
          'Re-type your password', inString, outString),
      },
      message: { status: 'info', text: defaultText },
    };

    this.onChange = defaultOnChange.bind (this);
    this.onValidate = this.onValidate.bind (this);
    this.defaultOnValidate = defaultOnValidate.bind (this);
    this.onValidateForm = defaultOnValidateForm.bind (this);
    this.onSubmit = this.onSubmit.bind (this);
  }

  onValidate (field) {
    if ((field.name === 'password') || (field.name === 'verifyPassword')) {
      const err1 = this.defaultOnValidate (this.state.fields.password);
      const err2 = this.defaultOnValidate (this.state.fields.verifyPassword);
      return err1 || err2;
    } else {
      return this.defaultOnValidate (field);
    }
  }

  async onSubmit (event) {
    event.preventDefault ();
    if (this.onValidateForm ()) {
      this.setState ({ message: { status: 'working', text: 'Registering ...' } });
      try {
        const { email, name, password } = getFieldValues (this.state.fields);
        await this.props.dispatch (register (email, name, password));
        try {
          await this.props.dispatch (login (email, password));
          this.props.history.replace ('/');
        } catch (err) {
          this.setState ({ message: { status: 'error', text: 'Registered, but could not login' } });
        }
      } catch (err) {
        this.setState ({ message: { status: 'error', text: 'Error registering, try again' } });
      }
    } else {
      this.setState ({ message: { status: 'error', text: 'Invalid content, check and try again' } });
    }
  }

  isMatching () {
    return this.state.fields.password.value === this.state.fields.verifyPassword.value ? null : 'matching';
  }

  render () {
    return (
      <RegisterForm
        message={this.state.message}
        fields={this.state.fields}
        onChange={this.onChange}
        onValidate={this.onValidate}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export const RegisterPage = connect (null) (RegisterPageBase);

RegisterPageBase.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape ({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};
