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

const emailErrors = {
  format: 'Not a valid email address',
};
const passwordChars = /[A-Za-z0-9!@#$%^&*-+_=]/;
const passwordErrors = {
  length: 'Must be 4+ characters',
  format: 'Invalid characters',
};

export const LoginForm = ({ message, fields, fields: { email, password }, onChange, onValidate, onSubmit }) => {
  function resetFocus () {
    const id = getFirstError (fields) || email.name;
    const el = document.getElementById (id);
    if (el) {
      el.focus ();
    }
  }

  return (
    <PageContent>
      <H1 center>Login</H1>
      <Row center mb='24px'>
        <MessageText status={message.status}>
          {message.text}
        </MessageText>
      </Row>
      <Form center w='300px' onSubmit={(e) => { onSubmit (e).then (() => { resetFocus (); }); }}>
        <FlexColumn>
          <Field>
            <Label htmlFor={email.name} required={email.required}>Email</Label>
            <FieldInput
              field={email}
              autoFocus
              maxLength={20}
              autoCapitalize='none'
              autoCorrect='off'
              errors={emailErrors}
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
              errors={passwordErrors}
              onChange={onChange}
              onValidate={onValidate}
            />
          </Field>
        </FlexColumn>

        <FlexGroup center mt='20px'>
          <Button type='submit'>
            LOGIN
          </Button>
        </FlexGroup>
      </Form>
    </PageContent>
  );
};

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
