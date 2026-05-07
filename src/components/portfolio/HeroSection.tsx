import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowDown, Code, Sparkles, Terminal } from 'lucide-react';

export const HeroSection: React.FC<{ onScrollToSection: (id: string) => void }> = ({ onScrollToSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBackground = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(168, 85, 247, 0.08) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 80%)`;

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 md:px-12 py-16 md:py-24 text-center overflow-hidden"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{ background: spotlightBackground }}
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none -z-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none -z-15" />

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950/80 border border-neutral-800/80 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-[10px] md:text-xs font-mono font-medium tracking-widest text-neutral-400 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Active End-to-End Delivery
          </span>
        </motion.div>

        {/* Majestic Typography */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white leading-none font-display select-none"
          >
            Vinay Kumar Yadav
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-400 tracking-tight"
          >
            Building high-performance <span className="text-gradient-neon font-medium">web & mobile solutions</span>
          </motion.h2>
        </div>

        {/* Refined Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-sm sm:text-lg text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed text-balance"
        >
          Senior Software Engineer with 5 years of experience engineering scalable web and cross-platform mobile solutions. Specialized in React Native development, functional state design (Redux, Zustand), and high-performance Python backend integration with FastAPI.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 pt-4"
        >
          <button
            onClick={() => onScrollToSection('ventures')}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-all font-display shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Explore Projects
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>
          
          <button
            onClick={() => onScrollToSection('sandbox')}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white font-mono text-sm transition-all"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            sandbox.exe
          </button>
        </motion.div>

      </div>

      {/* Mini stats or badges floating */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-[10px] font-mono text-neutral-600 uppercase tracking-widest pointer-events-none"
      >
        <div className="flex items-center gap-1">
          <Code className="w-3.5 h-3.5" />
          EST. 2020 &bull; BENGALURU, INDIA
        </div>
        <div className="hidden md:block">
          PRESS ⌘K FOR COMMANDS
        </div>
      </motion.div>
    </section>
  );
};
