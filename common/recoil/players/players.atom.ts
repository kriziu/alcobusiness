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
        money: 40,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        prisonRounds: 0,
      },
      {
        layoutId: '1',
        name: 'holec',
        position: {
          x: 0,
          y: 0,
        },
        money: 40,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        prisonRounds: 2,
      },
      {
        layoutId: '2',
        name: 'walec',
        position: {
          x: 0,
          y: 0,
        },
        money: 40,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: true,
        prisonRounds: 0,
      },
      {
        layoutId: '4',
        name: 'hohlik',
        position: {
          x: 0,
          y: 0,
        },
        money: 40,
        placesIds: [],
        hasLeavePrisonCard: false,
        roundsNotDrinking: 0,
        isBankrupt: false,
        prisonRounds: 2,
      },
    ],
  },
  effects: [
    ({ onSet, setSelf }) => {
      onSet((newValue) => {
        const { players, currentPlayer } = newValue;

        let newIndex = currentPlayer;
        let newPlayers = players;

        const incrementToNextPlayer = (index: number): number => {
          if (
            newPlayers[index].isBankrupt ||
            newPlayers[index].prisonRounds > 0
          ) {
            if (newPlayers[index].prisonRounds > 0)
              newPlayers = newPlayers.map((player, playerIndex) => {
                if (playerIndex === index)
                  return { ...player, prisonRounds: player.prisonRounds - 1 };

                return player;
              });

            return incrementToNextPlayer((index + 1) % newPlayers.length);
          }

          return index;
        };

        if (
          players[currentPlayer].isBankrupt ||
          players[currentPlayer].prisonRounds > 0
        )
          newIndex = incrementToNextPlayer(currentPlayer);

        setSelf({
          players: newPlayers,
          currentPlayer: newIndex,
        });
      });
    },
  ],
});
