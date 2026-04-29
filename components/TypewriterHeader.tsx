'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';

interface TypewriterHeaderProps {
  text: string;
  keywords?: string[];
  className?: string;
  delay?: number;
  highlightColor?: 'cyan' | 'purple' | 'green' | 'blue';
  as?: 'h1' | 'h2' | 'h3';
}

export default function TypewriterHeader({ 
  text, 
  keywords = [], 
  className = "", 
  delay = 0,
  highlightColor = 'cyan',
  as = 'h2'
}: TypewriterHeaderProps) {
  const [displayedText, setDisplayedText] = useState("");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let current = "";
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          current += text[i];
          setDisplayedText(current);
          i++;
        } else {
          clearInterval(interval);
          setIsDone(true);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, text, delay]);

  const Tag = as;

  const renderContent = () => {
    if (!isDone) {
      return (
        <span className="relative">
          {displayedText}
          <motion.span 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className={`inline-block w-[2px] h-[0.8em] bg-neon-${highlightColor} ml-1 align-middle`}
            style={{ boxShadow: `0 0 10px var(--color-neon-${highlightColor})` }}
          />
        </span>
      );
    }

    let parts = [text];
    keywords.forEach(keyword => {
      let newParts: any[] = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
          const regex = new RegExp(`(${keyword})`, 'gi');
          const split = part.split(regex);
          newParts.push(...split);
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts.map((part, index) => {
      const isKeyword = keywords.some(k => k.toLowerCase() === (part as string).toLowerCase());
      if (isKeyword) {
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: [0, 1, 0.4, 1, 0.7, 1], // LED "power-on" flicker
              scale: 1,
            }}
            transition={{ 
              duration: 0.8, 
              times: [0, 0.1, 0.2, 0.3, 0.4, 1],
              delay: index * 0.1 
            }}
            className={`text-neon-${highlightColor} neon-glow-${highlightColor} italic inline-block`}
          >
            {part}
          </motion.span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div ref={containerRef} className={className}>
      <Tag className="leading-[0.95] tracking-tighter relative">
        {/* Invisible placeholder to reserve space and prevent layout shifts */}
        <span className="invisible select-none pointer-events-none block" aria-hidden="true">
          {text}
        </span>
        
        {/* Animated content positioned absolutely over the placeholder */}
        <div className="absolute inset-0">
          {renderContent()}
        </div>
      </Tag>
    </div>
  );
}
