import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Linkedin, Github, Mail } from 'lucide-react';
import placeholderUser from '@/assets/img/placeholder-user.jpg';

interface HeroSectionProps {
  onScrollToSection: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToSection }) => {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center items-start pt-16 pb-12 text-left overflow-hidden border-b border-zinc-200/50 dark:border-zinc-800/40 w-full"
    >
      <div className="max-w-4xl w-full space-y-6 relative z-10">

        {/* Profile photo and Social links */}
        <div className="flex items-center justify-between w-full gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0"
          >
            <img
              src={`${import.meta.env.BASE_URL}my.png`}
              alt="Vinay Kumar Yadav"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite error loops
                target.src = placeholderUser;
              }}
            />
          </motion.div>

          {/* Social Links on the far right end (only icons in circular buttons) */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 select-none"
          >
            <a
              href="https://www.linkedin.com/in/vinay000"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn Profile"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/45 text-slate-700 dark:text-slate-300 hover:text-[#2B6A65] dark:hover:text-teal-400 hover:border-[#2B6A65]/40 dark:hover:border-teal-500/40 transition-all shadow-sm"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://github.com/vinay000"
              target="_blank"
              rel="noreferrer"
              title="GitHub Profile"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/45 text-slate-700 dark:text-slate-300 hover:text-[#2B6A65] dark:hover:text-teal-400 hover:border-[#2B6A65]/40 dark:hover:border-teal-500/40 transition-all shadow-sm"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href="mailto:vinsyadav5@gmail.com"
              title="Send Mail"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/45 text-slate-700 dark:text-slate-300 hover:text-[#2B6A65] dark:hover:text-teal-400 hover:border-[#2B6A65]/40 dark:hover:border-teal-500/40 transition-all shadow-sm"
            >
              <Mail className="w-4.5 h-4.5" />
            </a>
          </motion.div>
        </div>

        {/* Screenshot-inspired typography */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.5rem] sm:text-[3.8rem] md:text-[4.5rem] font-bold tracking-tight leading-[1.1] text-[#0A2540] dark:text-white font-display select-none"
          >
            Engineering AI-powered <br />
            apps and high-performance <br />
            <span className="text-[#2B6A65] dark:text-teal-400 font-bold">digital solutions</span>
          </motion.h1>
        </div>

        {/* Description with highlights and improved readability */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl font-normal leading-relaxed text-balance"
        >
          I'm <span className="font-semibold text-[#0A2540] dark:text-white">Vinay Kumar Yadav</span>, a <span className="font-semibold text-[#0A2540] dark:text-white">Senior React Native & React Engineer</span> and the creator of <span className="font-semibold text-[#0A2540] dark:text-white">Feedlyx</span>. I have <span className="font-semibold text-[#0A2540] dark:text-white">5+ years of experience</span> engineering <span className="font-semibold text-[#2B6A65] dark:text-teal-400">AI-powered mobile and cross-platform web applications</span> using React, React Native, TypeScript, and Node.js.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <button
            onClick={() => onScrollToSection('ventures')}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A2540] dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-[#11385c] dark:hover:bg-slate-100 transition-all font-display shadow-sm"
          >
            Explore Projects
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={() => onScrollToSection('contact')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-display"
          >
            Let's Talk
          </button>
        </motion.div>

      </div>
    </section>
  );
};
