'use client';

import { useLandingPage } from '@/contexts/LandingPageContext';

export function AboutSection() {
  const { config } = useLandingPage();

  const getTextColorClass = () => {
    return config.theme === 'dark' ? 'text-white' : 'text-gray-900';
  };

  const getSubtextColorClass = () => {
    return config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  };

  return (
    <section className="py-20 px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 
              className={`text-3xl md:text-4xl font-bold mb-6 ${getTextColorClass()}`}
              style={{ color: config.primaryColor }}
            >
              {config.about.title}
            </h2>
            <p className={`text-lg leading-relaxed ${getSubtextColorClass()}`}>
              {config.about.content}
            </p>
          </div>
          
          <div className="relative">
            <img
              src={config.about.image}
              alt="About us"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}