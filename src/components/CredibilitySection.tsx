import { ScrollReveal } from './ScrollReveal';
import { Award, Users, BookOpen, Building2 } from 'lucide-react';

const credentials = [
  {
    icon: Building2,
    stat: '10+',
    label: 'Years Experience',
    description: 'Fortune 500 pharma & AI',
  },
  {
    icon: Users,
    stat: 'Since 2021',
    label: 'Active Mentor',
    description: 'Life Science Accelerator BW',
  },
  {
    icon: Award,
    stat: 'Oxford',
    label: 'Leadership Program',
    description: 'Saïd Business School',
  },
  {
    icon: BookOpen,
    stat: 'Published',
    label: 'Researcher',
    description: 'PBPK/QSP & AI in Pharma',
  },
];

export const CredibilitySection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Why Work With Me
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Proven Track Record
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {credentials.map((item, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 100}>
              <div className="text-center p-6 rounded-xl bg-background border border-border hover:border-accent/50 transition-all hover-lift">
                <item.icon className="h-8 w-8 mx-auto mb-4 text-accent" />
                <p className="text-2xl md:text-3xl font-light mb-1">{item.stat}</p>
                <p className="text-sm font-medium mb-1">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={400}>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Featured speaker at <span className="text-foreground font-medium">AAPS</span>, contributor to{' '}
              <span className="text-foreground font-medium">Bioanalysis Zone</span>, and collaborator with{' '}
              <span className="text-foreground font-medium">Solvo Transporters</span>. Women in AI volunteer.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
