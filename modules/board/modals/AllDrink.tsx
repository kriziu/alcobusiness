import { usePlayers } from '@/common/recoil/players';
import { useModal } from '@/modules/modal';

const AllDrink = () => {
  const { allDrinks } = usePlayers();
  const { closeModal } = useModal();

  return (
    <>
      <h1 className="text-lg">Wszyscy piją!</h1>
      <button
        className="button mt-4 w-full"
        onClick={() => {
          allDrinks();
          closeModal();
        }}
      >
        młyn
      </button>
    </>
  );
};

export default AllDrink;
