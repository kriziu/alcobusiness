import { atom } from 'recoil';

import type { Player } from '@/common/types';

export const playersAtom = atom<{ players: Player[]; currentPlayer: number }>({
  key: 'players',
  default: {
    currentPlayer: 0,
    players: [
      {
        layoutId: '0',
        name: 'olej',
        position: {
          x: 0,
          y: 0,
        },
        money: 800,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        noDrinkRounds: 0,
        prisonRounds: 0,
      },
      {
        layoutId: '1',
        name: 'holec',
        position: {
          x: 0,
          y: 0,
        },
        money: 800,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        noDrinkRounds: 0,
        prisonRounds: 2,
      },
      {
        layoutId: '2',
        name: 'walec',
        position: {
          x: 0,
          y: 0,
        },
        money: 800,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        noDrinkRounds: 0,
        prisonRounds: 0,
      },
      {
        layoutId: '4',
        name: 'hohlik',
        position: {
          x: 0,
          y: 0,
        },
        money: 800,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        noDrinkRounds: 0,
        prisonRounds: 0,
      },
      {
        layoutId: '5',
        name: 'chudy',
        position: {
          x: 0,
          y: 0,
        },
        money: 800,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        noDrinkRounds: 0,
        prisonRounds: 0,
      },
      {
        layoutId: '6',
        name: 'sekul',
        position: {
          x: 0,
          y: 0,
        },
        money: 800,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        noDrinkRounds: 0,
        prisonRounds: 0,
      },
      {
        layoutId: '7',
        name: 'tomaczi',
        position: {
          x: 0,
          y: 0,
        },
        money: 800,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        noDrinkRounds: 0,
        prisonRounds: 0,
      },
      {
        layoutId: '8',
        name: 'cmoku',
        position: {
          x: 0,
          y: 0,
        },
        money: 800,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        noDrinkRounds: 0,
        prisonRounds: 0,
      },
      {
        layoutId: '9',
        name: 'steryd',
        position: {
          x: 0,
          y: 0,
        },
        money: 800,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        noDrinkRounds: 0,
        prisonRounds: 0,
      },
      {
        layoutId: '10',
        name: 'dziecielska',
        position: {
          x: 0,
          y: 0,
        },
        money: 800,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        noDrinkRounds: 0,
        prisonRounds: 0,
      },
      {
        layoutId: '11',
        name: 'dusti',
        position: {
          x: 0,
          y: 0,
        },
        money: 800,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        noDrinkRounds: 0,
        prisonRounds: 0,
      },
    ],
  },
  effects: [
    ({ onSet, setSelf }) => {
      onSet((newValue) => {
        const { players, currentPlayer } = newValue;

        if (players[currentPlayer].isBankrupt) {
          setSelf({
            players,
            currentPlayer: (currentPlayer + 1) % players.length,
          });
        }
        if (players[currentPlayer].prisonRounds > 0) {
          const newPlayers = players.map((player, index) => {
            if (index === currentPlayer) {
              return {
                ...player,
                prisonRounds: player.prisonRounds - 1,
              };
            }
            return player;
          });

          setSelf({
            players: newPlayers,
            currentPlayer: (currentPlayer + 1) % players.length,
          });
        }
      });
    },
  ],
});
