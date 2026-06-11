'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface OrbitControllerProps {
  children: ReactNode;
  radius: number;
  duration: number;
  reverse?: boolean;
  initialAngle?: number; // 0 to 360
}

export function OrbitController({ 
  children, 
  radius, 
  duration, 
  reverse = false,
  initialAngle = 0
}: OrbitControllerProps) {
  const shouldReduceMotion = useReducedMotion();
  const direction = reverse ? -360 : 360;

  if (shouldReduceMotion) {
    // If reduced motion, place statically at the initial angle
    const radian = (initialAngle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return (
      <div 
        className="absolute top-1/2 left-1/2" 
        style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      initial={{ rotateZ: initialAngle }}
      animate={{ rotateZ: initialAngle + direction }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      style={{ width: 0, height: 0, zIndex: 10 }}
    >
      <motion.div
        className="absolute"
        style={{ 
          transform: `translateX(${radius}px)`, // Push out by radius
        }}
      >
        {/* Counter-rotate the child so it doesn't spin upside down */}
        <motion.div
          initial={{ rotateZ: -initialAngle }}
          animate={{ rotateZ: -(initialAngle + direction) }}
          transition={{ 
            duration, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
