import { useEffect, useState } from 'react';
import { Twitter, Mail, Coffee, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CosmicBackground } from "@/components/CosmicBackground";
import { ContentCard } from "@/components/ContentCard";
import { FractalSubtitle } from "@/components/FractalSubtitle";
import { BuyMeACoffeeModal } from "@/components/BuyMeACoffeeModal";

interface ContentItem {
  type: string;
  title: string;
  excerpt: string;
  link: string;
  source: string;
  date: string;
  size?: string;
  audioLength?: string;
  audioUrl?: string;
  image?: string;
  views?: number;
}

const Index = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBMCModal, setShowBMCModal] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // TODO: Implement real-time fetching from:
        // - Hey World RSS/API: https://world.hey.com/priyata
        // - Buy Me a Coffee API: https://buymeacoffee.com/priyata
        
        const staticContent: ContentItem[] = [
          {
            type: "blog",
            title: "Fall in Love with the Starting Line",
            excerpt: "Holding on to the identity that we have narrated to ourselves is rather obvious. Whenever we are put in the position of start over, there is a lot of friction.",
            link: "https://world.hey.com/priyata/fall-in-love-with-the-starting-line-cc9771b4",
            source: "Hey World",
            date: "2025-10-14",
            size: "large"
          },
          {
            type: "audio",
            title: "Paper2Agent: Reimagining Research Papers",
            excerpt: "Exploring how research papers can be transformed into interactive and reliable AI agents.",
            link: "https://buymeacoffee.com/priyata/paper2agent-reimagining-research-papers-as-interactive-reliable-ai-agents",
            source: "Buy Me a Coffee",
            audioLength: "34:00",
            audioUrl: "https://cdn.buymeacoffee.com/uploads/project_updates/2025/10/30d206c46073aac17f7c86b0e3c17b45.mp3",
            image: "https://cdn.buymeacoffee.com/uploads/project_updates/2025/10/30d206c46073aac17f7c86b0e3c17b45.jpg",
            date: "2025-10-06",
            views: 54,
            size: "medium"
          },
          {
            type: "blog",
            title: "The Universal Reach of Creating",
            excerpt: "Recently, I have pivoted into the role of Product manager and wow, the clichés about my role are popping up left and right.",
            link: "https://world.hey.com/priyata/the-universal-reach-of-creating-490a7fd6",
            source: "Hey World",
            date: "2025-09-28",
            size: "small"
          },
          {
            type: "audio",
            title: "LLMs for Data Extraction in Toxicology",
            excerpt: "Implications and lessons learned from using LLMs in toxicology data extraction.",
            link: "https://buymeacoffee.com/priyata/large-language-models-data-extraction-toxicology-implications-lessons-learned",
            source: "Buy Me a Coffee",
            audioLength: "18:54",
            audioUrl: "https://cdn.buymeacoffee.com/uploads/project_updates/2025/09/203b4664c1490ef46d800870a959b3c5.mp3",
            image: "https://cdn.buymeacoffee.com/uploads/project_updates/2025/09/203b4664c1490ef46d800870a959b3c5.jpg",
            date: "2025-09-09",
            views: 84,
            size: "medium"
          },
          {
            type: "blog",
            title: "Why Are We Living Longer but Feeling Worse?",
            excerpt: "The Paradox of Longevity: What if living to 85 means spending your last decade unwell? At Eurotox 2025, a striking paradox was unveiled.",
            link: "https://world.hey.com/priyata/why-are-we-living-longer-but-feeling-worse-734d3778",
            source: "Hey World",
            date: "2025-09-05",
            size: "large"
          },
          {
            type: "blog",
            title: "Ego, Control, and Sincerity in Pharma Science",
            excerpt: "Sometimes, when I notice carefully, the environment in Pharma, I realize than more than being about truth, the entire industry is about memes.",
            link: "https://world.hey.com/priyata/ego-control-and-sincerity-in-pharma-science-an-epistemological-dissection-cef99a5d",
            source: "Hey World",
            date: "2025-08-22",
            size: "small"
          },
          {
            type: "audio",
            title: "Machine Learning Automation of PKPD Modelling",
            excerpt: "Exploring the intersection of machine learning and pharmacokinetic-pharmacodynamic modeling.",
            link: "https://buymeacoffee.com/priyata/machine-learning-automation-pkpd-modelling",
            source: "Buy Me a Coffee",
            audioLength: "20:09",
            audioUrl: "https://cdn.buymeacoffee.com/uploads/project_updates/2025/08/4a7ec3e8b391f35c0a4ded98a734b078.mp3",
            image: "https://cdn.buymeacoffee.com/uploads/project_updates/2025/08/4a7ec3e8b391f35c0a4ded98a734b078.jpg",
            date: "2025-08-07",
            views: 148,
            size: "medium"
          },
          {
            type: "blog",
            title: "The Nano Banana Experiment",
            excerpt: "Could an AI model like Nano Banana take raw biological reference images and turn them into something better?",
            link: "https://world.hey.com/priyata/the-nano-banana-experiment-ai-s-creative-power-in-biology-2b8c184b",
            source: "Hey World",
            date: "2025-07-18",
            size: "small"
          },
          {
            type: "blog",
            title: "AI in Pharma: 10x Revolution",
            excerpt: "The universe bows to those who dare, who push past the ordinary and chase what others deem impossible.",
            link: "https://world.hey.com/priyata/ai-in-pharma-10x-revolution-fdabcd1b",
            source: "Hey World",
            date: "2025-07-01",
            size: "small"
          }
        ];

        const sortedContent = staticContent.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setContent(sortedContent);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching content:', error);
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[hsl(var(--cosmic-dark))]">
        <CosmicBackground />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-light tracking-tighter mb-8 text-white leading-none cosmic-glow">
            State of<br />Being
          </h1>
          
          <div className="mb-16">
            <FractalSubtitle />
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-zinc-600 bg-zinc-900/50 backdrop-blur-sm text-zinc-200 hover:bg-zinc-800/70 hover:text-white hover:border-accent transition-all"
            >
              <a href="https://twitter.com/DeliriusPri" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </a>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-zinc-600 bg-zinc-900/50 backdrop-blur-sm text-zinc-200 hover:bg-zinc-800/70 hover:text-white hover:border-accent transition-all"
            >
              <a href="https://world.hey.com/priyata" target="_blank" rel="noopener noreferrer">
                <Mail className="h-4 w-4 mr-2" />
                Blog
              </a>
            </Button>
            <Button 
              asChild
              size="lg"
              className="bg-accent text-white hover:bg-accent/90 transition-all"
            >
              <a href="https://buymeacoffee.com/priyata" target="_blank" rel="noopener noreferrer">
                <Coffee className="h-4 w-4 mr-2" />
                Support
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-32 md:py-40 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-3xl md:text-4xl lg:text-5xl leading-relaxed mb-12 font-light">
            I explore the intersection of model informed drug discovery and the philosophy of existence.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-light">
            My work spans PBPK/QSP modeling, AI in pharmaceutical sciences, and the fundamental questions of consciousness and reality.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-20 tracking-tight">
            Latest Work
          </h2>
          
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading content...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {content.map((item, index) => (
                <ContentCard key={index} item={item} />
              ))}
            </div>
          )}

          <div className="text-center mt-16 flex gap-4 justify-center flex-wrap">
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-zinc-300 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all duration-200"
            >
              <a href="https://world.hey.com/priyata" target="_blank" rel="noopener noreferrer">
                All Blog Posts
              </a>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setShowBMCModal(true)}
              className="border-zinc-300 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all duration-200"
            >
              <Coffee className="h-4 w-4 mr-2" />
              Browse All Audio Posts
            </Button>
          </div>
        </div>
      </section>

      {/* Mentoring Section */}
      <section id="mentoring" className="py-32 md:py-40 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
              Mentoring Sessions
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              1-hour mentoring sessions for early career scientists on pivoting, identifying strengths, and navigating your research career
            </p>
            <div className="mt-8 inline-flex items-center gap-3 text-2xl font-light">
              <Calendar className="h-8 w-8 text-accent" />
              <span className="text-accent">€30</span>
              <span className="text-muted-foreground">/</span>
              <span>1 hour</span>
            </div>
          </div>
          
          <Card className="p-8 md:p-12 max-w-3xl mx-auto hover-lift">
            <div className="calendly-inline-widget" 
              data-url="https://calendly.com/priyata?hide_gdpr_banner=1&primary_color=16b8bd&email=priyata.kalra@gmail.com" 
              style={{ minWidth: '320px', height: '700px' }}
            />
          </Card>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-32 md:py-40 bg-[hsl(var(--cosmic-dark))] text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
            Support
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 mb-16 font-light max-w-2xl">
            Help sustain independent research in drug discovery and consciousness studies
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-10 md:p-12 bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:bg-zinc-900/70 transition-all">
              <h3 className="text-2xl font-light mb-6 text-white">Bitcoin</h3>
              <div 
                className="bg-black/50 p-6 text-xs font-mono break-all mb-6 cursor-pointer hover:bg-black/70 transition-colors text-zinc-300 rounded"
                onClick={() => navigator.clipboard.writeText('3BXv7zbYcFe1ocYqqC8LLwovDsMXyaHfY5')}
                title="Click to copy"
              >
                3BXv7zbYcFe1ocYqqC8LLwovDsMXyaHfY5
              </div>
              <Button 
                className="w-full bg-accent text-white hover:bg-accent/90 transition-all"
                size="lg"
                onClick={() => navigator.clipboard.writeText('3BXv7zbYcFe1ocYqqC8LLwovDsMXyaHfY5')}
              >
                Copy Address
              </Button>
            </Card>

            <Card className="p-10 md:p-12 bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:bg-zinc-900/70 transition-all">
              <h3 className="text-2xl font-light mb-6 text-white">Buy Me a Coffee</h3>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                One-time or recurring support with card or PayPal
              </p>
              <Button 
                asChild
                size="lg"
                className="w-full bg-accent text-white hover:bg-accent/90 transition-all"
              >
                <a href="https://buymeacoffee.com/priyata" target="_blank" rel="noopener noreferrer">
                  Support Now
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-16 border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="flex gap-8 justify-center mb-8 text-sm flex-wrap">
            <a href="https://world.hey.com/priyata" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </a>
            <button 
              onClick={() => setShowBMCModal(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Audio Posts
            </button>
            <a href="https://twitter.com/DeliriusPri" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#mentoring" className="text-muted-foreground hover:text-foreground transition-colors">
              Mentoring
            </a>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Priyata • State of Being
          </p>
        </div>
      </footer>

      {/* Buy Me a Coffee Modal */}
      <BuyMeACoffeeModal isOpen={showBMCModal} onClose={() => setShowBMCModal(false)} />
    </div>
  );
};

export default Index;
