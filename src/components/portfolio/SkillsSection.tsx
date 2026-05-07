import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, Layers, HardDrive } from 'lucide-react';

interface Skill {
  name: string;
  level: string;
  description: string;
}

interface SkillGroup {
  category: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

export const SkillsSection: React.FC = () => {
  const groups: SkillGroup[] = [
    {
      category: 'Cross-Platform Mobile',
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      color: 'border-cyan-500/20 group-hover:border-cyan-500/50 text-cyan-400',
      skills: [
        { name: 'React Native', level: 'Expert', description: 'Cross-platform native bridges, CLI, Paper, Expo, and performance profiling.' },
        { name: 'Fastlane Automation', level: 'Advanced', description: 'Automated App Store & Google Play provisioning, signing, and beta distributions.' },
        { name: 'Jest & Appium', level: 'Advanced', description: 'Unit testing native components and end-to-end automated UI regression tests.' },
        { name: 'State Management', level: 'Expert', description: 'Predictable workflows using Redux Core and reactive Zustand stores.' }
      ]
    },
    {
      category: 'Web & Frontend Core',
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      color: 'border-purple-500/20 group-hover:border-purple-500/50 text-purple-400',
      skills: [
        { name: 'React & Next.js', level: 'Expert', description: 'Server-side rendering, Vite compilation, routing, and high-end component styling.' },
        { name: 'TypeScript', level: 'Expert', description: 'Strict typing, robust generic interfaces, and functional compiler structures.' },
        { name: 'Fabric.js & Canvas', level: 'Advanced', description: 'Interactive vector rendering, timeline canvas manipulations, and drawing.' },
        { name: 'Functional Paradigms', level: 'Expert', description: 'Hooks architecture, pure functions, immutability, and predictable render cycles.' }
      ]
    },
    {
      category: 'Backend & Deployments',
      icon: <HardDrive className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-500/20 group-hover:border-emerald-500/50 text-emerald-400',
      skills: [
        { name: 'FastAPI & Python', level: 'Proficient', description: 'RESTful API endpoints, typing systems, and high-performance routing backends.' },
        { name: 'Node.js', level: 'Advanced', description: 'Server-side scripting, build tools, NPM packagers, and JSON services.' },
        { name: 'GitHub Actions', level: 'Advanced', description: 'Automated CI/CD workflows, static checks, unit runtimes, and build releases.' },
        { name: 'Monorepo Architecture', level: 'Advanced', description: 'Yarn workspaces, code sharing, and micro-frontend dependency management.' }
      ]
    }
  ];

  return (
    <section id="skills" className="relative py-24 md:py-32 px-6 max-w-6xl mx-auto space-y-16">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase">
          <Cpu className="w-3.5 h-3.5" />
          capabilities.cfg
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
          Core Technical Capabilities
        </h2>
        <p className="text-base md:text-lg text-neutral-400 max-w-2xl font-light leading-relaxed">
          Broad-spectrum engineering fluency combining modular mobile systems, advanced canvas UX engineering, and robust automated release pipelines.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {groups.map((group, groupIdx) => (
          <div key={group.category} className="space-y-6 group">
            {/* Category Header */}
            <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-900">
              <span className="w-7 h-7 rounded-lg bg-neutral-950 border border-neutral-850 flex items-center justify-center">
                {group.icon}
              </span>
              <h3 className="text-base font-semibold tracking-wider font-mono text-slate-300 uppercase">
                {group.category}
              </h3>
            </div>

            {/* Skill list */}
            <div className="space-y-4">
              {group.skills.map((skill, skillIdx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (groupIdx * 4 + skillIdx) * 0.05 }}
                  className="p-4 rounded-xl bg-neutral-950/30 border border-neutral-900 hover:border-neutral-800 transition-colors space-y-2 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-slate-100 font-display">{skill.name}</span>
                    <span className="text-[11px] font-mono uppercase bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-400 border border-neutral-850">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
