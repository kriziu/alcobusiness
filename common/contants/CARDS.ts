import { Card, CardType } from '../types';

export const CARDS: Card[] = [
  {
    name: 'You drink 1x.',
    type: CardType.DRINK,
    value: 1,
  },
  {
    name: 'You drink 2x.',
    type: CardType.DRINK,
    value: 2,
  },

  {
    name: 'Everyone is drinking 1x except you.',
    type: CardType.ALL_DRINKS,
    value: -1,
  },
  {
    name: 'Everyone is drinking.',
    type: CardType.ALL_DRINKS,
  },
  {
    name: 'You and persons above and below you on the list are drinking 1x.',
    type: CardType.ALL_DRINKS,
    value: 1,
  },

  {
    name: 'You tell someone to drink 1x.',
    type: CardType.PICK_WHO_DRINKS,
  },

  {
    name: "You do 10 push-ups and drink 1x or don't do any and drink 2x.",
    type: CardType.CHALLENGE,
  },

  {
    name: 'You will not drink on the next 2 occasions (unless you need money).',
    type: CardType.NO_DRINK,
    value: 2,
  },

  {
    name: 'You go to the hospital.',
    type: CardType.MOVE,
    placeIndex: 24,
  },
  {
    name: 'You got caught by the police and go to prison.',
    type: CardType.MOVE,
    placeIndex: 16,
  },
  {
    name: 'You go to city square.',
    type: CardType.MOVE,
    placeIndex: 8,
  },
  {
    name: "You go to McDonald's",
    type: CardType.MOVE,
    placeIndex: 7,
  },
  {
    name: 'You go to club to dance.',
    type: CardType.MOVE,
    placeIndex: 27,
  },
  {
    name: 'You go to the park.',
    type: CardType.MOVE,
    placeIndex: 5,
  },
  {
    name: 'You go to the gas station.',
    type: CardType.MOVE,
    placeIndex: 17,
  },
  {
    name: 'You need some drink so you go to the bar.',
    type: CardType.MOVE,
    placeIndex: 21,
  },
  {
    name: 'You go to the casino to gamble.',
    type: CardType.MOVE,
    placeIndex: 30,
  },
  {
    name: 'You go to play some games.',
    type: CardType.MOVE,
    placeIndex: 15,
  },

  { name: 'You pay $100.', type: CardType.PAY, value: 100 },

  {
    name: 'You pay $50 for everyone who will drink.',
    type: CardType.PAY_WHO_DRINKS,
    value: 50,
  },

  { name: 'You get $100.', type: CardType.GET, value: 100 },

  {
    name: 'You get $100 from everyone, unless they drink 1x.',
    type: CardType.GET_FROM_ALL,
    value: 100,
  },

  {
    name: 'You get $100 for each shot you drink.',
    type: CardType.GET_FROM_DRINK,
    value: 100,
  },
];
