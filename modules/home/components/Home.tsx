import { motion } from 'framer-motion';
import { useList } from 'react-use';

import { useModal } from '@/common/recoil/modal';

import { HomeAnimation } from '../animations/Home.animations';
import type { Player } from '../home.types';
import AreYouSure from '../modals/AreYouSure';
import FillAllPlayers from '../modals/FillAllPlayers';
import Header from './Header';
import Players from './Players';

const Home = () => {
  const [players, playersHandler] = useList<Player>([
    { name: '', id: 0 },
    { name: '', id: 1 },
  ]);

  const { openModal } = useModal();

  const handleStartGame = () => {
    if (players.some((player) => !player.name)) {
      openModal(<FillAllPlayers />);
    } else {
      openModal(
        <AreYouSure
          handleClick={() => {
            console.log('123');
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
