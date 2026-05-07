import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export const SandboxSection: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'VinsShell OS v1.0.5 (stable-release) initialized.', type: 'success' },
    { text: 'Copyright (c) 2026 Vinay Kumar Yadav. All rights reserved.', type: 'output' },
    { text: 'Type "help" to list available terminal commands.', type: 'output' },
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLines: TerminalLine[] = [...history, { text: `vinay@vins:~$ ${input}`, type: 'input' }];

    switch (cmd) {
      case 'help':
        newLines.push({
          text: 'Available commands:\n  about     - Core details regarding Vinay Kumar Yadav\n  projects  - Overview of selected engineering projects\n  skills    - Core framework & pipeline proficiencies\n  socials   - Digital profiles & channels\n  secret    - Active experimental variables\n  clear     - Wipe terminal logs\n  contact   - Direct email nodes',
          type: 'output',
        });
        break;
      case 'about':
        newLines.push({
          text: 'Vinay Kumar Yadav is a Senior Software Engineer based in Bengaluru, India. With over 5 years of industry experience across global firms like GeekyAnts and In Time Tec, he specializes in React Native mobile environments, Fastlane CI/CD automation, and robust React/Next.js/FastAPI solutions. Focused on functional programming principles and predictable state engines.',
          type: 'output',
        });
        break;
      case 'projects':
        newLines.push({
          text: 'SELECTED ENGINEERING SOLUTIONS:\n\n• AI Dental Treatment Planner\n  - Tech: React Native, Expo, Next.js, OpenAI APIs, Monorepo\n  - Description: Clinician plan generator & doctor-lab patient sharing.\n\n• Browser Canvas Video Editor\n  - Tech: React.js, TypeScript, Fabric.js, Material UI, SCSS\n  - Description: Browser keyframe animation studio and timeline drawing.\n\n• Enterprise Feedlot Management\n  - Tech: React.js, TypeScript, REST APIs, React Bootstrap\n  - Description: Large-scale analytics platform tracking herds of 10,000+ cattle.',
          type: 'output',
        });
        break;
      case 'skills':
        newLines.push({
          text: 'CORE FRAMEWORK & PIPELINE PROFIENCY:\n\nReact Native      [████████████████████] 100% (Expert)\nReact.js / Next.js[████████████████████] 100% (Expert)\nTypeScript        [██████████████████░░] 90%  (Expert)\nCI/CD / Fastlane  [██████████████████░░] 90%  (Expert)\nPython / FastAPI  [██████████████░░░░░░] 70%  (Proficient)\nFunctional JS/TS  [████████████████████] 100% (Expert)',
          type: 'output',
        });
        break;
      case 'socials':
        newLines.push({
          text: 'DIGITAL NODES:\n  • LinkedIn: https://linkedin.com/in/vinay000\n  • GitHub:   https://github.com',
          type: 'output',
        });
        break;
      case 'secret':
        newLines.push({
          text: '☕ ENGINE INJECTION DETECTED.\nYou have triggered a secret! In his free time, Vinay explores Generative AI pipelines and enjoys mentoring junior engineers, increasing team delivery speeds, and optimizing React renders to absolute 60fps native parity.',
          type: 'success',
        });
        break;
      case 'contact':
        newLines.push({
          text: 'Direct communication node:\n  Email: vinsyadav5@gmail.com\n  Phone: +91 8837682541\n\nFeel free to reach out for interesting collaborations or project initiatives.',
          type: 'output',
        });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newLines.push({
          text: `Command not found: "${cmd}". Type "help" for a list of valid inputs.`,
          type: 'error',
        });
    }

    setHistory(newLines);
    setInput('');
  };

  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  return (
    <section id="sandbox" className="relative py-24 md:py-32 px-6 max-w-4xl mx-auto space-y-16">
      
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-radial-glow -z-10 pointer-events-none opacity-40" />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase">
          <Terminal className="w-3.5 h-3.5" />
          sandbox.exe
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
          Interactive Shell Sandbox
        </h2>
        <p className="text-base md:text-lg text-neutral-400 max-w-xl font-light leading-relaxed">
          Interact with Vinay Kumar Yadav’s portfolio, projects, and career milestones directly using this fully functional web shell.
        </p>
      </div>

      {/* Terminal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onClick={focusTerminal}
        className="relative rounded-2xl bg-neutral-950 border border-neutral-850/80 shadow-2xl overflow-hidden cursor-text glass-panel"
      >
        {/* Glow header bar */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-500/10 via-purple-500/20 to-transparent" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-900 select-none">
          {/* macOS window bullets */}
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/10" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/10" />
            <span className="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/10" />
          </div>
          {/* Title */}
          <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1.5">
            <Cpu className="w-3 h-3" />
            vinay.yadav — sandbox.sh
          </span>
          {/* Shield Status */}
          <span className="text-[10px] font-mono text-cyan-500 bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10 uppercase tracking-tight">
            SECURE_NODE
          </span>
        </div>

        {/* Terminal Log Console */}
        <div className="p-4 md:p-6 h-[340px] overflow-y-auto font-mono text-xs sm:text-sm md:text-base space-y-3 md:space-y-3.5 leading-relaxed bg-neutral-950/40">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap ${
                line.type === 'input'
                  ? 'text-cyan-400'
                  : line.type === 'error'
                  ? 'text-red-400 font-medium'
                  : line.type === 'success'
                  ? 'text-emerald-400 font-medium'
                  : 'text-neutral-400 font-light'
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Prompt */}
        <form
          onSubmit={handleCommandSubmit}
          className="flex items-center gap-2 px-4 md:px-6 py-3.5 md:py-4 bg-neutral-950/80 border-t border-neutral-900"
        >
          <span className="text-cyan-400 font-mono text-xs sm:text-sm md:text-base select-none">
            vinay@vins:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command (e.g. 'help', 'projects')..."
            className="w-full bg-transparent border-0 outline-none font-mono text-xs sm:text-sm md:text-base text-slate-200 placeholder-neutral-600"
            autoComplete="off"
            autoCapitalize="none"
          />
        </form>
      </motion.div>
    </section>
  );
};
