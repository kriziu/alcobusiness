import { usePlayers } from '@/common/recoil/players';
import type { Card } from '@/common/types';
import { convertIndexToPosition } from '@/common/utils/position';
import { useModal } from '@/modules/modal';

const CardModal = ({ card }: { card: Card }) => {
  const { addMoneyToPlayer, currentPlayer, movePlayer } = usePlayers();
  const { closeModal } = useModal();

  const handleClose = () => {
    if (card.type === 'pay' && card.value)
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
