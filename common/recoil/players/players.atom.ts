import { atom } from 'recoil';

import type { Player } from '@/common/types';

export const playersAtom = atom<Player[]>({
  key: 'players',
  default: [
    {
      layoutId: '1',
      name: '1',
      position: {
        x: 0,
        y: 0,
      },
      money: 500,
      placesIds: [],
      hasLeavePrisonCard: false,
      roundsNotDrinking: 0,
      isBankrupt: false,
    },
    {
      layoutId: '2',
      name: '2',
      position: {
        x: 0,
        y: 0,
      },
      money: 500,
      placesIds: [],
      hasLeavePrisonCard: false,
      roundsNotDrinking: 0,
      isBankrupt: false,
    },
  ],
});
