import { useCallback } from 'react';
import { Masonry } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { togglePinned } from '../../store/appActions';
import { PinCard } from '../pins';
import { PageContent } from '../util';

export const Home = () => {
  const dispatch = useAppDispatch ();
  const pins = useAppSelector ((a) => a.pins);

  const onTogglePinned = useCallback ((pin) => {
    dispatch (togglePinned (pin));
  }, [dispatch]);

  return (
    <PageContent>
      <Masonry columns={{ xs: 2, sm: 4 }} spacing={2}>
        { pins.map ((pin) => (
          <PinCard
            key={pin._id}
            editPage={false}
            pin={pin}
            onTogglePinned={() => { onTogglePinned (pin); }}
          />
        ))}
      </Masonry>
    </PageContent>
  );
};
