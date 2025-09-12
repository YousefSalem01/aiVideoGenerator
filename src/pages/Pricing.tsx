import React from 'react';
import { Zap, Crown, Building } from 'lucide-react';
import { PricingPlan, PricingHeader, PricingFooter } from '../components/pricing';

export function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for getting started',
      icon: Zap,
      features: [
        '5 videos per month',
        'Basic AI generation',
        '720p video quality',
        'Watermark included',
        'YouTube Shorts only',
        'Email support'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: 29,
      description: 'Best for content creators',
      icon: Crown,
      features: [
        '100 videos per month',
        'Advanced AI generation',
        '1080p video quality',
        'No watermark',
        'All platforms supported',
        'Priority support',
        'Custom templates',
        'Scheduled publishing',
        'Analytics dashboard'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Business',
      price: 99,
      description: 'For teams and agencies',
      icon: Building,
      features: [
        'Unlimited videos',
        'Premium AI generation',
        '4K video quality',
        'White-label option',
        'All platforms + API',
        'Dedicated support',
        'Custom branding',
        'Team collaboration',
        'Advanced analytics',
        'Priority processing',
        'Custom integrations'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="bg-background-light text-text-primary min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PricingHeader 
          title="Simple, transparent pricing"
          description="Choose the perfect plan for your content creation needs. Upgrade or downgrade at any time."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              icon={plan.icon}
              features={plan.features}
              cta={plan.cta}
              popular={plan.popular}
            />
          ))}
        </div>

        <PricingFooter 
          trialText="All plans include a 14-day free trial. No credit card required."
          contactText="Questions?"
          contactLinkText="Contact our sales team"
          contactLinkUrl="#"
        />
      </div>
    </div>
  );
}