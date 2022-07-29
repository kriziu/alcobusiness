import { useEffect } from 'react';

import { useModal } from '@/modules/modal';

export const useMoveHandler = (dice: number, callback: () => void) => {
  const { openModal } = useModal();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (dice === -1) return;

      openModal(<h1>Next player.</h1>);

      setTimeout(() => {
        callback();
      }, 150);
    }, 900);

    return () => {
      clearTimeout(timeout);
    };
  }, [callback, dice, openModal]);
};
