import { useEffect } from 'react';

import { usePlayers } from '@/common/recoil/players';
import type { Place } from '@/common/types';
import { getPlaceIndex } from '@/common/utils/place';
import { useDrinkMoney } from '@/modules/drinkmoney';
import { useModal } from '@/modules/modal';

import { placeOwnedBy } from '../utils/placeOwnedBy';

const PlaceModal = (place: Place) => {
  const {
    players,
    currentPlayer,
    getCurrentPlayer,
    buyPlaceByPlayer,
    addMoneyToPlayer,
    getPlayer,
    payToPlayer,
    bankruptPlayer,
  } = usePlayers();
  const { closeModal, modalSettings, setModal } = useModal();
  const { drinkMoneyPlayer } = useDrinkMoney();

  const ownedBy = placeOwnedBy(place, players);

  useEffect(() => {
    if (!place.price) return;

    if (getCurrentPlayer().money < place.price)
      drinkMoneyPlayer(currentPlayer, place.price, () =>
        setModal(modalSettings)
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePay = () => {
    payToPlayer(currentPlayer, ownedBy, 50);
    closeModal();
  };

  const handleObtainMoney = () => {
    if (place.type === 'specialProperty') addMoneyToPlayer(currentPlayer, 50);
    else addMoneyToPlayer(currentPlayer, place.price || 0);

    closeModal();
  };

  const handleBuy = () => {
    if (!place.price || getCurrentPlayer().money < place.price) return;

    buyPlaceByPlayer(currentPlayer, getPlaceIndex(place));

    closeModal();
  };

  const handleBankrupt = () => {
    bankruptPlayer(currentPlayer);

    closeModal();
  };

  return (
    <>
      <h1 className="text-lg">{place.name}</h1>
      <div className="mt-2 text-sm text-zinc-400">
        {ownedBy === -1 && (
          <>
            <p>Możesz kupić to miejsce</p>
            <p className="mt-2 text-center text-lg text-green-400">
              ${place.price}
            </p>
          </>
        )}

        {ownedBy !== -1 && ownedBy !== currentPlayer && (
          <>
            <p>Miejsce kupione przez: {getPlayer(ownedBy).name}</p>
            <p className="mt-2 text-center text-base text-orange-500">
              {place.type === 'property' && 'Pijesz 1x.'}
              {place.type === 'specialProperty' && 'Płacisz $50.'}
            </p>
          </>
        )}

        {ownedBy !== -1 && ownedBy === currentPlayer && (
          <>
            <p>Miejsce kupione przez Ciebie</p>
            <p className="mt-2 text-center text-base text-green-400">
              {place.type === 'property' && `Otrzymujesz $${place.price}.`}
              {place.type === 'specialProperty' && 'Otrzymujesz $50.'}
            </p>
          </>
        )}
      </div>
      {ownedBy === -1 && (
        <div className="flex w-full gap-2">
          <button className="button-secondary mt-4 flex-1" onClick={closeModal}>
            Cancel
          </button>
          <button className="button mt-4 flex-1" onClick={handleBuy}>
            Buy
          </button>
        </div>
      )}

      {ownedBy !== -1 && ownedBy !== currentPlayer && (
        <div className="flex w-full gap-2">
          <button
            className="button-secondary mt-4 flex-1"
            onClick={handleBankrupt}
          >
            Bankrupt
          </button>
          {place.type === 'property' && (
            <button className="button mt-4 flex-1" onClick={closeModal}>
              Drink
            </button>
          )}
          {place.type === 'specialProperty' && (
            <button className="button mt-4 flex-1" onClick={handlePay}>
              Pay
            </button>
          )}
        </div>
      )}

      {ownedBy === currentPlayer && place.type === 'property' && (
        <button className="button mt-4 w-full" onClick={closeModal}>
          essa
        </button>
      )}

      {ownedBy === currentPlayer && place.type === 'specialProperty' && (
        <button className="button mt-4 w-full" onClick={handleObtainMoney}>
          essa
        </button>
      )}
    </>
  );
};

export default PlaceModal;
