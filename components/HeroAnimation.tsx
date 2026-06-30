'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Settings, Shield, FileText } from 'lucide-react';

const THEMES = [
  { color: '#22d3ee', glow: 'bg-cyan-500/30' },     // Cyan
  { color: '#34d399', glow: 'bg-emerald-500/30' },  // Emerald
  { color: '#c084fc', glow: 'bg-purple-500/30' },   // Purple
  { color: '#fbbf24', glow: 'bg-amber-500/30' }     // Amber
];

// Reusable component for each holographic shape
function HolographicShape({ index, activeIndex, geometry, color }: { index: number, activeIndex: number, geometry: THREE.BufferGeometry, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state, delta) => {
    // Continuous slow Y-axis rotation
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.05;
    pointsRef.current.rotation.y += delta * 0.15;
    pointsRef.current.rotation.x += delta * 0.05;

    // Smooth transition opacity
    const targetOpacity = activeIndex === index ? 1 : 0;
    
    // Wireframe material opacity
    const meshMat = meshRef.current.material as THREE.Material;
    meshMat.opacity = THREE.MathUtils.lerp(meshMat.opacity, targetOpacity * 0.15, delta * 3);
    meshRef.current.visible = meshMat.opacity > 0.01;

    // Points material opacity
    const pointsMat = pointsRef.current.material as THREE.Material;
    pointsMat.opacity = THREE.MathUtils.lerp(pointsMat.opacity, targetOpacity * 0.8, delta * 3);
    pointsRef.current.visible = pointsMat.opacity > 0.01;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1.5}>
      {/* Wireframe Mesh */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={0} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
      
      {/* Glowing Particles */}
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial 
          size={0.08} 
          color={color} 
          transparent 
          opacity={0} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
          sizeAttenuation={true} 
        />
      </points>
    </Float>
  );
}

// --- CUSTOM RELEVANT GEOMETRIES ---

const createLightbulbGeometry = () => {
  const points = [];
  // Base
  points.push(new THREE.Vector2(0, -2));
  points.push(new THREE.Vector2(0.6, -2));
  points.push(new THREE.Vector2(0.6, -1));
  // Bulb curve
  points.push(new THREE.Vector2(1.5, 0));
  points.push(new THREE.Vector2(2, 1));
  points.push(new THREE.Vector2(1.5, 2.5));
  points.push(new THREE.Vector2(0, 3)); 
  
  const spline = new THREE.SplineCurve(points);
  const smoothPoints = spline.getPoints(24); // Reduced from 100 for performance
  
  const geo = new THREE.LatheGeometry(smoothPoints, 24); // Reduced from 64 for performance
  geo.center();
  return geo;
};

const createGearGeometry = () => {
  const shape = new THREE.Shape();
  const outerRadius = 2.5;
  const teethDepth = 0.6;
  const teeth = 12;

  for (let i = 0; i < teeth * 2; i++) {
    const angle = (i / (teeth * 2)) * Math.PI * 2;
    const radius = i % 2 === 0 ? outerRadius : outerRadius - teethDepth;
    if (i === 0) shape.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    else shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  shape.closePath();

  const hole = new THREE.Path();
  hole.absarc(0, 0, 1.0, 0, Math.PI * 2, false);
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.6, curveSegments: 12, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 });
  geo.center();
  return geo;
};

const createShieldGeometry = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 2.5);
  shape.quadraticCurveTo(2, 2.5, 2.5, 1);
  shape.quadraticCurveTo(2.5, -1, 0, -3.5);
  shape.quadraticCurveTo(-2.5, -1, -2.5, 1);
  shape.quadraticCurveTo(-2, 2.5, 0, 2.5);
  
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.6, curveSegments: 12, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 });
  geo.center();
  return geo;
};

const createDocumentGeometry = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-1.5, -2);
  shape.lineTo(1.5, -2);
  shape.lineTo(1.5, 1);
  shape.lineTo(0.5, 2); 
  shape.lineTo(-1.5, 2);
  shape.closePath();

  for(let i=0; i<3; i++) {
    const hole = new THREE.Path();
    hole.moveTo(-1, 0.5 - i);
    hole.lineTo(1, 0.5 - i);
    hole.lineTo(1, 0.3 - i);
    hole.lineTo(-1, 0.3 - i);
    hole.closePath();
    shape.holes.push(hole);
  }

  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.2, curveSegments: 8, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 1, steps: 1 });
  geo.center();
  return geo;
};

function Scene({ activeIndex }: { activeIndex: number }) {
  // Generate highly dense custom geometries representing the business
  const geometries = useMemo(() => [
    createLightbulbGeometry(), // Idea / Innovation
    createGearGeometry(),      // Mechanical CAD / Engineering
    createShieldGeometry(),    // Patent Protection / NDA
    createDocumentGeometry()   // Patent Filing / Drafting
  ], []);

  return (
    <group position={[0, 0, 0]}>
      {geometries.map((geo, idx) => (
        <HolographicShape 
          key={idx} 
          index={idx} 
          activeIndex={activeIndex} 
          geometry={geo} 
          color={THEMES[idx].color} 
        />
      ))}
    </group>
  );
}

export function HeroAnimation({ activeIndex = 0 }: { activeIndex?: number }) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const FallbackIcon = useMemo(() => {
    switch (activeIndex) {
      case 0: return Lightbulb;
      case 1: return Settings;
      case 2: return Shield;
      case 3: return FileText;
      default: return Lightbulb;
    }
  }, [activeIndex]);

  // Use inline styles to guarantee the container always has height, 
  // bypassing any Tailwind CSS caching bugs when switching branches
  return (
    <div 
      className="relative w-full flex items-center justify-center pointer-events-none"
      style={{ height: 'max(50vh, 400px)' }}
    >
      

      {/* Dynamic Radial Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        {THEMES.map((theme, idx) => (
          <div 
            key={idx}
            className={`absolute rounded-full transition-opacity duration-1000 ease-in-out mix-blend-screen ${theme.glow}`}
            style={{ 
              opacity: activeIndex === idx ? 1 : 0,
              width: 'max(60vw, 400px)',
              height: 'max(60vw, 400px)',
              filter: 'blur(120px)'
            }}
          />
        ))}
      </div>

      {isMobile ? (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center justify-center"
            >
              {/* Internal spinning/pulsing glow element */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-44 h-44 rounded-full border border-dashed opacity-25"
                style={{ borderColor: THEMES[activeIndex].color }}
              />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex items-center justify-center p-8 rounded-full border border-white/5 bg-slate-900/35 backdrop-blur-sm"
              >
                <div 
                  className="absolute inset-0 rounded-full opacity-30 filter blur-xl"
                  style={{ background: `radial-gradient(circle, ${THEMES[activeIndex].color} 0%, transparent 70%)` }}
                />
                <FallbackIcon 
                  size={64} 
                  strokeWidth={1.5}
                  style={{ color: THEMES[activeIndex].color }}
                  className="relative z-10 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* WebGL Canvas */
        <div className="absolute inset-0 z-10">
          <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} dpr={[1, 2]}>
            <Scene activeIndex={activeIndex} />
          </Canvas>
        </div>
      )}

    </div>
  );
}
