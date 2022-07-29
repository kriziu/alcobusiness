import { useEffect } from 'react';

import { usePlayers } from '@/common/recoil/players';
import {
  convertIndexToPosition,
  convertPositionToIndex,
} from '@/common/utils/position';

export const useCalculatePosition = (dice: number) => {
  const { getCurrentPlayer, movePlayer, currentPlayer } = usePlayers();

  useEffect(() => {
    if (!dice) return;

    const { x, y } = getCurrentPlayer().position;

    const index = convertPositionToIndex({ x, y });
    const newPosition = convertIndexToPosition(index + dice);

    movePlayer(currentPlayer, newPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dice]);
};
