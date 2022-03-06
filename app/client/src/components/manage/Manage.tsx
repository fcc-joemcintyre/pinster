import { Masonry } from '@mui/lab';
import { useAppSelector } from '../../store/hooks';
import { PinCard } from '../pins';
import { PageContent } from '../util';
import { AddPin } from './AddPin';

export const Manage = () => {
  const pins = useAppSelector ((a) => a.pins.filter ((b) => b.creator === a.user.key));

  return (
    <PageContent>
      <Masonry columns={{ xs: 2, sm: 4 }} spacing={2}>
        <AddPin />
        { pins.map ((pin) => (
          <PinCard
            key={pin.key}
            pin={pin}
            allowEdit
            allowToggle={false}
          />
        ))}
      </Masonry>
    </PageContent>
  );
};
