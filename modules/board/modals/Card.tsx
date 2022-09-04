import { usePlayers } from '@/common/recoil/players';
import { Card, CardType } from '@/common/types';
import { convertIndexToPosition } from '@/common/utils/position';
import { PickWhoDrinks } from '@/modules/cards';
import { useModal } from '@/modules/modal';

const CardModal = ({ card }: { card: Card }) => {
  const {
    addMoneyToPlayer,
    payToPlayer,
    currentPlayer,
    movePlayer,
    drinkPlayers,
    allDrinks,
    players,
    editPlayerNoDrinkTimes,
  } = usePlayers();
  const { closeModal, openModal, modalSettings } = useModal();

  const handleClose = () => {
    switch (card.type) {
      case CardType.DRINK:
        drinkPlayers([currentPlayer], card.value);
        break;

      case CardType.ALL_DRINKS:
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
        break;

      case CardType.NO_DRINK:
        editPlayerNoDrinkTimes(currentPlayer, card.value || 1);
        break;

      case CardType.PAY:
        payToPlayer(
          {
            payerIndex: currentPlayer,
            receiverIndex: -1,
            amount: card.value || 0,
          },
          closeModal
        );
        break;

      case CardType.GET:
        addMoneyToPlayer(currentPlayer, card.value || 0);
        break;

      case CardType.MOVE:
        if (card.placeIndex)
          movePlayer(currentPlayer, convertIndexToPosition(card.placeIndex));
        break;

      case CardType.PICK_WHO_DRINKS:
        openModal(<PickWhoDrinks />, {
          closeCallback: modalSettings.closeCallback,
        });
        break;

      default:
        break;
    }

    const customClosingCards = [CardType.PICK_WHO_DRINKS, CardType.PAY];

    if (!customClosingCards.includes(card.type)) closeModal();
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
