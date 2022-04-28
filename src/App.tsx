import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
  AnimatePresence,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  position: absolute;
  top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0, 10px, 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  entry: (back: boolean) => ({
    x: back ? -500 : 500,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 1,
    },
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  exit: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 1,
    },
  }),
};

// const Circle = styled(motion.div)`
//   background-color: #00a5ff;
//   height: 100px;
//   width: 100px;
//   border-radius: 50px;
// `;

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextplease = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevplease = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  return (
    <Wrapper>
      {/* <AnimatePresence exitBeforeEnter custom={back}> */}
      <AnimatePresence custom={back}>
        <Box
          custom={back}
          variants={boxVariants}
          initial='entry'
          animate='center'
          exit='exit'
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextplease}>next</button>
      <button onClick={prevplease}>prev</button>
    </Wrapper>
  );
}

export default App;
