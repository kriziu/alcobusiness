import { usePlayers } from '@/common/recoil/players';

import PlayerUI from './PlayerUI';

const PlayerList = () => {
  const { players, currentPlayer } = usePlayers();

  return (
    <div className="flex h-full flex-col items-center gap-4 overflow-auto py-16">
      {players.map((player, index) => (
        <PlayerUI
          key={index}
          {...player}
          isCurrentPlayer={currentPlayer === index}
          playerIndex={index}
        />
      ))}
    </div>
  );
};

export default PlayerList;
