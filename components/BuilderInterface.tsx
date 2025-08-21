'use client';

import { useState } from 'react';
import { useLandingPage } from '@/contexts/LandingPageContext';
import SidebarControls from '@/components/SidebarControls';
import PreviewPane from '@/components/PreviewPane';
import { Button } from '@/components/ui/button';
import { Menu, X, Eye, Download, Share, Save } from 'lucide-react';
import ExportModal from '@/components/ExportModal';
import { toast } from 'sonner';

export default function BuilderInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const { config, saveToStorage, generateShareableLink } = useLandingPage();

  const handleSave = () => {
    saveToStorage();
    toast.success('Landing page saved successfully!');
  };

  const handleShare = () => {
    const link = generateShareableLink();
    navigator.clipboard.writeText(link);
    toast.success('Preview link copied to clipboard!');
  };

  return (
    <>
      {/* Top Bar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 relative z-50">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Landing Page Builder</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={() => setExportModalOpen(true)}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto relative z-40`}>
          <SidebarControls />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Preview Pane */}
        <div className="flex-1 overflow-hidden">
          <PreviewPane />
        </div>
      </div>

      <ExportModal 
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </>
  );
}