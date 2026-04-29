'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import Image from 'next/image';

import { AudioKeyword } from './AudioKeyword';

interface BioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BioModal({ isOpen, onClose }: BioModalProps) {
  const { t } = useLanguage();

  const parseHighlight = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const keywordText = part.slice(2, -2);
        return <AudioKeyword key={i} text={keywordText} />;
      }
      return part;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              className="bg-deep-petrol w-full max-w-7xl h-[90vh] overflow-hidden rounded-[48px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col md:flex-row"
            >
              {/* Left Side: Fixed Image */}
              <div className="relative w-full md:w-2/5 h-64 md:h-auto border-b md:border-b-0 md:border-r border-white/10 bg-black/20 overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/d/1t1510PzYyTpStgyar4u_iTuvE-eYR5Ya"
                  alt="Operational Badges"
                  fill
                  className="object-cover opacity-80"
                  priority
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-deep-petrol/60 via-transparent to-transparent" />
                
                {/* Close Button on Mobile (Inside Image Area) */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 md:hidden w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 z-10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Right Side: Scrollable Content */}
              <div className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
                {/* Header */}
                <div className="p-8 md:px-12 md:py-10 border-b border-white/5 flex justify-between items-center shrink-0">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-black text-frozen-lake uppercase tracking-widest">
                      {t.portfolio.modalLabel}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-display font-black text-white uppercase italic tracking-tighter leading-none">
                      {t.portfolio.cases.find((c: any) => c.id === 'rockworld')?.title}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="hidden md:flex w-14 h-14 rounded-full bg-white/5 items-center justify-center text-white hover:bg-frozen-lake hover:text-ink-black transition-all duration-500 border border-white/5"
                    aria-label="Close"
                  >
                    <X size={28} />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                  <div className="max-w-3xl space-y-10">
                    {t.renato.bio.map((paragraph: string, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="text-lg md:text-2xl text-porcelain/90 leading-relaxed font-medium"
                      >
                        {parseHighlight(paragraph)}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer Tags */}
                <div className="p-8 md:px-12 border-t border-white/5 bg-white/[0.01] shrink-0">
                  <div className="flex flex-wrap gap-3">
                    {t.portfolio.cases.find((c: any) => c.id === 'rockworld')?.tags.map((tag: string) => (
                      <span key={tag} className="text-[11px] font-mono font-black text-white/40 border border-white/5 px-4 py-1.5 rounded-full uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
