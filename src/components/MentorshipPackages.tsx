import { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from './ScrollReveal';
import { MentorshipContactForm } from './MentorshipContactForm';
import { BookingModal } from './BookingModal';

const packages = [
  {
    name: 'Career Coffee Chat',
    price: '€20',
    duration: '30 min',
    description: 'Quick career guidance for early-stage researchers and scientists.',
    topics: [
      'Career path exploration',
      'Industry vs academia decisions',
      'General advice and Q&A',
    ],
    popular: false,
  },
  {
    name: 'Technical Deep Dive',
    price: '€50',
    duration: '60 min',
    description: 'In-depth technical discussion on PBPK/QSP modeling or AI in pharma.',
    topics: [
      'PBPK/QSP modeling guidance',
      'AI/ML in pharmaceutical sciences',
      'Technical career transitions',
      'Project-specific challenges',
    ],
    popular: true,
  },
  {
    name: 'Product Leadership',
    price: '€75',
    duration: '60 min',
    description: 'Strategic session for scientists transitioning to product management.',
    topics: [
      'Scientist to PM pathway',
      'Product strategy in scientific software',
      'Leadership development',
      'Building stakeholder influence',
    ],
    popular: false,
  },
];

const targetAudience = [
  'PhD students exploring industry careers',
  'Postdocs transitioning to product roles',
  'Scientists entering PBPK/QSP/AI fields',
  'Women in STEM seeking mentorship',
  'Early-career pharma professionals',
];

export const MentorshipPackages = () => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    <section id="mentorship" className="py-32 md:py-40 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-accent mb-4">
              Mentorship Services
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
              Be My Mentee
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              One-on-one conversations at the intersection of science, technology, and career development
            </p>
          </div>
        </ScrollReveal>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {packages.map((pkg, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 100}>
              <Card 
                className={`p-8 h-full flex flex-col relative ${
                  pkg.popular 
                    ? 'border-2 border-accent bg-accent/5' 
                    : 'border hover:border-accent/50'
                } transition-all hover-lift`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-light mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-light">{pkg.price}</span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {pkg.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </div>

                <ul className="space-y-2 mb-8 flex-grow">
                  {pkg.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => setShowBooking(true)}
                  className={`w-full ${
                    pkg.popular 
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                      : 'bg-foreground text-background hover:bg-foreground/90'
                  }`}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Session
                </Button>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Who This Is For */}
        <ScrollReveal direction="up">
          <div className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-12">
            <h3 className="text-2xl font-light mb-6 text-center">Who This Is For</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {targetAudience.map((audience, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-background border border-border rounded-full text-sm"
                >
                  {audience}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Contact Form */}
        <ScrollReveal direction="up">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Have questions before booking? Send me a message.
            </p>
            <MentorshipContactForm />
          </div>
        </ScrollReveal>
      </div>
      </section>
    </>
  );
};
