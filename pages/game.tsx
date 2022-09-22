import { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import MobileModeSwitcher from '@/common/components/MobileModeSwitcher';
import { useMobileMode } from '@/common/recoil/mobileMode';
import { usePlayers } from '@/common/recoil/players';
import { useShowPlayerList } from '@/common/recoil/showPlayerList';
import Board from '@/modules/board';
import CheckWin from '@/modules/checkWin';
import PlayerList from '@/modules/interface';
import CurrentPlayer from '@/modules/interface/components/CurrentPlayer';
import MobilePlayerList from '@/modules/interface/components/MobilePlayerList';

const GamePage: NextPage = () => {
  const { players } = usePlayers();
  const { setMobileMode, mobileMode } = useMobileMode();
  const { setShowPlayerList } = useShowPlayerList();

  const router = useRouter();

  useEffect(() => {
    if (!players.length) router.push('/');
  }, [players, router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setShowPlayerList(false);

      if (mobileMode.auto) {
        if (window.innerWidth < 1400)
          setMobileMode({ auto: true, turned: true });
        else setMobileMode({ auto: true, turned: false });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMode.auto, setMobileMode, setShowPlayerList]);

  if (!players.length) return null;

  return (
    <div className="flex h-full w-full">
      <CheckWin />

      <div className="flex flex-1 items-end justify-center overflow-hidden pb-10 md:items-center lg:pb-0 2xl:pl-24">
        <Board />
      </div>

      <div className="hidden w-1/2 md:block lg:w-2/5 xl:w-1/3">
        <PlayerList />
      </div>

      <MobileModeSwitcher />

      <div className="block md:hidden">
        <CurrentPlayer />
        <MobilePlayerList />
      </div>
    </div>
  );
};

export default GamePage;
