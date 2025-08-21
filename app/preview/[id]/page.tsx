'use client';

import { useEffect, useState } from 'react';
import { LandingPageConfig } from '@/contexts/LandingPageContext';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { LandingPageProvider } from '@/contexts/LandingPageContext';

interface PreviewPageProps {
  params: {
    id: string;
  };
}

function PreviewContent({ id }: { id: string }) {
  const [config, setConfig] = useState<LandingPageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`landing-page-${id}`);
      if (saved) {
        setConfig(JSON.parse(saved));
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

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
    if (!config) return 'bg-white text-gray-900';
    
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your landing page...</p>
        </div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-6">The landing page you're looking for doesn't exist.</p>
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your Own Page
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Font loading */}
      <link href={fontLinks[config.font]} rel="stylesheet" />
      
      <div 
        className={`min-h-screen ${getFontClass(config.font)} ${getThemeClass()}`}
        style={{
          '--primary-color': config.primaryColor,
          '--secondary-color': config.secondaryColor,
          '--accent-color': config.accentColor,
        } as React.CSSProperties}
      >
        {/* Create a mock context provider with the loaded config */}
        <div className="mock-context" style={{ display: 'contents' }}>
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

export default function PreviewPage({ params }: PreviewPageProps) {
  return <PreviewContent id={params.id} />;
}