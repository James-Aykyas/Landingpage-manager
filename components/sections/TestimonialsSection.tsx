'use client';

import { useLandingPage } from '@/contexts/LandingPageContext';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
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
    <section className="py-20 px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-4 ${getTextColorClass()}`}
            style={{ color: config.primaryColor }}
          >
            {config.testimonials.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {config.testimonials.items.map((testimonial, index) => (
            <div 
              key={index}
              className={`p-6 rounded-lg border shadow-lg ${getCardClass()}`}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className="w-5 h-5 fill-current"
                    style={{ color: config.accentColor }}
                  />
                ))}
              </div>
              
              <p className={`mb-4 italic ${getSubtextColorClass()}`}>
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className={`font-semibold ${getTextColorClass()}`}>
                    {testimonial.name}
                  </div>
                  <div className={`text-sm ${getSubtextColorClass()}`}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}