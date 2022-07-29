import { useModal } from '@/modules/modal';

const AllDrink = () => {
  const { closeModal } = useModal();

  return (
    <>
      <h1 className="text-lg">Wszyscy piją!</h1>
      <button className="button mt-4 w-full" onClick={closeModal}>
        młyn
      </button>
    </>
  );
};

export default AllDrink;
