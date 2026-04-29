'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/lib/language-context';
import { useContactModal } from '@/context/ContactModalProvider';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Language } from '@/lib/i18n';
import AudioToggle from './AudioToggle';

const navLinks = [
  { nameKey: 'home', href: '/' },
  { nameKey: 'solutions', href: '#solutions' },
  { nameKey: 'clients', href: '#clients' },
  { nameKey: 'products', href: '#products' },
  { nameKey: 'method', href: '#method' },
  { nameKey: 'portfolio', href: '#portfolio' },
  { nameKey: 'about', href: '#about' },
  { nameKey: 'contact', href: '#contact' },
];

interface LanguageToggleProps {
  className?: string;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageToggle = ({ className = "", language, setLanguage }: LanguageToggleProps) => (
  <div className={`flex flex-nowrap bg-white/5 rounded-full p-1 border border-white/10 ${className}`}>
    <button
      onClick={() => setLanguage('pt')}
      data-cursor="hover"
      className={`px-3 py-1 rounded-full text-[9px] font-black transition-all duration-300 whitespace-nowrap ${
        language === 'pt' ? 'bg-frozen-lake text-ink-black shadow-[0_0_15px_rgba(108,207,246,0.3)]' : 'text-grey hover:text-white'
      }`}
    >
      PT
    </button>
    <button
      onClick={() => setLanguage('en')}
      data-cursor="hover"
      className={`px-3 py-1 rounded-full text-[9px] font-black transition-all duration-300 whitespace-nowrap ${
        language === 'en' ? 'bg-frozen-lake text-ink-black shadow-[0_0_15px_rgba(108,207,246,0.3)]' : 'text-grey hover:text-white'
      }`}
    >
      EN
    </button>
  </div>
);

interface CTAButtonProps {
  className?: string;
  text: string;
  source?: string;
  onClick?: () => void;
}

const CTAButton = ({ className = "", text, source = 'navbar', onClick }: CTAButtonProps) => {
  const { openModal } = useContactModal();
  return (
    <button
      data-cursor="expand"
      onClick={() => {
        if (onClick) onClick();
        openModal({ intent: 'fale_com_a_tato', source });
      }}
      className={`px-6 py-2.5 rounded-full bg-tato-blue text-porcelain font-display font-bold text-[10px] sm:text-xs uppercase tracking-widest hover:bg-frozen-lake hover:text-ink-black transition-all duration-500 shadow-[0_10px_20px_rgba(0,51,255,0.2)] active:scale-95 whitespace-nowrap ${className}`}
    >
      {text}
    </button>
  );
};

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'solutions', 'clients', 'products', 'method', 'portfolio', 'about', 'contact'];
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close menu on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent scroll when menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 sm:px-6 md:px-10 ${
          isScrolled || isMenuOpen ? 'bg-ink-black/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          {/* Logo Section */}
          <Link href="#home" className="flex items-center gap-2 sm:gap-2 md:gap-3 group shrink-0" data-cursor="hover">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-tr from-tato-blue to-frozen-lake flex items-center justify-center p-0.5 group-hover:rotate-[360deg] transition-transform duration-1000 overflow-hidden">
              <div className="relative w-full h-full bg-ink-black rounded-[6px] flex items-center justify-center overflow-hidden">
                <Image 
                  src="https://lh3.googleusercontent.com/d/1gkUU4cmXI1rMSRs0FRcyRnDf-2BOfexB"
                  alt="Tato Logo"
                  fill
                  className="object-contain p-0.5"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            {/* Wordmark - Scaled for Desktop, Tablet, Mobile */}
            <div className="relative h-8 w-24 sm:h-10 sm:w-28 md:h-14 md:w-48">
              <Image 
                src="https://lh3.googleusercontent.com/d/1qixjD_u3wHQm_fAzfFJeQR9NwIcRJ3xg"
                alt="Tato Digital"
                fill
                className="object-contain object-left"
                referrerPolicy="no-referrer"
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu - Hidden on Tablet & Mobile */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '') || (link.href === '/' && activeSection === 'home');
              return (
                <Link
                  key={link.nameKey}
                  href={link.href === '/' ? '#home' : link.href}
                  data-cursor="hover"
                  className={`text-[10px] xl:text-[11px] font-display font-bold tracking-[0.2em] transition-colors uppercase relative group ${
                    isActive ? 'text-frozen-lake' : 'text-grey hover:text-white'
                  }`}
                >
                  {t.nav[link.nameKey]}
                  <motion.span 
                    layoutId="navUnderline"
                    className={`absolute -bottom-1 left-0 h-px bg-frozen-lake ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            {/* Audio Toggle - Desktop Only */}
            <AudioToggle />

            {/* Lang Toggle - Hidden on Mobile, Shown on Tablet & Desktop */}
            <LanguageToggle className="hidden sm:flex" language={language} setLanguage={setLanguage} />

            {/* CTA - Hidden on Mobile, Shown on Tablet(if small font) & Desktop */}
            <CTAButton className="hidden md:flex" text={t.nav.cta} />
            <CTAButton className="hidden sm:flex md:hidden text-[9px] px-4" text={t.nav.cta} />

            {/* Hamburger - Shown on Tablet & Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors active:scale-95"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-ink-black/60 backdrop-blur-sm z-[51] lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-ink-black/95 backdrop-blur-2xl border-l border-white/5 z-[52] lg:hidden flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-grey">Menu</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/5 hover:bg-white/5 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-6 overflow-y-auto pb-8">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.nameKey}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      href={link.href === '/' ? '#home' : link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center justify-between py-2 group ${
                        activeSection === (link.href === '/' ? 'home' : link.href.replace('#', ''))
                          ? 'text-frozen-lake'
                          : 'text-porcelain/60'
                      }`}
                    >
                      <span className="text-lg font-display font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                        {t.nav[link.nameKey]}
                      </span>
                      <ChevronRight size={16} className={`opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 ${
                        activeSection === (link.href === '/' ? 'home' : link.href.replace('#', '')) ? 'opacity-100 translate-x-0' : ''
                      }`} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-white/5 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-display font-bold tracking-[0.2em] uppercase text-grey">Idioma / Language</span>
                  <LanguageToggle language={language} setLanguage={setLanguage} />
                </div>
                
                <CTAButton className="w-full text-center py-4" text={t.nav.cta} source="mobile_menu" onClick={() => setIsMenuOpen(false)} />
                
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] text-grey font-medium uppercase tracking-widest">{t.footer.contactText}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
