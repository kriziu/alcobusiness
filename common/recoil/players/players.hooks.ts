import { useRecoilState } from 'recoil';

import type { PlayerName } from '@/modules/home/home.types';

import { playersAtom } from './players.atom';

export const usePlayers = () => {
  const [players, setPlayers] = useRecoilState(playersAtom);

  const setupPlayers = (playersNames: PlayerName[]) => {
    const newPlayers = playersNames.map(({ id, name }) => ({
      layoutId: id.toString(),
      name,
      position: {
        x: 0,
        y: 0,
      },
      tempPosition: {
        x: 0,
        y: 0,
      },
      money: 500,
      placesIds: [],
      hasLeavePrisonCard: false,
      roundsNotDrinking: 0,
      isBankrupt: false,
    }));

    setPlayers(newPlayers);
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

    setPlayers(newPlayers);
  };

  return { setupPlayers, movePlayer, players };
};
