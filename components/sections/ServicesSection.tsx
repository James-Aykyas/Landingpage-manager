'use client';

import { useLandingPage } from '@/contexts/LandingPageContext';
import { Code, Megaphone, Lightbulb } from 'lucide-react';

const iconMap = {
  code: Code,
  megaphone: Megaphone,
  lightbulb: Lightbulb,
};

export function ServicesSection() {
  const { config } = useLandingPage();

  const getTextColorClass = () => {
    return config.theme === 'dark' ? 'text-white' : 'text-gray-900';
  };

  const getSubtextColorClass = () => {
    return config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  };

  const getCardClass = () => {
    return config.theme === 'dark' 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-white border-gray-200';
  };

  return (
    <section className={`py-20 px-8 ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-4 ${getTextColorClass()}`}
            style={{ color: config.primaryColor }}
          >
            {config.services.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.services.items.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code;
            
            return (
              <div 
                key={index}
                className={`p-6 rounded-lg border shadow-lg hover:shadow-xl transition-shadow ${getCardClass()}`}
              >
                <IconComponent 
                  className="w-12 h-12 mb-4"
                  style={{ color: config.secondaryColor }}
                />
                <h3 className={`text-xl font-semibold mb-3 ${getTextColorClass()}`}>
                  {service.title}
                </h3>
                <p className={getSubtextColorClass()}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}