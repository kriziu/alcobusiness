import type { Place, Player } from '@/common/types';
import { getPlaceIndex } from '@/common/utils/place';

export const placeOwnedBy = (place: Place, players: Player[]) => {
  return players.findIndex((player) =>
    player.placesIds.includes(getPlaceIndex(place))
  );
};
