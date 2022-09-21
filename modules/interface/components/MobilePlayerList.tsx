import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';

import { useShowPlayerList } from '@/common/recoil/showPlayerList';

import PlayerList from './PlayerList';

const MobilePlayerList = () => {
  const { setShowPlayerList, showPlayerList } = useShowPlayerList();

  return (
    <AnimatePresence>
      {showPlayerList && (
        <motion.div
          className="absolute top-0 left-0 h-full w-full overflow-scroll bg-black/80 py-5 backdrop-blur-md"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <button
            className="button-secondary absolute right-5 top-5 rounded-xl p-3 text-lg"
            onClick={() => setShowPlayerList(false)}
          >
            <AiOutlineClose />
          </button>
          <PlayerList />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobilePlayerList;
