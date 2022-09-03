import { Card, CardType } from '../types';

export const CARDS: Card[] = [
  {
    name: 'Pijesz 1x.',
    type: CardType.DRINK,
    value: 1,
  },
  {
    name: 'Pijesz 2x.',
    type: CardType.DRINK,
    value: 2,
  },

  {
    name: 'Wszyscy pijom oprócz ciebie.',
    type: CardType.ALL_DRINKS,
    value: -1,
  },
  {
    name: 'Wszyscy pijom',
    type: CardType.ALL_DRINKS,
  },
  {
    name: 'Pijesz 1x ty i osoba pod oraz nad tobą w liście.',
    type: CardType.ALL_DRINKS,
    value: 1,
  },

  {
    name: 'Każesz jakiejś osobie wypić 1x.',
    type: CardType.PICK_WHO_DRINKS, // TODO: implement this
  },

  {
    name: 'Robisz 10 pompek i pijesz 1x albo ich nie robisz i pijesz 2x.',
    type: CardType.CHALLENGE, // TODO: implement this
  },

  {
    name: 'Przy 2 następnych okazjach nie pijesz (chyba, że potrzebujesz kasy).',
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

  { name: 'Płacisz $100.', type: CardType.PAY, value: 100 },

  {
    name: 'Płacisz każdemu po $50, który wypije twoje zdrowie.',
    type: CardType.PAY_WHO_DRINKS, // TODO: implement this
    value: 50,
  },

  {
    name: 'Najbogatsza osoba płaci $100 najbiedniejszej i pije jej zdrowie.',
    type: CardType.PAY_AND_DRINK_RICHEST, // TODO: implement this
    value: 100,
  },

  { name: 'Dostajesz $200.', type: CardType.GET, value: 200 },

  {
    name: 'Dostajesz $100 od każdego, chyba że ten wypije 1x.',
    type: CardType.GET_FROM_ALL, // TODO: implement this
    value: 100,
  },

  {
    name: 'Za każdego wypitego dostajesz po $100 od banku.',
    type: CardType.GET_FROM_DRINK, // TODO: implement this
    value: 100,
  },
];
