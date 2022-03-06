import { Masonry } from '@mui/lab';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { PageContent } from '../util';
import { PinCard } from './PinCard';

export const Pinned = () => {
  const pins = useAppSelector ((a) => a.pins.filter ((b) => b.pinned));

  return (
    <PageContent>
      { pins.length === 0 && <Typography>Nothing pinned yet.</Typography> }
      { pins.length > 0 && (
        <Masonry columns={{ xs: 2, sm: 4 }} spacing={2}>
          { pins.map ((pin) => (
            <PinCard
              key={pin.key}
              pin={pin}
              allowEdit={false}
              allowToggle
            />
          ))}
        </Masonry>
      )}
    </PageContent>
  );
};
