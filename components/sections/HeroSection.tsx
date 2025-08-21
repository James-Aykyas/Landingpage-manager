'use client';

import { useLandingPage } from '@/contexts/LandingPageContext';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const { config } = useLandingPage();

  const getLayoutClass = () => {
    switch (config.layout) {
      case 'split':
        return 'grid lg:grid-cols-2 gap-12 items-center min-h-screen px-8';
      case 'fullwidth':
        return 'relative min-h-screen flex items-center justify-center px-8';
      default:
        return 'text-center min-h-screen flex flex-col items-center justify-center px-8';
    }
  };

  const getBackgroundStyle = () => {
    if (config.layout === 'fullwidth' && config.hero.backgroundImage) {
      return {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${config.hero.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return {};
  };

  const getTextColorClass = () => {
    if (config.layout === 'fullwidth') {
      return 'text-white';
    }
    return config.theme === 'dark' ? 'text-white' : 'text-gray-900';
  };

  return (
    <section className={getLayoutClass()} style={getBackgroundStyle()}>
      {config.layout === 'split' && (
        <div className="order-2 lg:order-1">
          <img
            src={config.hero.backgroundImage}
            alt="Hero"
            className="w-full h-96 lg:h-full object-cover rounded-lg"
          />
        </div>
      )}
      
      <div className={`${config.layout === 'split' ? 'order-1 lg:order-2' : ''} max-w-4xl mx-auto`}>
        <h1 
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${getTextColorClass()}`}
          style={{ color: config.layout === 'fullwidth' ? 'white' : config.primaryColor }}
        >
          {config.hero.title}
        </h1>
        
        <p className={`text-lg md:text-xl mb-8 ${getTextColorClass()} opacity-90 leading-relaxed`}>
          {config.hero.subtitle}
        </p>
        
        <Button
          size="lg"
          className="text-lg px-8 py-3 transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: config.accentColor,
            color: 'white',
            border: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = config.secondaryColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = config.accentColor;
          }}
        >
          {config.hero.ctaText}
        </Button>
      </div>
      
      {config.layout === 'centered' && config.hero.backgroundImage && (
        <div className="absolute inset-0 -z-10 opacity-10">
          <img
            src={config.hero.backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </section>
  );
}