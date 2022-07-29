import { PLACES } from '../contants/PLACES';
import type { Place } from '../types';

export const getPlaceIndex = (place: Place) => {
  return PLACES.findIndex((p) => p.name === place.name);
};
