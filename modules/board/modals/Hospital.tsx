import { useEffect } from 'react';

import { usePlayers } from '@/common/recoil/players';
import { useModal } from '@/modules/modal';

const Hospital = () => {
  const { currentPlayer, editPlayerNoDrinkTimes } = usePlayers();
  const { closeModal } = useModal();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => editPlayerNoDrinkTimes(currentPlayer, 2), []);

  return (
    <>
      <h1 className="text-lg">Where did you go...</h1>
      <p className="mt-2 text-center text-sm text-zinc-400">
        You will not drink on the next 2 occasions (unless you need money).
      </p>
      <button className="button mt-4 w-full" onClick={closeModal}>
        OK
      </button>
    </>
  );
};

export default Hospital;
