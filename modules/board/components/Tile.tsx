import { forwardRef } from 'react';

import { motion } from 'framer-motion';

import { PLACES } from '@/common/contants/PLACES';
import { useMobileMode } from '@/common/recoil/mobileMode';
import { usePlayers } from '@/common/recoil/players';
import { PlaceType } from '@/common/types';
import {
  convertMobilePosition,
  convertPositionToIndex,
} from '@/common/utils/position';

const Tile = forwardRef<HTMLDivElement, { x: number; y: number }>(
  (position: { x: number; y: number }, ref) => {
    const { mobileMode } = useMobileMode();
    const { players, getCurrentPlayer } = usePlayers();

    let goodPosition = position;
    if (mobileMode.turned) goodPosition = convertMobilePosition(position);

    const { x, y } = goodPosition;

    let leftSide = x === 8 && y !== 0 && y !== 8;
    let rightSide = x === 0 && y !== 0 && y !== 8;
    let bottomSide = y === 0;
    let topSide = y === 8;

    if (mobileMode.turned) {
      bottomSide = false;
      topSide = false;

      leftSide = position.x === 0;
      rightSide = position.x === 1;
    }

    const posIndex = convertPositionToIndex({ x, y });

    const place = PLACES[posIndex];
    const { name, type, price } = place;

    const playersOnTile = players.filter(
      (player) => player.position.x === x && player.position.y === y
    );

    const ownedBy = players.find((player) =>
      player.placesIds.includes(posIndex)
    );

    return (
      <div
        className={`relative mb-2 flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-lg text-sm text-white 2xl:mb-0 2xl:h-[9vh] 2xl:w-[9vh] 2xl:text-[1.2vh]
      ${type === PlaceType.PROPERTY && 'bg-zinc-700/60'}
      ${type === PlaceType.CARD && 'bg-blue-600/60'}
      ${type === PlaceType.SPECIAL_PROPERTY && 'bg-zinc-400/60'}
      ${type === PlaceType.ALL_DRINKS && 'bg-green-600/60'}
      ${type === PlaceType.SQUARE && 'bg-purple-600/60'}
      ${type === PlaceType.PRISON && 'bg-red-600/60'}
      ${type === PlaceType.HOSPITAL && 'bg-yellow-600/60'}
      ${type === PlaceType.GO && 'bg-cyan-400/60'}`}
        key={x}
        ref={ref}
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
          if (player.isBankrupt) return null;

          const top = bottomSide ? `${105 + index * 20}%` : undefined;
          const bottom = topSide ? `${105 + index * 20}%` : undefined;
          const left = rightSide ? `${105 + index * 20}%` : undefined;
          const right = leftSide ? `${105 + index * 20}%` : undefined;

          const isCurrentPlayer =
            player.layoutId === getCurrentPlayer().layoutId;

          return (
            <motion.div
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
              transition={{ duration: mobileMode.turned ? 0 : 0.7 }}
            >
              <motion.p
                className={`${isCurrentPlayer && 'font-bold text-green-500'}`}
                animate={{ scale: isCurrentPlayer ? [1, 1.5, 1] : 1 }}
                transition={{ repeat: isCurrentPlayer ? Infinity : 0 }}
              >
                {player.name}
              </motion.p>
            </motion.div>
          );
        })}
      </div>
    );
  }
);

Tile.displayName = 'Title';

export default Tile;

// obecny gracz wiekszy tekst albo jakos wyrozniiony
