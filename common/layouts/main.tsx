import { MotionConfig } from 'framer-motion';
import { RecoilRoot } from 'recoil';

import Background from '@/modules/background';
import { ModalManager } from '@/modules/modal';

import { DEFAULT_EASE } from '../animations/easings';

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
