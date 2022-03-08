import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { GenDialog } from '@cygns/muikit';
import { createField, useFields } from '@cygns/use-fields';
import { useCreatePinMutation } from '../../store/api';
import { PinForm } from './PinForm';

const initialFields = [
  createField ('url', '', true, []),
  createField ('category', '', true, []),
  createField ('title', '', true, []),
  createField ('text', '', true, []),
];

export const CreatePin = () => {
  const navigate = useNavigate ();
  const [dialog, setDialog] = useState<JSX.Element | undefined> (undefined);
  const [createPin] = useCreatePinMutation ();
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields);

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
        await createPin ({ category, title, text, url });
        setDialog (<GenDialog actions={['Ok']} onClose={onClose}>Pin has been created</GenDialog>);
      } catch {
        setDialog (<GenDialog actions={['Ok']} onClose={onClose}>Error creating pin</GenDialog>);
      }
    }
    return errors;
  }, [createPin, getValues, onClose, validateAll]);

  return (
    <>
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
      {dialog}
    </>
  );
};
