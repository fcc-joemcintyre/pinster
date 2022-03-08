import { Typography } from '@mui/material';
import { Masonry } from '@mui/lab';
import { useAppSelector } from '../../store/hooks';
import { useGetPinsForPinnerQuery } from '../../store/api';
import { PageContent } from '../util';
import { PinCard } from './PinCard';

export const Pinned = () => {
  const key = useAppSelector ((a) => a.user.key);
  const { data: pins, isLoading } = useGetPinsForPinnerQuery ({ key });
  return (
    <PageContent>
      { isLoading || !pins ? (
        <Typography textAlign='center'>Loading...</Typography>
      ) : pins.length === 0 ? (
        <Typography>Nothing pinned yet.</Typography>
      ) : (
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
