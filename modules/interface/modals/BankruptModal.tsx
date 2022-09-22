import { useModal } from '@/modules/modal';

const BankruptModal = ({ bankrupt }: { bankrupt: () => void }) => {
  const { closeModal } = useModal();

  return (
    <>
      <p className="mb-4 text-lg">Are you sure?</p>
      <button
        className="button w-full"
        onClick={() => {
          bankrupt();
          closeModal();
        }}
      >
        Bankrupt
      </button>
    </>
  );
};

export default BankruptModal;
