import { usePlayers } from '@/common/recoil/players';
import type { Card } from '@/common/types';
import { convertIndexToPosition } from '@/common/utils/position';
import { useModal } from '@/modules/modal';

const CardModal = ({ card }: { card: Card }) => {
  const {
    addMoneyToPlayer,
    currentPlayer,
    movePlayer,
    drinkPlayers,
    allDrinks,
    players,
    editPlayerNoDrinkTimes,
  } = usePlayers();
  const { closeModal } = useModal();

  const handleClose = () => {
    if (card.type === 'drink') drinkPlayers([currentPlayer], card.value);
    else if (card.type === 'allDrinks') {
      if (card.value === 0) allDrinks();
      else if (card.value === -1)
        drinkPlayers(
          players
            .filter((_, index) => index !== currentPlayer)
            .map((_, index) => index)
        );
      else if (card.value === 1) {
        let smallerIndex = currentPlayer - 1;
        if (smallerIndex < 0) smallerIndex = players.length - 1;

        let higherIndex = currentPlayer + 1;
        if (higherIndex >= players.length) higherIndex = 0;

        drinkPlayers([smallerIndex, currentPlayer, higherIndex]);
      }
    } else if (card.type === 'noDrink')
      editPlayerNoDrinkTimes(currentPlayer, card.value || 1);
    else if (card.type === 'pay' && card.value)
      addMoneyToPlayer(currentPlayer, -card.value);
    else if (card.type === 'get' && card.value)
      addMoneyToPlayer(currentPlayer, card.value);
    else if (card.type === 'move' && card.placeIndex) {
      movePlayer(currentPlayer, convertIndexToPosition(card.placeIndex));
    }

    closeModal();
  };

  return (
    <>
      <h1 className="text-lg">Karta!</h1>
      <p className="mt-2 text-sm text-zinc-400">{card.name}</p>
      <button className="button mt-4 w-full" onClick={handleClose}>
        młyn
      </button>
    </>
  );
};

export default CardModal;
