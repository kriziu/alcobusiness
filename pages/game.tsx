import { NextPage } from 'next';

import Board from '@/modules/board';
import PlayerList from '@/modules/interface';

const GamePage: NextPage = () => {
  return (
    <div className="flex h-full w-full">
      <div className="flex flex-1 items-center justify-center overflow-hidden pl-24">
        <Board />
      </div>

      <div className="w-1/3">
        <PlayerList />
      </div>
    </div>
  );
};

export default GamePage;
