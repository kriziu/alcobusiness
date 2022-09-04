import { useState } from 'react';

import { usePlayers } from '@/common/recoil/players';
import { useModal } from '@/modules/modal';

import PlayerSelection from '../components/PlayerSelection';

const PickWhoDrinks = () => {
  const { addDrinkedTimes } = usePlayers();
  const { closeModal } = useModal();

  const [selectedPlayer, setSelectedPlayer] = useState(-1);

  const handleConfirm = () => {
    if (selectedPlayer === -1) return;

    addDrinkedTimes(selectedPlayer, 1);
    closeModal();
  };

  return (
    <div>
      <h1 className="mb-2 text-lg">Pick who drinks</h1>
      <PlayerSelection
        selected={[selectedPlayer]}
        single
        handleSelect={(selected) => setSelectedPlayer(selected[0])}
      />
      <button
        className="button mt-2 w-full"
        onClick={handleConfirm}
        disabled={selectedPlayer === -1}
      >
        Confirm
      </button>
    </div>
  );
};

export default PickWhoDrinks;
