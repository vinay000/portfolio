import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { FloatingDock } from '@/components/FloatingDock';
import { CommandMenu } from '@/components/CommandMenu';

export const PublicLayout: React.FC = () => {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectCommand = (action: string) => {
    if (action.startsWith('scroll-')) {
      const sectionId = action.replace('scroll-', '');
      handleScrollToSection(sectionId);
    } else if (action === 'link-github') {
      window.open('https://github.com', '_blank');
    } else if (action === 'link-linkedin') {
      window.open('https://linkedin.com', '_blank');
    } else if (action === 'link-twitter') {
      window.open('https://twitter.com', '_blank');
    }
  };

  // Listen for Cmd+K or Ctrl+K globally
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-slate-100 selection:bg-white/15 selection:text-white overflow-x-hidden">
      {/* Universal Grid Background */}
      <div className="fixed inset-0 grid-bg-fine opacity-40 pointer-events-none -z-50" />
      <div className="fixed inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none -z-40" />

      {/* Top Navbar */}
      <Navigation 
        onOpenCommandMenu={() => setIsCommandMenuOpen(true)} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* Main Content */}
      <main className="relative pt-24 pb-20 z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* macOS style Bottom Dock */}
      <FloatingDock 
        onOpenCommandMenu={() => setIsCommandMenuOpen(true)} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* Raycast style Command Menu */}
      <CommandMenu 
        isOpen={isCommandMenuOpen} 
        onClose={() => setIsCommandMenuOpen(false)} 
        onSelectCommand={handleSelectCommand} 
      />
    </div>
  );
};
