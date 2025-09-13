import { Check, LucideIcon } from 'lucide-react';
import { Button } from '../ui/Button';

export interface PricingPlanProps {
  name: string;
  price: number;
  description: string;
  icon: LucideIcon;
  features: string[];
  cta: string;
  popular?: boolean;
}

export function PricingPlan({
  name,
  price,
  description,
  icon: Icon,
  features,
  cta,
  popular = false
}: PricingPlanProps) {
  return (
    <div
      className={`relative bg-background rounded-2xl border p-8 flex flex-col h-full ${
        popular 
          ? 'border-primary-500 ring-2 ring-primary-500/20' 
          : 'border-border-light'
      } hover:border-primary-400 hover:shadow-lg transition-all duration-300`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-text-primary">{name}</h3>
        <p className="text-text-secondary mb-4">{description}</p>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold text-text-primary">${price}</span>
          <span className="text-text-secondary ml-2">/month</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start">
            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-text-secondary">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <Button 
          className="w-full" 
          variant={popular ? 'primary' : 'secondary'}
          size="lg"
        >
          {cta}
        </Button>
      </div>
    </div>
  );
}
