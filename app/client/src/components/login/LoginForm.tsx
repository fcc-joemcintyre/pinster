import { Button, Grid, Typography } from '@mui/material';
import { FieldTextInput } from '@cygns/muikit';
import { Field, FieldError } from '@cygns/use-fields';
import { PageContent } from '../util';

type Props = {
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  fields: {
    email: Field,
    password: Field,
  },
  onChange: React.ChangeEventHandler,
  onValidate: React.FocusEventHandler,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<FieldError[] | null>,
}

const passwordErrors = {
  length: 'Must be 4+ characters',
  format: 'Invalid characters',
};

export const LoginForm = ({
  isLoading, isError, isSuccess,
  fields: { email, password },
  onChange, onValidate, onSubmit,
}: Props) => (
  <PageContent>
    <Typography variant='h1' textAlign='center'>Login</Typography>
    <Typography
      paragraph
      textAlign='center'
      color={isError ? '#ff0000' : '#000000'}
    >
      { isLoading ? 'Logging in...' :
        isError ? 'Error, check entries and retry' :
        isSuccess ? 'Logged in' :
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
      <Grid container spacing={2} width='300px' p='10px 10px 20px 10px' m='0 auto'>
        <FieldTextInput
          field={email}
          label='Email'
          autoCapitalize='none'
          autoCorrect='off'
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldTextInput
          type='password'
          field={password}
          label='Password'
          maxLength={20}
          info='Your password'
          errors={passwordErrors}
          onChange={onChange}
          onValidate={onValidate}
        />

        <Grid item>
          <Button type='submit'>
            LOGIN
          </Button>
        </Grid>
      </Grid>
    </form>
  </PageContent>
);
