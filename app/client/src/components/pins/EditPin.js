import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { createField, useFields } from '@cygns/use-fields';
import { Typography } from '@mui/material';
/** @typedef { import ('../../store/configureStore').RootState } RootState */
import { updatePin } from '../../store/appActions';
import { PageContent } from '../util';
import { PinForm } from './PinForm';

export const EditPin = () => {
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  const params = useParams ();
  const t = Number (params.key);
  const key = Number.isNaN (t) ? undefined : t;
  const pin = useSelector ((/** @type RootState */ a) => (key ? a.pins.find ((b) => b.key === key) : undefined));

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
        navigate ('/manage');
      } catch (err) {
        // todo error
      }
    }
  }, [dispatch, getValues, key, navigate, validateAll]);

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
      fields={{
        url: fields.url,
        category: fields.category,
        title: fields.title,
        text: fields.text,
      }}
      onChange={onChange}
      onValidate={onValidate}
      onSubmit={onSubmit}
    />
  );
};
