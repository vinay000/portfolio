import React, { useState, useEffect } from 'react';
import { Github, Linkedin, ArrowUp, Globe } from 'lucide-react';

export function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-neutral-950 border-t border-neutral-900 py-12 md:py-20 overflow-hidden">
      {/* Subtle bottom glows */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          
          {/* About Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <span className="text-white text-[9px] font-semibold">VY</span>
              </div>
              <span className="font-semibold text-sm tracking-wider text-white">
                VINAY KUMAR YADAV
              </span>
            </div>
            <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs">
              Senior Software Engineer based in Bengaluru, India. Specialized in engineering high-fidelity React Native interfaces, scalable web applications, and automated release pipelines.
            </p>
          </div>

          {/* Clock / Location Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-widest flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-neutral-500 animate-spin-slow" />
              Current Location
            </h4>
            <div className="space-y-1">
              <div className="text-sm font-light text-neutral-300">Bengaluru, India</div>
              <div className="text-xs font-mono text-cyan-400/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {time || '03:00 PM'} IST
              </div>
            </div>
          </div>

          {/* Socials / Links Column */}
          <div className="space-y-4 md:text-right">
            <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-widest">
              Digital Footprint
            </h4>
            <div className="flex gap-4 md:justify-end">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full border border-neutral-850 bg-neutral-900/50 flex items-center justify-center hover:bg-neutral-800 hover:border-neutral-700 hover:text-cyan-400 transition-all text-neutral-400"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com/in/vinay000" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full border border-neutral-850 bg-neutral-900/50 flex items-center justify-center hover:bg-neutral-800 hover:border-neutral-700 hover:text-cyan-400 transition-all text-neutral-400"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button 
                onClick={scrollToTop} 
                className="w-8 h-8 rounded-full border border-neutral-850 bg-neutral-900/50 flex items-center justify-center hover:bg-neutral-800 hover:border-neutral-700 hover:text-white transition-all text-neutral-400"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        <div className="mt-12 md:mt-20 pt-8 border-t border-neutral-900/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-neutral-600">
          <div>© {new Date().getFullYear()} Vinay Kumar Yadav. All rights reserved.</div>
          <div className="flex gap-6">
            <span className="hover:text-neutral-400 transition-colors cursor-help">Crafted in Bengaluru</span>
            <span>&bull;</span>
            <span className="hover:text-neutral-400 transition-colors cursor-help">Built with React, Motion & Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
