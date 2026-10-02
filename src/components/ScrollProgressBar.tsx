import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-black/10"
    >
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="w-full h-full bg-gradient-to-r from-[#BBCCD7] via-[#B600A8] to-[#FF70E0] shadow-[0_0_8px_rgba(182,0,168,0.6)]"
      />
    </div>
  );
};
