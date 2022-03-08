import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Typography } from '@mui/material';
import { GenDialog } from '@cygns/muikit';
import { createField, useFields } from '@cygns/use-fields';
import { useGetPinQuery, useUpdatePinMutation } from '../../store/api';
import { PinForm } from './PinForm';

export const UpdatePin = () => {
  const navigate = useNavigate ();
  const [dialog, setDialog] = useState<JSX.Element | undefined> (undefined);
  const [updatePin] = useUpdatePinMutation ();

  const params = useParams ();
  const t = Number (params.key);
  const key = Number.isNaN (t) ? 0 : t;
  const { data: pin, isLoading, isError, isSuccess } = useGetPinQuery ({ key });
  const { fields, onChange, onValidate, getValues, setFields, validateAll } = useFields ([]);

  if (isSuccess && pin && fields.title === undefined) {
    setFields ([
      createField ('url', pin.url, true, []),
      createField ('category', pin.category, true, []),
      createField ('title', pin.title, true, []),
      createField ('text', pin.text, true, []),
    ]);
  }

  const onClose = useCallback (() => {
    setDialog (undefined);
    navigate ('/manage');
  }, [navigate, setDialog]);

  const onSubmit = useCallback (async (e) => {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      setDialog (<GenDialog>Saving new pin...</GenDialog>);
      try {
        const { title, category, text, url } = getValues () as
          { title: string, category: string, text: string, url: string };
        await updatePin ({ key, category, title, text, url });
        setDialog (<GenDialog actions={['Ok']} onClose={onClose}>Pin has been updated</GenDialog>);
      } catch {
        setDialog (<GenDialog actions={['Ok']} onClose={onClose}>Error updating pin</GenDialog>);
      }
    }
    return errors;
  }, [getValues, key, onClose, updatePin, validateAll]);

  return (
    <>
      { !key || isError ? (
        <Typography>Pin not found</Typography>
      ) : isLoading ? (
        <Typography>Loading...</Typography>
      ) : fields.title ? (
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
      ) : null}
      {dialog}
    </>
  );
};
