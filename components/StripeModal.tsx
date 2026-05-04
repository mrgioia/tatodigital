'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface StripeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  intro: string;
  /** Raw HTML string containing the Stripe embed (buy-button or pricing-table) */
  stripeEmbed: string;
  /** Stripe script URL to load (buy-button.js or pricing-table.js) */
  stripeScript: string;
}

export default function StripeModal({ isOpen, onClose, title, intro, stripeEmbed, stripeScript }: StripeModalProps) {
  const embedRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef<Set<string>>(new Set());

  // Inject Stripe script when modal opens
  useEffect(() => {
    if (!isOpen) return;
    if (scriptLoaded.current.has(stripeScript)) return;

    // Check if script already exists in DOM
    const existingScript = document.querySelector(`script[src="${stripeScript}"]`);
    if (existingScript) {
      scriptLoaded.current.add(stripeScript);
      return;
    }

    const script = document.createElement('script');
    script.src = stripeScript;
    script.async = true;
    document.head.appendChild(script);
    scriptLoaded.current.add(stripeScript);

    return () => {
      // Don't remove script on cleanup — Stripe scripts should persist
    };
  }, [isOpen, stripeScript]);

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-ink-black/85 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#001618]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,51,255,0.12),0_0_160px_rgba(108,207,246,0.06)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Neon top accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-frozen-lake to-transparent opacity-80" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-grey hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>

            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[1px] bg-frozen-lake" />
                  <span className="text-[10px] font-mono font-black text-frozen-lake uppercase tracking-[0.4em]">
                    SGVC
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase italic tracking-tight">
                  {title}
                </h2>
              </div>

              {/* Intro text */}
              <p className="text-base md:text-lg text-porcelain/70 font-medium leading-relaxed mb-8 max-w-2xl">
                {intro}
              </p>

              {/* Stripe Embed */}
              <div
                ref={embedRef}
                className="stripe-embed-container min-h-[200px]"
                dangerouslySetInnerHTML={{ __html: stripeEmbed }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
