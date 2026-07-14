import React from 'react';
import { Sun, Moon, Search } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface NavigationProps {
  onOpenCommandMenu: () => void;
  onScrollToSection: (id: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenCommandMenu, onScrollToSection }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-12 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-full bg-white/85 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/60 backdrop-blur-md shadow-md">
        
        {/* Brand/Logo styled like 'showcasy.' */}
        <div 
          onClick={() => onScrollToSection('hero')} 
          className="flex flex-row flex-nowrap items-center gap-0.5 cursor-pointer select-none group"
        >
          <span className="font-display font-semibold text-lg tracking-tight text-[#111113] dark:text-white transition-colors">
            vinay
          </span>
          <span className="ml-1 px-2.5 py-0.5 rounded-lg bg-[#111113] text-white dark:bg-white dark:text-black font-display font-extrabold text-sm transition-colors group-hover:scale-102 duration-300">
            yadav
          </span>
          <span className="font-display font-extrabold text-[#111113] dark:text-white text-lg">.</span>
        </div>



        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          {/* Command Search Trigger */}
          <button
            onClick={onOpenCommandMenu}
            className="flex items-center justify-center p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Search commands (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-[#111113] dark:text-white"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-500 fill-amber-500/10" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700 fill-zinc-700/10" />
            )}
          </button>
        </div>

      </div>
    </nav>
  );
};