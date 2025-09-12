import { CheckCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

export function FAQSection() {
  const faqs: FAQ[] = [
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
    <section className="py-24 bg-background-light">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-text-secondary">
            Everything you need to know about AI video generation.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-background rounded-lg border border-border-light shadow-sm group hover:shadow-md transition-shadow">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-background-light transition-colors">
                <h3 className="text-lg font-medium text-text-primary">{faq.question}</h3>
                <CheckCircle className="w-5 h-5 text-text-muted group-open:text-primary-600 transition-colors" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-text-secondary">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
