import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Box, Button, Stack, Typography } from '@mui/material';
import { GenDialog } from '@cygns/muikit';
import { useDeletePinMutation, useGetPinQuery } from '../../store/api';
import { PageContent } from '../util';

export const DeletePin = () => {
  const navigate = useNavigate ();
  const params = useParams ();
  const t = Number (params.key);
  const key = Number.isNaN (t) ? 0 : t;
  const { data: pin, isLoading, isError } = useGetPinQuery ({ key });
  const [deletePin, { isError: isDeletingError, fulfilledTimeStamp }] = useDeletePinMutation ();
  const [dialog, setDialog] = useState<JSX.Element | undefined> (undefined);

  const onDelete = async () => {
    setDialog (<GenDialog>Deleting pin...</GenDialog>);
    try {
      await deletePin ({ key }).unwrap ();
      setDialog (<GenDialog actions={['Ok']} onClose={onClose}>Pin has been deleted</GenDialog>);
    } catch {
      setDialog (<GenDialog actions={['Ok']} onClose={onClose}>Error deleting pin</GenDialog>);
    }
  };

  const onClose = () => {
    setDialog (undefined);
    navigate ('/manage');
  };

  const onBack = () => {
    navigate ('/manage');
  };

  return (
    <PageContent>
      <Box width='300px' p='10px 10px 20px 10px' m='0 auto'>
        { fulfilledTimeStamp ? (
          null // on completion of delete, just display dialog
        ) : !key || isError ? (
          <Typography>Pin not found</Typography>
        ) : isLoading ? (
          <Typography>Loading...</Typography>
        ) : isDeletingError ? (
          <Typography>Error deleting pin...</Typography>
        ) : (
          <>
            <Typography variant='h1' textAlign='center' gutterBottom>Delete Pin</Typography>
            <Typography paragraph>Title: {pin?.title}</Typography>
            <Typography paragraph>Category: {pin?.category}</Typography>
            <Stack direction='row' spacing={2} alignContent='center'>
              <Button onClick={onDelete}>
                DELETE
              </Button>
              <Button onClick={onBack}>
                CANCEL
              </Button>
            </Stack>
          </>
        )}
      </Box>
      {dialog}
    </PageContent>
  );
};
