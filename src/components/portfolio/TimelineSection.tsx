import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, ExternalLink } from 'lucide-react';

interface CareerStep {
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  bullets: React.ReactNode[];
  tags: string[];
  colorClass: string;
}

export const TimelineSection: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const history: CareerStep[] = [
    {
      period: 'Mar 2026 — Present',
      role: 'Founder & Full Stack Engineer',
      company: 'Feedlyx',
      description: 'Building Feedlyx, a multi-tenant customer feedback SaaS with dynamic routing and OpenAI sentiment analytics.',
      bullets: [
        <>Sole developer owning the product design, software architecture, development, and deployment <span className="font-semibold text-slate-900 dark:text-white">end-to-end</span>.</>,
        <>Architected full stack solutions using <span className="font-semibold text-slate-900 dark:text-white">React, TypeScript, Node.js, Express, MongoDB, and Vercel</span>.</>,
        <>Implemented stateless JWT SSO, embeddable user feedback widgets, and automated <span className="font-semibold text-[#2B6A65] dark:text-teal-400">OpenAI duplicate feedback detector</span>.</>
      ],
      tags: ['SaaS', 'Founder', 'AI Integration', 'Vercel'],
      colorClass: 'bg-[#2B6A65]' // Forest Teal
    },
    {
      period: 'Sept 2025 — Feb 2026',
      role: 'Senior Software Engineer II',
      company: 'GeekyAnts',
      companyUrl: 'https://geekyants.com/en-in',
      description: 'Led end-to-end development of cross-platform mobile and web applications, focusing on AI-assisted treatment sharing and dental dashboards.',
      bullets: [
        <>Led development of cross-platform dental applications enabling <span className="font-semibold text-[#2B6A65] dark:text-teal-400">AI-assisted treatment planning</span> via OpenAI APIs.</>,
        <>Designed secure multi-tenant workflows for doctor-to-lab data routing and patient record sharing.</>,
        <>Spearheaded development of a merchant transaction app providing <span className="font-semibold text-slate-900 dark:text-white">real-time sales tracking</span> and business dashboards.</>
      ],
      tags: ['React Native', 'Next.js', 'AI Dental Planner', 'FastAPI'],
      colorClass: 'bg-[#F1BE42]' // Warm Yellow
    },
    {
      period: 'Nov 2021 — Jul 2025',
      role: 'Senior Software Engineer',
      company: 'In Time Tec',
      companyUrl: 'https://www.intimetec.com/',
      description: 'Led core product delivery for international clients, driving cross-platform mobile initiatives, team management, and release automation. Promoted from Software Engineer (Nov 2021) to Senior Software Engineer (Jan 2024).',
      bullets: [
        <>Managed technical sprint planning, client demos, and led a team of 4–5 engineering members.</>,
        <>Coordinated closely to launch three major mobile apps and two web apps, used by thousands of users globally.</>,
        <>Set up CI/CD workflows using <span className="font-semibold text-slate-900 dark:text-white">GitHub Actions and Fastlane</span>, automating deployment releases.</>,
        <>Improved testing coverage with Jest and Appium, increasing regression bug detection rates by <span className="font-semibold text-slate-900 dark:text-white">35%</span>.</>
      ],
      tags: ['Team Lead', 'Fastlane', 'Jest & Appium', 'CI/CD'],
      colorClass: 'bg-[#E75A36]' // Coral Red
    },
    {
      period: 'Sept 2020 — Oct 2021',
      role: 'Software Engineer',
      company: 'SimplexMLM',
      companyUrl: 'https://simplexmlm.com/',
      description: 'Focused on frontend interface development, accessibility compliance, and high-performance web user experiences.',
      bullets: [
        <>Refactored legacy components, resulting in a <span className="font-semibold text-slate-900 dark:text-white">25% reduction in load times</span> and improved device stability.</>,
        <>Delivered accessible web interfaces using React.js and TypeScript, leading to a <span className="font-semibold text-slate-900 dark:text-white">20% boost in accessibility compliance</span>.</>,
        <>Coordinated with Design/QA to roll out 4 high-impact features in under 6 months using Agile sprints.</>
      ],
      tags: ['Accessibility', 'React JS', 'Performance', 'Agile'],
      colorClass: 'bg-[#2B6A65]' // Forest Teal
    }
  ];

  return (
    <section 
      id="experience" 
      className="relative flex flex-col items-start pt-20 pb-16 w-full text-left border-b border-slate-100 dark:border-slate-800/80"
    >
      
      {/* Header */}
      <div className="space-y-3 mb-10">
        <h2 className="text-3xl sm:text-4.5xl font-bold tracking-tight text-[#0A2540] dark:text-white font-display select-none">
          Professional Timeline
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-100 max-w-2xl font-normal leading-relaxed">
          A proven 5-year trajectory of technical ownership, software architecture, client success, and engineering mentorship.
        </p>
      </div>

      {/* Timeline Project-Style Cards Stack */}
      <div className="w-full space-y-6">
        {history.map((step, idx) => {
          const isExpanded = !!expanded[idx];
          return (
            <motion.div
              key={step.company}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:bg-slate-900/90 transition-all duration-300 w-full group"
            >
              
              {/* Col 1: Icon & Company Name & Date (Left) */}
              <div className="lg:col-span-3 flex items-center gap-3.5 w-full">
                <div className={`w-12 h-12 rounded-full ${step.colorClass} flex items-center justify-center shrink-0 shadow-sm`}>
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-[#0A2540] dark:text-white font-display truncate leading-tight">
                    {step.companyUrl ? (
                      <a 
                        href={step.companyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-[#2B6A65] dark:hover:text-teal-400 transition-colors inline-flex items-center gap-1.5 group/company-link"
                      >
                        {step.company}
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/company-link:text-[#2B6A65] dark:group-hover/company-link:text-teal-400 transition-colors shrink-0" />
                      </a>
                    ) : (
                      step.company
                    )}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 mt-1 block">
                    {step.period}
                  </span>
                </div>
              </div>

              {/* Col 2: Role & Achievement Bullets (Center) */}
              <div className="lg:col-span-6 w-full text-left">
                <h4 className="text-sm font-bold text-[#2B6A65] dark:text-teal-400 uppercase tracking-wide">
                  {step.role}
                </h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal mt-1">
                  {step.description}
                </p>

                {/* Collapsible toggle button */}
                <button
                  onClick={() => toggleExpand(idx)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2B6A65] dark:text-teal-400 hover:text-[#0A2540] dark:hover:text-white transition-colors mt-3 select-none"
                >
                  {isExpanded ? 'Hide Achievements' : 'Show Achievements'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Collapsible content area */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 mt-4 pl-1 border-t border-slate-100/60 dark:border-slate-800/40 pt-3">
                        {step.bullets.map((bullet, bulletIdx) => (
                          <li key={bulletIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal text-left animate-fadeIn">
                            <span className="text-[#2B6A65] dark:text-teal-400 font-bold select-none shrink-0 mt-[2px]">—</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Col 3: Skill Tags & Info (Right) */}
              <div className="lg:col-span-3 flex lg:flex-col items-start lg:items-end justify-between lg:justify-start gap-4 w-full h-full border-t lg:border-t-0 border-slate-100/60 dark:border-slate-800/40 pt-4 lg:pt-0">
                <div className="flex flex-wrap gap-1.5 lg:justify-end">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
