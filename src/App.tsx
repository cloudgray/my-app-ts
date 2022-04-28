import {
    motion,
    useMotionValue,
    useTransform,
    useViewportScroll,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
    height: 200vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Box = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0, 10px, 20px rgba(0, 0, 0, 0.06);s
`;

const boxVariants = {
    hover: { rotateZ: 90 },
    click: { borderRadius: '100px' },
};

function App() {
    const x = useMotionValue(0);
    const scale = useTransform(x, [-800, 800], [2, 0.5]);
    const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
    const gradient = useTransform(
        x,
        [-800, 0, 800],
        [
            'linear-gradient(135deg, #59c173, #a17fe0, #5d26c1)',
            'linear-gradient(135deg, rgba(198,255,221,1.0), rgba(251,215,134,1.0), rgba(247,121,125,1.0))',
            'linear-gradient(to right, #77a1d3, #79cbca, #e684ae)',
        ]
    );
    const { scrollY, scrollYProgress } = useViewportScroll();

    useEffect(() => {
        x.onChange(() => console.log(rotateZ.get()));
        scrollY.onChange(() => console.log(scrollY.get()));
        scrollYProgress.onChange(() => console.log(scrollYProgress.get()));
    }, [x, scrollY]);

    return (
        <Wrapper style={{ background: gradient }}>
            <Box style={{ x, scale, rotateZ }} drag='x' dragSnapToOrigin />
        </Wrapper>
    );
}

export default App;
