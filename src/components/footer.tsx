import React from 'react';
import { Github, Linkedin, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 py-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Left Side: Logo and Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          <div 
            onClick={scrollToTop} 
            className="flex items-center gap-0.5 select-none cursor-pointer"
          >
            <span className="font-display font-semibold text-sm tracking-tight text-[#111113] dark:text-white">
              vinay
            </span>
            <span className="ml-1 px-1.5 py-0.2 rounded bg-[#111113] text-white dark:bg-white dark:text-black font-display font-extrabold text-[10px]">
              yadav
            </span>
            <span className="font-display font-extrabold text-[#111113] dark:text-white text-sm">.</span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Vinay Kumar Yadav. All rights reserved.
          </span>
        </div>

        {/* Right Side: Simple Links and Scroll to Top */}
        <div className="flex items-center gap-5">
          <a 
            href="https://github.com/vinay000" 
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-500 dark:text-slate-400 hover:text-[#2B6A65] dark:hover:text-teal-400 transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a 
            href="https://linkedin.com/in/vinay000" 
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-500 dark:text-slate-400 hover:text-[#2B6A65] dark:hover:text-teal-400 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button 
            onClick={scrollToTop} 
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
