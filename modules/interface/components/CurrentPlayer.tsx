import { PLACES } from '@/common/contants/PLACES';
import { usePlayers } from '@/common/recoil/players';
import { convertPositionToIndex } from '@/common/utils/position';

const CurrentPlayer = () => {
  const { bankruptPlayer, getCurrentPlayer, currentPlayer } = usePlayers();
  const { position, money, drinkedTimes, noDrinkTimes } = getCurrentPlayer();

  const index = convertPositionToIndex(position);

  return (
    <div className="absolute top-3 left-0 flex w-screen items-center justify-around gap-1 px-1 sm:justify-center sm:gap-4 ">
      <p className="text-green-400">${money}</p>
      <p className="text-xs text-yellow-300">{PLACES[index]?.name}</p>

      <div className="w-14 text-xs text-zinc-400">
        Drinked times: {drinkedTimes}
      </div>

      {noDrinkTimes !== 0 && (
        <div className="w-14 text-xs text-yellow-500">
          No drink times: {noDrinkTimes}
        </div>
      )}

      <button
        className="button-secondary text-xs xl:text-base"
        onClick={() => bankruptPlayer(currentPlayer)}
      >
        Bankrupt
      </button>
    </div>
  );
};

export default CurrentPlayer;
