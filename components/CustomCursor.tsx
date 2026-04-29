'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectable = target.closest('button, a, .hover-target');
      const isNavLink = target.closest('a');
      
      setIsHovering(!!isSelectable);
      setIsLink(!!isNavLink);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] hidden md:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            animate={{
              scale: isHovering ? 2.5 : 1,
              backgroundColor: isHovering ? 'rgba(108, 207, 246, 0.2)' : 'rgba(255, 26, 105, 0.5)',
            }}
            className="w-full h-full rounded-full border border-frozen-lake/30 backdrop-blur-[2px] transition-colors duration-300"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-porcelain rounded-full shadow-[0_0_10px_#6CCFF6]" />
          </motion.div>
          
          {/* Outer Glow */}
          <motion.div
            animate={{
              scale: isHovering ? 1.5 : 1,
              opacity: isHovering ? 0.8 : 0.4,
            }}
            className="absolute inset-[-20px] rounded-full bg-gradient-to-tr from-tato-blue via-frozen-lake to-yellow-green blur-2xl opacity-20 transition-all duration-500"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
