'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/lib/language-context';
import SolutionCard from './SolutionCard';
import { ChevronRight, Play, Pause } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

export default function SolutionDeck() {
  const { t } = useLanguage();
  const items = t.solutions.items;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const totalItems = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
    setProgress(0);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setProgress(0);
  }, [totalItems]);

  // Handle the automatic rotation and timeline
  useEffect(() => {
    // Create the timeline only once per slide
    const tl = gsap.timeline({
      onComplete: nextSlide,
      paused: isPaused,
      onUpdate: () => {
        setProgress(tl.progress());
      }
    });

    tl.to({}, { duration: 6 }); // Dummy animation to drive progress

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [currentIndex, isPaused, nextSlide]);

  // Handle visual positions using GSAP
  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.solution-card-wrapper');
    
    cards.forEach((card, i) => {
      // Calculate relative position to currentIndex
      let diff = i - currentIndex;
      
      // Normalize diff for infinite loop
      if (diff > totalItems / 2) diff -= totalItems;
      if (diff < -totalItems / 2) diff += totalItems;

      let x = 0;
      let rotation = 0;
      let zIndex = 0;
      let opacity = 0;
      let scale = 0.8;
      let y = 0;

      let z = 0;

      if (diff === 0) {
        // Center Active Card
        x = 0;
        y = -20;
        z = 50;
        rotation = -2;
        zIndex = 30;
        opacity = 1;
        scale = 1.05;
      } else if (diff === -1) {
        // Left Card
        x = -240;
        y = 20;
        z = 0;
        rotation = -14;
        zIndex = 20;
        opacity = 0.4;
        scale = 0.9;
      } else if (diff === 1) {
        // Right Card
        x = 240;
        y = 20;
        z = 0;
        rotation = 14;
        zIndex = 20;
        opacity = 0.4;
        scale = 0.9;
      } else if (diff === -2) {
        // Moving out left
        x = -400;
        y = 100;
        z = -100;
        rotation = -30;
        opacity = 0;
        scale = 0.7;
      } else if (diff === 2) {
        // Moving in right
        x = 400;
        y = 100;
        z = -100;
        rotation = 30;
        opacity = 0;
        scale = 0.7;
      } else {
        // Completely out of view
        opacity = 0;
        x = diff > 0 ? 500 : -500;
        z = -200;
      }

      // Responsive adjustments
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
      if (isMobile) {
        if (diff === 0) {
           x = 0;
           scale = 1;
        } else {
           x = diff * 100;
           opacity = 0.1;
           scale = 0.7;
        }
      }

      gsap.to(card, {
        x,
        y,
        z,
        rotation,
        zIndex,
        opacity,
        scale,
        duration: 1.2,
        ease: "expo.out",
        overwrite: true
      });
    });
  }, { scope: containerRef, dependencies: [currentIndex] });

  // Navigation handler logic based on card click
  const handleCardClick = (index: number) => {
    let diff = index - currentIndex;
    if (diff > totalItems / 2) diff -= totalItems;
    if (diff < -totalItems / 2) diff += totalItems;

    if (diff === 1) nextSlide();
    if (diff === -1) prevSlide();
  };

  return (
    <div className="flex flex-col items-center lg:items-center space-y-12 w-full py-12">
      
      {/* The Fan Deck Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center perspective-2000"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {items.map((item: any, i: number) => {
          let diff = i - currentIndex;
          if (diff > totalItems / 2) diff -= totalItems;
          if (diff < -totalItems / 2) diff += totalItems;
          
          const isInteractive = diff === 0 || diff === 1 || diff === -1;

          return (
            <div 
              key={item.id}
              onClick={() => handleCardClick(i)}
              className={cn(
                "solution-card-wrapper absolute w-fit transition-[cursor] duration-500",
                isInteractive ? "cursor-pointer" : "pointer-events-none"
              )}
              style={{ 
                transformStyle: 'preserve-3d',
                zIndex: isInteractive ? 40 : 0
              }}
            >
              <SolutionCard 
                item={item} 
                isActive={i === currentIndex}
                progress={i === currentIndex ? progress : 0}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
