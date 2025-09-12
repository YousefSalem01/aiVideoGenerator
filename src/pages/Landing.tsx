import { HeroSection, FeaturesSection, FAQSection, CTASection } from '../components/landing';

export function Landing() {
  return (
    <div className="bg-background-light">
      <HeroSection />
      <FeaturesSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}