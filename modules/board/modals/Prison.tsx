import { useEffect } from 'react';

import { usePlayers } from '@/common/recoil/players';
import { useModal } from '@/modules/modal';

const Prison = () => {
  const { editPlayerPrisonRounds, currentPlayer, nextPlayer } = usePlayers();
  const { closeModal } = useModal();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => editPlayerPrisonRounds(currentPlayer, 1), []);

  return (
    <>
      <h1 className="text-lg">You got caught!</h1>
      <p className="mt-2 text-center text-sm text-zinc-400">
        You are in jail for 1 round (you will not drink until you get out).
      </p>
      <button
        className="button mt-4 w-full"
        onClick={() => {
          closeModal();
          nextPlayer();
        }}
      >
        OK
      </button>
    </>
  );
};

export default Prison;
