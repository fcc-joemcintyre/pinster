import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { createField, useFields } from '@cygns/use-fields';
import { isEmail, isPassword } from '@cygns/validators';
import { RegisterForm } from './RegisterForm';
import { useLoginMutation, useRegisterMutation } from '../../store/api';
import { useAppDispatch } from '../../store/hooks';
import { setAuthenticated } from '../../store/userSlice';

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
  const dispatch = useAppDispatch ();
  const navigate = useNavigate ();
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields, [isMatch]);
  const [register, { isLoading, isError, isSuccess }] = useRegisterMutation ();
  const [login, { isLoading: isLogin, isError: isLoginError }] = useLoginMutation ();

  const onSubmit = useCallback (async (e) => {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      const { email, name, password } = getValues () as { email: string, name: string, password: string};
      await register ({ email, name, password });
      const user = await login ({ email, password }).unwrap ();
      await dispatch (setAuthenticated ({ authenticated: true, key: user.key }));
      navigate ('/', { replace: true });
    }
    return errors;
  }, [dispatch, getValues, login, navigate, register, validateAll]);

  return (
    <RegisterForm
      isLoading={isLoading}
      isError={isError}
      isSuccess={isSuccess}
      isLogin={isLogin}
      isLoginError={isLoginError}
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
