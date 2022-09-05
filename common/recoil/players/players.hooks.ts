/* eslint-disable import/no-cycle */
import { useRecoilState } from 'recoil';

import { PLACES } from '@/common/contants/PLACES';
import { useDrinkMoney } from '@/modules/drinkmoney';
import type { PlayerName } from '@/modules/home/home.types';
import { useModal } from '@/modules/modal';

import { playersAtom } from './players.atom';

export const usePlayers = () => {
  const [{ players, currentPlayer }, setPlayers] = useRecoilState(playersAtom);

  const { drinkMoneyPlayer } = useDrinkMoney();
  const { modalSettings, setModal } = useModal();

  const setupPlayers = (playersNames: PlayerName[]) => {
    const newPlayers = playersNames.map(({ id, name }) => ({
      layoutId: id.toString(),
      name,
      position: {
        x: 0,
        y: 0,
      },
      money: 250,
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
    setPlayers((prev) => {
      const newPlayers = prev.players.map((player, index) => {
        if (index === playerIndex) {
          return {
            ...player,
            position: newPosition,
          };
        }

        return player;
      });

      return { ...prev, players: newPlayers };
    });
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
    setPlayers((prev) => {
      const newPlayers = prev.players.map((player, index) => {
        if (index === playerIndex) {
          return {
            ...player,
            noDrinkTimes: value,
          };
        }

        return player;
      });

      return { ...prev, players: newPlayers };
    });
  };

  const editPlayerPrisonRounds = (
    playerIndex: number,
    prisonRounds: number
  ) => {
    setPlayers((prev) => {
      const newPlayers = prev.players.map((player, index) => {
        if (index === playerIndex) {
          return { ...player, prisonRounds: prisonRounds + 1 };
        }

        return player;
      });

      return { ...prev, players: newPlayers };
    });
  };

  const addMoneyToPlayer = (playerIndex: number, money: number) => {
    setPlayers((prev) => {
      const newPlayers = prev.players.map((player, index) => {
        if (index === playerIndex)
          return { ...player, money: player.money + money };

        return player;
      });

      return { ...prev, players: newPlayers };
    });
  };

  const payToPlayer = (
    {
      payerIndex,
      receiverIndex,
      amount,
    }: {
      payerIndex: number;
      receiverIndex: number;
      amount: number;
    },
    callback?: () => void
  ) => {
    if (players[payerIndex].money < amount)
      drinkMoneyPlayer(payerIndex, amount, () => setModal(modalSettings));
    else {
      setPlayers((prev) => {
        const newPlayers = prev.players.map((player, index) => {
          if (index === payerIndex)
            return { ...player, money: player.money - amount };

          if (index === receiverIndex)
            return { ...player, money: player.money + amount };

          return player;
        });

        return { ...prev, players: newPlayers };
      });

      if (callback) callback();
    }
  };

  const buyPlaceByPlayer = (
    { playerIndex, placeId }: { playerIndex: number; placeId: number },
    callback?: () => void
  ) => {
    if (players[playerIndex].money < (PLACES[placeId].price || 0))
      drinkMoneyPlayer(playerIndex, PLACES[placeId].price || 0, () =>
        setModal(modalSettings)
      );
    else {
      setPlayers((prev) => {
        const newPlayers = prev.players.map((player, index) => {
          if (index === playerIndex) {
            return {
              ...player,
              placesIds: [...player.placesIds, placeId],
              money: player.money - (PLACES[placeId].price || 0),
            };
          }

          return player;
        });

        return { ...prev, players: newPlayers };
      });

      if (callback) callback();
    }
  };

  const bankruptPlayer = (playerIndex: number) => {
    setPlayers((prev) => {
      const newPlayers = prev.players.map((player, index) => {
        if (index === playerIndex) {
          return { ...player, money: 0, isBankrupt: true, placesIds: [] };
        }

        return player;
      });

      return { ...prev, players: newPlayers };
    });
  };

  const allDrinks = () => {
    setPlayers((prev) => {
      const newPlayers = prev.players.map((player) => {
        if (player.prisonRounds !== 0) return player;
        if (player.noDrinkTimes !== 0)
          return { ...player, noDrinkTimes: player.noDrinkTimes - 1 };

        return {
          ...player,
          drinkedTimes: player.drinkedTimes + 1,
        };
      });

      return { ...prev, players: newPlayers };
    });
  };

  const drinkPlayers = (playersIndexes: number[], value: number = 1) => {
    setPlayers((prev) => {
      const newPlayers = prev.players.map((player, index) => {
        if (playersIndexes.includes(index)) {
          if (player.prisonRounds !== 0) return player;
          if (player.noDrinkTimes !== 0)
            return { ...player, noDrinkTimes: player.noDrinkTimes - 1 };

          return { ...player, drinkedTimes: player.drinkedTimes + value };
        }

        return player;
      });

      return { ...prev, players: newPlayers };
    });
  };

  const addDrinkedTimes = (playerIndex: number, value: number) => {
    setPlayers((prev) => {
      const newPlayers = prev.players.map((player, index) => {
        if (index === playerIndex) {
          return { ...player, drinkedTimes: player.drinkedTimes + value };
        }

        return player;
      });

      return { ...prev, players: newPlayers };
    });
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
    addDrinkedTimes,
  };
};
