import { useEffect } from 'react';

import { CARDS } from '@/common/contants/CARDS';
import { PLACES } from '@/common/contants/PLACES';
import { usePlayers } from '@/common/recoil/players';
import { CardType, PlaceType } from '@/common/types';
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
  const { getCurrentPlayer, players } = usePlayers();
  const { openModal } = useModal();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!dice) return;

      const player = getCurrentPlayer();
      const place = PLACES[convertPositionToIndex(player.position)];

      if (place.type === PlaceType.ALL_DRINKS)
        openModal(<AllDrink />, {
          closeCallback: callback,
        });

      if (place.type === PlaceType.CARD) {
        const randomCard = Math.floor(Math.random() * CARDS.length);
        const card = CARDS[randomCard];
        openModal(<CardModal card={card} />, {
          closeCallback: card.type === CardType.MOVE ? undefined : callback,
        });
      }

      if (place.type === PlaceType.PRISON)
        openModal(<Prison />, {
          closeCallback: prisonCallback,
          clickToClose: true,
        });

      if (place.type === PlaceType.HOSPITAL)
        openModal(<Hospital />, {
          closeCallback: callback,
          clickToClose: true,
        });

      if (
        place.type === PlaceType.PROPERTY ||
        place.type === PlaceType.SPECIAL_PROPERTY
      )
        openModal(<PlaceModal {...place} />, { closeCallback: callback });

      if (place.type === PlaceType.SQUARE || place.type === PlaceType.GO)
        callback();
    }, 900);

    return () => {
      clearTimeout(timeout);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dice, players]);
};
