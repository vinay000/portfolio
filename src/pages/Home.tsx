import React from 'react';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { VenturesSection } from '@/components/portfolio/VenturesSection';
import { TimelineSection } from '@/components/portfolio/TimelineSection';
import { SkillsSection } from '@/components/portfolio/SkillsSection';
import { ContactSection } from '@/components/portfolio/ContactSection';

const Home: React.FC = () => {
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto px-5 sm:px-8 md:px-12 pt-8 pb-24">
      
      {/* Hero Section */}
      <HeroSection onScrollToSection={handleScrollToSection} />

      {/* Select Ventures & Creations */}
      <VenturesSection />

      {/* Career Milestones */}
      <TimelineSection />

      {/* Capabilities */}
      <SkillsSection />

      {/* Direct Communication Node */}
      <ContactSection />

    </div>
  );
};

export default Home;