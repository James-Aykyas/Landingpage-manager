'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface SectionConfig {
  hero: boolean;
  about: boolean;
  services: boolean;
  testimonials: boolean;
  contact: boolean;
}

export interface LandingPageConfig {
  id: string;
  theme: 'light' | 'dark' | 'gradient';
  layout: 'centered' | 'split' | 'fullwidth';
  font: 'inter' | 'playfair' | 'jetbrains';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
  };
  about: {
    title: string;
    content: string;
    image: string;
  };
  services: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  testimonials: {
    title: string;
    items: Array<{
      name: string;
      role: string;
      content: string;
      avatar: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
  };
  sections: SectionConfig;
}

const defaultConfig: LandingPageConfig = {
  id: '',
  theme: 'light',
  layout: 'centered',
  font: 'inter',
  primaryColor: '#3B82F6',
  secondaryColor: '#10B981',
  accentColor: '#F59E0B',
  hero: {
    title: 'Welcome to Our Amazing Product',
    subtitle: 'Transform your business with our innovative solution that delivers real results',
    ctaText: 'Get Started Today',
    ctaLink: '#contact',
    backgroundImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  },
  about: {
    title: 'About Our Company',
    content: 'We are a team of passionate professionals dedicated to delivering exceptional results. Our mission is to help businesses thrive in the digital age through innovative solutions and outstanding customer service.',
    image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg',
  },
  services: {
    title: 'Our Services',
    items: [
      {
        title: 'Web Development',
        description: 'Custom websites and web applications built with modern technologies',
        icon: 'code',
      },
      {
        title: 'Digital Marketing',
        description: 'Strategic marketing campaigns to grow your online presence',
        icon: 'megaphone',
      },
      {
        title: 'Consulting',
        description: 'Expert advice to help you make informed business decisions',
        icon: 'lightbulb',
      },
    ],
  },
  testimonials: {
    title: 'What Our Clients Say',
    items: [
      {
        name: 'Sarah Johnson',
        role: 'CEO, TechCorp',
        content: 'Working with this team transformed our business. Their expertise and dedication are unmatched.',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      },
      {
        name: 'Michael Chen',
        role: 'Marketing Director',
        content: 'The results exceeded our expectations. Highly recommend their services to any business.',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      },
    ],
  },
  contact: {
    title: 'Get In Touch',
    subtitle: 'Ready to start your project? Contact us today for a free consultation.',
    email: 'hello@company.com',
    phone: '+1 (555) 123-4567',
  },
  sections: {
    hero: true,
    about: true,
    services: true,
    testimonials: true,
    contact: true,
  },
};

type LandingPageAction =
  | { type: 'SET_CONFIG'; payload: LandingPageConfig }
  | { type: 'UPDATE_THEME'; payload: LandingPageConfig['theme'] }
  | { type: 'UPDATE_LAYOUT'; payload: LandingPageConfig['layout'] }
  | { type: 'UPDATE_FONT'; payload: LandingPageConfig['font'] }
  | { type: 'UPDATE_COLORS'; payload: { primary: string; secondary: string; accent: string } }
  | { type: 'UPDATE_HERO'; payload: Partial<LandingPageConfig['hero']> }
  | { type: 'UPDATE_ABOUT'; payload: Partial<LandingPageConfig['about']> }
  | { type: 'UPDATE_SERVICES'; payload: Partial<LandingPageConfig['services']> }
  | { type: 'UPDATE_TESTIMONIALS'; payload: Partial<LandingPageConfig['testimonials']> }
  | { type: 'UPDATE_CONTACT'; payload: Partial<LandingPageConfig['contact']> }
  | { type: 'TOGGLE_SECTION'; payload: keyof SectionConfig }
  | { type: 'LOAD_FROM_STORAGE'; payload: string }
  | { type: 'GENERATE_NEW_ID' };

const landingPageReducer = (state: LandingPageConfig, action: LandingPageAction): LandingPageConfig => {
  switch (action.type) {
    case 'SET_CONFIG':
      return action.payload;
    case 'UPDATE_THEME':
      return { ...state, theme: action.payload };
    case 'UPDATE_LAYOUT':
      return { ...state, layout: action.payload };
    case 'UPDATE_FONT':
      return { ...state, font: action.payload };
    case 'UPDATE_COLORS':
      return {
        ...state,
        primaryColor: action.payload.primary,
        secondaryColor: action.payload.secondary,
        accentColor: action.payload.accent,
      };
    case 'UPDATE_HERO':
      return { ...state, hero: { ...state.hero, ...action.payload } };
    case 'UPDATE_ABOUT':
      return { ...state, about: { ...state.about, ...action.payload } };
    case 'UPDATE_SERVICES':
      return { ...state, services: { ...state.services, ...action.payload } };
    case 'UPDATE_TESTIMONIALS':
      return { ...state, testimonials: { ...state.testimonials, ...action.payload } };
    case 'UPDATE_CONTACT':
      return { ...state, contact: { ...state.contact, ...action.payload } };
    case 'TOGGLE_SECTION':
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.payload]: !state.sections[action.payload],
        },
      };
    case 'LOAD_FROM_STORAGE':
      const saved = localStorage.getItem(`landing-page-${action.payload}`);
      if (saved) {
        return JSON.parse(saved);
      }
      return state;
    case 'GENERATE_NEW_ID':
      return { ...state, id: Math.random().toString(36).substr(2, 9) };
    default:
      return state;
  }
};

interface LandingPageContextType {
  config: LandingPageConfig;
  dispatch: React.Dispatch<LandingPageAction>;
  saveToStorage: () => void;
  loadFromStorage: (id: string) => void;
  exportAsHTML: () => string;
  generateShareableLink: () => string;
}

const LandingPageContext = createContext<LandingPageContextType | undefined>(undefined);

export const useLandingPage = () => {
  const context = useContext(LandingPageContext);
  if (!context) {
    throw new Error('useLandingPage must be used within a LandingPageProvider');
  }
  return context;
};

export const LandingPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, dispatch] = useReducer(landingPageReducer, defaultConfig);

  useEffect(() => {
    if (!config.id) {
      dispatch({ type: 'GENERATE_NEW_ID' });
    }
  }, [config.id]);

  useEffect(() => {
    if (config.id) {
      localStorage.setItem(`landing-page-${config.id}`, JSON.stringify(config));
    }
  }, [config]);

  const saveToStorage = () => {
    if (config.id) {
      localStorage.setItem(`landing-page-${config.id}`, JSON.stringify(config));
    }
  };

  const loadFromStorage = (id: string) => {
    dispatch({ type: 'LOAD_FROM_STORAGE', payload: id });
  };

  const exportAsHTML = () => {
    const getFontLink = (font: string) => {
      switch (font) {
        case 'inter':
          return 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        case 'playfair':
          return 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&display=swap';
        case 'jetbrains':
          return 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap';
        default:
          return 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      }
    };

    const getFontFamily = (font: string) => {
      switch (font) {
        case 'inter':
          return 'Inter, sans-serif';
        case 'playfair':
          return 'Playfair Display, serif';
        case 'jetbrains':
          return 'JetBrains Mono, monospace';
        default:
          return 'Inter, sans-serif';
      }
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.hero.title}</title>
    <link href="${getFontLink(config.font)}" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: '${getFontFamily(config.font)}'; }
        :root {
            --primary: ${config.primaryColor};
            --secondary: ${config.secondaryColor};
            --accent: ${config.accentColor};
        }
    </style>
</head>
<body class="${config.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}">
    <!-- Generated Landing Page Content Would Go Here -->
    <div class="min-h-screen">
        <h1 class="text-4xl font-bold text-center py-20">${config.hero.title}</h1>
        <p class="text-xl text-center">${config.hero.subtitle}</p>
    </div>
</body>
</html>`;
  };

  const generateShareableLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/preview/${config.id}`;
  };

  const contextValue: LandingPageContextType = {
    config,
    dispatch,
    saveToStorage,
    loadFromStorage,
    exportAsHTML,
    generateShareableLink,
  };

  return (
    <LandingPageContext.Provider value={contextValue}>
      {children}
    </LandingPageContext.Provider>
  );
};