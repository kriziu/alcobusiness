import { useModal } from '@/modules/modal';

import DrinkMoney from '../modals/DrinkMoney';

export const useDrinkMoney = () => {
  const { openModal, modalSettings } = useModal();

  const drinkMoneyPlayer = (
    playerIndex: number,
    haveToPay: number,
    callback: () => void
  ) => {
    openModal(
      <DrinkMoney
        playerIndex={playerIndex}
        haveToPay={haveToPay}
        callback={callback}
        oldCloseCallback={modalSettings.closeCallback}
      />
    );
  };

  return { drinkMoneyPlayer };
};
