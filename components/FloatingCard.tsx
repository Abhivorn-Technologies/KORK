'use client';
import { motion, useTransform } from 'framer-motion';
import { ReactNode } from 'react';
import { useParallax } from './ParallaxController';

interface FloatingCardProps {
  children: ReactNode;
  depth: number; // 1 = background, 3 = foreground
  isActive: boolean; // Managed by parent for cycling
  index: number;
}

export function FloatingCard({ children, depth, isActive, index }: FloatingCardProps) {
  const { mouseX, mouseY } = useParallax();

  // Foreground moves more
  const movement = depth * 15;
  
  const x = useTransform(mouseX, [0, 1], [-movement, movement]);
  const y = useTransform(mouseY, [0, 1], [-movement, movement]);

  // Base scale based on depth
  const baseScale = depth === 1 ? 0.7 : depth === 2 ? 0.9 : 1.1;

  return (
    <motion.div
      style={{ x, y, zIndex: Math.floor(depth * 10) }}
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={{ 
        opacity: isActive ? (depth === 1 ? 0.4 : depth === 2 ? 0.8 : 1) : 0, 
        scale: isActive ? baseScale : baseScale * 0.7,
        y: isActive ? 0 : 20,
        filter: depth === 1 ? 'blur(3px)' : depth === 2 ? 'blur(1px)' : 'blur(0px)'
      }}
      transition={{ 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
        delay: index * 0.1 // Stagger entry
      }}
      className="pointer-events-none"
    >
      <motion.div
        animate={{ 
          y: [-5 * depth, 5 * depth, -5 * depth],
          rotateX: [2, -2, 2],
          rotateY: [-2, 2, -2],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 4 + (4 / depth), 
          ease: "easeInOut" 
        }}
        className="will-change-transform drop-shadow-[0_15px_25px_rgba(0,0,0,0.3)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
