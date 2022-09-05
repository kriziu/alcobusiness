import { useEffect, useState } from 'react';

import { usePlayers } from '@/common/recoil/players';
import { Card } from '@/common/types';
import { useModal } from '@/modules/modal';

import PlayerSelection from '../components/PlayerSelection';

const GetFromAll = ({ card }: { card: Card }) => {
  const { addDrinkedTimes, currentPlayer, payToPlayer, players } = usePlayers();
  const { closeModal } = useModal();

  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [disabledPlayers, setDisabledPlayers] = useState<number[]>([]);

  useEffect(() => {
    const disabled = players
      .map((_, index) => index)
      .filter((index) => players[index].money < 100 && index !== currentPlayer);

    setSelectedPlayers(disabled);
    setDisabledPlayers(disabled);
  }, [currentPlayer, players]);

  const handleConfirm = () => {
    players.forEach((_, index) => {
      if (selectedPlayers.includes(index) || currentPlayer === index) return;

      payToPlayer({
        payerIndex: index,
        receiverIndex: currentPlayer,
        amount: card.value || 0,
      });
    });

    selectedPlayers.forEach((index) => addDrinkedTimes(index, 1));

    closeModal();
  };

  return (
    <>
      <h1 className="text-lg">Karta!</h1>
      <p className="mt-2 text-sm text-zinc-400">{card.name}</p>
      <p className="mt-2 text-sm">Check who drinks</p>
      <PlayerSelection
        selected={selectedPlayers}
        handleSelect={(selected) => setSelectedPlayers(selected)}
        disabled={disabledPlayers}
      />
      <button className="button w-full" onClick={handleConfirm}>
        Confirm
      </button>
    </>
  );
};

export default GetFromAll;
