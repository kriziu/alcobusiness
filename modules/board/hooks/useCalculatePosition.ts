import { useEffect } from 'react';

import { usePlayers } from '@/common/recoil/players';

export const useCalculatePosition = (
  dice: number,
  currentPlayerIndex: number
) => {
  const { getPlayer, movePlayer } = usePlayers();

  useEffect(() => {
    if (dice === -1) return;

    const { x, y } = getPlayer(currentPlayerIndex).position;

    let newX = x;
    let newY = y;

    if (y === 0) {
      newX = Math.min(x + dice, 8);
      newY = newX === 8 ? dice - (8 - x) : y;
    }
    if (x === 8) {
      newY = Math.min(y + dice, 8);
      newX = newY === 8 ? x - (dice - (newY - y)) : x;
    }
    if (y === 8) {
      newX = Math.max(x - dice, 0);
      newY = newX === 0 ? y - (dice - x) : y;
    }
    if (x === 0) {
      newY = Math.max(y - dice, 0);
      newX = newY === 0 ? dice - y : x;
    }

    movePlayer(currentPlayerIndex, { x: newX, y: newY });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dice]);
};
