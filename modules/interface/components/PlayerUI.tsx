import { motion } from 'framer-motion';

import { PLACES } from '@/common/contants/PLACES';
import { usePlayers } from '@/common/recoil/players';
import type { Player } from '@/common/types';
import { convertPositionToIndex } from '@/common/utils/position';
import { useModal } from '@/modules/modal';

import BankruptModal from '../modals/bankruptModal';

interface Props extends Player {
  isCurrentPlayer: boolean;
  playerIndex: number;
}

const PlayerUI = ({
  name,
  money,
  placesIds,
  prisonRounds,
  isBankrupt,
  isCurrentPlayer,
  position,
  playerIndex,
  drinkedTimes,
  noDrinkTimes,
}: Props) => {
  const { bankruptPlayer } = usePlayers();
  const { openModal } = useModal();

  if (isBankrupt) {
    return (
      <div className="h-max w-5/6 rounded-xl bg-zinc-800/80 py-5 px-9 text-sm lg:w-4/5 2xl:w-2/3">
        <div className="flex gap-3 text-lg text-red-500 line-through">
          <p className="text-red-500">{name}</p>
          <p className="text-red-500">$0</p>
        </div>
      </div>
    );
  }

  const index = convertPositionToIndex(position);

  return (
    <div className="relative h-max w-5/6 rounded-xl bg-zinc-800/80 p-3 text-sm lg:w-4/5 2xl:w-2/3">
      {isCurrentPlayer && (
        <div className="pointer-events-none absolute top-0 left-0 flex h-full w-full items-center">
          <motion.div
            className="absolute right-full mr-2 h-4 w-4 rounded-full bg-green-500 lg:h-7 lg:w-7"
            layout
            layoutId="current-player-dot"
          ></motion.div>
        </div>
      )}

      <div className="flex items-center justify-between font-bold">
        <div className="flex items-center gap-1 text-lg lg:gap-3">
          <p>{name}</p>
          <p className="text-green-400">${money}</p>
          <p className="text-xs text-yellow-300">{PLACES[index]?.name}</p>
        </div>

        <button
          className="button-secondary text-xs xl:text-base"
          onClick={() =>
            openModal(
              <BankruptModal bankrupt={() => bankruptPlayer(playerIndex)} />,
              { clickToClose: true }
            )
          }
        >
          Bankrupt
        </button>
      </div>

      <div className="text-zinc-400">Drinked times: {drinkedTimes}</div>

      {prisonRounds !== 0 && (
        <div className="mt-1 text-red-500">In prison: {prisonRounds}</div>
      )}

      {noDrinkTimes !== 0 && (
        <div className="mt-1 text-yellow-500">
          No drink times: {noDrinkTimes}
        </div>
      )}

      {placesIds.length !== 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {placesIds.map((placeId) => (
            <p key={placeId} className="rounded-lg bg-red-500/80 py-px px-2">
              {PLACES[placeId].name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerUI;
