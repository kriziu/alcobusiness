import { useEffect } from 'react';

import { PLACES } from '@/common/contants/PLACES';
import { usePlayers } from '@/common/recoil/players';
import { convertPositionToIndex } from '@/common/utils/position';
import { useModal } from '@/modules/modal';

import AllDrink from '../modals/AllDrink';
import Card from '../modals/Card';
import Hospital from '../modals/Hospital';
import PlaceModal from '../modals/Place';
import Prison from '../modals/Prison';

export const useMoveHandler = (
  dice: number,
  {
    callback,
    prisonCallback,
  }: { callback: () => void; prisonCallback: () => void }
) => {
  const { getCurrentPlayer, players } = usePlayers();
  const { openModal } = useModal();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!dice) return;

      const player = getCurrentPlayer();
      const place = PLACES[convertPositionToIndex(player.position)];

      if (place.type === 'allDrink')
        openModal(<AllDrink />, {
          closeCallback: callback,
          clickToClose: true,
        });

      if (place.type === 'card')
        openModal(<Card />, { closeCallback: callback });

      if (place.type === 'prison')
        openModal(<Prison />, {
          closeCallback: prisonCallback,
          clickToClose: true,
        });

      if (place.type === 'hospital')
        openModal(<Hospital />, {
          closeCallback: callback,
          clickToClose: true,
        });

      if (place.type === 'property' || place.type === 'specialProperty')
        openModal(<PlaceModal {...place} />, { closeCallback: callback });

      if (place.type === 'square' || place.type === 'go') callback();
    }, 900);

    return () => {
      clearTimeout(timeout);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dice, players]);
};
