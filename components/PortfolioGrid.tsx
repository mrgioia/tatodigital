'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import BioModal from './BioModal';

export default function PortfolioGrid() {
  const { t } = useLanguage();
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {t.portfolio.cases.map((item: any, i: number) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: i * 0.1 }}
          onClick={() => {
            if (item.id === 'rockworld') setIsBioModalOpen(true);
          }}
          data-cursor={item.id === 'rockworld' ? 'expand' : 'view'}
          data-cursor-label={item.id === 'rockworld' ? t.portfolio.cursorDetails : t.portfolio.cursorGoal}
          className={`group relative h-[600px] rounded-[64px] border border-white/5 bg-deep-petrol overflow-hidden flex flex-col p-12 transition-all duration-1000 hover:border-frozen-lake/20 shadow-2xl ${
            item.id === 'rockworld' ? 'cursor-pointer' : ''
          }`}
        >
          {/* Visual Canvas (Abstract Mesh) */}
          <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
             <div className="absolute inset-0 bg-gradient-to-br from-tato-blue/40 to-transparent blur-3xl opacity-50 group-hover:scale-125 transition-transform duration-[4s]" />
             <div 
               className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-1000" 
               style={{ 
                 backgroundImage: `url('${item.image || `https://picsum.photos/seed/${item.id}/1200/900`}')` 
               }}
             />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="relative z-10 flex flex-col h-full gap-8">
            <div className="flex justify-between items-start">
               <div className="px-4 py-1.5 rounded-full border border-white/20 glass text-[10px] font-mono font-black text-white uppercase tracking-widest">
                  {item.client}
               </div>
               <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-xl group-hover:bg-porcelain group-hover:text-ink-black group-hover:border-transparent transition-all duration-700">
                  <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </div>
            </div>

            <div className="mt-auto space-y-6">
              <h3 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter leading-[1.1] uppercase italic">
                {item.title}
              </h3>
              <p className="text-porcelain/60 text-lg md:text-xl font-medium leading-relaxed max-w-xl group-hover:text-porcelain transition-colors">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {item.tags.map((tag: string) => (
                  <span key={tag} className="text-[10px] font-mono font-bold text-grey/60 uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      <BioModal 
        isOpen={isBioModalOpen} 
        onClose={() => setIsBioModalOpen(false)} 
      />
    </div>
  );
}
