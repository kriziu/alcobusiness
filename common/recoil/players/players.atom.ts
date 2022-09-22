import { atom } from 'recoil';

import type { Player } from '@/common/types';
import { convertPositionToIndex } from '@/common/utils/position';

export const playersAtom = atom<{ players: Player[]; currentPlayer: number }>({
  key: 'players',
  default: {
    currentPlayer: 0,
    players: [
      // {
      //   layoutId: '0',
      //   name: 'tomaczi',
      //   position: {
      //     x: 0,
      //     y: 0,
      //   },
      //   money: 50,
      //   placesIds: [],
      //   hasLeavePrisonCard: false,
      //   roundsNotDrinking: 0,
      //   isBankrupt: false,
      //   noDrinkTimes: 0,
      //   prisonRounds: 0,
      //   drinkedTimes: 0,
      // },
      // {
      //   layoutId: '1',
      //   name: '2',
      //   position: {
      //     x: 0,
      //     y: 0,
      //   },
      //   money: 150,
      //   placesIds: [],
      //   hasLeavePrisonCard: false,
      //   roundsNotDrinking: 0,
      //   isBankrupt: false,
      //   noDrinkTimes: 0,
      //   prisonRounds: 0,
      //   drinkedTimes: 0,
      // },
      // {
      //   layoutId: '2',
      //   name: '3',
      //   position: {
      //     x: 0,
      //     y: 0,
      //   },
      //   money: 50,
      //   placesIds: [],
      //   hasLeavePrisonCard: false,
      //   roundsNotDrinking: 0,
      //   isBankrupt: false,
      //   noDrinkTimes: 0,
      //   prisonRounds: 0,
      //   drinkedTimes: 0,
      // },
    ],
  },
  effects: [
    ({ onSet, setSelf }) => {
      onSet((newValue) => {
        const { players, currentPlayer } = newValue;

        let newIndex = currentPlayer;
        let newPlayers = players;

        const incrementToNextPlayer = (index: number): number => {
          if (newPlayers[index].isBankrupt || newPlayers[index].prisonRounds) {
            if (newPlayers[index].prisonRounds)
              newPlayers = newPlayers.map((player, playerIndex) => {
                if (playerIndex === index)
                  return { ...player, prisonRounds: 0 };

                return player;
              });

            return incrementToNextPlayer((index + 1) % newPlayers.length);
          }

          return index;
        };

        if (players[currentPlayer].prisonRounds === 2)
          newPlayers = newPlayers.map((player, index) => {
            if (index === currentPlayer) return { ...player, prisonRounds: 1 };
            return player;
          });
        else if (
          players[currentPlayer].isBankrupt ||
          players[currentPlayer].prisonRounds
        )
          newIndex = incrementToNextPlayer(currentPlayer);

        setSelf({
          players: newPlayers,
          currentPlayer: newIndex,
        });
      });
    },
    ({ onSet, setSelf }) => {
      onSet((newValue, old) => {
        const oldValue = old as { players: Player[]; currentPlayer: number };

        if (oldValue.players.length === 0) return;

        const oldPlayer = oldValue.players[newValue.currentPlayer];
        const newPlayer = newValue.players[newValue.currentPlayer];

        const oldIndex = convertPositionToIndex(oldPlayer.position);
        const newIndex = convertPositionToIndex(newPlayer.position);

        if (newIndex < oldIndex)
          setSelf({
            ...newValue,
            players: newValue.players.map((player, index) => {
              if (index === newValue.currentPlayer)
                return {
                  ...player,
                  money: player.money + 100,
                };

              return player;
            }),
          });
      });
    },
  ],
});
