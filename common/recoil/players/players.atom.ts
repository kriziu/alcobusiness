import { atom } from 'recoil';

import type { Player } from '@/common/types';
import { convertPositionToIndex } from '@/common/utils/position';

export const playersAtom = atom<{ players: Player[]; currentPlayer: number }>({
  key: 'players',
  default: {
    currentPlayer: 0,
    players: [],
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

        if (players[currentPlayer].prisonRounds === 3) {
          setSelf({
            players: newPlayers.map((player, index) => {
              if (index === currentPlayer)
                return { ...player, prisonRounds: 2 };

              return player;
            }),
            currentPlayer,
          });

          return;
        }

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
                  money: player.money + 50,
                };

              return player;
            }),
          });
      });
    },
  ],
});
