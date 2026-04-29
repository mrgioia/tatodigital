'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/lib/language-context';
import TypewriterHeader from '@/components/TypewriterHeader';
import { ExternalLink } from 'lucide-react';

import Image from 'next/image';

type Category = 'events' | 'health' | 'tech' | 'others' | 'all';

interface ClientItem {
  id: string;
  number: number;
  symbol: string;
  name: string;
  category: Category;
  mass: string;
  domain?: string;
  logo?: string;
}

export default function ClientGrid() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<Category>('all');
  const [cols, setCols] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCols(2);
      else if (window.innerWidth < 1024) setCols(3);
      else setCols(6);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items: ClientItem[] = useMemo(() => t?.clients?.items || [], [t]);

  const categories = [
    { key: 'all', color: 'rgba(255, 255, 255, 0.4)' },
    { key: 'events', color: '#B026FF' },
    { key: 'health', color: '#00FFFF' },
    { key: 'tech', color: '#0033FF' },
    { key: 'others', color: '#39FF14' }
  ];

  const gridItems = useMemo(() => {
    // 1. Sort items by category for the "All" view to keep clusters together
    const categoryOrder: Category[] = ['events', 'health', 'tech', 'others'];
    const sorted = [...items].sort((a, b) => {
      return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    });

    // 2. Define standard clustered layout positions
    const allPositions: Record<string, { r: number, c: number }> = {
      // Events cluster (Row 1-2, Col 1-3)
      'lolla': { r: 1, c: 1 },
      'rir': { r: 1, c: 2 },
      'rirl': { r: 1, c: 3 },
      'tt': { r: 2, c: 1 },
      'nb': { r: 2, c: 2 },
      // Health cluster (Row 1-2, Col 4-6)
      'eb': { r: 1, c: 5 },
      'ec': { r: 1, c: 6 },
      'es': { r: 2, c: 5 },
      // Tech cluster (Row 3, Col 1-3)
      'rappi_c': { r: 3, c: 1 },
      'joinup': { r: 3, c: 2 },
      // Others cluster (Row 3, Col 5-6)
      'bs': { r: 3, c: 5 },
      'ct': { r: 3, c: 6 }
    };

    // 3. Define filtered layout positions
    const getFilteredPos = (index: number) => {
      const r = Math.floor(index / cols) + 1;
      const c = (index % cols) + 1;
      return { r, c };
    };

    const filteredItems = filter === 'all' 
      ? sorted 
      : sorted.filter(item => item.category === filter);

    return items.map((item) => {
      let currentPos;
      if (filter === 'all') {
        currentPos = allPositions[item.id] || { r: 4, c: 1 };
      } else if (item.category === filter) {
        const idx = filteredItems.findIndex(fi => fi.id === item.id);
        currentPos = getFilteredPos(idx);
      } else {
        // Just keep it somewhere or it will be hidden anyway
        currentPos = allPositions[item.id] || { r: 4, c: 1 };
      }

      return {
        ...item,
        pos: currentPos
      };
    });
  }, [items, filter, cols]);

  if (!t?.clients) return null;

  const clientKeywords = language === 'pt' ? ['Marcas', 'clareza', 'estratégia'] : ['Brands', 'clarity', 'strategy'];

  return (
    <div className="space-y-24">
      {/* Header Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-frozen-lake/30" />
          <span className="text-xs font-mono font-black text-frozen-lake uppercase tracking-[0.6em]">{t.clients.label}</span>
        </div>
        <div className="max-w-4xl">
          <TypewriterHeader 
            text={t.clients.title}
            keywords={clientKeywords}
            className="text-[clamp(2.2rem,7vw,5rem)] font-display font-black leading-[0.9] text-white uppercase italic tracking-tighter"
            highlightColor="purple"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 items-center pt-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key as Category)}
              data-cursor="hover"
              className={`
                group relative flex items-center gap-3 px-6 py-2.5 rounded-full border transition-all duration-700
                ${filter === cat.key 
                  ? 'bg-white/5 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                  : 'border-white/5 hover:border-white/10 opacity-40 hover:opacity-100'
                }
              `}
            >
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ 
                  backgroundColor: cat.color, 
                  boxShadow: filter === cat.key ? `0 0 15px ${cat.color}` : 'none' 
                }} 
              />
              <span className="text-[11px] md:text-xs font-mono font-black text-white uppercase tracking-widest leading-none">
                {(t.clients.filters as any)[cat.key]}
              </span>
              {filter === cat.key && (
                <motion.div 
                  layoutId="filter-glow"
                  className="absolute inset-0 rounded-full bg-white/5 pointer-events-none"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Periodic Table Grid */}
      <div className="relative">
        <div className="absolute -inset-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 lg:auto-rows-fr">
          <AnimatePresence mode="popLayout">
            {gridItems.map((client) => {
              const isFiltered = filter === 'all' || client.category === filter;
              return (
                <div 
                  key={client.id}
                  className="contents lg:block"
                  style={{ 
                    gridRow: cols === 6 ? client.pos.r : 'auto',
                    gridColumn: cols === 6 ? client.pos.c : 'auto'
                  }}
                >
                  <PeriodicElement 
                    client={client}
                    isActive={isFiltered}
                  />
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function PeriodicElement({ client, isActive }: { client: ClientItem; isActive: boolean }) {
  const { t, language } = useLanguage();
  const { category, symbol, number, name, mass, domain: clientDomain, logo: clientLogo } = client;

  // Local mapping fallback if domain is not in i18n
  const domains: Record<string, string> = {
    'lolla': 'lollapalooza.com',
    'rir': 'rockinrio.com.br',
    'rirl': 'rockinrio.com',
    'tt': 'thetown.com.br',
    'nb': 'natalbrasilidade.com.br',
    'eb': 'emagrecentro.com.br',
    'ec': 'emagrecentro.com.br',
    'es': 'emagrecentro.com.br',
    'rappi_c': 'rappi.com',
    'joinup': 'joinup.com.br',
    'ct': 'cervejatropi.com.br'
  };
  
  const domain = clientDomain || domains[client.id];
  const logoUrl = clientLogo || (domain ? `https://logo.clearbit.com/${domain}?size=128` : null);
  
  const colors = {
    events: { hex: '#B026FF', bg: 'rgba(176, 38, 255, 0.1)', border: 'rgba(176, 38, 255, 0.2)', glow: 'rgba(176, 38, 255, 0.6)' },
    health: { hex: '#00FFFF', bg: 'rgba(0, 255, 255, 0.1)', border: 'rgba(0, 255, 255, 0.2)', glow: 'rgba(0, 255, 255, 0.6)' },
    tech: { hex: '#0033FF', bg: 'rgba(0, 51, 255, 0.1)', border: 'rgba(0, 51, 255, 0.2)', glow: 'rgba(0, 51, 255, 0.6)' },
    others: { hex: '#39FF14', bg: 'rgba(57, 255, 20, 0.1)', border: 'rgba(57, 255, 20, 0.2)', glow: 'rgba(57, 255, 20, 0.6)' },
    all: { hex: '#FFFFFF', bg: 'rgba(255, 255, 255, 0.1)', border: 'rgba(255, 255, 255, 0.2)', glow: 'rgba(255, 255, 255, 0.6)' }
  };

  const style = colors[category as keyof typeof colors] || colors.others;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.05,
        scale: isActive ? 1 : 0.95,
        filter: isActive ? 'blur(0px)' : 'blur(4px)'
      }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      data-cursor={isActive ? "view" : undefined}
      className={`
        relative group aspect-square rounded-2xl border-px transition-all duration-700
        overflow-hidden flex flex-col p-5 md:p-7
        ${isActive ? 'cursor-pointer' : 'pointer-events-none'}
      `}
      style={{
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
        borderColor: isActive ? style.border : 'rgba(255, 255, 255, 0.03)',
        boxShadow: isActive ? 'inset 0 0 40px rgba(0,0,0,0.5)' : 'none'
      }}
    >
      {/* Top Details */}
      <div className="flex justify-between items-start relative z-10">
        <span className="text-[11px] font-mono font-bold text-white/40 leading-none group-hover:text-white transition-colors">
          {number.toString().padStart(2, '0')}
        </span>
        <div className="flex items-center gap-2">
            <span className="text-[8px] font-mono font-black text-white/20 uppercase tracking-widest">{(t.clients.filters as any)[category]?.slice(0, 3)}</span>
            <div 
              className="w-1.5 h-1.5 rounded-full" 
              style={{ 
                backgroundColor: style.hex,
                boxShadow: `0 0 10px ${style.hex}`
              }} 
            />
        </div>
      </div>

      {/* Main Content (Symbol & Logo) */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <motion.div 
          className="text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter opacity-100 group-hover:opacity-0 transition-opacity duration-500"
          style={{ 
            color: style.hex,
            filter: `drop-shadow(0 0 15px ${style.glow})`
          }}
        >
          {symbol}
        </motion.div>
        
        {/* Subtle Logo in background or center */}
        {logoUrl && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-1">
                <div className="relative w-full h-full opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 grayscale group-hover:grayscale-0">
                    <Image 
                        src={logoUrl} 
                        alt={name}
                        fill
                        unoptimized
                        className="object-contain"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                    />
                </div>
            </div>
        )}

        {!logoUrl && (
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                <span className="text-[8px] font-mono font-black border border-white/20 px-2 py-1 rounded">{language === 'pt' ? 'ATIVO_MARCA' : 'BRAND_ASSET'}</span>
             </div>
        )}
      </div>

      {/* Bottom Details */}
      <div className="mt-auto flex justify-between items-end relative z-10 pt-4">
        <div className="flex flex-col">
           <span className="text-[10px] md:text-[12px] font-mono font-black text-white uppercase tracking-tight leading-none group-hover:text-neon-cyan transition-colors duration-500">
             {name}
           </span>
           <span className="text-[7px] font-mono font-bold text-white/20 uppercase mt-1">
             {(t.clients.filters as any)[category]}
           </span>
        </div>
        <div className="flex flex-col items-end">
             <span className="text-[9px] font-mono text-white/40">{mass}</span>
             <div className="w-4 h-[1px] mt-1 bg-white/20 group-hover:w-8 group-hover:bg-white transition-all duration-500" />
        </div>
      </div>

      {/* Glossy Overlay */}
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Interactive Shine */}
      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
    </motion.div>
  );
}
