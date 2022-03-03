import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createField, useFields } from '@cygns/use-fields';
import { addPin } from '../../store/appActions';
import { PinForm } from './PinForm';

const initialFields = [
  createField ('url', '', true, []),
  createField ('category', '', true, []),
  createField ('title', '', true, []),
  createField ('text', '', true, []),
];

export const AddPin = () => {
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields);

  const onSubmit = useCallback (async (e) => {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      const { url, category, title, text } = getValues ();
      try {
        await dispatch (addPin (category, title, text, url));
        navigate ('/manage');
      } catch (err) {
        // todo error
      }
    }
    return errors;
  }, [dispatch, getValues, navigate, validateAll]);

  return (
    <PinForm
      action='Add'
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
