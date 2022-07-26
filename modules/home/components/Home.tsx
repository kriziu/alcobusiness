import { motion } from 'framer-motion';
import { useList } from 'react-use';

import type { Player } from '../home.types';
import Header from './Header';
import Players from './Players';

const Home = () => {
  const [players, playersHandler] = useList<Player>([
    { name: '', id: 0 },
    { name: '', id: 1 },
  ]);

  return (
    <div className="my-24 flex flex-col items-center gap-10">
      <Header />
      <Players players={players} playersHandler={playersHandler} />

      <motion.span className="block h-px w-1/2 bg-zinc-800" layout />

      <motion.button
        className="button w-96 transition-none"
        layout
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
      >
        Start
      </motion.button>
    </div>
  );
};

export default Home;
