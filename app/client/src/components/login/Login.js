import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
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
  const navigate = useNavigate ();
  const location = useLocation ();
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields);
  const [message, setMessage] = useState ({ status: 'info', text: defaultText });

  const from = location.state?.from?.pathname || '/';

  const onSubmit = useCallback (async (e) => {
    e.preventDefault ();

    const errors = validateAll ();
    if (!errors) {
      setMessage ({ status: 'working', text: 'Logging in' });
      try {
        const { email, password } = getValues ();
        await dispatch (login (email, password));
        setMessage ({ status: 'ok', text: 'Logged in' });
        navigate (from, { replace: true });
      } catch (err) {
        setMessage ({ status: 'error', text: 'Error logging in' });
      }
    } else {
      setMessage ({ status: 'error', text: 'Complete form and try again' });
    }
  }, [dispatch, from, getValues, navigate, validateAll]);

  return (
    <LoginForm
      message={message}
      fields={{
        email: fields.email,
        password: fields.password,
      }}
      onChange={onChange}
      onValidate={onValidate}
      onSubmit={onSubmit}
    />
  );
};
