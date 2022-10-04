import { useState } from 'react';

import { usePlayers } from '@/common/recoil/players';
import { Card } from '@/common/types';
import { useDrinkMoney } from '@/modules/drinkmoney';
import { useModal } from '@/modules/modal';

import PlayerSelection from '../components/PlayerSelection';

const PayForDrink = ({ card }: { card: Card }) => {
  const { addDrinkedTimes, currentPlayer, getCurrentPlayer, payToPlayer } =
    usePlayers();
  const { closeModal } = useModal();
  const { drinkMoneyPlayer } = useDrinkMoney();

  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);

  const handleConfirm = () => {
    if (!card.value) return;

    const haveToPay = card.value * selectedPlayers.length;

    const removeMoney = () => {
      selectedPlayers.forEach((playerIndex) => {
        addDrinkedTimes(playerIndex, 1);
        payToPlayer({
          payerIndex: currentPlayer,
          receiverIndex: playerIndex,
          amount: card.value!,
        });
      });
      closeModal();
    };

    if (getCurrentPlayer().money < haveToPay)
      drinkMoneyPlayer(currentPlayer, haveToPay, removeMoney);
    else removeMoney();
  };

  return (
    <>
      <h1 className="text-lg">Card!</h1>
      <p className="mt-2 text-sm text-zinc-400">{card.name}</p>
      <p className="mt-2 text-sm">Check who is drinking</p>
      <PlayerSelection
        selected={selectedPlayers}
        handleSelect={(selected) => setSelectedPlayers(selected)}
      />
      <button className="button w-full" onClick={handleConfirm}>
        Confirm
      </button>
    </>
  );
};

export default PayForDrink;
