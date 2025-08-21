import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Layout, Type, Download, Share, Eye } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PageCraft</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Beautiful Landing Pages
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> in Minutes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            No coding required. Build professional landing pages with our intuitive drag-and-drop builder. 
            Customize themes, layouts, and content with real-time preview.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder">
              <Button size="lg" className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700 transition-colors">
                Start Building Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Build Amazing Pages
          </h2>
          <p className="text-xl text-gray-600">Powerful features that make page creation effortless</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Palette className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Theme Customization</CardTitle>
              <CardDescription>
                Choose from light, dark, or gradient themes with unlimited color combinations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Layout className="w-12 h-12 text-green-600 mb-4" />
              <CardTitle>Flexible Layouts</CardTitle>
              <CardDescription>
                Multiple layout options including centered hero, split layouts, and full-width banners
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Type className="w-12 h-12 text-purple-600 mb-4" />
              <CardTitle>Typography Control</CardTitle>
              <CardDescription>
                Access to Google Fonts with sans-serif, serif, and monospace options
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Eye className="w-12 h-12 text-orange-600 mb-4" />
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>
                See your changes instantly with real-time preview - no page refreshes needed
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Download className="w-12 h-12 text-red-600 mb-4" />
              <CardTitle>Export Options</CardTitle>
              <CardDescription>
                Download your landing page as static HTML/CSS or share via unique preview links
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Share className="w-12 h-12 text-indigo-600 mb-4" />
              <CardTitle>Easy Sharing</CardTitle>
              <CardDescription>
                Generate shareable links and save your work locally for future editing
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600">Get your landing page live in minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Customize Your Design</h3>
              <p className="text-gray-600">
                Choose your theme, layout, fonts, and customize all content sections to match your brand
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Preview in Real-Time</h3>
              <p className="text-gray-600">
                Watch your changes come to life instantly with our live preview feature
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Export & Share</h3>
              <p className="text-gray-600">
                Download your page or share it instantly with a unique link - ready to go live!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Perfect Landing Page?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of creators who trust PageCraft for their landing pages
          </p>
          <Link href="/builder">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Palette className="w-6 h-6" />
            <span className="text-lg font-semibold">PageCraft</span>
          </div>
          <p>&copy; 2025 PageCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}