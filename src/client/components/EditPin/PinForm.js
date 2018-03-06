import React from 'react';
import PropTypes from 'prop-types';
import { getFirstError } from '../../lib/formkit/formHelpers';
import { fieldPropTypes } from '../../lib/formkit/formPropTypes';
import { PageContent, FlexGroup } from '../../lib/Layout';
import { Heading } from '../../lib/Text';
import { Form } from '../../lib/Form';
import { Field, FieldInput, FieldTextArea } from '../../lib/FieldBordered';
import { Label } from '../../lib/Label';
import { Button } from '../../lib/Button';

export const PinForm = ({ fields, fields: { url, category, title, text }, onChange, onValidate, onSubmit }) => {
  function resetFocus () {
    const id = getFirstError (fields) || url.name;
    const el = document.getElementById (id);
    if (el) {
      el.focus ();
    }
  }

  return (
    <PageContent>
      <Heading center>Add Pin</Heading>
      <Form center w='300px' onSubmit={(e) => { onSubmit (e).then (() => { resetFocus (); }); }}>
        <Field>
          <Label htmlFor={url.name} required={url.required}>URL</Label>
          <FieldInput
            field={url}
            autoFocus
            maxLength={200}
            autoCapitalize='none'
            autoCorrect='off'
            onChange={onChange}
            onValidate={onValidate}
          />
        </Field>
        <Field>
          <Label htmlFor={category.name} required={category.required}>Category</Label>
          <FieldInput
            field={category}
            maxLength={20}
            onChange={onChange}
            onValidate={onValidate}
          />
        </Field>
        <Field>
          <Label htmlFor={title.name} required={title.required}>Title</Label>
          <FieldInput
            field={title}
            maxLength={60}
            onChange={onChange}
            onValidate={onValidate}
          />
        </Field>
        <Field>
          <Label htmlFor={text.name} required={text.required}>Description</Label>
          <FieldTextArea
            field={text}
            rows={5}
            maxLength={512}
            onChange={onChange}
            onValidate={onValidate}
          />
        </Field>
        <FlexGroup center>
          <Button type='submit'>
            Add Pin
          </Button>
        </FlexGroup>
      </Form>
    </PageContent>
  );
};

PinForm.propTypes = {
  fields: PropTypes.shape ({
    url: PropTypes.shape (fieldPropTypes).isRequired,
    category: PropTypes.shape (fieldPropTypes).isRequired,
    title: PropTypes.shape (fieldPropTypes).isRequired,
    text: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
