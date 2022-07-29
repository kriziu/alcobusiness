import { useRecoilState } from 'recoil';

import type { PlayerName } from '@/modules/home/home.types';

import { playersAtom } from './players.atom';

export const usePlayers = () => {
  const [{ players, currentPlayer }, setPlayers] = useRecoilState(playersAtom);

  const setupPlayers = (playersNames: PlayerName[]) => {
    const newPlayers = playersNames.map(({ id, name }) => ({
      layoutId: id.toString(),
      name,
      position: {
        x: 0,
        y: 0,
      },
      money: 500,
      placesIds: [],
      hasLeavePrisonCard: false,
      roundsNotDrinking: 0,
      isBankrupt: false,
      noDrinkRounds: 0,
      prisonRounds: 0,
    }));

    setPlayers({ players: newPlayers, currentPlayer: 0 });
  };

  const movePlayer = (
    playerIndex: number,
    newPosition: { x: number; y: number }
  ) => {
    const newPlayers = players.map((player, index) => {
      if (index === playerIndex) {
        return {
          ...player,
          position: newPosition,
        };
      }

      return player;
    });

    setPlayers((prev) => ({ ...prev, players: newPlayers }));
  };

  const getPlayer = (playerIndex: number) => players[playerIndex];

  const getCurrentPlayer = () => players[currentPlayer];

  const nextPlayer = () => {
    setPlayers((prev) => ({
      ...prev,
      currentPlayer: (prev.currentPlayer + 1) % players.length,
    }));
  };

  return {
    setupPlayers,
    movePlayer,
    players,
    getPlayer,
    currentPlayer,
    getCurrentPlayer,
    nextPlayer,
  };
};
