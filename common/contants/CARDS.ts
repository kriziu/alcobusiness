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
    name: 'Wywieźli cię na WOLO.',
    type: CardType.MOVE,
    placeIndex: 24,
  },
  {
    name: 'Wywieźli cię na wytrzeźwialke.',
    type: CardType.MOVE,
    placeIndex: 16,
  },
  {
    name: 'Wywieźli cię na ryneczek.',
    type: CardType.MOVE,
    placeIndex: 8,
  },
  {
    name: 'Wywieźli cię na altany.',
    type: CardType.MOVE,
    placeIndex: 3,
  },
  {
    name: 'Wywieźli cię na owsiszcze.',
    type: CardType.MOVE,
    placeIndex: 5,
  },
  {
    name: 'Idziesz do biedry na zakupy',
    type: CardType.MOVE,
    placeIndex: 11,
  },
  {
    name: 'Wywieźli cię na zmyrzlinę.',
    type: CardType.MOVE,
    placeIndex: 13,
  },
  {
    name: 'Zaś do olzy na megok.',
    type: CardType.MOVE,
    placeIndex: 21,
  },
  {
    name: 'Wbijasz na stodołe.',
    type: CardType.MOVE,
    placeIndex: 29,
  },
  {
    name: 'Wbijasz na Akacjową 16.',
    type: CardType.MOVE,
    placeIndex: 31,
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
