'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import TypewriterHeader from '@/components/TypewriterHeader';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { useContactModal } from '@/context/ContactModalProvider';

export default function Hero() {
  const { t, language } = useLanguage();
  const { openModal } = useContactModal();
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Alternating words logic
  const [tagIndex, setTagIndex] = useState(0);
  const tags = t?.hero?.tags || [];

  useEffect(() => {
    if (tags.length === 0) return;
    const timer = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % tags.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [tags.length]);

  const heroKeywords = language === 'pt' 
    ? ['operações', 'complexas', 'produtos', 'digitais', 'inteligentes']
    : ['complex', 'operations', 'intelligent', 'digital', 'products'];

  return (
    <section className="relative flex flex-col items-center justify-center pt-[var(--header-height)] overflow-hidden" style={{ minHeight: '100dvh' }}>
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-tato-blue/10 blur-[180px] rounded-full opacity-40 animate-pulse" />
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-frozen-lake/5 blur-[150px] rounded-full opacity-20" />
        {/* Technical Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: `80px 80px`
          }} 
        />
      </div>

      <motion.div 
        style={{ y: y1, opacity }}
        className="container relative z-10 mx-auto px-6 max-w-[1400px] flex flex-col items-center text-center"
      >
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] md:text-xs font-mono font-black text-neon-cyan uppercase tracking-[0.3em] neon-glow-cyan">
              Digital Transformation Studio
            </span>
            <div className="h-20 w-[1px] bg-gradient-to-b from-neon-cyan to-transparent shadow-[0_0_10px_#00FFFF]" />
          </div>
        </motion.div>

        {/* Headline with Neon & Digital Effect */}
        <div className="flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto">
          <TypewriterHeader 
            text={t.hero.headline}
            keywords={heroKeywords}
            as="h1"
            className="text-[clamp(2rem,6vw,5.5rem)] font-display font-black text-center text-white uppercase italic leading-[0.95] tracking-tighter"
            highlightColor="cyan"
          />
          
          <div className="text-neon-cyan neon-glow-cyan italic flex items-center justify-center gap-8 min-h-[clamp(4rem,10vw,8rem)] text-[clamp(2.5rem,8vw,7.5rem)] font-display font-black">
            <AnimatePresence mode="wait">
              <motion.span
                key={tagIndex}
                initial={{ opacity: 0, scale: 0.9, y: 10, filter: 'blur(8px)' }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0, 
                  filter: 'blur(0px)',
                  transition: { duration: 0.5, ease: "easeOut" }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 1.1,
                  y: -10, 
                  filter: 'blur(8px)',
                  transition: { duration: 0.3 }
                }}
                className="inline-block hover:animate-glitch"
                style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.8)' }}
              >
                {t.hero.tags[tagIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Main Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-xl text-base md:text-lg text-porcelain/85 leading-relaxed font-medium mb-10"
        >
          {t.hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-8 items-center"
        >
          <button 
            data-cursor="expand"
            onClick={() => openModal({ intent: 'fale_com_a_tato', source: 'hero_cta' })}
            className="group relative px-10 py-5 bg-neon-cyan text-ink-black font-display font-black text-sm uppercase tracking-widest rounded-none transition-all duration-500 hover:bg-white hover:shadow-[0_0_40px_rgba(0,255,255,0.6)] active:scale-95 flex items-center gap-3 overflow-hidden border border-neon-cyan"
          >
            <span className="relative z-10">{t.hero.ctaPrimary}</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
          
          <button 
            data-cursor="hover"
            onClick={() => openModal({ intent: 'estruturar_operacao', source: 'hero_cta' })}
            className="group px-10 py-5 bg-white/5 text-porcelain font-display font-bold text-sm uppercase tracking-widest border border-white/10 rounded-none hover:border-neon-cyan hover:text-neon-cyan transition-all active:scale-95 flex items-center gap-3"
          >
            {t.hero.ctaSecondary}
            <div className="w-2 h-2 rounded-full bg-neon-cyan group-hover:scale-150 transition-transform shadow-[0_0_10px_#00FFFF]" />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-grey/40"
      >
        <span className="text-[8px] font-mono tracking-[0.5em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
