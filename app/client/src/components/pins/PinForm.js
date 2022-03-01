import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from '@cygns/use-fields';
import { FieldTextInput } from '@cygns/muikit';
import { Button, Grid, Typography } from '@mui/material';
import { PageContent } from '../util';

export const PinForm = ({
  action, fields: { url, category, title, text },
  onChange, onValidate, onSubmit,
}) => (
  <PageContent>
    <Typography variant='h1' textAlign='center'>{action} Pin</Typography>
    <form
      noValidate
      onSubmit={async (e) => {
        const errors = await onSubmit (e);
        const el = document.getElementById (errors ? errors[0].name : url.name);
        if (el) { el.focus (); }
      }}
    >
      <Grid container spacing={2} width='300px' p='10px 10px 20px 10px' m='0 auto'>
        <FieldTextInput
          field={url}
          label='Image URL'
          autoFocus
          maxLength={200}
          autoCapitalize='none'
          autoCorrect='off'
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldTextInput
          field={category}
          label='Category'
          maxLength={20}
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldTextInput
          field={title}
          label='Title'
          maxLength={60}
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldTextInput
          field={text}
          label='Description'
          rows={5}
          maxLength={512}
          onChange={onChange}
          onValidate={onValidate}
        />

        <Grid item>
          <Button type='submit'>
            {action} Pin
          </Button>
        </Grid>
      </Grid>
    </form>
  </PageContent>
);

PinForm.propTypes = {
  action: PropTypes.string.isRequired,
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
