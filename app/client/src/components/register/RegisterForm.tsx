import { Button, Grid, Typography } from '@mui/material';
import { FieldTextInput } from '@cygns/muikit';
import { Field, FieldError } from '@cygns/use-fields';
import { PageContent } from '../util';

type Props = {
  isLoading,
  isError,
  isSuccess,
  isLogin,
  isLoginError,
  fields: {
    email: Field,
    name: Field,
    password: Field,
    verifyPassword: Field,
  },
  onChange: React.ChangeEventHandler,
  onValidate: React.FocusEventHandler,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<FieldError[] | null>,
}

const emailErrors = {
  format: 'Invalid email address',
};
const passwordErrors = {
  format: 'Invalid password',
  length: 'Must be 4+ characters long',
  matching: 'Password and verify password don\'t match',
};

export const RegisterForm = ({
  isLoading, isError, isSuccess, isLogin, isLoginError,
  fields: { email, name, password, verifyPassword },
  onChange, onValidate, onSubmit,
}: Props) => (
  <PageContent>
    <Typography variant='h1' gutterBottom textAlign='center'>Register</Typography>
    <Typography
      paragraph
      textAlign='center'
      color={isError ? '#ff0000' : '#000000'}
    >
      { isLoading ? 'Registering' :
        isError ? 'Error, check entries and retry' :
        isSuccess ? 'Registered successfully' :
        isLogin ? 'Registered, logging in' :
        isLoginError ? 'Registered, but failed to login.' :
        'Enter information' }
    </Typography>
    <form
      noValidate
      onSubmit={async (e) => {
        const errors = await onSubmit (e);
        const el = document.getElementById (errors ? errors[0].name : email.name);
        if (el) { el.focus (); }
      }}
    >
      <Grid container spacing={2} m='0 auto 20px auto' width='300px'>
        <FieldTextInput
          field={email}
          label='Email'
          maxLength={20}
          autoCapitalize='none'
          autoCorrect='off'
          errors={emailErrors}
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldTextInput
          field={name}
          label='Name'
          maxLength={40}
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldTextInput
          field={password}
          label='Password'
          type='password'
          maxLength={20}
          info='4 to 20 characters'
          errors={passwordErrors}
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldTextInput
          field={verifyPassword}
          label='Verify Password'
          type='password'
          maxLength={20}
          info='Re-type your password'
          errors={passwordErrors}
          onChange={onChange}
          onValidate={onValidate}
        />

        <Grid item>
          <Button type='submit'>
            REGISTER
          </Button>
        </Grid>
      </Grid>
    </form>
  </PageContent>
);
