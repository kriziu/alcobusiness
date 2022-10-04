import { useEffect } from 'react';

import { usePlayers } from '@/common/recoil/players';
import { Card, CardType } from '@/common/types';
import { convertIndexToPosition } from '@/common/utils/position';
import {
  GetFromAll,
  HowManyDrink,
  PayForDrink,
  PickWhoDrinks,
} from '@/modules/cards';
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

  useEffect(() => {
    switch (card.type) {
      case CardType.PICK_WHO_DRINKS:
        openModal(<PickWhoDrinks card={card} />, {
          closeCallback: modalSettings.closeCallback,
        });
        break;

      case CardType.PAY_WHO_DRINKS:
        openModal(<PayForDrink card={card} />, {
          closeCallback: modalSettings.closeCallback,
        });
        break;

      case CardType.GET_FROM_ALL:
        openModal(<GetFromAll card={card} />, {
          closeCallback: modalSettings.closeCallback,
        });
        break;

      case CardType.GET_FROM_DRINK:
        openModal(<HowManyDrink card={card} />, {
          closeCallback: modalSettings.closeCallback,
        });
        break;

      default:
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      default:
        break;
    }

    if (card.type !== CardType.PAY) closeModal();
  };

  const handleChallenge = (done: boolean) => {
    drinkPlayers([currentPlayer], done ? 1 : 2);

    closeModal();
  };

  return (
    <>
      <h1 className="text-lg">Card!</h1>
      <p className="mt-2 text-center text-sm text-zinc-400">{card.name}</p>

      {card.type === CardType.CHALLENGE && (
        <div className="flex w-full gap-3">
          <button
            className="button mt-4 w-full"
            onClick={() => handleChallenge(true)}
          >
            Done
          </button>
          <button
            className="button-secondary mt-4 w-full"
            onClick={() => handleChallenge(false)}
          >
            Not done
          </button>
        </div>
      )}

      {card.type !== CardType.CHALLENGE && (
        <button className="button mt-4 w-full" onClick={handleClose}>
          OK
        </button>
      )}
    </>
  );
};

export default CardModal;
