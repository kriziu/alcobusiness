import { useRecoilState } from 'recoil';

import { modalAtom } from './modal.atom';

const useModal = () => {
  const [modalSettings, setModal] = useRecoilState(modalAtom);

  const openModal = (
    modal: JSX.Element | JSX.Element[],
    closeCallback?: () => void
  ) => setModal({ modal, opened: true, closeCallback });

  const closeModal = () => {
    setModal({ modal: <></>, opened: false });
    if (modalSettings.closeCallback) modalSettings.closeCallback();
    if (modalSettings.cardCallback) modalSettings.cardCallback();
  };

  const setCardCallback = (callback: () => void) => {
    setModal({ ...modalSettings, cardCallback: callback });
  };

  return { openModal, closeModal, setCardCallback };
};

export { useModal };
