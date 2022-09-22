import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { usePlayers } from '@/common/recoil/players';

import { useModal } from '../modal';

const CheckWin = () => {
  const { players } = usePlayers();
  const { openModal, closeModal } = useModal();

  const router = useRouter();

  useEffect(() => {
    const playersLeft = players.filter((player) => !player.isBankrupt);
    if (playersLeft.length === 1) {
      router.push('/');
      openModal(
        <>
          <p className="mb-4 text-lg">{playersLeft[0].name} is a winner!</p>
          <button onClick={closeModal} className="button">
            Congratulaions
          </button>
        </>,
        { clickToClose: true }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players, router]);

  return null;
};

export default CheckWin;
