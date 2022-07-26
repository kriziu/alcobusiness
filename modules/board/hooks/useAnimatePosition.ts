import { useState } from 'react';

import { useInterval } from 'react-use';

export const useAnimatePosition = (position: { x: number; y: number }) => {
  const [realPosition, setRealPosition] = useState({ x: 0, y: 0 });

  const animate =
    realPosition.x !== position.x || realPosition.y !== position.y;

  useInterval(
    () => {
      const { x, y } = realPosition;

      if (y === 0 && x !== 8) {
        setRealPosition((prev) => ({ ...prev, x: prev.x + 1 }));
      } else if (y < 8 && x === 8) {
        setRealPosition((prev) => ({ ...prev, y: prev.y + 1 }));
      } else if (y === 8 && x !== 0) {
        setRealPosition((prev) => ({ ...prev, x: prev.x - 1 }));
      } else if (y > 0 && x === 0) {
        setRealPosition((prev) => ({ ...prev, y: prev.y - 1 }));
      }
    },
    animate ? 250 : null
  );

  return realPosition;
};
