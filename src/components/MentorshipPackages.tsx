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
      <section id="mentorship" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <ScrollReveal direction="up">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <p className="text-xs sm:text-sm uppercase tracking-widest text-accent mb-3 sm:mb-4">
                Mentorship
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 sm:mb-4 tracking-tight">
                Learn With Me
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto px-2">
                One-on-one guidance at the intersection of science, technology, and career growth
              </p>
            </div>
          </ScrollReveal>

          {/* Packages Grid - single column on mobile, 3 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12 md:mb-16">
            {packages.map((pkg, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 80}>
                <Card 
                  className={`p-4 sm:p-6 md:p-8 h-full flex flex-col relative group ${
                    pkg.popular 
                      ? 'border-2 border-accent bg-accent/5 shadow-lg shadow-accent/10' 
                      : 'border hover:border-accent/40'
                  } transition-all hover-lift`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-0.5 sm:py-1 bg-accent text-accent-foreground text-[10px] sm:text-xs font-medium rounded-full shadow-md">
                      Popular
                    </span>
                  )}
                  
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-medium mb-1.5 sm:mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-2 mb-2 sm:mb-3">
                      <span className="text-2xl sm:text-3xl font-light">{pkg.price}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {pkg.duration}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>
                  </div>

                  <ul className="space-y-2 sm:space-y-2.5 mb-6 sm:mb-8 flex-grow">
                    {pkg.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => setShowBooking(true)}
                    size="lg"
                    className={`w-full text-sm sm:text-base ${
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
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-4 sm:mb-6">
                Ideal For
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {targetAudience.map((audience, index) => (
                  <span 
                    key={index}
                    className="badge-pill text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4"
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="up">
            <div className="max-w-xl mx-auto text-center px-2">
              <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
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
