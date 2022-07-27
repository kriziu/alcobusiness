import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useList } from 'react-use';

import { useModal } from '@/common/recoil/modal';
import { usePlayers } from '@/common/recoil/players';

import { HomeAnimation } from '../animations/Home.animations';
import type { PlayerName } from '../home.types';
import AreYouSure from '../modals/AreYouSure';
import FillAllPlayers from '../modals/FillAllPlayers';
import Header from './Header';
import Players from './Players';

const Home = () => {
  const { setupPlayers } = usePlayers();

  const [players, playersHandler] = useList<PlayerName>([
    { name: '', id: 0 },
    { name: '', id: 1 },
  ]);

  const router = useRouter();

  const { openModal } = useModal();

  const handleStartGame = () => {
    router.prefetch('/game');

    if (players.some((player) => !player.name)) {
      openModal(<FillAllPlayers />);
    } else {
      openModal(
        <AreYouSure
          handleClick={() => {
            setupPlayers(players);
            router.push('/game');
          }}
        />
      );
    }
  };

  return (
    <motion.div
      className="my-24 flex flex-col items-center gap-10"
      variants={HomeAnimation}
      initial="from"
      animate="to"
    >
      <Header />
      <Players players={players} playersHandler={playersHandler} />

      <motion.span className="block h-px w-4/5 bg-zinc-800 md:w-1/2" layout />

      <motion.button
        className="button w-72 transition-none sm:w-96"
        layout
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        onClick={handleStartGame}
      >
        Start game
      </motion.button>
    </motion.div>
  );
};

export default Home;
