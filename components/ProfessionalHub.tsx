'use client';

import React, { useRef, useMemo, useSyncExternalStore } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'motion/react';
import { useLanguage } from '@/lib/language-context';
import { useContactModal } from '@/context/ContactModalProvider';
import ProfessionalHubPhotoSequence from '@/components/ProfessionalHubPhotoSequence';
import TypewriterHeader from '@/components/TypewriterHeader';
import { ArrowRight, ChevronRight, FileText } from 'lucide-react';

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

// ─── Story Layer Component ──────────────────────────────────────────────────

interface StoryLayer {
  label: string;
  title: string;
  subtitle?: string;
  text: string;
}

function StoryLayerContent({
  layer,
  isActive,
  layerIndex,
}: {
  layer: StoryLayer;
  isActive: boolean;
  layerIndex: number;
}) {
  const accentColors = [
    'text-white/90',
    'text-[#B026FF]',
    'text-[#6CCFF6]',
    'text-[#B026FF]'
  ];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 20,
        filter: isActive ? 'blur(0px)' : 'blur(4px)',
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
    >
      {/* Phase label */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-[1px] bg-white/20" />
        <span className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.5em]">
          {layer.label}
        </span>
      </div>

      {/* Title */}
      <h3 className={`text-3xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tighter uppercase italic mb-6 ${accentColors[layerIndex]}`}>
        {layer.title}
      </h3>

      {/* Subtitle */}
      {layer.subtitle && (
        <p className="text-lg md:text-2xl font-display font-bold text-white/70 italic tracking-tight mb-4">
          {layer.subtitle}
        </p>
      )}

      {/* Body text */}
      <p className="text-base md:text-xl text-white/60 leading-relaxed font-medium max-w-xl">
        {layer.text}
      </p>

      {/* Accent line */}
      <div className={`w-16 h-[2px] mt-8 rounded-full ${
        layerIndex === 0 ? 'bg-white/20' :
        layerIndex === 1 ? 'bg-[#B026FF]/40' :
        layerIndex === 2 ? 'bg-[#6CCFF6]/40' :
        'bg-[#B026FF]/40'
      }`} />
    </motion.div>
  );
}

// ─── Mobile Story Layer (no scroll-sync, all visible stacked) ───────────────

function MobileStoryLayers({ layers }: { layers: StoryLayer[] }) {
  const accentColors = [
    'text-white/90',
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

  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  // Flare color progression (preserved from original)
  const flareColor = useTransform(
    smoothProgress,
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

  // Active layer based on scroll progress
  const activeLayer = useTransform(smoothProgress, (v) => {
    if (v < 0.25) return 0;
    if (v < 0.50) return 1;
    if (v < 0.75) return 2;
    return 3;
  });

  // Track active layer in state for text transitions
  const [currentLayer, setCurrentLayer] = React.useState(0);
  React.useEffect(() => {
    const unsubscribe = activeLayer.on('change', (v) => {
      setCurrentLayer(v);
    });
    return unsubscribe;
  }, [activeLayer]);

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

  const renatoKeywords = language === 'pt'
    ? ['experiência', 'dados', 'execução']
    : ['experience', 'data', 'execution'];

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

  return (
    <section id="about" className="relative scroll-mt-[var(--header-height)]">
      {/* ── DESKTOP: Scroll-linked two-column layout ──────────────────────── */}
      <div
        ref={sectionRef}
        className="hidden lg:block relative"
        style={{ minHeight: '400vh' }}
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          {/* Background ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.04]"
              style={{ backgroundColor: flareColor }}
            />
            <motion.div
              className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.03]"
              style={{ backgroundColor: flareColor }}
            />
          </div>

          <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 grid grid-cols-12 gap-8 lg:gap-12 items-center h-full py-20">
            {/* LEFT COLUMN: Scroll-synced story + competences */}
            <div className="col-span-5 flex flex-col h-full justify-between">
              {/* Story layers container */}
              <div className="relative flex-1 min-h-0">
                {storyLayers.map((layer, i) => (
                  <StoryLayerContent
                    key={i}
                    layer={layer}
                    isActive={currentLayer === i}
                    layerIndex={i}
                  />
                ))}
              </div>

              {/* Bottom: Roles + Competences + CTAs (always visible) */}
              <div className="mt-auto space-y-8 pb-4">
                {/* Roles */}
                <div className="flex items-center gap-8">
                  {t.renato.roles.map((role: { title: string; sub: string }, i: number) => (
                    <React.Fragment key={i}>
                      <div className="space-y-1">
                        <div className="text-xl font-display font-black text-white italic tracking-tight">
                          {role.title}
                        </div>
                        <div className="text-[9px] font-mono text-white/50 uppercase tracking-[0.3em] font-bold">
                          {role.sub}
                        </div>
                      </div>
                      {i < t.renato.roles.length - 1 && (
                        <div className="w-px h-8 bg-white/10" />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Competences (compact) */}
                <div className="flex flex-wrap gap-2">
                  {t.renato.competences.map((skill: string, i: number) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/[0.06] hover:border-white/20 hover:text-white/70 transition-all duration-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    data-cursor="expand"
                    onClick={() => openModal({ intent: 'fale_com_a_tato', source: 'professional_hub' })}
                    className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-xs font-mono font-bold text-white/70 uppercase tracking-[0.15em] hover:border-[#B026FF]/30 hover:text-white hover:shadow-[0_0_20px_rgba(176,38,255,0.15)] transition-all duration-500"
                  >
                    {ctaLabels.contact}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <button
                    data-cursor="hover"
                    onClick={() => {
                      const el = document.getElementById('portfolio');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold text-white/40 uppercase tracking-[0.15em] hover:text-white/70 transition-all duration-500"
                  >
                    {ctaLabels.projects}
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Canvas photo sequence */}
            <div className="col-span-7 h-[75vh] flex items-center">
              <div className="w-full h-full relative">
                <ProfessionalHubPhotoSequence
                  scrollProgress={smoothProgress}
                  className="border border-white/[0.06]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: Stacked layout ───────────────────────────────────────── */}
      <div className="lg:hidden px-6 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto space-y-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-white/20" />
              <span className="text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.5em]">
                {t.renato.label}
              </span>
              <div className="w-8 h-[1px] bg-white/20" />
            </div>

            <h3 className="text-5xl md:text-7xl font-display font-black leading-none tracking-tighter uppercase italic">
              <span className="text-white/90">RENATO </span>
              <span className="text-[#B026FF]">GIOIA</span>
            </h3>

            <p className="text-lg md:text-xl font-display font-bold text-white/70 italic tracking-tight max-w-md">
              {storyLayers[0].subtitle}
            </p>
          </motion.div>

          {/* Mobile Photo Sequence */}
          <MobilePhotoSection scrollProgress={scrollYProgress} />

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
                  className="flex items-baseline gap-4 py-3 border-b border-white/5"
                >
                  <span className="text-xs font-mono font-bold text-white/30">0{i + 1}</span>
                  <h4 className="text-base font-display font-bold text-white/80 tracking-tight uppercase">
                    {skill}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              data-cursor="expand"
              onClick={() => openModal({ intent: 'fale_com_a_tato', source: 'professional_hub_mobile' })}
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-xs font-mono font-bold text-white/70 uppercase tracking-[0.15em] hover:border-[#B026FF]/30 hover:text-white hover:shadow-[0_0_20px_rgba(176,38,255,0.15)] transition-all duration-500"
            >
              {ctaLabels.contact}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              data-cursor="hover"
              onClick={() => {
                const el = document.getElementById('portfolio');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-mono font-bold text-white/40 uppercase tracking-[0.15em] hover:text-white/70 transition-all duration-500"
            >
              {ctaLabels.projects}
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Mobile Photo Section ────────────────────────────────────────────────────

function MobilePhotoSection({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: localProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full aspect-[4/3] max-h-[50vh] rounded-2xl overflow-hidden"
    >
      <ProfessionalHubPhotoSequence
        scrollProgress={localProgress}
        className="border border-white/[0.06]"
      />
    </motion.div>
  );
}

// ─── Utility: Parse bold highlights ──────────────────────────────────────────

function parseHighlight(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="text-white font-black">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}
