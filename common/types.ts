export type Player = {
  layoutId: string;
  name: string;
  position: { x: number; y: number };
  money: number;
  placesIds: string[];
  hasLeavePrisonCard: boolean;
  roundsNotDrinking: number;
  isBankrupt: boolean;
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
