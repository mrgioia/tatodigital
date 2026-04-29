'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MotionValue, useMotionValueEvent, motion } from 'motion/react';
import { getAllFrameUrls, HERO_SEQUENCE_CONFIG } from '@/lib/imageSequence';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ProfessionalHubPhotoSequenceProps {
  scrollProgress: MotionValue<number>;
  className?: string;
}

export default function ProfessionalHubPhotoSequence({
  scrollProgress,
  className = '',
}: ProfessionalHubPhotoSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const isDrawingRef = useRef(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const prefersReducedMotion = usePrefersReducedMotion();
  const { totalFrames } = HERO_SEQUENCE_CONFIG;

  // Draw a specific frame to the canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[frameIndex];

    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Only resize if needed
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Object-contain fit calculation
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;

    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

    if (imgRatio > canvasRatio) {
      // Image is wider — fit to width
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgRatio;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      // Image is taller — fit to height
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgRatio;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Preload all images
  useEffect(() => {
    const urls = getAllFrameUrls();
    let loadedCount = 0;
    let cancelled = false;

    const images: HTMLImageElement[] = urls.map((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
          // Draw the first frame once loaded
          drawFrame(0);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
          drawFrame(0);
        }
      };
      return img;
    });

    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, [totalFrames, drawFrame]);

  // Handle scroll → frame mapping
  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    if (!isLoaded || prefersReducedMotion) return;

    const frameIndex = Math.min(
      Math.max(Math.round(latest * (totalFrames - 1)), 0),
      totalFrames - 1
    );

    if (frameIndex === currentFrameRef.current) return;
    currentFrameRef.current = frameIndex;

    if (!isDrawingRef.current) {
      isDrawingRef.current = true;
      rafRef.current = requestAnimationFrame(() => {
        drawFrame(frameIndex);
        isDrawingRef.current = false;
      });
    }
  });

  // Handle resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      if (isLoaded) {
        // Reset canvas dimensions then redraw
        const canvas = canvasRef.current;
        if (canvas) {
          const dpr = window.devicePixelRatio || 1;
          canvas.width = canvas.clientWidth * dpr;
          canvas.height = canvas.clientHeight * dpr;
          const ctx = canvas.getContext('2d');
          if (ctx) ctx.scale(dpr, dpr);
        }
        drawFrame(currentFrameRef.current);
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoaded, drawFrame]);

  // Reduced motion: show static middle frame
  useEffect(() => {
    if (prefersReducedMotion && isLoaded) {
      const staticFrame = Math.floor(totalFrames / 2);
      drawFrame(staticFrame);
    }
  }, [prefersReducedMotion, isLoaded, totalFrames, drawFrame]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden rounded-2xl ${className}`}
    >
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/[0.06]">
          <div className="flex flex-col items-center gap-6">
            {/* Pulse ring */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border border-white/10 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-2 rounded-full border border-white/20 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
              <div className="absolute inset-4 rounded-full bg-white/5 backdrop-blur-sm" />
            </div>
            {/* Progress text */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono font-bold text-white/40 uppercase tracking-[0.4em]">
                Carregando
              </span>
              <span className="text-2xl font-display font-black text-white/80 tabular-nums">
                {loadProgress}%
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#B026FF] to-[#6CCFF6] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Canvas */}
      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full block"
        role="img"
        aria-label="Sequência fotográfica profissional de Renato Gioia"
        style={{
          imageRendering: 'auto',
        }}
      />

      {/* Premium frame overlay */}
      {isLoaded && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            boxShadow: 'inset 0 0 80px rgba(0,0,0,0.5), inset 0 0 200px rgba(0,0,0,0.3)',
          }}
        />
      )}

      {/* Bottom gradient fade */}
      {isLoaded && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000c0d] to-transparent pointer-events-none rounded-b-2xl" />
      )}
    </div>
  );
}
