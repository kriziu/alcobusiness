import { useRef } from 'react';

export const useCalculatePosition = (
  dice: number,
  position: { x: number; y: number }
) => {
  const oldDice = useRef(-1);

  if (dice === -1 || oldDice.current === dice) {
    oldDice.current = dice;

    return position;
  }

  oldDice.current = dice;

  const { x, y } = position;

  if (y === 0) {
    const newX = Math.min(x + dice, 8);
    const newY = newX === 8 ? dice - (8 - x) : y;

    return { x: newX, y: newY };
  }
  if (x === 8) {
    const newY = Math.min(y + dice, 8);
    const newX = newY === 8 ? x - (dice - (newY - y)) : x;

    return { x: newX, y: newY };
  }
  if (y === 8) {
    const newX = Math.max(x - dice, 0);
    const newY = newX === 0 ? y - (dice - x) : y;

    return { x: newX, y: newY };
  }
  if (x === 0) {
    const newY = Math.max(y - dice, 0);
    const newX = newY === 0 ? dice - y : x;

    return { x: newX, y: newY };
  }

  return position;
};
