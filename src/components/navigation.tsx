import React from 'react';
import { Search } from 'lucide-react';

interface NavigationProps {
  onOpenCommandMenu: () => void;
  onScrollToSection: (id: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenCommandMenu, onScrollToSection }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2.5 rounded-full bg-neutral-950/70 border border-neutral-900/60 backdrop-blur-md">
        
        {/* Brand/Logo */}
        <div 
          onClick={() => onScrollToSection('hero')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="relative w-7 h-7 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20 transition-transform group-hover:scale-105">
            <span className="text-white text-xs font-semibold font-display">VY</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-semibold text-sm tracking-wide text-white group-hover:text-cyan-400 transition-colors">
            vinay.yadav
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onScrollToSection('ventures')} 
            className="text-xs font-light text-neutral-400 hover:text-white transition-colors"
          >
            ventures
          </button>
          <button 
            onClick={() => onScrollToSection('experience')} 
            className="text-xs font-light text-neutral-400 hover:text-white transition-colors"
          >
            timeline
          </button>
          <button 
            onClick={() => onScrollToSection('skills')} 
            className="text-xs font-light text-neutral-400 hover:text-white transition-colors"
          >
            tech stack
          </button>
          <button 
            onClick={() => onScrollToSection('sandbox')} 
            className="text-xs font-light text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
          >
            sandbox.exe
          </button>
        </div>

        {/* Right side Command trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCommandMenu}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors text-neutral-400 hover:text-slate-200"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono tracking-tight hidden sm:inline">Search</span>
            <span className="text-[9px] font-mono bg-neutral-950 px-1.5 py-0.5 rounded text-neutral-500 border border-neutral-800/80 hidden sm:inline">
              ⌘K
            </span>
          </button>

          <button
            onClick={() => onScrollToSection('contact')}
            className="px-4 py-1.5 text-xs font-light rounded-full bg-white text-black hover:bg-neutral-200 transition-all font-display shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          >
            let's build
          </button>
        </div>

      </div>
    </nav>
  );
};