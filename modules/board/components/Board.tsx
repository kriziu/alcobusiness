import { useState, useRef, useEffect } from 'react';

import { motion } from 'framer-motion';

import { useMobileMode } from '@/common/recoil/mobileMode';
import { usePlayers } from '@/common/recoil/players';
import { convertMobilePosition } from '@/common/utils/position';

import { useCalculatePosition } from '../hooks/useCalculatePosition';
import { useMoveHandler } from '../hooks/useMoveHandler';
import Dice from './Dice';
import Tile from './Tile';

const Board = () => {
  const { mobileMode } = useMobileMode();
  const { nextPlayer, currentPlayer, getCurrentPlayer } = usePlayers();

  const [dice, setDice] = useState(0);
  const [doubleDice, setDoubleDice] = useState(false);
  const [animateTop, setAnimateTop] = useState(0);

  const tiles = useRef<Map<string, HTMLDivElement>>(new Map());
  const container = useRef<HTMLDivElement>(null);

  useCalculatePosition(dice);

  useMoveHandler(dice, {
    callback: () => {
      if (!doubleDice) nextPlayer();

      setDice(0);
      setDoubleDice(false);
    },
    prisonCallback: () => {
      setDice(0);
      setDoubleDice(false);
    },
  });

  const player = getCurrentPlayer();

  useEffect(() => {
    const { position } = player;

    tiles.current.forEach((ref, positionString) => {
      const { x, y } = convertMobilePosition({
        x: parseInt(positionString[0], 10),
        y: parseInt(positionString.substring(1), 10),
      });

      if (x === position.x && y === position.y)
        setAnimateTop(Math.min(-ref.offsetTop + window.innerHeight / 3, 0));
    });
  }, [player, currentPlayer]);

  if (mobileMode.turned) {
    return (
      <div className="flex h-full w-full flex-col items-center gap-10 lg:flex-row lg:justify-center">
        <div className="hidden w-1/3 justify-end lg:flex">
          <Dice setDice={setDice} dice={dice} setDoubleDice={setDoubleDice} />
        </div>
        <div className="mt-16 flex items-center gap-4 lg:hidden">
          <Dice setDice={setDice} dice={dice} setDoubleDice={setDoubleDice} />
        </div>
        <div className="relative flex h-full w-full flex-1 justify-center overflow-y-hidden lg:h-4/5 lg:w-auto">
          <motion.div
            className="absolute flex gap-16"
            animate={{ top: animateTop }}
            transition={{ duration: 0.7 }}
            ref={container}
          >
            <div>
              {Array.from({ length: 16 }).map((_, y) => {
                return (
                  <Tile
                    x={0}
                    y={y}
                    key={`0${y}`}
                    ref={(ref) => ref && tiles.current.set(`0${y}`, ref)}
                  />
                );
              })}
            </div>

            <div>
              {Array.from({ length: 16 }).map((_, y) => {
                return (
                  <Tile
                    x={1}
                    y={y}
                    key={`1${y}`}
                    ref={(ref) => ref && tiles.current.set(`1${y}`, ref)}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-min flex-col-reverse justify-between gap-1">
      {Array.from({ length: 9 }).map((_, y) => {
        return (
          <div className="flex flex-row-reverse justify-between gap-1" key={y}>
            {Array.from({ length: 9 }).map((__, x) => {
              if (y > 0 && y < 8 && x !== 0 && x !== 8) return null;

              return <Tile x={x} y={y} key={x} />;
            })}
          </div>
        );
      })}

      <Dice setDice={setDice} dice={dice} setDoubleDice={setDoubleDice} />
    </div>
  );
};

export default Board;
