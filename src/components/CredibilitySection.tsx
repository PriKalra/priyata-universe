import { ScrollReveal } from './ScrollReveal';
import { Award, Users, BookOpen, Building2, Sparkles } from 'lucide-react';

const credentials = [
  {
    icon: Building2,
    stat: '10+',
    label: 'Years',
    description: 'Fortune 500 Pharma & AI',
  },
  {
    icon: Users,
    stat: '2021',
    label: 'Mentoring Since',
    description: 'Life Science Accelerator BW',
  },
  {
    icon: Award,
    stat: 'Oxford',
    label: 'Leadership',
    description: 'Saïd Business School',
  },
  {
    icon: BookOpen,
    stat: 'Published',
    label: 'Researcher',
    description: 'PBPK/QSP & AI',
  },
];

const highlights = [
  'Simulations Plus',
  'Bayer AG',
  'BASF SE',
  'AAPS Speaker',
  'Women in AI'
];

export const CredibilitySection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/30 border-y border-border/50">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Stats Grid - better mobile sizing */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
          {credentials.map((item, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 50}>
              <div className="text-center p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl bg-background border border-border hover:border-accent/40 transition-all hover-lift group">
                <item.icon className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 sm:mb-3 text-accent group-hover:scale-110 transition-transform" />
                <p className="text-xl sm:text-2xl md:text-3xl font-light mb-0.5 sm:mb-1">{item.stat}</p>
                <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground mb-0.5 sm:mb-1">{item.label}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground/80 line-clamp-1">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Company/Speaking highlights - scrollable on mobile */}
        <ScrollReveal direction="up" delay={200}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {highlights.map((item, index) => (
              <span 
                key={index}
                className="badge-pill flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4"
              >
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-accent" />
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
