import { Box, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { Pin } from '../../store/pins';

type Props = {
  authenticated: boolean,
  pin: Pin,
  onEditPin?: (key) => void,
  onDeletePin?: (key) => void,
  onTogglePinned?: (key) => void,
  editPage: boolean,
};

export const PinCard = ({
  authenticated,
  pin,
  onEditPin = () => { /* no op */ },
  onDeletePin = () => { /* no op */ },
  onTogglePinned = () => { /* no op */ },
  editPage,
}: Props) => {
  const color = (authenticated && pin.pinned) ? 'red' : 'off';
  const pinImageUri = `${location.origin}/images/pin-${color}-14.png`;
  const pinImage = <img src={pinImageUri} onClick={() => onTogglePinned (pin.key)} />;

  return (
    <Paper>
      <img src={pin.url} style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'cover' }} />
      <Box p='4px'>
        <Typography textAlign='center' paragraph>{pin.title}</Typography>
        <Typography variant='body2'>{pin.text}</Typography>
        <Divider />
        <Typography textAlign='center' mt='6px' mb='4px'>
          {pinImage} {pin.count}
        </Typography>
        <Grid container justifyContent='space-between'>
          <Grid item>{pin.category}</Grid>
        </Grid>
        { editPage && (
          <>
            <Divider sx={{ mb: '4px' }} />
            <Stack direction='row' spacing={2} justifyContent='flex-end'>
              <Button size='small' type='button' onClick={() => onEditPin (pin.key)}>Edit</Button>
              <Button size='small' type='button' onClick={() => onDeletePin (pin.key)}>Delete</Button>
            </Stack>
          </>
        )}
      </Box>
    </Paper>
  );
};
