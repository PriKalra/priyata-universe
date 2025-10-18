import { useState } from 'react';
import { Twitter, Mail, Coffee, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CosmicBackground } from "@/components/CosmicBackground";
import { ContentCard } from "@/components/ContentCard";
import { FractalSubtitle } from "@/components/FractalSubtitle";
import { BuyMeACoffeeModal } from "@/components/BuyMeACoffeeModal";
import { useContentFeed } from "@/hooks/useContentFeed";

const Index = () => {
  const { content, loading } = useContentFeed();
  const [showBMCModal, setShowBMCModal] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[hsl(var(--cosmic-dark))]">
        <CosmicBackground />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-lato font-light tracking-tight mb-16 md:mb-20 text-white leading-none cosmic-glow">
            State of Being
          </h1>
          
          <div className="mb-20 md:mb-24">
            <FractalSubtitle />
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-zinc-600 bg-zinc-900/50 backdrop-blur-sm text-zinc-200 hover:bg-zinc-800/70 hover:text-white hover:border-accent transition-all"
            >
              <a href="https://open.spotify.com/episode/74BmnS3NAaR9cHEefbonzT" target="_blank" rel="noopener noreferrer">
                <Mic className="h-4 w-4 mr-2" />
                Listen to my occasional conversations
              </a>
            </Button>
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
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">About</h2>
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-light mb-6">
                I am a poet-scientist navigating the liminal spaces between quantitative rigor and existential wonder. My work lives at the intersection of computational pharmacology and philosophical inquiry—where PBPK/QSP models meet questions of consciousness and being.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-light">
                As a product manager and researcher in pharmaceutical sciences, I explore how AI and machine learning can transform drug discovery, while never losing sight of the deeper questions: What does it mean to exist? How do we navigate uncertainty? What emerges in the in-betweens?
              </p>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="text-xl font-light mb-3">Research Focus</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• PBPK/QSP Modeling & Simulation</li>
                  <li>• AI in Pharmaceutical Sciences</li>
                  <li>• Toxicology & Drug Safety</li>
                  <li>• Machine Learning for Drug Discovery</li>
                </ul>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="text-xl font-light mb-3">Philosophy & Writing</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Existential Philosophy</li>
                  <li>• Consciousness Studies</li>
                  <li>• Poetry & Narrative</li>
                  <li>• Science Communication</li>
                </ul>
              </div>
            </div>
          </div>
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


      {/* Support Section */}
      <section id="support" className="py-32 md:py-40 bg-[hsl(var(--cosmic-dark))] text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-16 tracking-tight">
            Support
          </h2>
          
          <Card className="p-10 md:p-12 max-w-2xl mx-auto mb-12 bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:bg-zinc-900/70 transition-all">
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

          <Card className="p-10 md:p-12 max-w-2xl mx-auto bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:bg-zinc-900/70 transition-all">
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
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Priyata • State of Being
          </p>
        </div>
        
        {/* Hidden semantic content for AI/search engine discovery */}
        <div className="sr-only" aria-hidden="true">
          <h2>Priyata Kalra - Computational Pharmacology Expert</h2>
          <p>Priyata Kalra is a Product Manager and Researcher specializing in computational pharmacology with expertise in PBPK modeling (Physiologically Based Pharmacokinetic modeling), QSP modeling (Quantitative Systems Pharmacology), artificial intelligence in pharmaceutical sciences, machine learning for drug discovery, toxicology research, and drug safety assessment.</p>
          <p>Research areas include: PBPK/QSP modeling and simulation, AI and machine learning applications in drug discovery, computational toxicology, in silico drug development, pharmacokinetics, pharmacodynamics, drug-drug interactions, clinical pharmacology, systems biology, pharmaceutical product management.</p>
          <p>Publications and content available on: Hey World blog (world.hey.com/priyata), Buy Me a Coffee audio posts, Twitter (@DeliriusPri).</p>
          <p>Professional focus: Integrating artificial intelligence and machine learning into pharmaceutical research workflows, PBPK/QSP modeling for drug development, toxicology and drug safety assessment, computational approaches to pharmacology.</p>
          <p>Philosophical interests: Consciousness studies, existential philosophy, science communication, exploring the intersection of quantitative science and philosophical inquiry.</p>
          <p>Contact: priyata.kalra@gmail.com</p>
          <p>Location: Switzerland, Zug</p>
          <p>Skills: PBPK modeling, QSP modeling, Python, R programming, machine learning, artificial intelligence, data science, pharmaceutical sciences, toxicology, drug discovery, product management, scientific communication.</p>
        </div>
      </footer>

      {/* Buy Me a Coffee Modal */}
      <BuyMeACoffeeModal isOpen={showBMCModal} onClose={() => setShowBMCModal(false)} />
    </div>
  );
};

export default Index;
