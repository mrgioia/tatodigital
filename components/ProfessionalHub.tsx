'use client';

import React, { useRef, useMemo, useSyncExternalStore } from 'react';
import { motion, useTransform, MotionValue, useMotionValue } from 'motion/react';
import { useLanguage } from '@/lib/language-context';
import { useContactModal } from '@/context/ContactModalProvider';
import ProfessionalHubPhotoSequence, { PhotoSequenceHandle } from '@/components/ProfessionalHubPhotoSequence';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Flare system (preserved from original RenatoHub) ────────────────────────

interface FlareRayProps {
  index: number;
  progress: MotionValue<number>;
  color: MotionValue<string>;
  type: 'lateral' | 'vertical' | 'radial' | 'angular';
}

const FlareRay = ({ index, progress, color, type }: FlareRayProps) => {
  const [{ rotation, length, width }] = React.useState(() => {
    const base = index * (360 / 12);
    let rot = base + (Math.random() * 10 - 5);

    if (type === 'vertical') {
      rot = base % 90 < 45 ? 90 + (Math.random() * 20 - 10) : 270 + (Math.random() * 20 - 10);
    } else if (type === 'lateral') {
      rot = base % 90 < 45 ? 0 + (Math.random() * 40 - 20) : 180 + (Math.random() * 40 - 20);
    } else if (type === 'angular') {
      rot = base % 90 < 45 ? 45 + (Math.random() * 30 - 15) : 135 + (Math.random() * 30 - 15);
    }

    return {
      rotation: rot,
      length: 200 + Math.random() * 300,
      width: 0.5 + Math.random() * 1.2
    };
  });

  const scaleX = useTransform(progress, [0, 0.5, 1], [0.1, 1.4, 0.3]);
  const opacity = useTransform(progress, [0, 0.3, 0.6, 0.9, 1], [0, 0.4, 0.7, 0.2, 0]);
  const skew = useTransform(progress, [0, 1], [-30, 30]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: length,
        height: width,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        originX: 0,
        rotate: rotation,
        scaleX,
        opacity,
        skewX: skew,
        filter: 'blur(3px)',
        zIndex: -1,
      }}
    />
  );
};

const LetterWithFlares = ({
  letter,
  index,
  progress,
  color,
  isClient
}: {
  letter: string;
  index: number;
  progress: MotionValue<number>;
  color: MotionValue<string>;
  isClient: boolean;
}) => {
  const typeMap: Record<string, 'lateral' | 'vertical' | 'radial' | 'angular'> = {
    'G': 'lateral',
    'I': 'vertical',
    'O': 'radial',
    'A': 'angular'
  };

  const rays = Array.from({ length: 12 });

  return (
    <div className="relative inline-block px-0.5 md:px-1">
      <motion.span
        style={{ color }}
        className="relative z-10 select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      >
        {letter}
      </motion.span>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {isClient && rays.map((_, i) => (
          <FlareRay
            key={i}
            index={i}
            progress={progress}
            color={color}
            type={typeMap[letter] || 'radial'}
          />
        ))}
      </div>

      <motion.div
        style={{
          boxShadow: `0 0 60px ${color}`,
          opacity: useTransform(progress, [0.1, 0.5, 0.9], [0, 0.2, 0]),
          backgroundColor: color,
        }}
        className="absolute inset--4 blur-[60px] rounded-full z-0 pointer-events-none mix-blend-screen"
      />
    </div>
  );
};

// ─── Mobile Story Layer Component ───────────────────────────────────────────
interface StoryLayer {
  label: string;
  title: string;
  subtitle?: string;
  text: string;
}

function MobileStoryLayers({ layers }: { layers: StoryLayer[] }) {
  const accentColors = [
    'text-[#B026FF]',
    'text-[#6CCFF6]',
    'text-[#B026FF]'
  ];

  return (
    <div className="space-y-16">
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-white/20" />
            <span className="text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.5em]">
              {layer.label}
            </span>
          </div>
          <h3 className={`text-2xl md:text-3xl font-display font-black leading-[0.95] tracking-tighter uppercase italic mb-4 ${accentColors[i]}`}>
            {layer.title}
          </h3>
          {layer.subtitle && (
            <p className="text-base font-display font-bold text-white/70 italic tracking-tight mb-3">
              {layer.subtitle}
            </p>
          )}
          <p className="text-sm md:text-base text-white/60 leading-relaxed font-medium">
            {layer.text}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function ProfessionalHub() {
  const { t, language } = useLanguage();
  const { openModal } = useContactModal();
  
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const prefersReducedMotion = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const photoSequenceRef = useRef<PhotoSequenceHandle>(null);
  
  const progressMv = useMotionValue(0);

  useGSAP(() => {
    if (prefersReducedMotion) return;
    
    // Refresh ScrollTrigger to ensure correct layout calculations
    ScrollTrigger.refresh();

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: stageRef.current,
      pinSpacing: false,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressMv.set(self.progress);
        if (photoSequenceRef.current) {
          photoSequenceRef.current.setProgress(self.progress);
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { dependencies: [prefersReducedMotion] });

  // Flare color progression
  const flareColor = useTransform(
    progressMv,
    [0.1, 0.25, 0.4, 0.55, 0.7, 0.85],
    [
      '#4B0082',
      '#9400D3',
      '#FF00FF',
      '#FF69B4',
      '#FF8C00',
      '#FFD700',
    ]
  );

  // Phases opacity mapping
  const phase1Opacity = useTransform(progressMv, [0, 0.05, 0.16, 0.18], [0, 1, 1, 0]);
  const phase1Y = useTransform(progressMv, [0, 0.05, 0.16, 0.18], [30, 0, 0, -30]);

  const phase2Opacity = useTransform(progressMv, [0.18, 0.22, 0.36, 0.38], [0, 1, 1, 0]);
  const phase2Y = useTransform(progressMv, [0.18, 0.22, 0.36, 0.38], [30, 0, 0, -30]);

  const phase3Opacity = useTransform(progressMv, [0.38, 0.42, 0.56, 0.58], [0, 1, 1, 0]);
  const phase3Y = useTransform(progressMv, [0.38, 0.42, 0.56, 0.58], [30, 0, 0, -30]);

  const phase4Opacity = useTransform(progressMv, [0.58, 0.62, 0.76, 0.78], [0, 1, 1, 0]);
  const phase4Y = useTransform(progressMv, [0.58, 0.62, 0.76, 0.78], [30, 0, 0, -30]);

  const phase5Opacity = useTransform(progressMv, [0.78, 0.82, 1], [0, 1, 1]);
  const phase5Y = useTransform(progressMv, [0.78, 0.82, 1], [30, 0, 0]);

  // Story layers content
  const storyLayers: StoryLayer[] = useMemo(() => {
    if (language === 'pt') {
      return [
        {
          label: 'IDENTIDADE',
          title: 'RENATO GIOIA',
          subtitle: 'A visão estratégica por trás da TATO Digital.',
          text: 'Por trás da TATO: estratégia, dados e execução para operações complexas.',
        },
        {
          label: 'EXPERIÊNCIA',
          title: 'Gerente de Projetos e PMO',
          text: 'Com foco em governança, acompanhamento de performance e coordenação estratégica para Rock in Rio, The Town, Lollapalooza e Rock in Rio Lisboa.',
        },
        {
          label: 'EXECUÇÃO',
          title: 'Da estratégia ao campo',
          text: 'Durante a execução, atuo nas operações para garantir a entrega, conectando planejamento, fornecedores, equipes multidisciplinares, status executivo e tomada de decisão.',
        },
        {
          label: 'POSICIONAMENTO',
          title: 'Dados, automação e governança',
          text: 'Desenho e implemento processos completos de intake, validação documental, HSSE, sustentabilidade, governança, performance e execução operacional, suportando ativações e projetos complexos.',
        },
      ];
    }
    return [
      {
        label: 'IDENTITY',
        title: 'RENATO GIOIA',
        subtitle: 'The strategic vision behind TATO Digital.',
        text: 'Behind TATO: strategy, data and execution for complex operations.',
      },
      {
        label: 'EXPERIENCE',
        title: 'Project Manager & PMO',
        text: 'Focused on governance, performance tracking and strategic coordination for Rock in Rio, The Town, Lollapalooza and Rock in Rio Lisboa.',
      },
      {
        label: 'EXECUTION',
        title: 'From strategy to the field',
        text: 'During execution, I operate in the field to ensure delivery, connecting planning, suppliers, multidisciplinary teams, executive status and decision-making.',
      },
      {
        label: 'POSITIONING',
        title: 'Data, automation & governance',
        text: 'I design and implement complete intake processes, document validation, HSSE, sustainability, governance, performance and operational execution, supporting activations and complex projects.',
      },
    ];
  }, [language]);

  const nameLetters = 'GIOIA'.split('');

  const ctaLabels = useMemo(() => {
    if (language === 'pt') {
      return {
        resume: 'Ver currículo completo',
        projects: 'Explorar projetos',
        contact: 'Falar comigo',
      };
    }
    return {
      resume: 'View full resume',
      projects: 'Explore projects',
      contact: 'Talk to me',
    };
  }, [language]);

  // Utility to parse highlighting
  const parseHighlight = (text: string) => {
    return text; // Fallback if no specific formatting logic
  };

  return (
    <>
      {/* ── DESKTOP: Scrollytelling Pinned Section ──────────────────────── */}
      <section 
        id="about" 
        ref={sectionRef}
        className="hidden lg:block relative w-full"
        style={{ height: '500vh' }}
      >
        <div 
          ref={stageRef}
          className="relative w-full h-[100dvh] overflow-hidden"
        >
          {/* Background ambient glow */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div
              className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.04]"
              style={{ backgroundColor: flareColor }}
            />
            <motion.div
              className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.03]"
              style={{ backgroundColor: flareColor }}
            />
          </div>

          <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto px-6 grid grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Overlays */}
            <div className="col-span-5 h-full relative">
              <div className="absolute inset-0 flex flex-col justify-center">
                
                {/* Phase 1: 0% - 18% */}
                <motion.div 
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col justify-center pointer-events-none"
                  style={{ opacity: phase1Opacity, y: phase1Y }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-[1px] bg-white/20" />
                    <span className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.5em]">
                      {storyLayers[0].label}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tighter uppercase italic mb-6 text-white flex items-center flex-wrap gap-x-3">
                    <span className="text-white/90">RENATO</span>{" "}
                    <span className="inline-flex">
                      {nameLetters.map((char, index) => (
                        <LetterWithFlares
                          key={index}
                          letter={char}
                          index={index}
                          progress={progressMv}
                          color={flareColor}
                          isClient={isClient}
                        />
                      ))}
                    </span>
                  </h3>
                  <p className="text-lg md:text-2xl font-display font-bold text-white italic tracking-tight mb-4">
                    {storyLayers[0].subtitle}
                  </p>
                </motion.div>

                {/* Phase 2: 18% - 38% */}
                <motion.div 
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col justify-center pointer-events-none"
                  style={{ opacity: phase2Opacity, y: phase2Y }}
                >
                  <p className="text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed font-display font-black italic max-w-xl">
                    {storyLayers[0].text}
                  </p>
                </motion.div>

                {/* Phase 3: 38% - 58% (Roles) */}
                <motion.div 
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col justify-center pointer-events-none"
                  style={{ opacity: phase3Opacity, y: phase3Y }}
                >
                  <div className="flex flex-col gap-12">
                    {t.renato.roles.map((role: { title: string; sub: string }, i: number) => (
                      <div key={i} className="space-y-2">
                        <div className="text-3xl lg:text-4xl font-display font-black text-white italic tracking-tight">
                          {role.title}
                        </div>
                        <div className="text-sm font-mono text-white/50 uppercase tracking-[0.3em] font-bold">
                          {role.sub}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Phase 4: 58% - 78% (Tags) */}
                <motion.div 
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col justify-center pointer-events-none"
                  style={{ opacity: phase4Opacity, y: phase4Y }}
                >
                  <div className="flex flex-wrap gap-4">
                    {t.renato.competences.map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs lg:text-sm font-mono font-bold text-white/60 uppercase tracking-[0.15em] px-4 py-2 rounded-full border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Phase 5: 78% - 100% (Final Comp & Buttons) */}
                <motion.div 
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col justify-center"
                  style={{ opacity: phase5Opacity, y: phase5Y, pointerEvents: useTransform(progressMv, (v) => v > 0.78 ? 'auto' : 'none') }}
                >
                  <h3 className="text-4xl lg:text-5xl font-display font-black leading-none tracking-tighter uppercase italic mb-6">
                    <span className="text-white/90">RENATO </span>
                    <span className="text-[#B026FF]">GIOIA</span>
                  </h3>
                  <p className="text-xl text-white/70 leading-relaxed font-medium mb-12 max-w-xl">
                    Estratégia, operação, dados e produto conectados para transformar complexidade em execução.
                  </p>
                  
                  <div className="flex items-center gap-4 pointer-events-auto">
                    <button
                      onClick={() => openModal({ intent: 'fale_com_a_tato', source: 'professional_hub' })}
                      className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-xs font-mono font-bold text-white uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300"
                    >
                      {ctaLabels.contact}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                    <button
                      onClick={() => {
                        const el = document.getElementById('portfolio');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold text-white/60 uppercase tracking-[0.15em] hover:text-white transition-all duration-300"
                    >
                      {ctaLabels.projects}
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* RIGHT COLUMN: Canvas photo sequence */}
            <div className="col-span-7 h-[75vh] flex items-center justify-center">
              <div className="w-full h-full relative max-w-3xl">
                <ProfessionalHubPhotoSequence
                  ref={photoSequenceRef}
                  className="border border-white/[0.06]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MOBILE: Stacked layout ───────────────────────────────────────── */}
      <div className="lg:hidden px-6 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto space-y-16">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-[1px] bg-white/20" />
              <span className="text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.5em]">
                {t.renato.label}
              </span>
              <div className="w-8 h-[1px] bg-white/20" />
            </motion.div>

            <motion.h3 
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-5xl md:text-7xl font-display font-black leading-none tracking-tighter uppercase italic"
            >
              <span className="text-white/90">RENATO </span>
              <span className="text-[#B026FF]">GIOIA</span>
            </motion.h3>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
                visible: { opacity: 0.7, y: 0, transition: { duration: 0.7 } }
              }}
              className="text-lg md:text-xl font-display font-bold text-white/70 italic tracking-tight max-w-md"
            >
              {storyLayers[0].subtitle}
            </motion.p>
          </motion.div>

          {/* Story layers — all visible, stacked */}
          <MobileStoryLayers layers={storyLayers.slice(1)} />

          {/* Bio paragraphs */}
          <div className="space-y-8">
            {(Array.isArray(t.renato.bio) ? t.renato.bio : [t.renato.bio]).map((paragraph: string, i: number) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-base md:text-lg text-white/70 leading-relaxed font-medium"
              >
                {parseHighlight(paragraph)}
              </motion.p>
            ))}
          </div>

          {/* Roles */}
          <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-white/5">
            {t.renato.roles.map((role: { title: string; sub: string }, i: number) => (
              <div key={i} className="space-y-1">
                <div className="text-xl font-display font-black text-white italic tracking-tight">
                  {role.title}
                </div>
                <div className="text-[9px] font-mono text-white/50 uppercase tracking-[0.3em] font-bold">
                  {role.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Competences */}
          <div className="space-y-3">
            <span className="text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.4em]">
              {t.renato.specialties}
            </span>
            <div className="grid grid-cols-1 gap-3">
              {t.renato.competences.map((skill: string, i: number) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-[0.2em] px-4 py-2 rounded-lg border border-white/5 bg-white/[0.02]"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
