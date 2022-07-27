import { useEffect, useState } from 'react';

import { useInterval } from 'react-use';

import { usePlayers } from '@/common/recoil/players';

export const useCalculatePosition = (
  dice: number,
  currentPlayerIndex: number
) => {
  const { players } = usePlayers();
  const oldPosition = players[currentPlayerIndex].position;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });

  useEffect(() => setAnimationPosition(oldPosition), [oldPosition]);

  useEffect(() => {
    if (dice === -1) return;

    const { x, y } = oldPosition;

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

    setPosition({ x: newX, y: newY });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dice]);

  const animate =
    (animationPosition.x !== position.x ||
      animationPosition.y !== position.y) &&
    dice !== -1;

  useInterval(
    () => {
      const { x, y } = animationPosition;

      if (y === 0 && x !== 8) {
        setAnimationPosition((prev) => ({ ...prev, x: prev.x + 1 }));
      } else if (y < 8 && x === 8) {
        setAnimationPosition((prev) => ({ ...prev, y: prev.y + 1 }));
      } else if (y === 8 && x !== 0) {
        setAnimationPosition((prev) => ({ ...prev, x: prev.x - 1 }));
      } else if (y > 0 && x === 0) {
        setAnimationPosition((prev) => ({ ...prev, y: prev.y - 1 }));
      }
    },
    animate ? 250 : null
  );

  return animationPosition;
};
