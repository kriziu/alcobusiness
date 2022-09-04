export type Player = {
  layoutId: string;
  name: string;
  position: { x: number; y: number };
  money: number;
  placesIds: number[];
  hasLeavePrisonCard: boolean;
  roundsNotDrinking: number;
  isBankrupt: boolean;
  prisonRounds: number;
  drinkedTimes: number;
  noDrinkTimes: number;
};

export enum PlaceType {
  GO,
  SQUARE,
  PRISON,
  HOSPITAL,
  PROPERTY,
  CARD,
  SPECIAL_PROPERTY,
  ALL_DRINKS,
}

export type Place = {
  name: string;
  type: PlaceType;

  price?: number;
};

export enum CardType {
  DRINK,
  ALL_DRINKS,
  PICK_WHO_DRINKS,
  NO_DRINK,
  CHALLENGE,
  PAY,
  PAY_WHO_DRINKS,
  GET,
  GET_FROM_ALL,
  GET_FROM_DRINK,
  MOVE,
}

export type Card = {
  name: string;
  type: CardType;
  value?: number;
  placeIndex?: number;
};
