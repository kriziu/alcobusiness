import { MotionConfig } from 'framer-motion';
import { RecoilRoot } from 'recoil';

import { DEFAULT_EASE } from '../animations/easings';
import ModalManager from '../components/modal/components/ModalManager';

const MainLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <RecoilRoot>
      <MotionConfig transition={{ ease: DEFAULT_EASE }}>
        <ModalManager />
        {children}
      </MotionConfig>
    </RecoilRoot>
  );
};

export default MainLayout;
