import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code, Server, Cpu, Layers } from 'lucide-react';

interface Project {
  title: string;
  role: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  link: string;
  icon: React.ReactNode;
  color: string;
}

export const VenturesSection: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'AI Dental Treatment Planner',
      role: 'Lead Frontend Engineer & Creator',
      tagline: 'Cross-platform clinical state engine',
      description: 'Engineered a unified web and mobile monorepo allowing dentists and labs to generate AI-assisted clinical treatment plans via OpenAI, integrating secure doctor-to-lab data-routing and patient portal billing.',
      metrics: [
        { label: 'Platform', value: 'Web & Native' },
        { label: 'LLM Latency', value: '< 1.8s' },
        { label: 'Architecture', value: 'Monorepo' }
      ],
      tags: ['React Native', 'Expo', 'React', 'Next.js', 'OpenAI APIs', 'Monorepo'],
      link: '#',
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      color: 'from-purple-500/10 to-cyan-500/5',
    },
    {
      title: 'Browser Canvas Video Editor',
      role: 'Core UI & Animation Architect',
      tagline: 'High-performance keyframe animation studio',
      description: 'Designed a browser-based timeline editor with multi-layer keyframe rendering. Optimized canvas-drawing algorithms using Fabric.js to guarantee smooth performance and render exports.',
      metrics: [
        { label: 'Rendering', value: '60 FPS Canvas' },
        { label: 'Load Speed', value: '25% Faster' },
        { label: 'Interactions', value: 'Fabric.js' }
      ],
      tags: ['React.js', 'TypeScript', 'Fabric.js', 'Material UI', 'SCSS'],
      link: '#',
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500/10 to-emerald-500/5',
    },
    {
      title: 'Enterprise Feedlot Platform',
      role: 'Frontend Architecture Lead',
      tagline: 'Large-scale agriculture logistics & analytics',
      description: 'Architected a scalable enterprise interface to manage diagnostics, feeding logs, and billing ledgers for livestock farms, tracking herds of up to 10,000 cattle with real-time API integrations.',
      metrics: [
        { label: 'Herd Capacity', value: '10,000+' },
        { label: 'Logistics', value: 'Multi-Feedlot' },
        { label: 'Coverage', value: '+35% Jest' }
      ],
      tags: ['React.js', 'TypeScript', 'REST APIs', 'React Bootstrap', 'Jest'],
      link: '#',
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500/10 to-amber-500/5',
    }
  ];

  return (
    <section id="ventures" className="relative py-24 md:py-32 px-6 max-w-6xl mx-auto space-y-16">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase">
          <Code className="w-3.5 h-3.5" />
          creations.exe
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
          Selected Engineering Solutions
        </h2>
        <p className="text-base md:text-lg text-neutral-400 max-w-2xl font-light leading-relaxed">
          A track record of shipping highly optimized products conceptually modeled for complex user requirements, robust performance, and absolute state predictability.
        </p>
      </div>

      {/* Bento-style Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className={`relative rounded-2xl p-6 md:p-8 bg-neutral-950/40 border border-neutral-900 overflow-hidden glass-panel glass-panel-hover flex flex-col justify-between`}
          >
            {/* Glowing border background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 pointer-events-none -z-10`} />
            
            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-center">
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white font-display leading-tight">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-0.5">{project.role}</p>
                  </div>
                </div>
                <span className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800/80 flex items-center justify-center text-neutral-500 pointer-events-none">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Tagline & Description */}
              <div className="space-y-2">
                <h4 className="text-base font-semibold text-cyan-400/90 font-display">{project.tagline}</h4>
                <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-0.5 rounded bg-neutral-900/80 text-neutral-400 border border-neutral-850"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance/Scale Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-8 mt-6 border-t border-neutral-900/80">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <div className="text-[11px] md:text-xs font-mono text-neutral-500 uppercase tracking-tight">
                    {metric.label}
                  </div>
                  <div className="text-base md:text-lg font-bold text-slate-100 font-display tracking-tight">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
};
