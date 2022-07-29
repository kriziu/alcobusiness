import type { NextPage } from 'next';

import Home from '@/modules/home';

const HomePage: NextPage = () => {
  return <Home />;
};

export default HomePage;

// Dodac module do sępienia kasy z ilosci kieliszkow przy bankrucie (jezeli nie da sie zaplacic), uzyc tego w Place gdzie sie placi i w Card
// Dodac karty z placeniem w Card modal
// Dodac "nie pijesz" w kartach i na polach i zeby sie usuwalo z ilosci nie picia
