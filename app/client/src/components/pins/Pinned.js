import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Masonry } from '@mui/lab';
import { Typography } from '@mui/material';
import { deletePin } from '../../store/appActions';
import { PageContent } from '../util';
import { Pin } from './Pin';

export const Pinned = () => {
  const dispatch = useDispatch ();
  const history = useHistory ();
  const pins = useSelector ((a) => a.pins.filter ((b) => b.pinned));

  return (
    <PageContent>
      { pins.length === 0 && <Typography>Nothing pinned yet.</Typography> }
      { pins.length > 0 && (
        <Masonry columns={{ xs: 2, sm: 4 }} spacing={2}>
          { pins.map ((pin) => (
            <Pin
              key={pin.key}
              authenticated
              editPage
              pin={pin}
              onEditPin={(key) => { history.push (`/edit/${key}`); }}
              onDeletePin={(key) => { dispatch (deletePin (key)); }}
            />
          ))}
        </Masonry>
      )}
    </PageContent>
  );
};
