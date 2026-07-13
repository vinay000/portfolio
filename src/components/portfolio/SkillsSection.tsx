import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Layers, HardDrive, ShieldCheck } from 'lucide-react';

interface Skill {
  name: string;
  description: React.ReactNode;
}

interface SkillGroup {
  category: string;
  icon: React.ReactNode;
  colorClass: string; // Colored circle accent matching screenshot
  skills: Skill[];
}

export const SkillsSection: React.FC = () => {
  const competencies = [
    'React & React Native Expertise',
    'AI & LLM API Integration',
    'Cross-Platform Mobile Dev',
    'Software Architecture Design',
    'CI/CD Pipeline Automation',
    'Client & Stakeholder Communication',
    'Performance Optimization',
    'Monorepo Architecture',
    'API Design & Integration',
    'Project Planning & Launching'
  ];

  const groups: SkillGroup[] = [
    {
      category: 'AI & Intelligent Systems',
      icon: <Brain className="w-5 h-5 text-white" />,
      colorClass: 'bg-[#2B6A65]', // Forest Teal
      skills: [
        { name: 'LLM Orchestration', description: <>Integrating <span className="font-semibold text-slate-900 dark:text-white">OpenAI & Gemini APIs</span> for streaming responses, prompt formatting, and JSON-based schema outputs.</> },
        { name: 'Intelligent App Flows', description: <>Implementing automated <span className="font-semibold text-slate-900 dark:text-white">sentiment analysis</span>, content rephrasing, and semantic search queries.</> },
        { name: 'RAG & Vector Search', description: <>Designing lightweight data ingestion structures utilizing text embedding models and semantic index databases.</> },
        { name: 'AI Tool-Use & Agents', description: <>Orchestrating multi-agent tools, function calling triggers, and structured parser scripts.</> }
      ]
    },
    {
      category: 'Cross-Platform Mobile',
      icon: <Code2 className="w-5 h-5 text-white" />,
      colorClass: 'bg-[#F1BE42]', // Warm Yellow
      skills: [
        { name: 'React Native', description: <>Specialized in cross-platform native bridges, custom native modules, performance profiling, and Expo.</> },
        { name: 'Fastlane Automation', description: <>Automating App Store & Google Play provisioning, signing, and beta distributions.</> },
        { name: 'Jest & Appium', description: <>Unit testing native components and end-to-end automated UI regression tests.</> },
        { name: 'Redux & Zustand', description: <>Predictable state workflows using Redux Core and lightweight reactive Zustand stores.</> }
      ]
    },
    {
      category: 'Web & Frontend Core',
      icon: <Layers className="w-5 h-5 text-white" />,
      colorClass: 'bg-[#E75A36]', // Coral Red
      skills: [
        { name: 'React & Next.js', description: <>Server-side rendering, Vite compilation, routing, and component styling.</> },
        { name: 'TypeScript & JS', description: <>Strict typing, robust generic interfaces, and functional compiler structures.</> },
        { name: 'GraphQL & RestAPI', description: <>Designing type-safe queries, client data caching, and standardized API integrations.</> },
        { name: 'Fabric.js & Canvas', description: <>Interactive vector rendering, timeline canvas manipulations, and drawing.</> }
      ]
    },
    {
      category: 'Backend & Deployments',
      icon: <HardDrive className="w-5 h-5 text-white" />,
      colorClass: 'bg-[#2B6A65]', // Forest Teal
      skills: [
        { name: 'Node.js & Express', description: <>Full stack SaaS services, server middleware execution, and microservices backends.</> },
        { name: 'FastAPI & Python', description: <>High-performance REST API services, type validation schemas, and routing layers.</> },
        { name: 'CI/CD & GitHub', description: <>Automated release pipelines, static code checks, and deployment runtimes.</> },
        { name: 'Docker & Monorepos', description: <>Containerized development environments, Yarn workspaces, and micro-frontend structures.</> }
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      className="relative flex flex-col items-start pt-20 pb-16 w-full text-left border-b border-slate-100 dark:border-slate-800/80"
    >
      
      {/* Header */}
      <div className="space-y-3 mb-10">
        <h2 className="text-3xl sm:text-4.5xl font-bold tracking-tight text-[#0A2540] dark:text-white font-display select-none">
          Technical Capabilities
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
          A track record of mobile engineering excellence, combined with native app orchestration, high-end web tools, and full stack AI integrations.
        </p>
      </div>

      {/* Core Competencies Row Layout */}
      <div className="w-full pb-8 border-b border-slate-100 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
        <div className="md:col-span-3 space-y-1">
          <h3 className="text-lg font-bold text-[#0A2540] dark:text-white font-display leading-tight select-none flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2B6A65] dark:text-teal-400" />
            Core Scope
          </h3>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block select-none pl-7">
            Leadership & Architecture
          </span>
        </div>
        <div className="md:col-span-9 flex flex-wrap gap-2 pl-7 md:pl-0">
          {competencies.map((comp) => (
            <span
              key={comp}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 select-none flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B6A65] dark:bg-teal-400 shrink-0" />
              {comp}
            </span>
          ))}
        </div>
      </div>

      {/* Skills Card Stack (matching Ventures and Timeline cards layout) */}
      <div className="w-full space-y-6 mt-8">
        {groups.map((group, idx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:bg-slate-900/90 transition-all duration-300 w-full group"
          >
            
            {/* Col 1: Icon & Category Name (Left) */}
            <div className="lg:col-span-3 flex items-center gap-3.5 w-full">
              <span className={`w-12 h-12 rounded-full ${group.colorClass} flex items-center justify-center select-none shrink-0 shadow-sm`}>
                {group.icon}
              </span>
              <h3 className="text-lg font-bold text-[#0A2540] dark:text-white font-display leading-tight select-none">
                {group.category}
              </h3>
            </div>

            {/* Col 2: Detailed Technical Skills (Right) */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full text-left">
              {group.skills.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <h4 className="text-sm sm:text-base font-semibold text-[#0A2540] dark:text-white font-mono">
                    {skill.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
};
