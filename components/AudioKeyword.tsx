'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type VisualizerType = 'spectrum' | 'waveform' | 'spectrogram' | 'eq-curve';

interface AudioKeywordProps {
  text: string;
}

const getVisualizerType = (text: string): VisualizerType => {
  const t = text.toLowerCase();
  if (t.includes('performance') || t.includes('stakeholders')) return 'spectrum';
  if (t.includes('coordenação') || t.includes('alinhamento')) return 'waveform';
  if (t.includes('project manager') || t.includes('rock in rio')) return 'spectrogram';
  if (t.includes('pmo') || t.includes('governança') || t.includes('relatórios')) return 'eq-curve';
  return 'spectrum'; // Default
};

export function AudioKeyword({ text }: AudioKeywordProps) {
  const [isHovered, setIsHovered] = useState(false);
  const type = useMemo(() => getVisualizerType(text), [text]);

  const renderVisualizer = () => {
    switch (type) {
      case 'spectrum':
        return <SpectrumAnalyzer />;
      case 'waveform':
        return <Waveform />;
      case 'spectrogram':
        return <Spectrogram />;
      case 'eq-curve':
        return <EQCurve />;
    }
  };

  return (
    <span 
      className="relative inline-block group cursor-help transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      aria-label={`${text} - audio visualization active on hover`}
    >
      {/* Hidden spacer to maintain width/height */}
      <span className="invisible pointer-events-none select-none font-black whitespace-pre">
        {text}
      </span>

      {/* Layer 1: The Text */}
      <motion.span
        className="absolute inset-0 text-white font-black whitespace-pre flex items-center justify-center"
        animate={{ 
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 0.9 : 1,
          filter: isHovered ? 'blur(4px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {text}
      </motion.span>

      {/* Layer 2: The Visualizer */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 flex items-center justify-center p-1"
          >
            <span className="w-full h-[70%] max-h-8 flex items-center justify-center overflow-hidden">
              {renderVisualizer()}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// --- Visualizer Sub-components ---

const SpectrumAnalyzer = () => {
  const bars = 10;
  // Use lazy initializer in useState to keep random data stable and fix purity issue
  const [barData] = useState(() => {
    return Array.from({ length: bars }).map(() => ({
      h1: `${Math.random() * 70 + 30}%`,
      h2: `${Math.random() * 70 + 30}%`,
      duration: 0.5 + Math.random() * 0.5
    }));
  });

  return (
    <span className="flex items-end gap-0.5 h-full w-full justify-center">
      {barData.map((data, i) => (
        <motion.span
          key={i}
          className="w-1 bg-[#6CCFF6] rounded-full"
          style={{ boxShadow: "0 0 10px rgba(108, 207, 246, 0.6)" }}
          animate={{
            height: [
              '25%', 
              data.h1, 
              '45%', 
              data.h2, 
              '25%'
            ],
          }}
          transition={{
            duration: data.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
};

const Waveform = () => {
  return (
    <svg viewBox="0 0 100 40" className="w-full h-full preserve-3d overflow-visible">
      <motion.path
        d="M 0 20 Q 12.5 5, 25 20 T 50 20 T 75 20 T 100 20"
        fill="transparent"
        stroke="#6CCFF6"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 5px rgba(108, 207, 246, 0.8))" }}
        animate={{
          d: [
            "M 0 20 Q 12.5 5, 25 20 T 50 20 T 75 20 T 100 20",
            "M 0 20 Q 12.5 35, 25 20 T 50 20 T 75 20 T 100 20",
            "M 0 20 Q 12.5 5, 25 20 T 50 20 T 75 20 T 100 20",
          ]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M 0 20 Q 12.5 10, 25 20 T 50 20 T 75 20 T 100 20"
        fill="transparent"
        stroke="#B026FF"
        strokeWidth="1"
        className="opacity-40"
        animate={{
          d: [
            "M 0 20 Q 12.5 30, 25 20 T 50 20 T 75 20 T 100 20",
            "M 0 20 Q 12.5 10, 25 20 T 50 20 T 75 20 T 100 20",
            "M 0 20 Q 12.5 30, 25 20 T 50 20 T 75 20 T 100 20",
          ]
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
      />
    </svg>
  );
};

const Spectrogram = () => {
  const columns = 8;
  const rows = 4;
  
  // Use lazy initializer in useState to keep random data stable and fix purity issue
  const [cellData] = useState(() => {
    return Array.from({ length: columns * rows }).map((_, i) => ({
      duration: 0.8 + Math.random() * 1.2,
      delay: (Math.floor(i / rows) * 0.1) + ((i % rows) * 0.15)
    }));
  });

  return (
    <span className="grid grid-cols-8 gap-0.5 w-full h-full px-1">
      {Array.from({ length: columns }).map((_, col) => (
        <span key={col} className="flex flex-col-reverse gap-0.5 justify-center">
          {Array.from({ length: rows }).map((_, row) => {
            const data = cellData[col * rows + row];
            return (
              <motion.span
                key={row}
                className="w-full aspect-square rounded-[1px]"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  backgroundColor: [
                    'rgba(108, 207, 246, 0.2)',
                    'rgba(108, 207, 246, 0.9)',
                    'rgba(176, 38, 255, 0.2)'
                  ]
                }}
                transition={{
                  duration: data.duration,
                  repeat: Infinity,
                  delay: data.delay,
                }}
                style={{
                  boxShadow: "0 0 4px rgba(108, 207, 246, 0.2)"
                }}
              />
            );
          })}
        </span>
      ))}
    </span>
  );
};

const EQCurve = () => {
  return (
    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
      <motion.path
        fill="none"
        stroke="#6CCFF6"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 4px rgba(108, 207, 246, 0.6))" }}
        animate={{
          d: [
            "M 5 25 Q 25 15, 50 20 T 95 15",
            "M 5 20 Q 25 35, 50 20 T 95 35",
            "M 5 25 Q 25 15, 50 20 T 95 15",
          ]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Control points */}
      <motion.circle
        cx="25"
        r="2"
        fill="#FFFFFC"
        animate={{ cy: [15, 35, 15] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="50"
        r="1.5"
        fill="#FFFFFC"
        animate={{ cy: [20, 20, 20] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="75"
        r="2"
        fill="#B026FF"
        animate={{ cy: [20, 10, 20] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </svg>
  );
};
