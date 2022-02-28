import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createField, useFields } from '@cygns/use-fields';
import { isEmail, isPassword } from '@cygns/validators';
import { LoginForm } from './LoginForm';
import { login } from '../../store/userActions';

const defaultText = 'Enter login information';

const initialFields = [
  createField ('email', '', true, [isEmail]),
  createField ('password', '', true, [isPassword]),
];

export const Login = () => {
  const dispatch = useDispatch ();
  const history = useHistory ();
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields);
  const [message, setMessage] = useState ({ status: 'info', text: defaultText });

  const onSubmit = useCallback ((e) => {
    e.preventDefault ();

    const errors = validateAll ();
    if (!errors) {
      setMessage ({ status: 'working', text: 'Logging in' });
      try {
        const { email, password } = getValues ();
        dispatch (login (email, password));
        setMessage ({ status: 'ok', text: 'Logged in' });
        history.replace ('/');
      } catch (err) {
        setMessage ({ status: 'error', text: 'Error logging in' });
      }
    } else {
      setMessage ({ status: 'error', text: 'Complete form and try again' });
    }
  }, [dispatch, getValues, history, validateAll]);

  return (
    <LoginForm
      message={message}
      fields={fields}
      onChange={onChange}
      onValidate={onValidate}
      onSubmit={onSubmit}
    />
  );
};
