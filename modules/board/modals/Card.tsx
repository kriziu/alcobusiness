import { useMemo } from 'react';

import { CARDS } from '@/common/contants/CARDS';
import { useModal } from '@/modules/modal';

const Card = () => {
  const { closeModal } = useModal();

  const randomCard = useMemo(
    () => Math.floor(Math.random() * CARDS.length),
    []
  );

  return (
    <>
      <h1 className="text-lg">Karta!</h1>
      <p className="mt-2 text-sm text-zinc-400">{CARDS[randomCard].name}</p>
      <button className="button mt-4 w-full" onClick={closeModal}>
        młyn
      </button>
    </>
  );
};

export default Card;
