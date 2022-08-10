import { useEffect } from 'react';

import { CARDS } from '@/common/contants/CARDS';
import { PLACES } from '@/common/contants/PLACES';
import { usePlayers } from '@/common/recoil/players';
import { convertPositionToIndex } from '@/common/utils/position';
import { useModal } from '@/modules/modal';

import AllDrink from '../modals/AllDrink';
import CardModal from '../modals/Card';
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
  const { getCurrentPlayer, players, editPlayerNoDrinkTimes, currentPlayer } =
    usePlayers();
  const { openModal } = useModal();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!dice) return;

      const player = getCurrentPlayer();
      const place = PLACES[convertPositionToIndex(player.position)];

      if (place.type === 'allDrinks')
        openModal(<AllDrink />, {
          closeCallback: callback,
        });

      if (place.type === 'card') {
        const randomCard = Math.floor(Math.random() * CARDS.length);
        const card = CARDS[randomCard];
        openModal(<CardModal card={card} />, {
          closeCallback: card.type === 'move' ? undefined : callback,
        });
      }

      if (place.type === 'prison')
        openModal(<Prison />, {
          closeCallback: prisonCallback,
          clickToClose: true,
        });

      if (place.type === 'hospital')
        openModal(<Hospital />, {
          closeCallback: () => {
            editPlayerNoDrinkTimes(currentPlayer, 2);
            callback();
          },
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
