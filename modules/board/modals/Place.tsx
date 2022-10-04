import { PLACES } from '@/common/contants/PLACES';
import { usePlayers } from '@/common/recoil/players';
import { Place, PlaceType } from '@/common/types';
import { getPlaceIndex } from '@/common/utils/place';
import { useModal } from '@/modules/modal';

import { placeOwnedBy } from '../utils/placeOwnedBy';

const PlaceModal = (place: Place) => {
  const {
    players,
    currentPlayer,
    buyPlaceByPlayer,
    addMoneyToPlayer,
    getPlayer,
    payToPlayer,
    bankruptPlayer,
    drinkPlayers,
  } = usePlayers();
  const { closeModal } = useModal();

  const ownedBy = placeOwnedBy(place, players);

  let specialPropertyCount = 0;
  if (ownedBy !== -1)
    specialPropertyCount = getPlayer(ownedBy).placesIds.reduce(
      (prev, placeId) =>
        PLACES[placeId].type === PlaceType.SPECIAL_PROPERTY ? prev + 1 : prev,
      0
    );

  const handlePay = () => {
    payToPlayer(
      {
        payerIndex: currentPlayer,
        receiverIndex: ownedBy,
        amount: 50 * specialPropertyCount,
      },
      closeModal
    );
  };

  const handleObtainMoney = () => {
    closeModal();

    if (place.type === PlaceType.SPECIAL_PROPERTY)
      addMoneyToPlayer(currentPlayer, 50 * specialPropertyCount);
    else addMoneyToPlayer(currentPlayer, place.price || 0);
  };

  const handleBuy = () => {
    buyPlaceByPlayer(
      { playerIndex: currentPlayer, placeId: getPlaceIndex(place) },
      closeModal
    );
  };

  const handleBankrupt = () => {
    closeModal();

    bankruptPlayer(currentPlayer);
  };

  const handleDrink = () => {
    closeModal();

    drinkPlayers([currentPlayer]);
  };

  return (
    <>
      <h1 className="text-lg">{place.name}</h1>
      <div className="mt-2 text-sm text-zinc-400">
        {ownedBy === -1 && (
          <>
            <p>You can buy this place</p>
            <p className="mt-2 text-center text-lg text-green-400">
              ${place.price}
            </p>
          </>
        )}

        {ownedBy !== -1 && ownedBy !== currentPlayer && (
          <>
            <p>Place owned by: {getPlayer(ownedBy).name}</p>
            <p className="mt-2 text-center text-base text-orange-500">
              {place.type === PlaceType.PROPERTY && 'You drink 1x.'}
              {place.type === PlaceType.SPECIAL_PROPERTY &&
                `You pay $${50 * specialPropertyCount}.`}
            </p>
          </>
        )}

        {ownedBy !== -1 && ownedBy === currentPlayer && (
          <>
            <p>Place owned by you</p>
            <p className="mt-2 text-center text-base text-green-400">
              {place.type === PlaceType.PROPERTY && `You get $${place.price}.`}
              {place.type === PlaceType.SPECIAL_PROPERTY &&
                `You get $${50 * specialPropertyCount}.`}
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
          {place.type === PlaceType.PROPERTY && (
            <button className="button mt-4 flex-1" onClick={handleDrink}>
              Drink
            </button>
          )}
          {place.type === PlaceType.SPECIAL_PROPERTY && (
            <button className="button mt-4 flex-1" onClick={handlePay}>
              Pay
            </button>
          )}
        </div>
      )}

      {ownedBy === currentPlayer && (
        <button className="button mt-4 w-full" onClick={handleObtainMoney}>
          Get money
        </button>
      )}
    </>
  );
};

export default PlaceModal;
