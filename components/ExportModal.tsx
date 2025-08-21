'use client';

import { useState } from 'react';
import { useLandingPage } from '@/contexts/LandingPageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Share, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const { config, exportAsHTML, generateShareableLink } = useLandingPage();
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const htmlContent = exportAsHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `landing-page-${config.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('HTML file downloaded successfully!');
  };

  const handleCopyLink = () => {
    const link = generateShareableLink();
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Preview link copied to clipboard!');
  };

  const shareableLink = generateShareableLink();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Export Your Landing Page</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="download" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="download" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </TabsTrigger>
            <TabsTrigger value="share" className="flex items-center gap-2">
              <Share className="w-4 h-4" />
              Share
            </TabsTrigger>
          </TabsList>

          <TabsContent value="download" className="space-y-4">
            <div className="text-sm text-gray-600">
              Download your landing page as a static HTML file that you can host anywhere.
            </div>
            
            <Button onClick={handleDownload} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download HTML File
            </Button>
          </TabsContent>

          <TabsContent value="share" className="space-y-4">
            <div className="text-sm text-gray-600">
              Share your landing page with others using this unique preview link.
            </div>
            
            <div className="space-y-2">
              <Label>Preview Link</Label>
              <div className="flex gap-2">
                <Input 
                  value={shareableLink}
                  readOnly
                  className="text-sm"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCopyLink}
                  className="shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              This link will display your landing page exactly as it appears in the preview.
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}