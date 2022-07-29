import { atom } from 'recoil';

export const modalAtom = atom<{
  modal: JSX.Element | JSX.Element[];
  opened: boolean;
  closeCallback?: () => void;
  cardCallback?: () => void;
}>({
  key: 'modal',
  default: {
    modal: <></>,
    opened: false,
  },
});
