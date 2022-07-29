import { useModal } from '@/modules/modal';

const FillAllPlayers = () => {
  const { closeModal } = useModal();

  return (
    <>
      <p className="mb-4 text-lg">Please, fill all players!</p>
      <button className="button-secondary w-full" onClick={closeModal}>
        Close
      </button>
    </>
  );
};

export default FillAllPlayers;
