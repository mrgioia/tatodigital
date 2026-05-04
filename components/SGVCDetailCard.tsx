'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, AlertTriangle, Zap } from 'lucide-react';
import { useLanguage } from '../lib/language-context';
import StripeModal from './StripeModal';
import SGVCMockup from './SGVCMockup';

// ─── Stripe Embed Constants ─────────────────────────────────────────
const STRIPE_BUY_BUTTON_HTML = `<stripe-buy-button
  buy-button-id="buy_btn_1TTO8SDR1NWLojlpUbO0bLUr"
  publishable-key="pk_live_51SokkwDR1NWLojlptkSj56wU8pRgezIjXH7dwRNY6vEK5rOvQdqQYcDdYFWupa5bJmOiGOBl3ipEabHxqwbodKGq00cZlrhsbN"
></stripe-buy-button>`;

const STRIPE_PRICING_TABLE_HTML = `<stripe-pricing-table
  pricing-table-id="prctbl_1T6dReDR1NWLojlp7W7IY5RU"
  publishable-key="pk_live_51SokkwDR1NWLojlptkSj56wU8pRgezIjXH7dwRNY6vEK5rOvQdqQYcDdYFWupa5bJmOiGOBl3ipEabHxqwbodKGq00cZlrhsbN"
></stripe-pricing-table>`;

const STRIPE_BUY_BUTTON_SCRIPT = 'https://js.stripe.com/v3/buy-button.js';
const STRIPE_PRICING_TABLE_SCRIPT = 'https://js.stripe.com/v3/pricing-table.js';

export default function SGVCDetailCard() {
  const { t } = useLanguage();
  const [showImplantacao, setShowImplantacao] = useState(false);
  const [showMensalidades, setShowMensalidades] = useState(false);

  const sgvc = t.sgvcDetail;

  // Split main description into paragraphs (handles both real newlines and escaped ones from i18n)
  const paragraphs = sgvc.mainDescription
    .split(/\\n\\n|\n\n/)
    .filter((p: string) => p.trim().length > 0);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
        className="relative col-span-1 lg:col-span-2 bg-white/[0.02] rounded-[48px] border border-white/10 overflow-hidden"
      >
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-tato-blue/5 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-frozen-lake/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none" />

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          {/* Product Label */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-frozen-lake" />
            <span className="text-[10px] font-mono font-black text-frozen-lake uppercase tracking-[0.4em]">
              {sgvc.productLabel}
            </span>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Content */}
            <div className="space-y-10">
              {/* Title & Subtitle */}
              <div className="space-y-3">
                <h3 className="text-5xl md:text-7xl font-display font-black text-white italic tracking-tighter">
                  SGVC
                </h3>
                <p className="text-xl md:text-2xl font-display font-bold text-frozen-lake/90 tracking-tight leading-tight">
                  {t.products.items.find((i: any) => i.id === 'sgvc')?.subtitle}
                </p>
              </div>

              {/* Short intro */}
              <p className="text-lg md:text-xl text-porcelain/70 font-medium leading-relaxed">
                {sgvc.introShort}
              </p>

              {/* Main description */}
              <div className="space-y-4">
                {paragraphs.map((paragraph: string, i: number) => (
                  <p key={i} className="text-base text-porcelain/60 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Problems + Deliverables — side by side on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                {/* Problems Section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-display font-black text-red-400/80 uppercase tracking-[0.2em] flex items-center gap-3">
                    <AlertTriangle size={16} className="text-red-400/60" />
                    {sgvc.problemsTitle}
                  </h4>
                  <div className="space-y-3 pl-1">
                    {sgvc.problems.map((problem: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-porcelain/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400/40 mt-1.5 shrink-0" />
                        {problem}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables Section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-display font-black text-frozen-lake/80 uppercase tracking-[0.2em] flex items-center gap-3">
                    <Zap size={16} className="text-frozen-lake/60" />
                    {sgvc.deliverablesTitle}
                  </h4>
                  <div className="space-y-3 pl-1">
                    {sgvc.deliverables.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-display font-bold text-porcelain/80">
                        <div className="w-5 h-5 rounded-full bg-frozen-lake/10 flex items-center justify-center text-frozen-lake shrink-0">
                          <Check size={12} strokeWidth={4} />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Buttons — directly below both blocks */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {/* Primary: IMPLANTAÇÃO */}
                <button
                  onClick={() => setShowImplantacao(true)}
                  data-cursor="expand"
                  className="group relative px-8 py-4 bg-tato-blue text-white font-display font-black text-sm uppercase tracking-[0.2em] rounded-xl hover:bg-frozen-lake hover:text-ink-black transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_30px_rgba(0,51,255,0.3)] hover:shadow-[0_0_40px_rgba(108,207,246,0.4)]"
                >
                  {sgvc.ctaImplantacao}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </button>

                {/* Secondary: MENSALIDADES */}
                <button
                  onClick={() => setShowMensalidades(true)}
                  data-cursor="hover"
                  className="group px-8 py-4 bg-white/5 border border-white/15 text-porcelain font-display font-black text-sm uppercase tracking-[0.2em] rounded-xl hover:bg-white/10 hover:border-frozen-lake/30 transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(108,207,246,0.05)] hover:shadow-[0_0_30px_rgba(108,207,246,0.15)]"
                >
                  {sgvc.ctaMensalidades}
                </button>
              </div>
            </div>

            {/* Right: SVG Mockup Illustration */}
            <div className="relative flex items-start justify-center lg:justify-end lg:pt-8">
              <div className="relative w-full max-w-xl">
                <SGVCMockup />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stripe Modals */}
      <StripeModal
        isOpen={showImplantacao}
        onClose={() => setShowImplantacao(false)}
        title={sgvc.modalImplantacaoTitle}
        intro={sgvc.modalImplantacaoIntro}
        stripeEmbed={STRIPE_BUY_BUTTON_HTML}
        stripeScript={STRIPE_BUY_BUTTON_SCRIPT}
      />

      <StripeModal
        isOpen={showMensalidades}
        onClose={() => setShowMensalidades(false)}
        title={sgvc.modalMensalidadesTitle}
        intro={sgvc.modalMensalidadesIntro}
        stripeEmbed={STRIPE_PRICING_TABLE_HTML}
        stripeScript={STRIPE_PRICING_TABLE_SCRIPT}
      />
    </>
  );
}
