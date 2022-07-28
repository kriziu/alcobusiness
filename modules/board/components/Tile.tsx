import { motion } from 'framer-motion';

import { PLACES } from '@/common/contants/PLACES';
import { convertPositionToIndex } from '@/common/libs/position';
import { usePlayers } from '@/common/recoil/players';

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
      className={`relative flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-lg text-sm text-white
      ${type === 'property' && 'bg-zinc-700/60'}
      ${type === 'card' && 'bg-blue-600/60'}
      ${type === 'specialProperty' && 'bg-zinc-400/60'}
      ${type === 'allDrink' && 'bg-green-600/60'}
      ${type === 'square' && 'bg-purple-600/60'}
      ${type === 'prison' && 'bg-red-600/60'}
      ${type === 'hospital' && 'bg-yellow-600/60'}
      ${type === 'go' && 'bg-cyan-400/60'}`}
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
          className={`absolute z-10 p-1 text-violet-400
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
            className="absolute z-10 p-1"
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
