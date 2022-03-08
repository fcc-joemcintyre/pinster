import { Typography } from '@mui/material';
import { Masonry } from '@mui/lab';
import { useAppSelector } from '../../store/hooks';
import { useGetPinsForCreatorQuery } from '../../store/api';
import { PinCard } from '../pins';
import { PageContent } from '../util';
import { AddPin } from './AddPin';

export const Manage = () => {
  const key = useAppSelector ((a) => a.user.key);
  const { data: pins, isLoading } = useGetPinsForCreatorQuery ({ key });

  return (
    <PageContent>
      { isLoading || !pins ? (
        <Typography textAlign='center'>Loading...</Typography>
      ) : (
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
      )}
    </PageContent>
  );
};
