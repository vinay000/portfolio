import React from 'react';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { VenturesSection } from '@/components/portfolio/VenturesSection';
import { TimelineSection } from '@/components/portfolio/TimelineSection';
import { SkillsSection } from '@/components/portfolio/SkillsSection';
import { SandboxSection } from '@/components/portfolio/SandboxSection';
import { ContactSection } from '@/components/portfolio/ContactSection';

const Home: React.FC = () => {
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative space-y-12 pb-24">
      {/* Hero Section */}
      <HeroSection onScrollToSection={handleScrollToSection} />

      {/* Select Ventures & Creations */}
      <VenturesSection />

      {/* Career Milestones */}
      <TimelineSection />

      {/* Capabilities */}
      <SkillsSection />

      {/* Interactive Command Sandbox */}
      <SandboxSection />

      {/* Direct Communication Node */}
      <ContactSection />
    </div>
  );
};

export default Home;