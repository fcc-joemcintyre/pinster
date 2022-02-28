import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@mui/material';
import { FieldTextInput } from '@cygns/muikit';
import { fieldPropTypes } from '@cygns/use-fields';
import { PageContent } from '../util';

const passwordErrors = {
  length: 'Must be 4+ characters',
  format: 'Invalid characters',
};

export const LoginForm = (
  { fields: { email, password }, onChange, onValidate, onSubmit }
) => (
  <PageContent>
    <Typography variant='h1' textAlign='center'>Login</Typography>
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

LoginForm.propTypes = {
  message: PropTypes.shape ({
    status: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.shape ({
    email: PropTypes.shape (fieldPropTypes).isRequired,
    password: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
