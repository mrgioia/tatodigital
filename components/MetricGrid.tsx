'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/lib/language-context';

export default function MetricGrid() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {t.metrics.map((metric: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-12 glass-card rounded-[40px] text-center space-y-4 group hover:border-frozen-lake/30 transition-all duration-700"
          data-cursor="hover"
        >
          <div className="text-4xl md:text-6xl font-display font-black text-white italic tracking-tighter group-hover:text-frozen-lake transition-colors">
            {metric.value}
          </div>
          <div className="text-[10px] font-mono font-black text-grey uppercase tracking-[0.3em]">
            {metric.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
