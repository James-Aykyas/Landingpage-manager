'use client';

import { useLandingPage } from '@/contexts/LandingPageContext';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function PreviewPane() {
  const { config } = useLandingPage();

  const getFontClass = (font: string) => {
    switch (font) {
      case 'inter':
        return 'font-sans';
      case 'playfair':
        return 'font-serif';
      case 'jetbrains':
        return 'font-mono';
      default:
        return 'font-sans';
    }
  };

  const getThemeClass = () => {
    switch (config.theme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'gradient':
        return 'bg-gradient-to-br from-blue-50 via-white to-purple-50';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const fontLinks = {
    inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    playfair: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&display=swap',
    jetbrains: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap',
  };

  return (
    <>
      {/* Font loading */}
      <link href={fontLinks[config.font]} rel="stylesheet" />
      
      <div 
        className={`h-full overflow-y-auto ${getFontClass(config.font)} ${getThemeClass()}`}
        style={{
          '--primary-color': config.primaryColor,
          '--secondary-color': config.secondaryColor,
          '--accent-color': config.accentColor,
        } as React.CSSProperties}
      >
        <div className="min-h-full">
          {config.sections.hero && <HeroSection />}
          {config.sections.about && <AboutSection />}
          {config.sections.services && <ServicesSection />}
          {config.sections.testimonials && <TestimonialsSection />}
          {config.sections.contact && <ContactSection />}
        </div>
      </div>
    </>
  );
}