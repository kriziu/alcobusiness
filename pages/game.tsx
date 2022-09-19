import { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useMobileMode } from '@/common/recoil/mobileMode';
import { usePlayers } from '@/common/recoil/players';
import Board from '@/modules/board';
import PlayerList from '@/modules/interface';

const GamePage: NextPage = () => {
  const { players } = usePlayers();
  const { setMobileMode } = useMobileMode();

  const router = useRouter();

  useEffect(() => {
    if (!players.length) router.push('/');
  }, [players, router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1400) setMobileMode(true);
      else setMobileMode(false);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setMobileMode]);

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-1 items-end justify-center overflow-hidden pb-10 md:items-center lg:pb-0 2xl:pl-24">
        <Board />
      </div>

      <div className="hidden w-1/2 md:block lg:w-2/5 xl:w-1/3">
        <PlayerList />
      </div>
    </div>
  );
};

export default GamePage;
