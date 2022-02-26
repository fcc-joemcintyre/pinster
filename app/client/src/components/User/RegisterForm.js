import React from 'react';
import PropTypes from 'prop-types';
import { getFirstError } from '../../lib/formkit/formHelpers';
import { fieldPropTypes } from '../../lib/formkit/formPropTypes';
import { PageContent, Row, FlexColumn, FlexGroup } from '../../lib/Layout';
import { Form } from '../../lib/Form';
import { Field } from '../../lib/FieldBordered';
import { FieldFilteredInput, FieldInput } from '../../lib/Field';
import { Label } from '../../lib/Label';
import { H1 } from '../../lib/Text';
import { Button } from '../../lib/Button';
import { MessageText } from '../../lib/MessageText';

const passwordChars = /[A-Za-z0-9!@#$%^&*-+_=]/;
const errors = {
  format: 'Invalid password',
  length: 'Must be 4+ characters long',
  matching: 'Password and verify password don\'t match',
};

export const RegisterForm = ({ message, fields, fields: { email, name, password, verifyPassword },
  onChange, onValidate, onSubmit }) => {
  function resetFocus () {
    const id = getFirstError (fields) || email.name;
    const el = document.getElementById (id);
    if (el) {
      el.focus ();
    }
  }

  return (
    <PageContent>
      <H1 center>Register</H1>
      <Row center mb='24px'>
        <MessageText status={message.status}>
          {message.text}
        </MessageText>
      </Row>
      <Form center w='280px' onSubmit={(e) => { onSubmit (e).then (() => { resetFocus (); }); }}>
        <FlexColumn>
          <Field>
            <Label htmlFor={email.name} required={email.required}>Email</Label>
            <FieldInput
              field={email}
              autoFocus
              maxLength={20}
              autoCapitalize='none'
              autoCorrect='off'
              onChange={onChange}
              onValidate={onValidate}
            />
          </Field>
          <Field>
            <Label htmlFor={name.name} required={name.required}>User name</Label>
            <FieldInput
              field={name}
              maxLength={20}
              autoCapitalize='none'
              autoCorrect='off'
              onChange={onChange}
              onValidate={onValidate}
            />
          </Field>
          <Field>
            <Label htmlFor={password.name} required={password.required}>Password</Label>
            <FieldFilteredInput
              field={password}
              type='password'
              maxLength={20}
              filter={passwordChars}
              errors={errors}
              onChange={onChange}
              onValidate={onValidate}
            />
          </Field>
          <Field>
            <Label htmlFor={verifyPassword.name} required={verifyPassword.required}>Verify Password</Label>
            <FieldFilteredInput
              field={verifyPassword}
              type='password'
              maxLength={20}
              filter={passwordChars}
              errors={errors}
              onChange={onChange}
              onValidate={onValidate}
            />
          </Field>
        </FlexColumn>

        <FlexGroup center mt='20px'>
          <Button type='submit'>
            SAVE
          </Button>
        </FlexGroup>
      </Form>
    </PageContent>
  );
};

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
