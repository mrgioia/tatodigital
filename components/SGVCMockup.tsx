'use client';

import React from 'react';
import { motion } from 'motion/react';

/**
 * Premium SVG-based dashboard mockup for the SGVC product showcase.
 * Renders a desktop monitor with a financial dashboard and a floating mobile device.
 * Fully vector — crisp at any resolution.
 */
export default function SGVCMockup() {
  return (
    <div className="relative w-full aspect-[4/3]">
      {/* Background glow */}
      <div className="absolute inset-0 bg-frozen-lake/[0.03] blur-[60px] rounded-full pointer-events-none" />

      {/* Desktop Monitor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full h-full"
      >
        <svg viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Monitor frame */}
          <rect x="32" y="16" width="576" height="340" rx="12" fill="#001218" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          
          {/* Screen bezel highlight */}
          <rect x="32" y="16" width="576" height="1" fill="url(#screenGlow)" opacity="0.6" />

          {/* Monitor stand */}
          <path d="M280 356 L360 356 L370 400 L270 400 Z" fill="#001218" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <rect x="260" y="398" width="120" height="6" rx="3" fill="#001218" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* ─── Dashboard Content ─── */}
          {/* Sidebar */}
          <rect x="40" y="24" width="48" height="324" rx="6" fill="rgba(255,255,255,0.02)" />
          <circle cx="64" cy="48" r="6" fill="rgba(108,207,246,0.3)" />
          <rect x="56" y="68" width="16" height="2" rx="1" fill="rgba(255,255,255,0.15)" />
          <rect x="56" y="82" width="16" height="2" rx="1" fill="rgba(255,255,255,0.08)" />
          <rect x="56" y="96" width="16" height="2" rx="1" fill="rgba(255,255,255,0.08)" />
          <rect x="56" y="110" width="16" height="2" rx="1" fill="rgba(255,255,255,0.08)" />
          <rect x="56" y="124" width="16" height="2" rx="1" fill="rgba(255,255,255,0.08)" />

          {/* Header bar */}
          <rect x="96" y="24" width="504" height="32" rx="0" fill="rgba(255,255,255,0.015)" />
          <text x="108" y="44" fill="rgba(108,207,246,0.9)" fontSize="11" fontWeight="900" fontFamily="var(--font-display), sans-serif" letterSpacing="0.1em">SGVC</text>
          <text x="160" y="44" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="var(--font-mono), monospace" letterSpacing="0.05em">Dashboard</text>
          <circle cx="572" cy="40" r="8" fill="rgba(108,207,246,0.15)" stroke="rgba(108,207,246,0.3)" strokeWidth="0.5" />

          {/* ── KPI Cards Row ── */}
          {/* Revenue Card */}
          <rect x="96" y="64" width="120" height="60" rx="8" fill="rgba(108,207,246,0.06)" stroke="rgba(108,207,246,0.15)" strokeWidth="0.5" />
          <text x="108" y="80" fill="rgba(108,207,246,0.6)" fontSize="6" fontFamily="var(--font-mono), monospace" letterSpacing="0.1em">FATURAMENTO</text>
          <text x="108" y="104" fill="rgba(255,255,255,0.9)" fontSize="16" fontWeight="900" fontFamily="var(--font-display), sans-serif">R$ 187.4K</text>
          <text x="108" y="116" fill="rgba(152,206,0,0.7)" fontSize="7" fontFamily="var(--font-mono), monospace">▲ +12.3%</text>

          {/* Expense Card */}
          <rect x="224" y="64" width="120" height="60" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          <text x="236" y="80" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="var(--font-mono), monospace" letterSpacing="0.1em">DESPESAS</text>
          <text x="236" y="104" fill="rgba(255,255,255,0.8)" fontSize="16" fontWeight="900" fontFamily="var(--font-display), sans-serif">R$ 94.2K</text>
          <text x="236" y="116" fill="rgba(255,100,100,0.6)" fontSize="7" fontFamily="var(--font-mono), monospace">▼ -3.1%</text>

          {/* Margin Card */}
          <rect x="352" y="64" width="120" height="60" rx="8" fill="rgba(152,206,0,0.04)" stroke="rgba(152,206,0,0.12)" strokeWidth="0.5" />
          <text x="364" y="80" fill="rgba(152,206,0,0.6)" fontSize="6" fontFamily="var(--font-mono), monospace" letterSpacing="0.1em">MARGEM</text>
          <text x="364" y="104" fill="rgba(152,206,0,0.9)" fontSize="16" fontWeight="900" fontFamily="var(--font-display), sans-serif">49.7%</text>
          <text x="364" y="116" fill="rgba(152,206,0,0.5)" fontSize="7" fontFamily="var(--font-mono), monospace">▲ +2.4pp</text>

          {/* Cash Flow Card */}
          <rect x="480" y="64" width="120" height="60" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          <text x="492" y="80" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="var(--font-mono), monospace" letterSpacing="0.1em">FLUXO DE CAIXA</text>
          <text x="492" y="104" fill="rgba(255,255,255,0.8)" fontSize="16" fontWeight="900" fontFamily="var(--font-display), sans-serif">R$ 93.2K</text>
          <text x="492" y="116" fill="rgba(108,207,246,0.6)" fontSize="7" fontFamily="var(--font-mono), monospace">◆ Saudável</text>

          {/* ── Line Chart ── */}
          <rect x="96" y="136" width="248" height="120" rx="8" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <text x="108" y="154" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="var(--font-mono), monospace" letterSpacing="0.08em">RECEITA MENSAL</text>

          {/* Grid lines */}
          <line x1="108" y1="170" x2="332" y2="170" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          <line x1="108" y1="192" x2="332" y2="192" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          <line x1="108" y1="214" x2="332" y2="214" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          <line x1="108" y1="236" x2="332" y2="236" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

          {/* Line chart path */}
          <path d="M112 230 L140 220 L168 225 L196 210 L224 195 L252 185 L280 175 L308 168 L332 165" stroke="rgba(108,207,246,0.8)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Area fill */}
          <path d="M112 230 L140 220 L168 225 L196 210 L224 195 L252 185 L280 175 L308 168 L332 165 L332 244 L112 244 Z" fill="url(#areaGradient)" />

          {/* ── Bar Chart ── */}
          <rect x="352" y="136" width="248" height="120" rx="8" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <text x="364" y="154" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="var(--font-mono), monospace" letterSpacing="0.08em">COMPARATIVO MENSAL</text>

          {/* Bar groups */}
          <rect x="374" y="200" width="12" height="44" rx="2" fill="rgba(108,207,246,0.5)" />
          <rect x="390" y="210" width="12" height="34" rx="2" fill="rgba(0,51,255,0.5)" />

          <rect x="414" y="190" width="12" height="54" rx="2" fill="rgba(108,207,246,0.5)" />
          <rect x="430" y="205" width="12" height="39" rx="2" fill="rgba(0,51,255,0.5)" />

          <rect x="454" y="185" width="12" height="59" rx="2" fill="rgba(108,207,246,0.5)" />
          <rect x="470" y="195" width="12" height="49" rx="2" fill="rgba(0,51,255,0.5)" />

          <rect x="494" y="175" width="12" height="69" rx="2" fill="rgba(108,207,246,0.6)" />
          <rect x="510" y="190" width="12" height="54" rx="2" fill="rgba(0,51,255,0.5)" />

          <rect x="534" y="170" width="12" height="74" rx="2" fill="rgba(108,207,246,0.7)" />
          <rect x="550" y="185" width="12" height="59" rx="2" fill="rgba(0,51,255,0.6)" />

          <rect x="574" y="168" width="12" height="76" rx="2" fill="rgba(108,207,246,0.8)" />
          <rect x="590" y="180" width="12" height="64" rx="2" fill="rgba(0,51,255,0.7)" />

          {/* ── Bottom row: Donut + Table ── */}
          {/* Donut Chart */}
          <rect x="96" y="268" width="160" height="72" rx="8" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <text x="108" y="286" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="var(--font-mono), monospace" letterSpacing="0.08em">DESPESAS</text>

          <circle cx="152" cy="318" r="18" fill="none" stroke="rgba(108,207,246,0.6)" strokeWidth="6" strokeDasharray="40 73" strokeDashoffset="0" />
          <circle cx="152" cy="318" r="18" fill="none" stroke="rgba(0,51,255,0.6)" strokeWidth="6" strokeDasharray="25 88" strokeDashoffset="-40" />
          <circle cx="152" cy="318" r="18" fill="none" stroke="rgba(176,38,255,0.5)" strokeWidth="6" strokeDasharray="20 93" strokeDashoffset="-65" />
          <circle cx="152" cy="318" r="18" fill="none" stroke="rgba(152,206,0,0.5)" strokeWidth="6" strokeDasharray="15 98" strokeDashoffset="-85" />

          {/* Legend dots */}
          <circle cx="196" cy="302" r="3" fill="rgba(108,207,246,0.6)" />
          <text x="204" y="305" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="var(--font-mono), monospace">Pessoal</text>
          <circle cx="196" cy="316" r="3" fill="rgba(0,51,255,0.6)" />
          <text x="204" y="319" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="var(--font-mono), monospace">Material</text>
          <circle cx="196" cy="330" r="3" fill="rgba(176,38,255,0.5)" />
          <text x="204" y="333" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="var(--font-mono), monospace">Marketing</text>

          {/* Mini table */}
          <rect x="264" y="268" width="336" height="72" rx="8" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <text x="276" y="286" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="var(--font-mono), monospace" letterSpacing="0.08em">TOP SERVIÇOS</text>
          
          <line x1="276" y1="296" x2="588" y2="296" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <text x="276" y="308" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="var(--font-mono), monospace">Avaliação Corporal</text>
          <text x="520" y="308" fill="rgba(108,207,246,0.7)" fontSize="7" fontWeight="700" fontFamily="var(--font-mono), monospace">R$ 42.800</text>
          
          <line x1="276" y1="314" x2="588" y2="314" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          <text x="276" y="326" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="var(--font-mono), monospace">Programa Emagrecimento</text>
          <text x="520" y="326" fill="rgba(108,207,246,0.7)" fontSize="7" fontWeight="700" fontFamily="var(--font-mono), monospace">R$ 38.200</text>
          
          <line x1="276" y1="332" x2="588" y2="332" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

          {/* ── Gradients ── */}
          <defs>
            <linearGradient id="screenGlow" x1="32" y1="16" x2="608" y2="16">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(108,207,246,0.6)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="220" y1="165" x2="220" y2="244" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(108,207,246,0.25)" />
              <stop offset="100%" stopColor="rgba(108,207,246,0)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ── Floating Mobile Device ── */}
      <motion.div
        initial={{ opacity: 0, y: 30, x: 10 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-[8%] right-[-4%] w-[35%] max-w-[180px]"
      >
        {/* Phone glow */}
        <div className="absolute -inset-3 bg-frozen-lake/10 blur-[30px] rounded-2xl pointer-events-none" />
        
        <svg viewBox="0 0 180 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,51,255,0.2)]">
          {/* Phone frame */}
          <rect x="2" y="2" width="176" height="316" rx="20" fill="#001218" stroke="rgba(108,207,246,0.2)" strokeWidth="1.5" />
          
          {/* Screen */}
          <rect x="8" y="28" width="164" height="272" rx="4" fill="#000d0e" />

          {/* Status bar */}
          <text x="20" y="20" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="var(--font-mono), monospace">12:45</text>
          <circle cx="156" cy="16" r="3" fill="rgba(152,206,0,0.5)" />

          {/* App header */}
          <rect x="8" y="28" width="164" height="28" fill="rgba(255,255,255,0.02)" />
          <text x="20" y="46" fill="rgba(108,207,246,0.9)" fontSize="10" fontWeight="900" fontFamily="var(--font-display), sans-serif" letterSpacing="0.08em">SGVC</text>
          <text x="70" y="46" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="var(--font-mono), monospace">Mobile</text>

          {/* ── Mobile KPI Cards ── */}
          {/* Revenue */}
          <rect x="16" y="64" width="72" height="48" rx="6" fill="rgba(108,207,246,0.06)" stroke="rgba(108,207,246,0.15)" strokeWidth="0.5" />
          <text x="24" y="76" fill="rgba(108,207,246,0.5)" fontSize="5" fontFamily="var(--font-mono), monospace" letterSpacing="0.08em">RECEITA</text>
          <text x="24" y="96" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="900" fontFamily="var(--font-display), sans-serif">187.4K</text>
          <text x="24" y="106" fill="rgba(152,206,0,0.6)" fontSize="5" fontFamily="var(--font-mono), monospace">▲ 12.3%</text>

          {/* Expenses */}
          <rect x="96" y="64" width="72" height="48" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          <text x="104" y="76" fill="rgba(255,255,255,0.35)" fontSize="5" fontFamily="var(--font-mono), monospace" letterSpacing="0.08em">DESPESAS</text>
          <text x="104" y="96" fill="rgba(255,255,255,0.8)" fontSize="12" fontWeight="900" fontFamily="var(--font-display), sans-serif">94.2K</text>
          <text x="104" y="106" fill="rgba(255,100,100,0.5)" fontSize="5" fontFamily="var(--font-mono), monospace">▼ 3.1%</text>

          {/* Margin */}
          <rect x="16" y="120" width="72" height="48" rx="6" fill="rgba(152,206,0,0.04)" stroke="rgba(152,206,0,0.12)" strokeWidth="0.5" />
          <text x="24" y="132" fill="rgba(152,206,0,0.5)" fontSize="5" fontFamily="var(--font-mono), monospace" letterSpacing="0.08em">MARGEM</text>
          <text x="24" y="152" fill="rgba(152,206,0,0.9)" fontSize="12" fontWeight="900" fontFamily="var(--font-display), sans-serif">49.7%</text>
          <text x="24" y="162" fill="rgba(152,206,0,0.5)" fontSize="5" fontFamily="var(--font-mono), monospace">▲ +2.4pp</text>

          {/* Cash Flow */}
          <rect x="96" y="120" width="72" height="48" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          <text x="104" y="132" fill="rgba(255,255,255,0.35)" fontSize="5" fontFamily="var(--font-mono), monospace" letterSpacing="0.08em">FLUXO CX</text>
          <text x="104" y="152" fill="rgba(255,255,255,0.8)" fontSize="12" fontWeight="900" fontFamily="var(--font-display), sans-serif">93.2K</text>
          <text x="104" y="162" fill="rgba(108,207,246,0.5)" fontSize="5" fontFamily="var(--font-mono), monospace">◆ Saudável</text>

          {/* ── Mini Line Chart ── */}
          <rect x="16" y="176" width="152" height="72" rx="6" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <text x="24" y="190" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="var(--font-mono), monospace" letterSpacing="0.08em">RECEITA 6M</text>
          
          <path d="M24 236 L44 228 L64 232 L84 220 L104 210 L124 204 L144 198 L160 195" stroke="rgba(108,207,246,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M24 236 L44 228 L64 232 L84 220 L104 210 L124 204 L144 198 L160 195 L160 242 L24 242 Z" fill="url(#mobileAreaGradient)" />

          {/* ── Quick actions ── */}
          <rect x="16" y="256" width="72" height="28" rx="6" fill="rgba(0,51,255,0.3)" stroke="rgba(0,51,255,0.4)" strokeWidth="0.5" />
          <text x="28" y="274" fill="rgba(255,255,255,0.8)" fontSize="6" fontWeight="700" fontFamily="var(--font-display), sans-serif" letterSpacing="0.05em">+ RECEITA</text>

          <rect x="96" y="256" width="72" height="28" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <text x="108" y="274" fill="rgba(255,255,255,0.5)" fontSize="6" fontWeight="700" fontFamily="var(--font-display), sans-serif" letterSpacing="0.05em">+ DESPESA</text>

          {/* Home indicator */}
          <rect x="64" y="306" width="52" height="4" rx="2" fill="rgba(255,255,255,0.15)" />

          <defs>
            <linearGradient id="mobileAreaGradient" x1="92" y1="195" x2="92" y2="242" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(108,207,246,0.2)" />
              <stop offset="100%" stopColor="rgba(108,207,246,0)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
