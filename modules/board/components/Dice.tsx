import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
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

let done = false;

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
      done = false;
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
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        setTimeout(() => {
          const newDice = Math.floor(Math.random() * 6) + 1;
          setTempDice(newDice);

          const newDice2 = Math.floor(Math.random() * 6) + 1;
          setTempDice2(newDice2);

          if (i === 24) done = true;
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

  return (
    <motion.button
      className={`button flex h-24 items-center justify-center
      ${
        !mobileMode.turned &&
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      }
      ${!tempDice ? 'gap-2' : 'gap-10'}`}
      onClick={handleRollDice}
      style={{ fontSize: !tempDice ? '4rem' : '3rem' }}
      animate={{
        backgroundImage:
          tempDice === tempDice2 && done
            ? [
                'linear-gradient(45deg, #3fff00, #269900)',
                'linear-gradient(45deg, #269900, #3fff00)',
              ]
            : [
                'linear-gradient(45deg, #f59e0b, #f43f5e)',
                'linear-gradient(45deg, #f59e0b, #f43f5e)',
              ],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    >
      {renderDice(tempDice)}
      {renderDice(tempDice2)}
    </motion.button>
  );
};

export default Dice;
