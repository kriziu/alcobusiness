/* eslint-disable import/no-cycle */
import { useEffect } from 'react';

import { usePlayers } from '@/common/recoil/players';
import { useModal } from '@/modules/modal';

const DrinkMoney = ({
  playerIndex,
  haveToPay,
  callback,
  oldCloseCallback,
}: {
  playerIndex: number;
  haveToPay: number;
  callback: () => void;
  oldCloseCallback?: () => void;
}) => {
  const { setModal } = useModal();

  const { getPlayer, addMoneyToPlayer, bankruptPlayer, addDrinkedTimes } =
    usePlayers();

  const player = getPlayer(playerIndex);
  const toDrink = Math.ceil((haveToPay - player.money) / 100);

  const handleDrink = () => {
    addMoneyToPlayer(playerIndex, toDrink * 100);
    addDrinkedTimes(playerIndex, toDrink);

    callback();
  };

  const handleBankrupt = () => {
    setModal({ opened: false, modal: <></> });

    if (oldCloseCallback) oldCloseCallback();
    bankruptPlayer(playerIndex);
  };

  useEffect(() => {
    setModal((prev) => ({ ...prev, closeCallback: handleDrink }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Drink or bankrupt</h1>
      <div className="mt-2 flex gap-1 text-sm">
        <p className="text-zinc-400">Drink {toDrink}x to get</p>
        <p className="text-green-400">${toDrink * 100}</p>
      </div>
      <div className="mt-4 flex w-full gap-2">
        <button className="button-secondary flex-1" onClick={handleBankrupt}>
          Bankrupt
        </button>
        <button className="button flex-1" onClick={handleDrink}>
          Drink
        </button>
      </div>
    </>
  );
};

export default DrinkMoney;
