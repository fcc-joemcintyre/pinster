import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { createField, useFields } from '@cygns/use-fields';
import { Typography } from '@mui/material';
import { updatePin } from '../../store/appActions';
import { PageContent } from '../util';
import { PinForm } from './PinForm';

export const EditPin = () => {
  const dispatch = useDispatch ();
  const history = useHistory ();
  const params = useParams ();
  const t = Number (params.key);
  const key = Number.isNaN (t) ? undefined : t;
  const pin = useSelector ((a) => (key ? a.pins.find ((b) => b.key === key) : undefined));

  const initialFields = !pin ? [] : [
    createField ('url', pin.url, true, []),
    createField ('category', pin.category, true, []),
    createField ('title', pin.title, true, []),
    createField ('text', pin.text, true, []),
  ];

  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields);

  const onSubmit = useCallback (async (e) => {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      const { url, category, title, text } = getValues ();
      try {
        await dispatch (updatePin (key, category, title, text, url));
        history.push ('/manage');
      } catch (err) {
        // todo error
      }
    }
  }, [dispatch, getValues, key, validateAll]);

  if (!key || !pin) {
    return (
      <PageContent>
        <Typography>Pin not found</Typography>
      </PageContent>
    );
  }

  return (
    <PinForm
      action='Edit'
      fields={fields}
      onChange={onChange}
      onValidate={onValidate}
      onSubmit={onSubmit}
    />
  );
};
