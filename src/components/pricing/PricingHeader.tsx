interface PricingHeaderProps {
  title: string;
  description: string;
}

export function PricingHeader({ title, description }: PricingHeaderProps) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
        {title}
      </h1>
      <p className="text-xl text-text-secondary max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
}
