import { atom, useRecoilState } from 'recoil';

export const mobileModeAtom = atom<boolean>({
  key: 'mobileMode',
  default: true,
});

export const useMobileMode = () => {
  const [mobileMode, setMobileMode] = useRecoilState(mobileModeAtom);

  return { mobileMode, setMobileMode };
};
