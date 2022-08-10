import type { Card } from '../types';

export const CARDS: Card[] = [
  {
    name: 'Pijesz 1x.',
    type: 'drink',
    value: 1,
  },
  {
    name: 'Pijesz 2x.',
    type: 'drink',
    value: 2,
  },

  {
    name: 'Wszyscy pijom oprócz ciebie.',
    type: 'allDrinks',
    value: -1,
  },
  {
    name: 'Wszyscy pijom',
    type: 'allDrinks',
  },
  {
    name: 'Pijesz 1x ty i osoba pod oraz nad tobą w liście.',
    type: 'allDrinks',
    value: 1,
  },

  {
    name: 'Każesz jakiejś osobie wypić 1x.',
    type: 'drinkPick', // TODO: implement this
  },

  {
    name: 'Robisz 10 pompek i pijesz 1x albo ich nie robisz i pijesz 2x.',
    type: 'challenge', // TODO: implement this
  },

  {
    name: 'Przy 2 następnych okazjach nie pijesz (chyba, że potrzebujesz kasy).',
    type: 'noDrink',
    value: 2,
  },

  {
    name: 'Wywieźli cię na WOLO.',
    type: 'move',
    placeIndex: 24,
  },
  {
    name: 'Wywieźli cię na wytrzeźwialke.',
    type: 'move',
    placeIndex: 16,
  },
  {
    name: 'Wywieźli cię na ryneczek.',
    type: 'move',
    placeIndex: 8,
  },
  {
    name: 'Wywieźli cię na altany.',
    type: 'move',
    placeIndex: 3,
  },
  {
    name: 'Wywieźli cię na owsiszcze.',
    type: 'move',
    placeIndex: 5,
  },
  {
    name: 'Idziesz do biedry na zakupy',
    type: 'move',
    placeIndex: 11,
  },
  {
    name: 'Wywieźli cię na zmyrzlinę.',
    type: 'move',
    placeIndex: 13,
  },
  {
    name: 'Zaś do olzy na megok.',
    type: 'move',
    placeIndex: 21,
  },
  {
    name: 'Wbijasz na stodołe.',
    type: 'move',
    placeIndex: 29,
  },
  {
    name: 'Wbijasz na Akacjową 16.',
    type: 'move',
    placeIndex: 31,
  },

  { name: 'Płacisz $100.', type: 'pay', value: 100 },

  {
    name: 'Płacisz każdemu po $50, który wypije twoje zdrowie.',
    type: 'payWhoDrinks', // TODO: implement this
    value: 50,
  },

  {
    name: 'Najbogatsza osoba płaci $100 najbiedniejszej i pije jej zdrowie.',
    type: 'payAndDrinkRichest', // TODO: implement this
    value: 100,
  },

  { name: 'Dostajesz $200.', type: 'get', value: 200 },

  {
    name: 'Dostajesz $100 od każdego, chyba że ten wypije 1x.',
    type: 'getFromAll', // TODO: implement this
    value: 100,
  },

  {
    name: 'Za każdego wypitego dostajesz po $100 od banku.',
    type: 'getFromDrink', // TODO: implement this
    value: 100,
  },
];
