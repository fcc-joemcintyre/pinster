import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Masonry } from '@mui/lab';
import { togglePinned } from '../../store/appActions';
import { Pin } from '../pins';
import { PageContent } from '../util';

export const Home = () => {
  const dispatch = useDispatch ();
  const authenticated = useSelector ((a) => a.user.authenticated);
  const pins = useSelector ((a) => a.pins);

  const onTogglePinned = useCallback ((pin) => {
    dispatch (togglePinned (pin));
  }, [dispatch]);

  return (
    <PageContent>
      <Masonry columns={{ xs: 2, sm: 4 }} spacing={2}>
        { pins.map ((pin) => (
          <Pin
            key={pin._id}
            authenticated={authenticated}
            editPage={false}
            pin={pin}
            onTogglePinned={() => { onTogglePinned (pin); }}
          />
        ))}
      </Masonry>
    </PageContent>
  );
};
