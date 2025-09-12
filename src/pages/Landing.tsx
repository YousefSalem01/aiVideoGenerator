import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Zap, 
  Share2, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Monitor,
  Smartphone,
  Video
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Landing() {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Generation',
      description: 'Generate engaging videos from text prompts using advanced AI technology.'
    },
    {
      icon: Share2,
      title: 'Multi-Platform Publishing',
      description: 'Automatically format and publish to YouTube Shorts, Instagram Reels, and TikTok.'
    },
    {
      icon: Clock,
      title: 'Scheduled Posts',
      description: 'Schedule your content for optimal engagement times across all platforms.'
    },
    {
      icon: Sparkles,
      title: 'Professional Quality',
      description: 'Generate high-quality videos with professional transitions and effects.'
    },
    {
      icon: Monitor,
      title: 'Dashboard Analytics',
      description: 'Track performance and optimize your content strategy with detailed insights.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Create mobile-first content that performs well on all social platforms.'
    }
  ];

  const faqs = [
    {
      question: 'How does AI video generation work?',
      answer: 'Our AI analyzes your text prompt and creates engaging video content with relevant visuals, animations, and transitions optimized for social media platforms.'
    },
    {
      question: 'Which platforms are supported?',
      answer: 'We support YouTube Shorts, Instagram Reels, TikTok, and more. Each video is automatically optimized for the specific platform requirements.'
    },
    {
      question: 'Can I schedule posts in advance?',
      answer: 'Yes! You can schedule up to 7 videos at once and set specific publish times for each platform to maximize engagement.'
    },
    {
      question: 'What file formats are supported for reference materials?',
      answer: 'You can upload articles, scripts, images, and documents in various formats including PDF, DOC, TXT, PNG, and JPG.'
    }
  ];

  return (
    <div className="bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Create Viral Videos with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                AI Magic
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your ideas into engaging short-form videos for YouTube, Instagram, and TikTok. 
              No editing skills required – just describe your vision and watch it come to life.
            </p>
            
            {/* Animated Hero Visual */}
            <div className="relative mb-12">
              <div className="mx-auto w-96 h-56 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 flex items-center justify-center mb-8">
                <div className="relative">
                  <Video className="w-24 h-24 text-blue-400 animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span>YouTube Shorts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                  <span>Instagram Reels</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span>TikTok</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <Button size="lg" className="px-8 py-4 text-lg">
                  Start Generating Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="lg" className="px-8 py-4 text-lg border border-gray-600">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to go viral
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to help content creators and businesses succeed on social media.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to know about AI video generation.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-slate-800 rounded-lg border border-slate-700 group">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-750 transition-colors">
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <CheckCircle className="w-5 h-5 text-gray-400 group-open:text-blue-400 transition-colors" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your content strategy?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators who are already using AI to grow their audience.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg bg-white text-gray-900 hover:bg-gray-100">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}