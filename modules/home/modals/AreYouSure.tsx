import { useModal } from '@/modules/modal';

const AreYouSure = ({ handleClick }: { handleClick: () => void }) => {
  const { closeModal } = useModal();

  return (
    <>
      <p className="mb-4 text-lg">Are you sure?</p>
      <button
        className="button w-full"
        onClick={() => {
          handleClick();
          closeModal();
        }}
      >
        Start
      </button>
    </>
  );
};

export default AreYouSure;
