import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Masonry } from '@mui/lab';
import { Typography } from '@mui/material';
import { RootState } from '../../store/configureStore';
import { deletePin } from '../../store/appActions';
import { PageContent } from '../util';
import { PinCard } from './PinCard';

export const Pinned = () => {
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  const pins = useSelector ((a: RootState) => a.pins.filter ((b) => b.pinned));

  return (
    <PageContent>
      { pins.length === 0 && <Typography>Nothing pinned yet.</Typography> }
      { pins.length > 0 && (
        <Masonry columns={{ xs: 2, sm: 4 }} spacing={2}>
          { pins.map ((pin) => (
            <PinCard
              key={pin.key}
              authenticated
              editPage
              pin={pin}
              onEditPin={(key) => { navigate (`/edit/${key}`); }}
              onDeletePin={(key) => { dispatch (deletePin (key)); }}
            />
          ))}
        </Masonry>
      )}
    </PageContent>
  );
};
