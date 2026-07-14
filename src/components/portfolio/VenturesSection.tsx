import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Smartphone, Shield, Palette } from 'lucide-react';

interface Project {
  title: string;
  role: string;
  date: string;
  tagline: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  colorClass: string;
  stat: string;
  link: string;
}

export const VenturesSection: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'Feedlyx',
      role: 'Founder & Full Stack Engineer',
      date: 'Mar 2026 — Present',
      tagline: 'AI-Powered Customer Feedback SaaS',
      description: 'A multi-tenant customer feedback platform featuring dynamic subdomain-scoped portals. Integrated OpenAI APIs for automated sentiment analysis, description rephrasing, and duplicate detection.',
      tags: ['Founder', 'React & Next.js', 'Node.js', 'OpenAI API'],
      icon: <Laptop className="w-5 h-5 text-white" />,
      colorClass: 'bg-[#2B6A65]', // Forest Teal
      stat: 'Active SaaS',
      link: '#'
    },
    {
      title: 'Treatment DDS App',
      role: 'Lead Architect (GeekyAnts)',
      date: 'Sept 2025 — Feb 2026',
      tagline: 'AI Clinical Treatment Planner',
      description: 'A cross-platform mobile and web application enabling dentists and laboratories to generate AI-assisted clinical treatment plans with secure data sharing pipelines.',
      tags: ['Lead Architect', 'React Native', 'Next.js', 'GPT-4 API'],
      icon: <Shield className="w-5 h-5 text-white" />,
      colorClass: 'bg-[#F1BE42]', // Warm Yellow
      stat: 'AI-Powered',
      link: '#'
    },
    {
      title: 'PayPoint Merchant App',
      role: 'React Native Developer',
      date: 'Aug 2025 — Sept 2025',
      tagline: 'Multi-terminal Merchant Dashboard',
      description: 'A mobile merchant dashboard to monitor real-time transaction data, terminal sales, and financial analytics with secure OAuth-based authentication.',
      tags: ['Mobile Developer', 'React Native', 'Zustand', 'REST API'],
      icon: <Smartphone className="w-5 h-5 text-white" />,
      colorClass: 'bg-[#F1BE42]', // Warm Yellow
      stat: 'FinTech',
      link: '#'
    },
    {
      title: 'GOM Mix Video Editor',
      role: 'Core UI Architect',
      date: '2024',
      tagline: 'Canvas-powered Keyframe Editing Studio',
      description: 'A professional web-based video editor with custom timelines and keyframe animations utilizing Fabric.js and TypeScript, optimizing canvas rendering by 25%.',
      tags: ['Core UI Architect', 'TypeScript', 'Fabric.js', 'Performance'],
      icon: <Palette className="w-5 h-5 text-white" />,
      colorClass: 'bg-[#E75A36]', // Coral Red
      stat: '25% Optimization',
      link: '#'
    },
    {
      title: 'NextGen Agtech',
      role: 'Senior Developer (In Time Tec)',
      date: '2023',
      tagline: 'Logistics & Herd Manager',
      description: 'Created a logistics web app to digitize US cattle farming, managing inventory transfers and analytics for herds up to 10,000 units.',
      tags: ['Senior Developer', 'React JS', 'REST API', 'Agtech'],
      icon: <Laptop className="w-5 h-5 text-white" />,
      colorClass: 'bg-[#E75A36]', // Coral Red
      stat: '10k+ Herds',
      link: '#'
    },
    {
      title: 'AEYC Mobile App',
      role: 'Senior React Native Developer',
      date: '2020 — 2025',
      tagline: 'Educator Utility & Network',
      description: 'A scalable mobile application serving over 30,000 active educators across 300+ screens on iOS/Android. Automated deployments with Fastlane pipelines.',
      tags: ['Senior RN Developer', 'React Native CLI', 'Redux', 'Fastlane'],
      icon: <Smartphone className="w-5 h-5 text-white" />,
      colorClass: 'bg-[#2B6A65]', // Forest Teal
      stat: '30k+ Users',
      link: '#'
    }
  ];

  return (
    <div className="w-full space-y-20">
      
      {/* Row Section 1: What do I help? */}
      <section 
        id="about-help" 
        className="relative flex flex-col items-start pt-16 pb-4 w-full text-left border-b border-slate-100 dark:border-slate-800/80"
      >
        <div className="max-w-4xl space-y-6">
          <h2 className="text-3xl sm:text-4.5xl lg:text-5xl font-bold tracking-tight text-[#0A2540] dark:text-white font-display select-none">
            What do I help?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-4">
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                I help founders and engineering teams build high-performance, AI-powered mobile apps and cross-platform web solutions. By combining production-grade React Native expertise with OpenAI integrations and custom graphics rendering, I turn complex requirements into clean products.
              </p>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                We focus on clean visual hierarchies, smooth rendering paths, and automated deployment structures to accelerate time-to-market.
              </p>
            </div>

            {/* Stats row - directly matching screenshot style */}
            <div className="flex md:flex-col gap-8 md:gap-6 pt-2 md:pt-0 md:pl-6 md:border-l border-slate-100 dark:border-slate-800/80">
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-[#0A2540] dark:text-white tracking-tight">30k+</div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1 uppercase tracking-wider">Active Users Served</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-[#0A2540] dark:text-white tracking-tight">5+</div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1 uppercase tracking-wider">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Row Section 2: Selected Creations (All Projects Unified) */}
      <section 
        id="ventures" 
        className="relative flex flex-col items-start pt-4 pb-16 w-full text-left border-b border-slate-100 dark:border-slate-800/80"
      >
        <div className="space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4.5xl font-bold tracking-tight text-[#0A2540] dark:text-white font-display select-none">
            Selected Creations
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-100 max-w-2xl font-normal leading-relaxed">
            A track record of designing and delivering production-ready mobile applications and web systems.
          </p>
        </div>

        {/* Row-wise Project Card Stack */}
        <div className="w-full space-y-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start lg:items-center p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:bg-slate-900/90 transition-all duration-300 w-full group"
            >
              
              {/* Col 1: Icon & Title & Date (Left) */}
              <div className="lg:col-span-3 flex items-center gap-3.5 w-full">
                <div className={`w-12 h-12 rounded-full ${project.colorClass} flex items-center justify-center shrink-0 shadow-sm`}>
                  {project.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-[#0A2540] dark:text-white font-display truncate leading-tight">
                    {project.title}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 mt-1 block">
                    {project.date}
                  </span>
                </div>
              </div>

              {/* Col 2: Tagline & Description (Center) */}
              <div className="lg:col-span-6 space-y-1.5 w-full text-left">
                <div className="flex items-center justify-between lg:justify-start gap-2">
                  <h4 className="text-xs font-semibold text-[#2B6A65] dark:text-teal-400 tracking-wide uppercase">
                    {project.tagline}
                  </h4>
                  <span className="lg:hidden text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 whitespace-nowrap">
                    {project.stat}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Col 3: Badges & Details Link (Right) */}
              <div className="lg:col-span-3 flex lg:flex-col items-start lg:items-end justify-between lg:justify-center gap-4 w-full h-full border-t lg:border-t-0 border-slate-100/60 dark:border-slate-800/40 pt-4 lg:pt-0">
                <div className="flex flex-wrap gap-1.5 lg:justify-end">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div>
                  <span className="hidden lg:inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 whitespace-nowrap">
                    {project.stat}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};
