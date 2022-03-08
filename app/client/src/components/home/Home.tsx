import { Typography } from '@mui/material';
import { Masonry } from '@mui/lab';
import { useGetPinsQuery } from '../../store/api';
import { PinCard } from '../pins';
import { PageContent } from '../util';

export const Home = () => {
  const { data: pins, isLoading } = useGetPinsQuery ();

  return (
    <PageContent>
      { isLoading || !pins ? (
        <Typography textAlign='center'>Loading...</Typography>
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
