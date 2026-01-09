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
      <section id="mentorship" className="section-spacing bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-widest text-accent mb-4">
                Mentorship
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 tracking-tight">
                Learn With Me
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                One-on-one guidance at the intersection of science, technology, and career growth
              </p>
            </div>
          </ScrollReveal>

          {/* Packages Grid */}
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {packages.map((pkg, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 80}>
                <Card 
                  className={`p-6 md:p-8 h-full flex flex-col relative group ${
                    pkg.popular 
                      ? 'border-2 border-accent bg-accent/5 shadow-lg shadow-accent/10' 
                      : 'border hover:border-accent/40'
                  } transition-all hover-lift`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full shadow-md">
                      Popular
                    </span>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-3xl font-light">{pkg.price}</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {pkg.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-grow">
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
                        ? 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-md shadow-accent/20' 
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

          {/* Who This Is For - Streamlined */}
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
                Ideal For
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {targetAudience.map((audience, index) => (
                  <span 
                    key={index}
                    className="badge-pill"
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="up">
            <div className="max-w-xl mx-auto text-center">
              <p className="text-muted-foreground mb-6">
                Questions before booking?
              </p>
              <MentorshipContactForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};
