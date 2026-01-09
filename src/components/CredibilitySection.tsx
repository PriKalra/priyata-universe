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
    <section className="py-20 md:py-24 bg-muted/30 border-y border-border/50">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {credentials.map((item, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 50}>
              <div className="text-center p-6 rounded-2xl bg-background border border-border hover:border-accent/40 transition-all hover-lift group">
                <item.icon className="h-6 w-6 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform" />
                <p className="text-2xl md:text-3xl font-light mb-1">{item.stat}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">{item.label}</p>
                <p className="text-xs text-muted-foreground/80">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Company/Speaking highlights */}
        <ScrollReveal direction="up" delay={200}>
          <div className="flex flex-wrap justify-center gap-3">
            {highlights.map((item, index) => (
              <span 
                key={index}
                className="badge-pill flex items-center gap-2"
              >
                <Sparkles className="h-3 w-3 text-accent" />
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
