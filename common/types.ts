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

export type Place = {
  name: string;
  type:
    | 'go'
    | 'square'
    | 'prison'
    | 'hospital'
    | 'property'
    | 'card'
    | 'specialProperty'
    | 'allDrinks';

  price?: number;
};

export type Card = {
  name: string;
  type:
    | 'drink'
    | 'allDrinks'
    | 'drinkPick'
    | 'noDrink'
    | 'challenge'
    | 'pay'
    | 'payWhoDrinks'
    | 'payAndDrinkRichest'
    | 'get'
    | 'getFromAll'
    | 'getFromDrink'
    | 'move';
  value?: number;
  placeIndex?: number;
};
