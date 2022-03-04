import { useNavigate } from 'react-router';
import { Masonry } from '@mui/lab';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deletePin } from '../../store/appActions';
import { PageContent } from '../util';
import { PinCard } from './PinCard';

export const Pinned = () => {
  const dispatch = useAppDispatch ();
  const navigate = useNavigate ();
  const pins = useAppSelector ((a) => a.pins.filter ((b) => b.pinned));

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
