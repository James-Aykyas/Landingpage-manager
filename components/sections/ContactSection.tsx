'use client';

import { useLandingPage } from '@/contexts/LandingPageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone } from 'lucide-react';

export function ContactSection() {
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
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-4 ${getTextColorClass()}`}
            style={{ color: config.primaryColor }}
          >
            {config.contact.title}
          </h2>
          <p className={`text-lg ${getSubtextColorClass()}`}>
            {config.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Mail 
                className="w-6 h-6"
                style={{ color: config.primaryColor }}
              />
              <div>
                <div className={`font-semibold ${getTextColorClass()}`}>Email</div>
                <div className={getSubtextColorClass()}>{config.contact.email}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Phone 
                className="w-6 h-6"
                style={{ color: config.primaryColor }}
              />
              <div>
                <div className={`font-semibold ${getTextColorClass()}`}>Phone</div>
                <div className={getSubtextColorClass()}>{config.contact.phone}</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`p-6 rounded-lg border ${getCardClass()}`}>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextColorClass()}`}>
                    First Name
                  </label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextColorClass()}`}>
                    Last Name
                  </label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${getTextColorClass()}`}>
                  Email
                </label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${getTextColorClass()}`}>
                  Message
                </label>
                <Textarea 
                  rows={4} 
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: config.primaryColor,
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = config.secondaryColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = config.primaryColor;
                }}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}