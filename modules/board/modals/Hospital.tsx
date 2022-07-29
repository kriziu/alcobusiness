import { useEffect } from 'react';

import { usePlayers } from '@/common/recoil/players';
import { useModal } from '@/modules/modal';

const Hospital = () => {
  const { editPlayerRounds, currentPlayer } = usePlayers();
  const { closeModal } = useModal();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => editPlayerRounds(currentPlayer, { noDrinkRounds: 2 }), []);

  return (
    <>
      <h1 className="text-lg">Gdzieś to zalazł...</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Przy 2 następnych okazjach nie pijesz.
      </p>
      <button className="button mt-4 w-full" onClick={closeModal}>
        młyn
      </button>
    </>
  );
};

export default Hospital;
