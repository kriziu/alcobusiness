import { useModal } from '@/modules/modal';

const Hospital = () => {
  const { closeModal } = useModal();

  return (
    <>
      <h1 className="text-lg">Gdzieś to zalazł...</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Przy 2 następnych okazjach nie pijesz. (pamiętaj o tym)
      </p>
      <button className="button mt-4 w-full" onClick={closeModal}>
        młyn
      </button>
    </>
  );
};

export default Hospital;
