import { useEffect } from 'react';

import { usePlayers } from '@/common/recoil/players';
import { useModal } from '@/modules/modal';

const Prison = () => {
  const { editPlayerPrisonRounds, currentPlayer } = usePlayers();
  const { closeModal } = useModal();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => editPlayerPrisonRounds(currentPlayer, 1), []);

  return (
    <>
      <h1 className="text-lg">Złapali cię!</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Siedzisz przez 1 kolejną rundę (picie cię omija).
      </p>
      <button className="button mt-4 w-full" onClick={closeModal}>
        młyn
      </button>
    </>
  );
};

export default Prison;
