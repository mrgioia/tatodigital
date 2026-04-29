'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage, LanguageProvider } from '@/lib/language-context';
import { ContactModalProvider, useContactModal } from '@/context/ContactModalProvider';
import TatoCursor from '@/components/TatoCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PositioningStrip from '@/components/PositioningStrip';
import TransformationGrid from '@/components/TransformationGrid';
import GlowingCard from '@/components/GlowingCard';
import Section from '@/components/Section';
import TatoMethod from '@/components/TatoMethod';
import ProfessionalHub from '@/components/ProfessionalHub';
import PortfolioGrid from '@/components/PortfolioGrid';
import MetricGrid from '@/components/MetricGrid';
import Footer from '@/components/Footer';
import InteractiveBackground from '@/components/InteractiveBackground';
import ClientGrid from '@/components/ClientGrid';
import TypewriterHeader from '@/components/TypewriterHeader';
import SolutionDeck from '@/components/SolutionDeck';
import ContactModal from '@/components/ContactModal';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <LanguageProvider>
      <ContactModalProvider>
      <main className="min-h-screen selection:bg-frozen-lake selection:text-ink-black relative">
        <InteractiveBackground />
        
        <div className="relative z-[1]">
          <TatoCursor />
          <Navbar />
          
          {/* 1. HOME */}
          <section id="home" className="scroll-snap-start snap-always" style={{ scrollSnapAlign: 'start' }}>
            <Hero />
            <PositioningStrip />
          </section>
          
          {/* 2. SOLUTIONS */}
          <Section id="solutions" containerClass="max-w-[1600px] mx-auto w-full space-y-48">
             <SolutionsTable />
             <TransformationGrid />
          </Section>

          {/* 3. CLIENTS */}
          <Section id="clients">
             <ClientGrid />
          </Section>

          {/* 4. PRODUCTS */}
          <Section id="products">
             <ProductSectionHeader />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-24">
                <ProductCards />
             </div>
          </Section>

          {/* 5. METHOD */}
          <Section id="method">
             <TatoMethod />
          </Section>

          {/* 6. PORTFOLIO */}
          <Section id="portfolio">
             <PortfolioSectionHeader />
             <div className="mt-24">
                <PortfolioGrid />
             </div>
          </Section>

          {/* 7. ABOUT — Premium Professional Hub */}
          <ProfessionalHub />

          {/* 7b. MANIFESTO & METRICS */}
          <Section containerClass="max-w-[1600px] mx-auto w-full space-y-32">
             <ManifestoContent />
             <MetricGrid />
          </Section>

          {/* 8. CONTACT */}
          <div id="contact" className="scroll-snap-start snap-always" style={{ scrollSnapAlign: 'start' }}>
             <Section className="py-20!">
                <FinalCTA />
             </Section>
             <Footer />
          </div>
        </div>
        <ContactModal />
      </main>
      </ContactModalProvider>
    </LanguageProvider>
  );
}

function ProductSectionHeader() {
  const { t, language } = useLanguage();
  const productKeywords = language === 'pt' ? ['Escale', 'Plataformas', 'Dashboards'] : ['Scale', 'Platforms', 'Dashboards'];
  return (
    <div className="max-w-4xl space-y-6">
       <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-frozen-lake" />
          <span className="text-xs font-mono font-black text-frozen-lake uppercase tracking-[0.4em]">{t.products.label}</span>
       </div>
       <TypewriterHeader 
          text={t.products.title}
          keywords={productKeywords}
          className="text-[clamp(2.2rem,7vw,5rem)] font-display font-black leading-[0.95] text-white uppercase italic tracking-tighter"
          highlightColor="cyan"
       />
    </div>
  );
}

function ProductCards() {
  const { t } = useLanguage();
  return t.products.items.map((item: any, i: number) => (
    <GlowingCard 
      key={item.id}
      title={item.title}
      subtitle={item.subtitle}
      description={item.description}
      features={item.features}
      delay={i * 0.1}
    />
  ));
}

function SolutionsTable() {
  const { t, language } = useLanguage();
  const solutionsKeywords = language === 'pt' ? ['SISTEMAS', 'REAL', 'OPERA'] : ['SYSTEMS', 'REAL', 'OPERATES'];
  
  if (!t?.solutions) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
       {/* Left Column: Header & Context Text */}
       <div className="space-y-12">
          <div className="space-y-8">
             <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-frozen-lake" />
                <span className="text-xs font-mono font-black text-frozen-lake uppercase tracking-[0.6em]">{t.solutions.label}</span>
             </div>
             <TypewriterHeader 
                text={t.solutions.title}
                keywords={solutionsKeywords}
                className="text-[clamp(2.2rem,7vw,5rem)] font-display font-black leading-[0.9] text-white uppercase italic tracking-tighter"
                highlightColor="purple"
             />
          </div>
          <p className="text-xl md:text-3xl text-porcelain/80 font-medium leading-tight max-w-xl">
             {t.solutions.text}
          </p>
       </div>

       {/* Right Column: Premium Fan Deck */}
       <div className="relative w-full">
          <SolutionDeck />
       </div>
    </div>
  );
}


function PortfolioSectionHeader() {
  const { t, language } = useLanguage();
  const portfolioKeywords = language === 'pt' ? ['Historias', 'Parceiros'] : ['Stories', 'Partners'];
  return (
    <div className="max-w-4xl space-y-6">
       <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-frozen-lake" />
          <span className="text-xs font-mono font-black text-frozen-lake uppercase tracking-[0.4em]">{t.portfolio.label}</span>
       </div>
       <TypewriterHeader 
          text={t.portfolio.title}
          keywords={portfolioKeywords}
          className="text-[clamp(2.2rem,7vw,5rem)] font-display font-black leading-[0.95] text-white uppercase italic tracking-tighter"
          highlightColor="green"
       />
    </div>
  );
}

function ManifestoContent() {
  const { t, language } = useLanguage();
  const manifestoKeywords = language === 'pt' ? ['tecnologia', 'código'] : ['technology', 'code'];
  return (
    <div className="max-w-5xl mx-auto space-y-16">
       <div className="relative inline-block w-24 h-24">
          <div className="absolute inset-0 bg-frozen-lake/10 blur-3xl rounded-full" />
          <div className="relative w-full h-full flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-700">
             <div className="w-8 h-8 rounded-lg bg-frozen-lake shadow-[0_0_20px_rgba(108,207,246,0.5)]" />
          </div>
       </div>
       <TypewriterHeader 
          text={`“${t.manifesto.title}”`}
          keywords={manifestoKeywords}
          className="text-[clamp(1.8rem,5vw,4.5rem)] font-display font-black text-white italic leading-[1.1] tracking-tighter"
          highlightColor="cyan"
       />
       <p className="max-w-3xl mx-auto text-xl md:text-3xl text-porcelain/80 font-medium leading-tight text-center">
          {t.manifesto.text}
       </p>
    </div>
  );
}

function FinalCTA() {
  const { t, language } = useLanguage();
  const { openModal } = useContactModal();
  const ctaKeywords = language === 'pt' ? ['operação', 'sistema'] : ['operation', 'system'];
  return (
    <div className="relative py-32 md:py-48 px-8 overflow-hidden group">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tato-blue/5 blur-[150px] rounded-full pointer-events-none group-hover:bg-frozen-lake/10 transition-colors duration-1000" />
       
       <div className="relative z-10 max-w-4xl mx-auto text-center space-y-16">
          <div className="space-y-8">
             <TypewriterHeader 
                text={t.ctaFinal.title}
                keywords={ctaKeywords}
                className="text-[clamp(2.2rem,7vw,5.5rem)] font-display font-black text-white italic tracking-tighter leading-[0.95] uppercase"
                highlightColor="cyan"
             />
             <p className="text-xl md:text-2xl text-grey font-medium max-w-2xl mx-auto">
                {t.ctaFinal.text}
             </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
             <button 
               data-cursor="expand"
               onClick={() => openModal({ intent: 'fale_com_a_tato', source: 'final_cta' })}
               className="group relative px-12 py-6 bg-porcelain text-ink-black font-display font-black text-base uppercase tracking-[0.2em] rounded-full hover:bg-frozen-lake transition-all duration-700 shadow-2xl active:scale-95 flex items-center gap-4"
             >
                {t.ctaFinal.btn1}
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
             </button>
             <button 
               data-cursor="hover"
               onClick={() => openModal({ intent: 'estruturar_operacao', source: 'final_cta' })}
               className="group px-12 py-6 glass text-porcelain font-display font-black text-base uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-all active:scale-95 flex items-center gap-3"
             >
                {t.ctaFinal.btn2}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
       </div>
    </div>
  );
}
