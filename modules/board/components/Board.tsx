import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';

import { useModal } from '@/common/recoil/modal';

import { useAnimatePosition } from '../hooks/useAnimatePosition';
import { useCalculatePosition } from '../hooks/useCalculatePosition';
import Dice from './Dice';

const Board = () => {
  const oldPosition = useRef({ x: 0, y: 0 });

  const [dice, setDice] = useState(-1);

  const { openModal } = useModal();

  const position = useCalculatePosition(dice, oldPosition.current);
  oldPosition.current = position;

  const realPosition = useAnimatePosition(position);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (dice === -1) return;

      openModal(<h1>Hello!</h1>);

      setTimeout(() => setDice(-1), 150);
    }, 850);

    return () => {
      clearTimeout(timeout);
    };
  }, [dice, openModal, realPosition]);

  return (
    <div className="relative flex w-min flex-col-reverse justify-between gap-1">
      {Array.from({ length: 9 }).map((_, y) => {
        return (
          <div className="flex flex-row-reverse justify-between gap-1" key={y}>
            {Array.from({ length: 9 }).map((__, x) => {
              if (y > 0 && y < 8 && x !== 0 && x !== 8) return null;

              const left = x === 8 && y !== 0 && y !== 8;
              const right = x === 0 && y !== 0 && y !== 8;
              const bottom = y === 0;
              const top = y === 8;

              let rotate = right ? 90 : 0;
              if (left) rotate = -90;

              return (
                <div
                  className="relative flex h-24 w-24 items-center justify-center rounded-lg bg-zinc-700/40 text-white"
                  key={x}
                >
                  {`${y}-${x}`}
                  {y === realPosition.y && x === realPosition.x && (
                    <motion.p
                      layout
                      layoutId="player"
                      style={{ rotate }}
                      className={`absolute z-10 p-1
                    ${bottom && 'top-full'}
                    ${top && 'bottom-full'}
                    ${left && 'right-full'}
                    ${right && 'left-full'}`}
                    >
                      olej
                    </motion.p>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

      <Dice setDice={setDice} dice={dice} />
    </div>
  );
};

export default Board;
