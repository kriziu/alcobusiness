import { useEffect } from 'react';

import { useModal } from '@/common/recoil/modal';

export const useMoveHandler = (dice: number, callback: () => void) => {
  const { openModal } = useModal();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (dice === -1) return;

      openModal(<h1>Next player.</h1>);

      setTimeout(() => {
        callback();
      }, 150);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [callback, dice, openModal]);
};
