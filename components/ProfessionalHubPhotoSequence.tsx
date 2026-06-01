'use client';

import React, { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { getAllFrameUrls, HERO_SEQUENCE_CONFIG } from '@/lib/imageSequence';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface PhotoSequenceHandle {
  setProgress: (progress: number) => void;
}

interface ProfessionalHubPhotoSequenceProps {
  className?: string;
}

const ProfessionalHubPhotoSequence = forwardRef<PhotoSequenceHandle, ProfessionalHubPhotoSequenceProps>(({ className = '' }, ref) => {
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

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[frameIndex];

    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;

    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

    if (imgRatio > canvasRatio) {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgRatio;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgRatio;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  useEffect(() => {
    const urls = getAllFrameUrls();
    let loadedCount = 0;
    let cancelled = false;

    const images: HTMLImageElement[] = urls.map((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
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

  useImperativeHandle(ref, () => ({
    setProgress: (latest: number) => {
      if (!isLoaded || prefersReducedMotion) return;

      const frameIndex = Math.min(
        Math.max(Math.round(latest * (totalFrames - 1)), 0),
        totalFrames - 1
      );

      // Apply subtle canvas scale
      if (canvasRef.current) {
        const scale = 1.1 - (latest * 0.1);
        canvasRef.current.style.transform = `scale(${scale})`;
      }

      if (frameIndex === currentFrameRef.current) return;
      currentFrameRef.current = frameIndex;

      if (!isDrawingRef.current) {
        isDrawingRef.current = true;
        rafRef.current = requestAnimationFrame(() => {
          drawFrame(frameIndex);
          isDrawingRef.current = false;
        });
      }
    }
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      if (isLoaded) {
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
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/[0.06]">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border border-white/10 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-2 rounded-full border border-white/20 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
              <div className="absolute inset-4 rounded-full bg-white/5 backdrop-blur-sm" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono font-bold text-white/40 uppercase tracking-[0.4em]">
                Carregando
              </span>
              <span className="text-2xl font-display font-black text-white/80 tabular-nums">
                {loadProgress}%
              </span>
            </div>
            <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#B026FF] to-[#6CCFF6] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          imageRendering: 'auto',
          transform: prefersReducedMotion ? 'scale(1)' : 'scale(1.1)',
        }}
        className="w-full h-full block"
        role="img"
        aria-label="Sequência fotográfica profissional de Renato Gioia"
      />

      {isLoaded && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            boxShadow: 'inset 0 0 80px rgba(0,0,0,0.5), inset 0 0 200px rgba(0,0,0,0.3)',
          }}
        />
      )}

      {isLoaded && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000c0d] to-transparent pointer-events-none rounded-b-2xl" />
      )}
    </div>
  );
});

ProfessionalHubPhotoSequence.displayName = 'ProfessionalHubPhotoSequence';

export default ProfessionalHubPhotoSequence;
