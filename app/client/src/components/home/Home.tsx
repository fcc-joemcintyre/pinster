import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Masonry } from '@mui/lab';
import { RootState } from '../../store/configureStore';
import { togglePinned } from '../../store/appActions';
import { PinCard } from '../pins';
import { PageContent } from '../util';

export const Home = () => {
  const dispatch = useDispatch ();
  const authenticated = useSelector ((a: RootState) => a.user.authenticated);
  const pins = useSelector ((a: RootState) => a.pins);

  const onTogglePinned = useCallback ((pin) => {
    dispatch (togglePinned (pin));
  }, [dispatch]);

  return (
    <PageContent>
      <Masonry columns={{ xs: 2, sm: 4 }} spacing={2}>
        { pins.map ((pin) => (
          <PinCard
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
