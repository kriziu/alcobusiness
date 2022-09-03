import { motion } from 'framer-motion';

import { PLACES } from '@/common/contants/PLACES';
import { usePlayers } from '@/common/recoil/players';
import { PlaceType } from '@/common/types';
import { convertPositionToIndex } from '@/common/utils/position';

const Tile = ({ x, y }: { x: number; y: number }) => {
  const { players } = usePlayers();

  const leftSide = x === 8 && y !== 0 && y !== 8;
  const rightSide = x === 0 && y !== 0 && y !== 8;
  const bottomSide = y === 0;
  const topSide = y === 8;

  const posIndex = convertPositionToIndex({ x, y });

  const place = PLACES[posIndex];
  const { name, type, price } = place;

  const playersOnTile = players.filter(
    (player) => player.position.x === x && player.position.y === y
  );

  const ownedBy = players.find((player) => player.placesIds.includes(posIndex));

  return (
    <div
      className={`relative flex h-[4.9vw] w-[4.9vw] flex-col items-center justify-center gap-2 rounded-lg text-[.63vw] text-white
      ${type === PlaceType.PROPERTY && 'bg-zinc-700/60'}
      ${type === PlaceType.CARD && 'bg-blue-600/60'}
      ${type === PlaceType.SPECIAL_PROPERTY && 'bg-zinc-400/60'}
      ${type === PlaceType.ALL_DRINKS && 'bg-green-600/60'}
      ${type === PlaceType.SQUARE && 'bg-purple-600/60'}
      ${type === PlaceType.PRISON && 'bg-red-600/60'}
      ${type === PlaceType.HOSPITAL && 'bg-yellow-600/60'}
      ${type === PlaceType.GO && 'bg-cyan-400/60'}`}
      key={x}
    >
      <p className="w-min text-center">{name}</p>
      <p className="text-green-300">{price && `${price}$`}</p>

      {ownedBy && (
        <motion.p
          style={{
            writingMode: leftSide || rightSide ? 'vertical-lr' : 'initial',
            rotate: rightSide ? 180 : 0,
          }}
          className={`absolute text-violet-400
          ${leftSide && 'left-[105%]'}
          ${rightSide && 'right-[105%]'}
          ${bottomSide && 'bottom-[105%]'}
          ${topSide && 'top-[105%]'}`}
          transition={{ duration: 0.7 }}
        >
          {ownedBy.name}
        </motion.p>
      )}

      {playersOnTile.map((player, index) => {
        const top = bottomSide ? `${105 + index * 20}%` : undefined;
        const bottom = topSide ? `${105 + index * 20}%` : undefined;
        const left = rightSide ? `${105 + index * 20}%` : undefined;
        const right = leftSide ? `${105 + index * 20}%` : undefined;

        if (player.isBankrupt) return null;

        return (
          <motion.p
            key={player.layoutId}
            layout
            layoutId={player.layoutId}
            style={{
              top,
              bottom,
              left,
              right,
              writingMode: leftSide || rightSide ? 'vertical-lr' : 'initial',
              rotate: leftSide ? 180 : 0,
            }}
            className="absolute"
            transition={{ duration: 0.7 }}
          >
            {player.name}
          </motion.p>
        );
      })}
    </div>
  );
};

export default Tile;
