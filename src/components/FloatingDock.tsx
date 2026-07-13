import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Home, Folder, Briefcase, Code, Mail, Search, Github } from 'lucide-react';

interface FloatingDockProps {
  onOpenCommandMenu: () => void;
  onScrollToSection: (id: string) => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenCommandMenu, onScrollToSection }) => {
  const mouseX = useMotionValue(Infinity);

  const dockItems = [
    { label: 'Home', icon: <Home className="w-5 h-5" />, action: () => onScrollToSection('hero') },
    { label: 'Creations', icon: <Folder className="w-5 h-5" />, action: () => onScrollToSection('ventures') },
    { label: 'Experience', icon: <Briefcase className="w-5 h-5" />, action: () => onScrollToSection('experience') },
    { label: 'Skills', icon: <Code className="w-5 h-5" />, action: () => onScrollToSection('skills') },
    { label: 'Contact', icon: <Mail className="w-5 h-5" />, action: () => onScrollToSection('contact') },
    { label: 'Search', icon: <Search className="w-5 h-5" />, action: onOpenCommandMenu },
    { label: 'GitHub', icon: <Github className="w-5 h-5" />, action: () => window.open('https://github.com/vinay000', '_blank') },
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
        className="flex items-end gap-3 px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 backdrop-blur-xl shadow-xl relative"
      >
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
      className="relative rounded-xl bg-zinc-50 dark:bg-[#1E1E20] border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-center cursor-pointer transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className="absolute -top-10 left-1/2 px-2 py-1 bg-zinc-900 dark:bg-zinc-950 border border-zinc-950 dark:border-zinc-800 text-[10px] font-mono text-white dark:text-slate-200 rounded-md whitespace-nowrap pointer-events-none"
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
