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
    | 'allDrink';

  price?: number;
};
