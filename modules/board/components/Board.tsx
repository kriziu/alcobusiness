import { useState } from 'react';

import { usePlayers } from '@/common/recoil/players';

import { useCalculatePosition } from '../hooks/useCalculatePosition';
import { useMoveHandler } from '../hooks/useMoveHandler';
import Dice from './Dice';
import Tile from './Tile';

const Board = () => {
  const { nextPlayer } = usePlayers();

  const [dice, setDice] = useState(0);
  const [doubleDice, setDoubleDice] = useState(false);

  useCalculatePosition(dice);

  useMoveHandler(dice, () => {
    if (!doubleDice) nextPlayer();

    setDice(0);
    setDoubleDice(false);
  });

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
