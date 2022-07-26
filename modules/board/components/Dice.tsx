import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
  BsDice1Fill,
  BsDice2Fill,
  BsDice3Fill,
  BsDice4Fill,
  BsDice5Fill,
  BsDice6Fill,
} from 'react-icons/bs';
import { IoDice } from 'react-icons/io5';

const Dice = ({
  dice,
  setDice,
}: {
  dice: number;
  setDice: Dispatch<SetStateAction<number>>;
}) => {
  const [tempDice, setTempDice] = useState(-1);

  useEffect(() => {
    setTempDice(dice);
  }, [dice]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDice(tempDice);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [setDice, tempDice]);

  const handleRollDice = () => {
    if (tempDice === -1)
      for (let i = 0; i < 25; i += 1)
        setTimeout(() => {
          const newDice = Math.floor(Math.random() * 6) + 1;
          setTempDice(newDice);
        }, i * 25);
  };

  return (
    <button
      className="button absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      onClick={handleRollDice}
      style={{ fontSize: tempDice === -1 ? '3.2rem' : '2.4rem' }}
    >
      {tempDice === -1 && <IoDice />}
      {tempDice === 1 && <BsDice1Fill />}
      {tempDice === 2 && <BsDice2Fill />}
      {tempDice === 3 && <BsDice3Fill />}
      {tempDice === 4 && <BsDice4Fill />}
      {tempDice === 5 && <BsDice5Fill />}
      {tempDice === 6 && <BsDice6Fill />}
    </button>
  );
};

export default Dice;
