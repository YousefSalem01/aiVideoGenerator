import React from 'react';
import { Check, Zap, Crown, Building } from 'lucide-react';
import { Button } from '../components/ui/Button';

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
    <div className="bg-slate-900 text-white min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the perfect plan for your content creation needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-slate-800 rounded-2xl border p-8 ${
                plan.popular 
                  ? 'border-blue-500 ring-2 ring-blue-500/20' 
                  : 'border-slate-700'
              } hover:border-blue-500/50 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-xl mb-4">
                  <plan.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full" 
                variant={plan.popular ? 'primary' : 'secondary'}
                size="lg"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500">
            Questions? <a href="#" className="text-blue-400 hover:text-blue-300">Contact our sales team</a> for custom enterprise pricing.
          </p>
        </div>
      </div>
    </div>
  );
}