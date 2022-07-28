import { atom } from 'recoil';

import type { Player } from '@/common/types';

export const playersAtom = atom<Player[]>({
  key: 'players',
  default: [
    {
      layoutId: '1',
      name: 'olej',
      position: {
        x: 0,
        y: 0,
      },
      money: 500,
      placesIds: [3, 19, 27],
      hasLeavePrisonCard: false,
      roundsNotDrinking: 0,
      isBankrupt: false,
    },
    {
      layoutId: '2',
      name: 'holec',
      position: {
        x: 0,
        y: 0,
      },
      money: 500,
      placesIds: [4, 11],
      hasLeavePrisonCard: false,
      roundsNotDrinking: 0,
      isBankrupt: false,
    },
  ],
});
