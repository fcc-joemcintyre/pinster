import { useNavigate } from 'react-router';
import { Box, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import PinIcon from '@mui/icons-material/PushPin';
import { Pin, useTogglePinMutation } from '../../store/api';

type Props = {
  pin: Pin,
  allowEdit: boolean,
  allowToggle: boolean,
};

export const PinCard = ({
  pin, allowEdit, allowToggle,
}: Props) => {
  const navigate = useNavigate ();
  const [togglePinned] = useTogglePinMutation ();

  return (
    <Paper>
      <img src={pin.url} style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'cover' }} />
      <Box p='4px'>
        <Typography textAlign='center' paragraph>{pin.title}</Typography>
        <Typography variant='body2'>{pin.text}</Typography>
        <Divider />
        { allowToggle && (
          <Typography textAlign='center' mt='6px' mb='4px'>
            <PinIcon
              fontSize='small'
              style={{ transform: 'rotate(0.125turn)' }}
              onClick={() => { togglePinned ({ key: pin.key, action: !pin.pinned }); }}
            />
            {' '}
            {pin.count}
          </Typography>
        )}
        <Grid container justifyContent='space-between'>
          <Grid item>{pin.category}</Grid>
        </Grid>
        { allowEdit && (
          <>
            <Divider sx={{ mb: '4px' }} />
            <Stack direction='row' spacing={2} justifyContent='flex-end'>
              <Button
                size='small'
                onClick={() => { navigate (`/edit/${pin.key}`); }}
              >
                Edit
              </Button>
              <Button
                size='small'
                onClick={() => { navigate (`/delete/${pin.key}`); }}
              >
                Delete
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Paper>
  );
};
