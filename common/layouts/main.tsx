import { MotionConfig } from 'framer-motion';
import { RecoilRoot } from 'recoil';

import Background from '@/modules/background/components/Background';

import { DEFAULT_EASE } from '../animations/easings';
import ModalManager from '../components/modal/components/ModalManager';

const MainLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <RecoilRoot>
      <MotionConfig transition={{ ease: DEFAULT_EASE }}>
        <ModalManager />
        {children}
        <Background />
      </MotionConfig>
    </RecoilRoot>
  );
};

export default MainLayout;
