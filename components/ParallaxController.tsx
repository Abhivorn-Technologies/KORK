'use client';
import { createContext, useContext, ReactNode } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'framer-motion';

interface ParallaxContextType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const ParallaxContext = createContext<ParallaxContextType | null>(null);

export function useParallax() {
  const context = useContext(ParallaxContext);
  if (!context) {
    throw new Error('useParallax must be used within a ParallaxController');
  }
  return context;
}

export function ParallaxController({ children }: { children: ReactNode }) {
  const rawMouseX = useMotionValue(0.5);
  const rawMouseY = useMotionValue(0.5);

  const springConfig = { damping: 40, stiffness: 100, mass: 1 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rawMouseX.set(x);
    rawMouseY.set(y);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0.5);
    rawMouseY.set(0.5);
  };

  return (
    <ParallaxContext.Provider value={{ mouseX, mouseY }}>
      <div 
        className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center [perspective:1200px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </ParallaxContext.Provider>
  );
}
