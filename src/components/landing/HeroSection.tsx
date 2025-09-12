import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Sparkles, Video } from 'lucide-react';
import { Button } from '../ui/Button';
import ShinyText from '../ShinyText';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-text-primary">
            Create Viral Videos with{' '}
            <ShinyText 
              text="AI Magic" 
              disabled={false} 
              speed={3} 
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 font-bold" 
            />
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Transform your ideas into engaging short-form videos for YouTube, Instagram, and TikTok. 
            No editing skills required – just describe your vision and watch it come to life.
          </p>
          
          {/* Animated Hero Visual */}
          <div className="relative mb-12">
            <div className="mx-auto w-96 h-56 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-200/50 shadow-lg flex items-center justify-center mb-8">
              <div className="relative">
                <Video className="w-24 h-24 text-primary-600 animate-pulse" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-8 text-sm text-text-muted">
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
            <Button variant="ghost" size="lg" className="px-8 py-4 text-lg bg-white/80 backdrop-blur-sm hover:bg-white border-border-light text-text-secondary hover:text-text-primary">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
