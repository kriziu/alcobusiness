import { atom, useRecoilState } from 'recoil';

const showPlayerListAtom = atom({
  key: 'playerList',
  default: false,
});

export const useShowPlayerList = () => {
  const [showPlayerList, setShowPlayerList] =
    useRecoilState(showPlayerListAtom);

  return { showPlayerList, setShowPlayerList };
};
