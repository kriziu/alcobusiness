import type { Card } from '../types';

export const CARDS: Card[] = [
  {
    name: 'Pijesz 1x.',
    type: 'none',
  },
  {
    name: 'Pijesz 2x.',
    type: 'none',
  },
  {
    name: 'Wszyscy piją oprócz ciebie.',
    type: 'none',
  },
  {
    name: 'Wszyscy piją.',
    type: 'none',
  },
  {
    name: 'Każesz jakiejś osobie wypić 1x.',
    type: 'none',
  },
  {
    name: 'Robisz 10 pompek i pijesz 1x albo ich nie robisz i pijesz 2x.',
    type: 'none',
  },
  {
    name: 'Pijesz 1x ty i osoba po twojej prawej i lewej.',
    type: 'none',
  },
  {
    name: 'Przy 2 następnych okazjach nie pijesz (chyba, że potrzebujesz kasy).',
    type: 'none',
  },

  {
    name: 'Wywieźli cię na pole start.',
    type: 'move',
    placeIndex: 0,
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
  // {
  //   name: 'Płacisz każdemu po $50, który wypije twoje zdrowie.',
  //   type: 'pay',
  //   value: 50,
  // },
  // {
  //   name: 'Najbogatsza osoba płaci $100 najbiedniejszej i pije jej zdrowie.',
  //   type: 'pay',
  //   value: 100,
  // },

  { name: 'Dostajesz $200.', type: 'get', value: 200 },
  // {
  //   name: 'Dostajesz $100 od każdego, chyba że ten wypije 1x.',
  //   type: 'get',
  //   value: 100,
  // },
  // {
  //   name: 'Za każdego wypitego dostajesz po $100 od banku.',
  //   type: 'get',
  //   value: 100,
  // },
];
