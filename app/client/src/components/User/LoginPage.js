import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { isEmail, isPassword } from '@cygns/validators';
import { LoginForm } from './LoginForm';
import { login } from '../../store/userActions';
import { createField, getFieldValues, inString, outString, defaultOnChange, defaultOnValidate, defaultOnValidateForm }
  from '../../lib/formkit/formHelpers';

const defaultText = 'Enter login information';

class LoginPageBase extends Component {
  constructor (props) {
    super (props);
    this.state = {
      fields: {
        email: createField ('email', '', true, [isEmail], 'Your email', inString, outString),
        password: createField ('password', '', true, [isPassword], 'Your password', inString, outString),
      },
      message: { status: 'info', text: defaultText },
      redirectToReferrer: false,
    };

    this.onChange = defaultOnChange.bind (this);
    this.onValidate = defaultOnValidate.bind (this);
    this.onValidateForm = defaultOnValidateForm.bind (this);
    this.onSubmit = this.onSubmit.bind (this);
  }

  async onSubmit (e) {
    e.preventDefault ();
    if (this.onValidateForm ()) {
      this.setState ({ message: { status: 'working', text: 'Logging in' } });
      try {
        const { email, password } = getFieldValues (this.state.fields);
        await this.props.dispatch (login (email, password));
        this.setState ({ message: { status: 'ok', text: 'Logged in' }, redirectToReferrer: true });
      } catch (err) {
        this.setState ({ message: { status: 'error', text: 'Error logging in, check values' } });
      }
    } else {
      this.setState ({ message: { status: 'error', text: 'Complete form and try again' } });
    }
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <LoginForm
        message={this.state.message}
        fields={this.state.fields}
        onChange={this.onChange}
        onValidate={this.onValidate}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export const LoginPage = connect (null) (LoginPageBase);

LoginPageBase.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape ({
    state: PropTypes.shape ({
      from: PropTypes.shape ({}),
    }),
  }).isRequired,
};
