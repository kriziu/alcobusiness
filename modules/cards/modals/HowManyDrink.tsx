import { useState } from 'react';

import { usePlayers } from '@/common/recoil/players';
import { Card } from '@/common/types';
import { useModal } from '@/modules/modal';

const HowManyDrink = ({ card }: { card: Card }) => {
  const { addDrinkedTimes, currentPlayer, addMoneyToPlayer } = usePlayers();
  const { closeModal } = useModal();

  const [count, setCount] = useState(0);

  const handleConfirm = () => {
    addDrinkedTimes(currentPlayer, count);
    addMoneyToPlayer(currentPlayer, count * (card.value || 0));

    closeModal();
  };

  return (
    <>
      <h1 className="text-lg">Karta!</h1>
      <p className="mt-2 text-sm text-zinc-400">{card.name}</p>
      <p className="mt-2 text-sm">Check how many drink</p>
      <div className="m-5 flex items-center">
        <button
          className="button-secondary h-8 w-8 p-0 text-2xl font-medium"
          onClick={() => setCount((prev) => (prev - 1 < 0 ? 0 : prev - 1))}
        >
          -
        </button>
        <p className="w-10 text-center text-lg">{count}</p>
        <button
          className="button-secondary h-8 w-8 p-0 text-2xl font-medium"
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      <button className="button w-full" onClick={handleConfirm}>
        Confirm
      </button>
    </>
  );
};

export default HowManyDrink;
