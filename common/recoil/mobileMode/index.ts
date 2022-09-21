import { atom, useRecoilState } from 'recoil';

export const mobileModeAtom = atom({
  key: 'mobileMode',
  default: {
    turned: false,
    auto: true,
  },
});

export const useMobileMode = () => {
  const [mobileMode, setMobileMode] = useRecoilState(mobileModeAtom);

  return { mobileMode, setMobileMode };
};
