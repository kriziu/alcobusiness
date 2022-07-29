import { NextPage } from 'next';

import Board from '@/modules/board';

const GamePage: NextPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Board />
    </div>
  );
};

export default GamePage;
