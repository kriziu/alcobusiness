import { useState } from 'react';

import { usePlayers } from '@/common/recoil/players';
import { Card } from '@/common/types';
import { useModal } from '@/modules/modal';

import PlayerSelection from '../components/PlayerSelection';

const PickWhoDrinks = ({ card }: { card: Card }) => {
  const { addDrinkedTimes } = usePlayers();
  const { closeModal } = useModal();

  const [selectedPlayer, setSelectedPlayer] = useState(-1);

  const handleConfirm = () => {
    if (selectedPlayer === -1) return;

    addDrinkedTimes(selectedPlayer, 1);
    closeModal();
  };

  return (
    <>
      <h1 className="text-lg">Karta!</h1>
      <p className="mt-2 text-sm text-zinc-400">{card.name}</p>
      <p className="mt-2 text-sm">Check who drinks</p>
      <PlayerSelection
        selected={[selectedPlayer]}
        single
        handleSelect={(selected) => setSelectedPlayer(selected[0])}
      />
      <button
        className="button w-full"
        onClick={handleConfirm}
        disabled={selectedPlayer === -1}
      >
        Confirm
      </button>
    </>
  );
};

export default PickWhoDrinks;
