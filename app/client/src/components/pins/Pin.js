import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';

export const Pin = ({ authenticated, pin, onEditPin, onDeletePin, onTogglePinned, editPage }) => {
  const color = (authenticated && pin.pinned) ? 'red' : 'off';
  const pinImageUri = `${location.origin}/images/pin-${color}-14.png`;
  const pinImage = <img src={pinImageUri} onClick={() => onTogglePinned (pin.key)} />;

  return (
    <Paper>
      <img src={pin.url} fit='cover' style={{ maxHeight: '140px', maxWidth: '100%' }} />
      <Box p='4px'>
        <Typography textAlign='center' paragraph>{pin.title}</Typography>
        <Typography variant='body2'>{pin.text}</Typography>
        <Divider />
        <Typography textAlign='center' mt='6px' mb='4px'>
          {pinImage} {pin.count}
        </Typography>
        <Grid container>
          <Grid item>{pin.category}</Grid>
          <Grid item><Link to={`/pins/${pin.creator}`}>{pin.username}</Link></Grid>
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

Pin.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  pin: PropTypes.shape ({
    key: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    category: PropTypes.string,
    pinned: PropTypes.bool,
    url: PropTypes.string,
    creator: PropTypes.number,
    count: PropTypes.number,
    username: PropTypes.string,
  }).isRequired,
  onEditPin: PropTypes.func,
  onDeletePin: PropTypes.func,
  onTogglePinned: PropTypes.func,
  editPage: PropTypes.bool.isRequired,
};

Pin.defaultProps = {
  onEditPin: null,
  onDeletePin: null,
  onTogglePinned: null,
};
