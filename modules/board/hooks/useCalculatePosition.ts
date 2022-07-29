import { useEffect } from 'react';

import { usePlayers } from '@/common/recoil/players';
import {
  convertIndexToPosition,
  convertPositionToIndex,
} from '@/common/utils/position';

export const useCalculatePosition = (
  dice: number,
  currentPlayerIndex: number
) => {
  const { getPlayer, movePlayer } = usePlayers();

  useEffect(() => {
    if (dice === -1) return;

    const { x, y } = getPlayer(currentPlayerIndex).position;

    const index = convertPositionToIndex({ x, y });
    const newPosition = convertIndexToPosition(index + dice);

    movePlayer(currentPlayerIndex, newPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dice]);
};
