'use client';

import { motion, MotionValue, useTransform, useReducedMotion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingLayerProps {
  children: ReactNode;
  depth: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  parallaxIntensity?: number;
  floatingSpeed?: number;
  index: number;
}

export function FloatingLayer({ 
  children, 
  depth, 
  mouseX, 
  mouseY, 
  parallaxIntensity = 1,
  floatingSpeed = 1,
  index
}: FloatingLayerProps) {
  const shouldReduceMotion = useReducedMotion();

  // Parallax translation (foreground moves more than background)
  // depth: 1 = foreground (moves most), depth: 3 = background (moves least)
  const movement = 40 * parallaxIntensity * (1 / depth);
  
  const x = useTransform(mouseX, [0, 1], [-movement, movement]);
  const y = useTransform(mouseY, [0, 1], [-movement, movement]);

  // Entrance variants - stagger based on index
  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.15
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      style={{
        x: shouldReduceMotion ? 0 : x,
        y: shouldReduceMotion ? 0 : y,
        zIndex: 50 - Math.floor(depth * 10), // Ensure foreground is stacked higher
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        animate={shouldReduceMotion ? {} : { 
          y: [-15 / depth, 15 / depth, -15 / depth],
          rotateX: [2, -2, 2],
          rotateY: [-2, 2, -2],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 6 * floatingSpeed * depth, 
          ease: "easeInOut" 
        }}
        className="w-full h-full flex items-center justify-center relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
