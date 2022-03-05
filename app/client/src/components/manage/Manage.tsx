import { useNavigate } from 'react-router';
import { Masonry } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deletePin } from '../../store/appActions';
import { PinCard } from '../pins';
import { PageContent } from '../util';
import { AddPin } from './AddPin';

export const Manage = () => {
  const dispatch = useAppDispatch ();
  const navigate = useNavigate ();
  const pins = useAppSelector ((a) => a.pins.filter ((b) => b.creator === a.user.key));

  return (
    <PageContent>
      <Masonry columns={{ xs: 2, sm: 4 }} spacing={2}>
        <AddPin />
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
    </PageContent>
  );
};
