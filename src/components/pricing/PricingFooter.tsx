import React from 'react';

interface PricingFooterProps {
  trialText: string;
  contactText: string;
  contactLinkText: string;
  contactLinkUrl: string;
}

export function PricingFooter({ 
  trialText, 
  contactText, 
  contactLinkText, 
  contactLinkUrl 
}: PricingFooterProps) {
  return (
    <div className="text-center mt-16">
      <p className="text-text-secondary mb-4">
        {trialText}
      </p>
      <p className="text-sm text-text-muted">
        {contactText}{' '}
        <a 
          href={contactLinkUrl} 
          className="text-primary-600 hover:text-primary-700"
        >
          {contactLinkText}
        </a>{' '}
        for custom enterprise pricing.
      </p>
    </div>
  );
}
