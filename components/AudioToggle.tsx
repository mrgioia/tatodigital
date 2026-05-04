'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/language-context';

/**
 * Custom Equalizer animation bars for the "ON" state.
 * Uses CSS/Framer Motion for smooth performance.
 */
const Equalizer = () => (
  <div className="flex items-center gap-[2px] h-3 w-4">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="w-[2px] bg-frozen-lake rounded-full"
        animate={{
          height: [4, 12, 6, 10, 4],
        }}
        transition={{
          duration: 0.5 + i * 0.15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export default function AudioToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInterval = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();
  
  // 1. Desktop Detection (>= 1024px)
  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.matchMedia('(min-width: 1024px)').matches;
      setIsDesktop(desktop);
    };
    
    checkDesktop();
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    mediaQuery.addEventListener('change', checkDesktop);
    
    return () => mediaQuery.removeEventListener('change', checkDesktop);
  }, []);

  // 2. Initialize and Persist Preference
  useEffect(() => {
    if (!isDesktop) {
      // If we move from desktop to mobile, stop audio
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsEnabled(false);
      }
      return;
    }

    const stored = localStorage.getItem('tato-audio-enabled');
    // We don't force play() here because of browser autoplay policies.
    // We just sync the state. If the user had it ON, we'll wait for an interaction 
    // to actually resume if possible, but the safest is to let the user click.
    if (stored === 'true') {
      // setIsEnabled(true); // Better to start OFF by default as per requirements
    }
  }, [isDesktop]);

  // 3. Audio Logic (Fade In/Out)
  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/tato-background.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0;
      audioRef.current.preload = 'metadata';
    }

    const nextState = !isEnabled;
    setIsEnabled(nextState);
    localStorage.setItem('tato-audio-enabled', String(nextState));

    if (fadeInterval.current) clearInterval(fadeInterval.current);

    if (nextState) {
      // FADE IN
      audioRef.current.play().catch(err => {
        console.warn("TATO Audio: Play blocked by browser or file missing.", err);
        setIsEnabled(false);
      });
      
      let vol = audioRef.current.volume;
      fadeInterval.current = setInterval(() => {
        if (!audioRef.current) return;
        vol += 0.02;
        if (vol >= 0.24) {
          audioRef.current.volume = 0.24;
          if (fadeInterval.current) clearInterval(fadeInterval.current);
        } else {
          audioRef.current.volume = vol;
        }
      }, 60);
    } else {
      // FADE OUT
      let vol = audioRef.current.volume;
      fadeInterval.current = setInterval(() => {
        if (!audioRef.current) return;
        vol -= 0.04;
        if (vol <= 0) {
          audioRef.current.volume = 0;
          audioRef.current.pause();
          if (fadeInterval.current) clearInterval(fadeInterval.current);
        } else {
          audioRef.current.volume = vol;
        }
      }, 60);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeInterval.current) clearInterval(fadeInterval.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <button
      onClick={toggleAudio}
      aria-label={isEnabled ? t.audioToggle.ariaOn : t.audioToggle.ariaOff}
      aria-pressed={isEnabled}
      data-cursor="hover"
      className={`relative h-9 flex items-center justify-center gap-3 px-4 rounded-full border transition-all duration-500 overflow-hidden group ${
        isEnabled 
          ? 'bg-frozen-lake/10 border-frozen-lake/40 shadow-[0_0_20px_rgba(108,207,246,0.15)]' 
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
        <AnimatePresence mode="wait">
          {isEnabled ? (
            <motion.div
              key="on"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Equalizer />
            </motion.div>
          ) : (
            <motion.div
              key="off"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-grey group-hover:text-white transition-colors"
            >
              <VolumeX size={14} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <span className={`text-[9px] font-black tracking-[0.25em] uppercase transition-colors duration-500 shrink-0 ${
        isEnabled ? 'text-frozen-lake' : 'text-grey group-hover:text-white'
      }`}>
        {isEnabled ? t.audioToggle.on : t.audioToggle.off}
      </span>

      {/* Subtle background glow effect when active */}
      {isEnabled && (
        <motion.div
          layoutId="audioGlow"
          className="absolute inset-0 bg-frozen-lake/[0.03] pointer-events-none"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </button>
  );
}
