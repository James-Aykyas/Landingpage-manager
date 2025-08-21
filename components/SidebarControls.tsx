'use client';

import { useLandingPage } from '@/contexts/LandingPageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Palette, Layout, Type, Settings, Eye, FileText, Star, Mail } from 'lucide-react';

export default function SidebarControls() {
  const { config, dispatch } = useLandingPage();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Customize Your Page</h2>
      </div>

      <Accordion type="multiple" defaultValue={['theme', 'hero', 'sections']} className="space-y-4">
        {/* Theme & Layout */}
        <AccordionItem value="theme">
          <AccordionTrigger className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Theme & Layout
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <Label>Theme</Label>
              <Select
                value={config.theme}
                onValueChange={(value: any) => dispatch({ type: 'UPDATE_THEME', payload: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="gradient">Gradient</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Layout Style</Label>
              <Select
                value={config.layout}
                onValueChange={(value: any) => dispatch({ type: 'UPDATE_LAYOUT', payload: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="centered">Centered Hero</SelectItem>
                  <SelectItem value="split">Left Image + Right Text</SelectItem>
                  <SelectItem value="fullwidth">Full-width Banner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Font Family</Label>
              <Select
                value={config.font}
                onValueChange={(value: any) => dispatch({ type: 'UPDATE_FONT', payload: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter (Sans-serif)</SelectItem>
                  <SelectItem value="playfair">Playfair Display (Serif)</SelectItem>
                  <SelectItem value="jetbrains">JetBrains Mono (Monospace)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-xs">Primary</Label>
                <Input
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => dispatch({
                    type: 'UPDATE_COLORS',
                    payload: {
                      primary: e.target.value,
                      secondary: config.secondaryColor,
                      accent: config.accentColor,
                    }
                  })}
                  className="h-8 p-1"
                />
              </div>
              <div>
                <Label className="text-xs">Secondary</Label>
                <Input
                  type="color"
                  value={config.secondaryColor}
                  onChange={(e) => dispatch({
                    type: 'UPDATE_COLORS',
                    payload: {
                      primary: config.primaryColor,
                      secondary: e.target.value,
                      accent: config.accentColor,
                    }
                  })}
                  className="h-8 p-1"
                />
              </div>
              <div>
                <Label className="text-xs">Accent</Label>
                <Input
                  type="color"
                  value={config.accentColor}
                  onChange={(e) => dispatch({
                    type: 'UPDATE_COLORS',
                    payload: {
                      primary: config.primaryColor,
                      secondary: config.secondaryColor,
                      accent: e.target.value,
                    }
                  })}
                  className="h-8 p-1"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section Toggles */}
        <AccordionItem value="sections">
          <AccordionTrigger className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            Page Sections
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Hero</Label>
                <Switch
                  checked={config.sections.hero}
                  onCheckedChange={() => dispatch({ type: 'TOGGLE_SECTION', payload: 'hero' })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">About</Label>
                <Switch
                  checked={config.sections.about}
                  onCheckedChange={() => dispatch({ type: 'TOGGLE_SECTION', payload: 'about' })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Services</Label>
                <Switch
                  checked={config.sections.services}
                  onCheckedChange={() => dispatch({ type: 'TOGGLE_SECTION', payload: 'services' })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Testimonials</Label>
                <Switch
                  checked={config.sections.testimonials}
                  onCheckedChange={() => dispatch({ type: 'TOGGLE_SECTION', payload: 'testimonials' })}
                />
              </div>
              <div className="flex items-center justify-between col-span-2">
                <Label className="text-sm">Contact</Label>
                <Switch
                  checked={config.sections.contact}
                  onCheckedChange={() => dispatch({ type: 'TOGGLE_SECTION', payload: 'contact' })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Hero Section */}
        <AccordionItem value="hero">
          <AccordionTrigger className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Hero Section
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={config.hero.title}
                onChange={(e) => dispatch({
                  type: 'UPDATE_HERO',
                  payload: { title: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Textarea
                value={config.hero.subtitle}
                onChange={(e) => dispatch({
                  type: 'UPDATE_HERO',
                  payload: { subtitle: e.target.value }
                })}
                rows={3}
              />
            </div>
            <div>
              <Label>CTA Button Text</Label>
              <Input
                value={config.hero.ctaText}
                onChange={(e) => dispatch({
                  type: 'UPDATE_HERO',
                  payload: { ctaText: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>CTA Link</Label>
              <Input
                value={config.hero.ctaLink}
                onChange={(e) => dispatch({
                  type: 'UPDATE_HERO',
                  payload: { ctaLink: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Background Image URL</Label>
              <Input
                value={config.hero.backgroundImage}
                onChange={(e) => dispatch({
                  type: 'UPDATE_HERO',
                  payload: { backgroundImage: e.target.value }
                })}
                placeholder="https://images.pexels.com/..."
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* About Section */}
        <AccordionItem value="about">
          <AccordionTrigger className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            About Section
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={config.about.title}
                onChange={(e) => dispatch({
                  type: 'UPDATE_ABOUT',
                  payload: { title: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea
                value={config.about.content}
                onChange={(e) => dispatch({
                  type: 'UPDATE_ABOUT',
                  payload: { content: e.target.value }
                })}
                rows={4}
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={config.about.image}
                onChange={(e) => dispatch({
                  type: 'UPDATE_ABOUT',
                  payload: { image: e.target.value }
                })}
                placeholder="https://images.pexels.com/..."
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Contact Section */}
        <AccordionItem value="contact">
          <AccordionTrigger className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Contact Section
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={config.contact.title}
                onChange={(e) => dispatch({
                  type: 'UPDATE_CONTACT',
                  payload: { title: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={config.contact.subtitle}
                onChange={(e) => dispatch({
                  type: 'UPDATE_CONTACT',
                  payload: { subtitle: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={config.contact.email}
                onChange={(e) => dispatch({
                  type: 'UPDATE_CONTACT',
                  payload: { email: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={config.contact.phone}
                onChange={(e) => dispatch({
                  type: 'UPDATE_CONTACT',
                  payload: { phone: e.target.value }
                })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}