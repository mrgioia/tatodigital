'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion } from 'motion/react';

export default function TatoCursor() {
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'expand' | 'view' | 'click' | 'hidden'>('default');
  const [label, setLabel] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 1200, mass: 0.05 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const handleInteraction = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');
    
    if (interactive) {
      const type = interactive.getAttribute('data-cursor');
      const customLabel = interactive.getAttribute('data-cursor-label');
      
      if (type === 'view') {
        setCursorState('view');
        setLabel(customLabel || "VIEW");
      } else if (type === 'expand') {
        setCursorState('expand');
      } else {
        setCursorState('hover');
      }
    } else {
      setCursorState('default');
      setLabel("");
    }
  }, []);

  const handleMouseDown = () => setCursorState('click');
  const handleMouseUp = () => setCursorState('hover');

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleInteraction);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.classList.add('cursor-none-desktop');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleInteraction);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('cursor-none-desktop');
    };
  }, [handleMouseMove, handleInteraction]);

  const sizes = useMemo(() => ({
    default: 56,
    hover: 96,
    expand: 110,
    view: 128,
    click: 44,
    hidden: 0
  }), []);

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="relative flex items-center justify-center"
      >
        {/* Main Energy Ring */}
        <motion.div
          animate={{
            width: sizes[cursorState],
            height: sizes[cursorState],
            backgroundColor: cursorState === 'hover' || cursorState === 'expand' || cursorState === 'view'
              ? 'rgba(108, 207, 246, 0.1)' 
              : 'rgba(108, 207, 246, 0.05)',
            borderColor: cursorState === 'click' ? '#98CE00' : '#6CCFF6',
            borderWidth: cursorState === 'default' ? '1px' : '2px',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="rounded-full border border-frozen-lake/30 backdrop-blur-[1px] relative flex items-center justify-center overflow-hidden"
        >
          {/* Label Display */}
          <AnimatePresence>
            {cursorState === 'view' && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[9px] font-mono font-black text-frozen-lake tracking-[0.3em] uppercase"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Liquid Radial Gradient Reveal */}
          <motion.div 
            animate={{
              opacity: cursorState !== 'default' ? 1 : 0,
              scale: cursorState !== 'default' ? 1 : 0.5,
            }}
            className="absolute inset-0 bg-radial from-frozen-lake/20 via-yellow-green/5 to-transparent blur-md"
          />
        </motion.div>

        {/* Cinematic Spotlight / Secondary Glow */}
        <motion.div
          animate={{
            scale: cursorState !== 'default' ? 1.5 : 1,
            opacity: cursorState !== 'default' ? 0.3 : 0.1,
          }}
          className="absolute inset-[-60px] rounded-full bg-gradient-radial from-tato-blue/20 via-transparent to-transparent blur-[80px] -z-10"
        />

        {/* Precise Dot */}
        <motion.div 
          animate={{
            scale: cursorState === 'click' ? 0.5 : 1,
            backgroundColor: cursorState === 'expand' ? '#98CE00' : '#FFFFFC'
          }}
          className="absolute w-1.5 h-1.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]" 
        />
      </motion.div>
    </div>
  );
}
