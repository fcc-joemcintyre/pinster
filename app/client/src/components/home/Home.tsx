import { Masonry } from '@mui/lab';
import { useAppSelector } from '../../store/hooks';
import { PinCard } from '../pins';
import { PageContent } from '../util';

export const Home = () => {
  const pins = useAppSelector ((a) => a.pins);

  return (
    <PageContent>
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
    </PageContent>
  );
};
