'use client';

import React from 'react';
import { motion } from 'motion/react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  containerClass?: string;
}

export default function Section({ children, className = "", id, delay = 0, containerClass = "max-w-[1600px] mx-auto w-full" }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ 
        duration: 1.5, 
        delay,
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={`min-h-screen flex flex-col justify-center px-6 py-32 md:py-48 scroll-mt-[var(--header-height)] scroll-snap-start snap-always ${className}`}
      style={{ minHeight: '100dvh', scrollSnapAlign: 'start' }}
    >
      <div className={containerClass}>
        {children}
      </div>
    </motion.section>
  );
}
