import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function CTASection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-background-light border border-border-light rounded-lg p-8 shadow-sm text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
            Ready to transform your content strategy?
          </h2>
          <p className="text-xl mb-8 text-text-secondary">
            Join thousands of creators who are already using AI to grow their audience.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="primary" className="px-8 py-4 text-lg shadow-md hover:shadow-lg transition-all">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
