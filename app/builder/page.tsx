'use client';

import { LandingPageProvider } from '@/contexts/LandingPageContext';
import BuilderInterface from '@/components/BuilderInterface';

export default function BuilderPage() {
  return (
    <LandingPageProvider>
      <div className="h-screen overflow-hidden">
        <BuilderInterface />
      </div>
    </LandingPageProvider>
  );
}