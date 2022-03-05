import { useCallback } from 'react';
import { Location, useLocation, useNavigate } from 'react-router';
import { createField, useFields } from '@cygns/use-fields';
import { isEmail, isPassword } from '@cygns/validators';
import { LoginForm } from './LoginForm';
import { useLoginMutation } from '../../store/api';
import { useAppDispatch } from '../../store/hooks';
import { setAuthenticated } from '../../store/userSlice';

const initialFields = [
  createField ('email', '', true, [isEmail]),
  createField ('password', '', true, [isPassword]),
];

export const Login = () => {
  const dispatch = useAppDispatch ();
  const navigate = useNavigate ();
  const location = useLocation ();
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields);
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation ();

  const t = location.state as { from: Location };
  const from = t?.from?.pathname || '/';

  const onSubmit = useCallback (async (e) => {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      const { email, password } = getValues () as { email: string, password: string };
      const user = await login ({ email, password }).unwrap ();
      await dispatch (setAuthenticated ({ authenticated: true, key: user.key }));
      navigate (from, { replace: true });
    }
    return errors;
  }, [dispatch, from, getValues, login, navigate, validateAll]);

  return (
    <LoginForm
      isLoading={isLoading}
      isError={isError}
      isSuccess={isSuccess}
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
