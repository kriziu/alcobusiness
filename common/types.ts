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
