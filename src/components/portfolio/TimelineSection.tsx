import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';

interface CareerStep {
  period: string;
  role: string;
  company: string;
  description: string;
  systemLog: string;
  bullets: string[];
}

export const TimelineSection: React.FC = () => {
  const history: CareerStep[] = [
    {
      period: 'Sept 2025 — Feb 2026',
      role: 'Senior Software Engineer',
      company: 'GeekyAnts',
      description: 'Worked on scalable React Native and web applications, collaborating with global teams to optimize performance and code quality.',
      systemLog: 'REACT_NATIVE_CORE.TSX',
      bullets: [
        'Developed scalable React Native mobile and high-fidelity web features to improve product responsiveness.',
        'Collaborated directly with cross-functional product owners to deliver key features under strict timelines.',
        'Contributed to core performance optimization and established robust code formatting and quality standards.'
      ]
    },
    {
      period: 'Nov 2021 — Jul 2025',
      role: 'Senior Software Engineer',
      company: 'In Time Tec',
      description: 'Led core product delivery for international clients, driving cross-platform mobile initiatives, team management, and release automation.',
      systemLog: 'FASTLANE_DEPLOY.SH',
      bullets: [
        'Led a team of 4–5 engineers, managing planning, client interactions, production deployments, and technical demos.',
        'Built 3 high-volume mobile apps and 2 global web applications, introducing modular reusable architectures.',
        'Implemented end-to-end CI/CD pipelines using GitHub Actions & Fastlane, saving up to 4 hours per release.',
        'Increased regression test coverage using Jest & Appium, boosting regression bug detection rates by 35%.',
        'Mentored 6+ junior developers through structured technical sessions and thorough code peer reviews.'
      ]
    },
    {
      period: 'Sept 2020 — Oct 2021',
      role: 'Software Engineer',
      company: 'SimplexMLM',
      description: 'Focused on frontend interface development, accessibility, and high-performance user engagements.',
      systemLog: 'FRONTEND_OPTIMIZE.JS',
      bullets: [
        'Boosted loading performance by 25% through codebase refactoring and component lazy-loading.',
        'Improved global accessibility ratings by 20% and user engagement by 15% using React & TypeScript.',
        'Shipped 4 core high-impact features in under 6 months adhering to strict Agile/Scrum best practices.'
      ]
    }
  ];

  return (
    <section id="experience" className="relative py-24 md:py-32 px-6 max-w-4xl mx-auto space-y-16">
      
      {/* Background Neon Elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 tracking-wider uppercase">
          <Calendar className="w-3.5 h-3.5" />
          chronology.log
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
          Professional Timeline
        </h2>
        <p className="text-base md:text-lg text-neutral-400 max-w-xl font-light leading-relaxed">
          A proven 5-year trajectory of technical ownership, client success, product deliveries, and engineering mentorship.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l border-neutral-900 ml-4 md:ml-6 pl-8 md:pl-12 space-y-12">
        {/* Glowing vertical line overlay */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-purple-500 via-cyan-500 to-transparent opacity-50" />

        {history.map((step, index) => (
          <motion.div
            key={step.company}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative space-y-4 group"
          >
            {/* Pulsing indicator on the line */}
            <span className="absolute -left-8 md:-left-12 -translate-x-1/2 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black border-2 border-neutral-800 transition-colors group-hover:border-purple-400">
              <span className="h-2 w-2 rounded-full bg-neutral-800 transition-colors group-hover:bg-purple-400 animate-pulse" />
            </span>

            {/* Step Header */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <span className="text-sm font-mono text-neutral-400">{step.period}</span>
              <span className="text-sm font-mono bg-neutral-950 px-2.5 py-0.5 rounded border border-neutral-900 text-purple-400 font-medium">
                {step.company}
              </span>
              <span className="text-slate-400 text-sm font-mono hidden md:inline">
                [{step.systemLog}]
              </span>
            </div>

            {/* Step Card */}
            <div className="rounded-xl p-6 bg-neutral-950/20 border border-neutral-900/80 hover:border-neutral-800/80 transition-colors glass-panel space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white font-display">{step.role}</h3>
                <p className="text-sm text-neutral-300 font-light mt-1.5">{step.description}</p>
              </div>

              <ul className="space-y-2">
                {step.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-400 leading-relaxed font-light">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-purple-500/80 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
