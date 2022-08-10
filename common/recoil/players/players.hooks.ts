import { useRecoilState } from 'recoil';

import { PLACES } from '@/common/contants/PLACES';
import type { PlayerName } from '@/modules/home/home.types';

import { playersAtom } from './players.atom';

export const usePlayers = () => {
  const [{ players, currentPlayer }, setPlayers] = useRecoilState(playersAtom);

  const setupPlayers = (playersNames: PlayerName[]) => {
    const newPlayers = playersNames.map(({ id, name }) => ({
      layoutId: id.toString(),
      name,
      position: {
        x: 0,
        y: 0,
      },
      money: 500,
      placesIds: [],
      hasLeavePrisonCard: false,
      roundsNotDrinking: 0,
      isBankrupt: false,
      noDrinkTimes: 0,
      prisonRounds: 0,
      drinkedTimes: 0,
    }));

    setPlayers({ players: newPlayers, currentPlayer: 0 });
  };

  const movePlayer = (
    playerIndex: number,
    newPosition: { x: number; y: number }
  ) => {
    const newPlayers = players.map((player, index) => {
      if (index === playerIndex) {
        return {
          ...player,
          position: newPosition,
        };
      }

      return player;
    });

    setPlayers((prev) => ({ ...prev, players: newPlayers }));
  };

  const getPlayer = (playerIndex: number) => players[playerIndex];

  const getCurrentPlayer = () => players[currentPlayer];

  const nextPlayer = () => {
    setPlayers((prev) => ({
      ...prev,
      currentPlayer: (prev.currentPlayer + 1) % players.length,
    }));
  };

  const editPlayerNoDrinkTimes = (playerIndex: number, value: number) => {
    const newPlayers = players.map((player, index) => {
      if (index === playerIndex) {
        return {
          ...player,
          noDrinkTimes: value,
        };
      }

      return player;
    });

    setPlayers((prev) => ({ ...prev, players: newPlayers }));
  };

  const editPlayerPrisonRounds = (
    playerIndex: number,
    prisonRounds: number
  ) => {
    const newPlayers = players.map((player, index) => {
      if (index === playerIndex) {
        return { ...player, prisonRounds: prisonRounds + 1 };
      }

      return player;
    });

    setPlayers((prev) => ({ ...prev, players: newPlayers }));
  };

  const addMoneyToPlayer = (playerIndex: number, money: number) => {
    const newPlayers = players.map((player, index) => {
      if (index === playerIndex)
        return { ...player, money: player.money + money };

      return player;
    });

    setPlayers((prev) => ({ ...prev, players: newPlayers }));
  };

  const payToPlayer = (payer: number, receiver: number, money: number) => {
    const newPlayers = players.map((player, index) => {
      if (index === payer) return { ...player, money: player.money - money };

      if (index === receiver) return { ...player, money: player.money + money };

      return player;
    });

    setPlayers((prev) => ({ ...prev, players: newPlayers }));
  };

  const buyPlaceByPlayer = (playerIndex: number, placeId: number) => {
    const newPlayers = players.map((player, index) => {
      if (index === playerIndex) {
        return {
          ...player,
          placesIds: [...player.placesIds, placeId],
          money: player.money - (PLACES[placeId].price || 0),
        };
      }

      return player;
    });

    setPlayers((prev) => ({ ...prev, players: newPlayers }));
  };

  const bankruptPlayer = (playerIndex: number) => {
    const newPlayers = players.map((player, index) => {
      if (index === playerIndex) {
        return { ...player, money: 0, isBankrupt: true };
      }

      return player;
    });

    setPlayers((prev) => ({ ...prev, players: newPlayers }));
  };

  const allDrinks = () => {
    const newPlayers = players.map((player) => {
      if (player.prisonRounds !== 0) return player;
      if (player.noDrinkTimes !== 0)
        return { ...player, noDrinkTimes: player.noDrinkTimes - 1 };

      return {
        ...player,
        drinkedTimes: player.drinkedTimes + 1,
      };
    });

    setPlayers((prev) => ({ ...prev, players: newPlayers }));
  };

  const drinkPlayers = (playersIndexes: number[], value: number = 1) => {
    const newPlayers = players.map((player, index) => {
      if (playersIndexes.includes(index)) {
        if (player.prisonRounds !== 0) return player;
        if (player.noDrinkTimes !== 0)
          return { ...player, noDrinkTimes: player.noDrinkTimes - 1 };

        return { ...player, drinkedTimes: player.drinkedTimes + value };
      }

      return player;
    });

    setPlayers((prev) => ({ ...prev, players: newPlayers }));
  };

  return {
    setupPlayers,
    movePlayer,
    players,
    getPlayer,
    currentPlayer,
    getCurrentPlayer,
    nextPlayer,
    editPlayerNoDrinkTimes,
    editPlayerPrisonRounds,
    addMoneyToPlayer,
    payToPlayer,
    buyPlaceByPlayer,
    bankruptPlayer,
    allDrinks,
    drinkPlayers,
  };
};
