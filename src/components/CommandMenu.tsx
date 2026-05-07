import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Folder, Terminal, Calendar, Code, Mail, Github, Twitter, Linkedin, ArrowRight, CornerDownLeft } from 'lucide-react';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCommand: (action: string) => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose, onSelectCommand }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    { id: 'hero', title: 'Scroll to Hero', category: 'Navigation', icon: <Terminal className="w-4 h-4" />, action: 'scroll-hero' },
    { id: 'ventures', title: 'View Ventures & Projects', category: 'Navigation', icon: <Folder className="w-4 h-4" />, action: 'scroll-ventures' },
    { id: 'experience', title: 'View Career Timeline', category: 'Navigation', icon: <Calendar className="w-4 h-4" />, action: 'scroll-experience' },
    { id: 'skills', title: 'View Tech Stack & Skills', category: 'Navigation', icon: <Code className="w-4 h-4" />, action: 'scroll-skills' },
    { id: 'sandbox', title: 'Open Sandbox (Interactive Terminal)', category: 'Interactive', icon: <Terminal className="w-4 h-4" />, action: 'scroll-sandbox' },
    { id: 'contact', title: 'Let’s Build (Contact Form)', category: 'Navigation', icon: <Mail className="w-4 h-4" />, action: 'scroll-contact' },
    { id: 'github', title: 'Follow on GitHub', category: 'Socials', icon: <Github className="w-4 h-4" />, action: 'link-github' },
    { id: 'linkedin', title: 'Connect on LinkedIn', category: 'Socials', icon: <Linkedin className="w-4 h-4" />, action: 'link-linkedin' },
    { id: 'twitter', title: 'Follow on X / Twitter', category: 'Socials', icon: <Twitter className="w-4 h-4" />, action: 'link-twitter' },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          handleExecute(filteredCommands[selectedIndex].action);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  const handleExecute = (action: string) => {
    onSelectCommand(action);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Command Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden glass-panel"
          >
            {/* Glowing top line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-purple-500 via-white to-cyan-500 opacity-60" />

            {/* Input field */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-neutral-800">
              <Search className="w-5 h-5 text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-0 outline-none text-slate-100 placeholder-neutral-500 text-sm font-light font-mono"
              />
              <span className="text-[10px] bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-1 rounded font-mono shrink-0 select-none">
                ESC
              </span>
            </div>

            {/* Content List */}
            <div className="max-h-[340px] overflow-y-auto p-2 space-y-4">
              {filteredCommands.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 text-sm font-mono">
                  No commands found for "{search}"
                </div>
              ) : (
                <div>
                  {/* Group items by Category */}
                  {Array.from(new Set(filteredCommands.map((c) => c.category))).map((cat) => (
                    <div key={cat} className="space-y-1 mb-3">
                      <h4 className="text-[10px] font-mono text-neutral-500 px-3 uppercase tracking-wider">
                        {cat}
                      </h4>
                      {filteredCommands
                        .filter((c) => c.category === cat)
                        .map((cmd) => {
                          const globalIndex = filteredCommands.findIndex((c) => c.id === cmd.id);
                          const isSelected = globalIndex === selectedIndex;
                          return (
                            <div
                              key={cmd.id}
                              onClick={() => handleExecute(cmd.action)}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-neutral-900 text-white border-neutral-700'
                                  : 'text-neutral-400 hover:text-neutral-200'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`${isSelected ? 'text-cyan-400' : 'text-neutral-500'}`}>
                                  {cmd.icon}
                                </span>
                                <span className="text-sm font-light">{cmd.title}</span>
                              </div>
                              {isSelected && (
                                <span className="flex items-center gap-1 text-[10px] font-mono text-neutral-500">
                                  <span>Select</span>
                                  <CornerDownLeft className="w-3 h-3" />
                                </span>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center px-4 py-3 bg-neutral-950/90 border-t border-neutral-900 text-[10px] font-mono text-neutral-500 select-none">
              <div className="flex items-center gap-2">
                <span>Use arrows</span>
                <span className="border border-neutral-800 bg-neutral-900 px-1 rounded">↑</span>
                <span className="border border-neutral-800 bg-neutral-900 px-1 rounded">↓</span>
                <span>to navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Press</span>
                <span className="border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 rounded">⏎</span>
                <span>to execute</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
