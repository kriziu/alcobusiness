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

import { useMobileMode } from '@/common/recoil/mobileMode';

const Dice = ({
  dice,
  setDice,
  setDoubleDice,
}: {
  dice: number;
  setDice: Dispatch<SetStateAction<number>>;
  setDoubleDice: Dispatch<SetStateAction<boolean>>;
}) => {
  const { mobileMode } = useMobileMode();

  const [tempDice, setTempDice] = useState(0);
  const [tempDice2, setTempDice2] = useState(0);

  useEffect(() => {
    if (dice === 0) {
      setTempDice(dice);
      setTempDice2(dice);
    }
  }, [dice]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (tempDice === tempDice2 && tempDice !== 0) setDoubleDice(true);
      setDice(tempDice + tempDice2);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [setDice, setDoubleDice, tempDice, tempDice2]);

  const handleRollDice = () => {
    if (!tempDice)
      for (let i = 0; i < 25; i += 1)
        setTimeout(() => {
          const newDice = Math.floor(Math.random() * 6) + 1;
          setTempDice(newDice);

          const newDice2 = Math.floor(Math.random() * 6) + 1;
          setTempDice2(newDice2);
        }, i * 25);
  };

  const renderDice = (basedDice: number) => {
    switch (basedDice) {
      case 1:
        return <BsDice1Fill />;
      case 2:
        return <BsDice2Fill />;
      case 3:
        return <BsDice3Fill />;
      case 4:
        return <BsDice4Fill />;
      case 5:
        return <BsDice5Fill />;
      case 6:
        return <BsDice6Fill />;
      default:
        return <IoDice />;
    }
  };

  const rollDice = (value: number) => {
    setDice(value);
  };

  useEffect(() => {
    // @ts-ignore TODO: REMOVE THIS
    window.rollDice = rollDice;
  }, []);

  return (
    <button
      className={`button flex h-24 items-center justify-center
      ${mobileMode && 'mt-16'}
      ${
        !mobileMode &&
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      }
      ${!tempDice ? 'gap-2' : 'gap-10'}`}
      onClick={handleRollDice}
      style={{ fontSize: !tempDice ? '4rem' : '3rem' }}
    >
      {renderDice(tempDice)}
      {renderDice(tempDice2)}
    </button>
  );
};

export default Dice;
