'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { fadeUpReveal } from '@/lib/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function ScrollReveal({ 
  children, 
  variant = fadeUpReveal, 
  className = '',
  delay = 0,
  once = true
}: ScrollRevealProps) {
  
  // If delay is passed, we clone the variant and inject the delay
  const customizedVariant = React.useMemo(() => {
    if (delay === 0) return variant;
    
    return {
      ...variant,
      visible: {
        ...(typeof variant.visible === 'object' ? variant.visible : {}),
        transition: {
          ...(typeof variant.visible === 'object' && variant.visible.transition ? variant.visible.transition : {}),
          delay: delay
        }
      }
    };
  }, [variant, delay]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      variants={customizedVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
}
