import { 
  Zap, 
  Share2, 
  Clock, 
  Sparkles,
  Monitor,
  Smartphone
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeaturesSection() {
  const features: Feature[] = [
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

  return (
    <section id="features" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">
            Everything you need to go viral
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Powerful features designed to help content creators and businesses succeed on social media.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group">
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
