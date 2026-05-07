import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Terminal, Briefcase, Code, Mail, Search, Github, Linkedin, Twitter } from 'lucide-react';

interface FloatingDockProps {
  onOpenCommandMenu: () => void;
  onScrollToSection: (id: string) => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenCommandMenu, onScrollToSection }) => {
  const mouseX = useMotionValue(Infinity);

  const dockItems = [
    { label: 'Home', icon: <Terminal className="w-5 h-5" />, action: () => onScrollToSection('hero') },
    { label: 'Ventures', icon: <Briefcase className="w-5 h-5" />, action: () => onScrollToSection('ventures') },
    { label: 'Experience', icon: <Briefcase className="w-5 h-5 text-purple-400" />, action: () => onScrollToSection('experience') },
    { label: 'Skills', icon: <Code className="w-5 h-5" />, action: () => onScrollToSection('skills') },
    { label: 'Sandbox', icon: <Terminal className="w-5 h-5 text-cyan-400" />, action: () => onScrollToSection('sandbox') },
    { label: 'Contact', icon: <Mail className="w-5 h-5 text-red-400" />, action: () => onScrollToSection('contact') },
    { label: 'Search', icon: <Search className="w-5 h-5 text-amber-400" />, action: onOpenCommandMenu },
    { label: 'GitHub', icon: <Github className="w-5 h-5" />, action: () => window.open('https://github.com', '_blank') },
  ];

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 120 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] hidden sm:block"
    >
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-3 px-4 py-3 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 backdrop-blur-xl shadow-2xl glass-panel relative"
      >
        {/* Glow behind dock */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-emerald-500/10 rounded-2xl -z-10 blur-xl opacity-80" />

        {dockItems.map((item, idx) => (
          <DockIcon key={idx} mouseX={mouseX} item={item} />
        ))}
      </div>
    </motion.div>
  );
};

interface DockIconProps {
  mouseX: any;
  item: {
    label: string;
    icon: React.ReactNode;
    action: () => void;
  };
}

const DockIcon: React.FC<DockIconProps> = ({ mouseX, item }) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onClick={item.action}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-xl bg-neutral-900 border border-neutral-800/50 flex items-center justify-center cursor-pointer transition-colors hover:bg-neutral-800 hover:border-neutral-700/80 text-neutral-400 hover:text-white"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className="absolute -top-10 left-1/2 px-2 py-1 bg-neutral-950 border border-neutral-800 text-[10px] font-mono text-slate-200 rounded-md whitespace-nowrap pointer-events-none"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center justify-center pointer-events-none">
        {item.icon}
      </div>
    </motion.div>
  );
};
