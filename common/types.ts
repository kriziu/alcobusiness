export type Player = {
  layoutId: string;
  name: string;
  tempPosition: { x: number; y: number };
  position: { x: number; y: number };
  money: number;
  placesIds: string[];
  hasLeavePrisonCard: boolean;
  roundsNotDrinking: number;
  isBankrupt: boolean;
};
