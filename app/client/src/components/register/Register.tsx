import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createField, useFields } from '@cygns/use-fields';
import { isEmail, isPassword } from '@cygns/validators';
import { RegisterForm } from './RegisterForm';
import { register, login } from '../../store/userActions';

const defaultText = 'Enter registration information';

function isMatch (value, fields) {
  const error = fields.password.value !== fields.verifyPassword.value ? 'matching' : null;
  const result = [
    { name: fields.password.name, error },
    { name: fields.verifyPassword.name, error },
  ];
  return result;
}

const initialFields = [
  createField ('email', '', true, [isEmail]),
  createField ('name', '', true),
  createField ('password', '', true, [isPassword]),
  createField ('verifyPassword', '', true, [isPassword]),
];

export const Register = () => {
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields, [isMatch]);
  const [message, setMessage] = useState ({ status: 'info', text: defaultText });

  const onSubmit = useCallback (async (e) => {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      setMessage ({ status: 'info', text: 'Registering ...' });
      try {
        const { email, name, password } = getValues ();
        await dispatch (register (email, name, password));
        try {
          await dispatch (login (email, password));
          navigate ('/', { replace: true });
        } catch (err) {
          setMessage ({ status: 'error', text: 'Registered, but could not login' });
        }
      } catch (err) {
        setMessage ({ status: 'error', text: 'Error registering, try again' });
      }
    } else {
      setMessage ({ status: 'error', text: 'Invalid content, check and try again' });
    }
    return errors;
  }, [dispatch, getValues, navigate, validateAll]);

  return (
    <RegisterForm
      message={message}
      fields={{
        email: fields.email,
        name: fields.name,
        password: fields.password,
        verifyPassword: fields.verifyPassword,
      }}
      onChange={onChange}
      onValidate={onValidate}
      onSubmit={onSubmit}
    />
  );
};
