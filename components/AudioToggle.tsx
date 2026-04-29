'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

const AUDIO_PATH = '/sounds/tato-background.mp3';
const STORAGE_KEY = 'tato-audio-enabled';
const MIN_VOLUME = 0;
const MAX_VOLUME = 0.22; // Comfortable low volume
const FADE_IN_DURATION = 1200;
const FADE_OUT_DURATION = 800;

/**
 * Premium Audio Toggle for Desktop
 * Features:
 * - LocalStorage persistence
 * - Smooth volume fading
 * - Visual equalizer animation
 * - Desktop-only rendering
 */
export default function AudioToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Desktop detection
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    // 2. Load preference (SSR safe)
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      // We don't play immediately due to browser policies, 
      // but we set the state. The user still needs one click if it's the very first load.
      setIsEnabled(true);
    }
    
    setIsReady(true);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // 3. Initialize Audio (Desktop only)
  useEffect(() => {
    if (!isDesktop || !isReady) return;

    if (!audioRef.current) {
      const audio = new Audio(AUDIO_PATH);
      audio.loop = true;
      audio.volume = 0;
      audio.preload = 'metadata';
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [isDesktop, isReady]);

  const fadeVolume = (target: number, duration: number) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const step = 0.01;
    const intervalTime = duration / ((Math.abs(audioRef.current.volume - target)) / step);
    
    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }

      if (audioRef.current.volume < target) {
        audioRef.current.volume = Math.min(target, audioRef.current.volume + step);
      } else {
        audioRef.current.volume = Math.max(target, audioRef.current.volume - step);
      }

      if (Math.abs(audioRef.current.volume - target) < 0.001) {
        audioRef.current.volume = target;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        
        if (target === 0) {
          audioRef.current.pause();
        }
      }
    }, Math.max(10, intervalTime || 50));
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;

    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem(STORAGE_KEY, String(newState));

    if (newState) {
      // Attempt to play
      audioRef.current.play().then(() => {
        fadeVolume(MAX_VOLUME, FADE_IN_DURATION);
      }).catch(err => {
        console.warn('Audio playback blocked by browser. Click again to play.', err);
        setIsEnabled(false);
      });
    } else {
      fadeVolume(MIN_VOLUME, FADE_OUT_DURATION);
    }
  };

  if (!isDesktop || !isReady) return null;

  return (
    <button
      onClick={toggleAudio}
      data-cursor="hover"
      aria-label={isEnabled ? 'Desativar som de fundo' : 'Ativar som de fundo'}
      aria-pressed={isEnabled}
      className={`relative flex items-center justify-center w-10 h-10 lg:w-12 lg:h-10 rounded-full border transition-all duration-500 overflow-hidden group ${
        isEnabled 
          ? 'bg-tato-blue/10 border-tato-blue/40 shadow-[0_0_15px_rgba(0,51,255,0.1)]' 
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {isEnabled ? (
          <div className="flex items-center gap-[2px]">
            {/* Equalizer Animation */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  height: [4, 12, 6, 14, 4],
                }}
                transition={{
                  duration: 0.6 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-[2px] bg-frozen-lake rounded-full"
              />
            ))}
          </div>
        ) : (
          <VolumeX size={16} className="text-grey group-hover:text-white transition-colors" />
        )}
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Active Glow */}
      <AnimatePresence>
        {isEnabled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 bg-tato-blue/5 blur-md pointer-events-none"
          />
        )}
      </AnimatePresence>
    </button>
  );
}
