import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@mui/material';
import { FieldTextInput } from '@cygns/muikit';
import { fieldPropTypes } from '@cygns/use-fields';
import { PageContent } from '../util';

const emailErrors = {
  format: 'Invalid email address',
};
const passwordErrors = {
  format: 'Invalid password',
  length: 'Must be 4+ characters long',
  matching: 'Password and verify password don\'t match',
};

export const RegisterForm = ({
  message, fields: { email, name, password, verifyPassword },
  onChange, onValidate, onSubmit,
}) => (
  <PageContent>
    <Typography variant='h1' gutterBottom textAlign='center'>Register</Typography>
    <Typography paragraph textAlign='center' color={message.status === 'error' ? '#ff0000' : '#000000'}>
      {message.text}
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

RegisterForm.propTypes = {
  message: PropTypes.shape ({
    status: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.shape ({
    email: PropTypes.shape (fieldPropTypes).isRequired,
    name: PropTypes.shape (fieldPropTypes).isRequired,
    password: PropTypes.shape (fieldPropTypes).isRequired,
    verifyPassword: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
