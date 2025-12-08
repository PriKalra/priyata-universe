import { useState } from 'react';
import { Twitter, Mail, Coffee, Mic, Copy, Bitcoin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CosmicBackground } from "@/components/CosmicBackground";
import { FractalSubtitle } from "@/components/FractalSubtitle";
import { BuyMeACoffeeModal } from "@/components/BuyMeACoffeeModal";
import { Navigation } from "@/components/Navigation";
import { CredibilitySection } from "@/components/CredibilitySection";
import { MentorshipPackages } from "@/components/MentorshipPackages";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StickyScrollSection } from "@/components/StickyScrollSection";
import { FullBleedSection } from "@/components/FullBleedSection";
import { ImmersiveContentCard } from "@/components/ImmersiveContentCard";
import { useContentFeed } from "@/hooks/useContentFeed";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Index = () => {
  const { content, loading } = useContentFeed();
  const [showBMCModal, setShowBMCModal] = useState(false);
  const { toast } = useToast();

  // Separate content by type for better presentation
  const latestVisualReflection = content.find(item => item.type === 'image');
  const audioContent = content.filter(item => item.type === 'audio').slice(0, 3);
  const blogPosts = content.filter(item => item.type === 'blog').slice(0, 6);
  const articles = content.filter(item => item.type === 'article').slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Full Immersive Cosmic Background */}
      <header className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[hsl(var(--cosmic-dark))]">
        {/* Cosmic Background - fills entire header */}
        <div className="absolute inset-0 z-0">
          <CosmicBackground />
        </div>
        
        {/* Subtle gradient overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-black/30 to-black/70 pointer-events-none" />
        
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

      {/* Credibility Section */}
      <CredibilitySection />

      {/* About Section - Sticky Scroll */}
      <StickyScrollSection
        id="about"
        minHeight="150vh"
        stickyContent={
          <div className="w-full h-full flex items-center justify-center bg-muted/30 rounded-2xl p-8">
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
                State of Being
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl">
                Where quantitative rigor meets existential wonder
              </p>
            </div>
          </div>
        }
      >
        <ScrollReveal direction="up">
          <h3 className="text-3xl md:text-4xl font-light mb-6">
            Poet • Scientist • Explorer
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            I exist at the intersection of computational pharmacology, AI research, and philosophical inquiry — exploring liminal spaces where algorithms decode biological mysteries and consciousness contemplates its own emergence.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <h4 className="text-2xl font-light mb-4 mt-12">Research Focus</h4>
          <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1">•</span>
              <span><strong>PBPK/QSP Modeling</strong> — Simulating drug behavior through computational frameworks</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1">•</span>
              <span><strong>AI in Pharma</strong> — Machine learning applications in drug discovery and toxicology</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1">•</span>
              <span><strong>Philosophy & Science</strong> — Exploring consciousness, emergence, and the nature of being</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <div className="mt-12">
            <Button 
              asChild 
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 transition-all"
            >
              <Link to="/career">
                View Career Journey
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </StickyScrollSection>

      {/* Featured Visual Reflection - Full Bleed Immersive */}
      {latestVisualReflection && (
        <FullBleedSection 
          backgroundImage={latestVisualReflection.image}
          overlay={true}
          overlayOpacity={0.5}
          minHeight="100vh"
        >
          <ScrollReveal direction="scale">
            <div className="text-center">
              <p className="text-sm uppercase tracking-widest mb-4 text-white/80">Latest Visual Reflection</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight">
                {latestVisualReflection.title}
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                {latestVisualReflection.excerpt}
              </p>
              {latestVisualReflection.date && (
                <p className="text-sm text-white/70">
                  {new Date(latestVisualReflection.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              )}
            </div>
          </ScrollReveal>
        </FullBleedSection>
      )}

      {/* Audio Content Section */}
      {audioContent.length > 0 && (
        <section className="py-24 md:py-32 bg-muted/20">
          <div className="container mx-auto px-6 max-w-6xl">
            <ScrollReveal direction="up">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
                  Audio Reflections
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Listen to conversations exploring the intersections of science, philosophy, and consciousness
                </p>
              </div>
            </ScrollReveal>

            <div className="space-y-8 max-w-4xl mx-auto">
              {audioContent.map((item, index) => (
                <ImmersiveContentCard 
                  key={index} 
                  item={item} 
                  layout={index === 0 ? 'full' : 'card'}
                />
              ))}
            </div>

            <div className="text-center mt-12">
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
      )}

      {/* Blog Posts Section - Hey World */}
      {blogPosts.length > 0 && (
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-6 max-w-6xl">
            <ScrollReveal direction="up">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
                  Latest from Hey World
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Reflections on science, philosophy, and the human condition
                </p>
              </div>
            </ScrollReveal>

            <div className="space-y-6 max-w-4xl mx-auto">
              {blogPosts.map((item, index) => (
                <ImmersiveContentCard 
                  key={index} 
                  item={item} 
                  layout="minimal"
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-zinc-300 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all duration-200"
              >
                <a href="https://world.hey.com/priyata" target="_blank" rel="noopener noreferrer">
                  Read All Blog Posts
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Articles Section (if any exist) */}
      {articles.length > 0 && (
        <section className="py-24 md:py-32 bg-muted/20">
          <div className="container mx-auto px-6 max-w-7xl">
            <ScrollReveal direction="up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-20 tracking-tight">
                Research & Articles
              </h2>
            </ScrollReveal>
            
            {loading ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Loading content...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {articles.map((item, index) => (
                  <ImmersiveContentCard key={index} item={item} layout="card" />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Mentorship Packages Section */}
      <MentorshipPackages />

      {/* Support Section */}
      <section id="support" className="py-32 md:py-40 bg-[hsl(var(--cosmic-dark))] text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-16 tracking-tight cosmic-glow">
              Support
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <ScrollReveal direction="right" delay={100}>
              <Card className="p-8 md:p-10 bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:bg-zinc-900/70 transition-all">
                <h3 className="text-2xl font-light mb-6 text-white">Bitcoin</h3>
                <div 
                  className="bg-black/50 p-6 text-xs font-mono break-all mb-6 cursor-pointer hover:bg-black/70 transition-colors text-zinc-300 rounded"
                  onClick={() => {
                    navigator.clipboard.writeText('3BXv7zbYcFe1ocYqqC8LLwovDsMXyaHfY5');
                    toast({
                      title: "Bitcoin address copied!",
                      description: "The Bitcoin address has been copied to your clipboard.",
                    });
                  }}
                  title="Click to copy"
                >
                  3BXv7zbYcFe1ocYqqC8LLwovDsMXyaHfY5
                </div>
                <Button 
                  className="w-full bg-accent text-white hover:bg-accent/90 transition-all"
                  size="lg"
                  onClick={() => {
                    navigator.clipboard.writeText('3BXv7zbYcFe1ocYqqC8LLwovDsMXyaHfY5');
                    toast({
                      title: "Bitcoin address copied!",
                      description: "The Bitcoin address has been copied to your clipboard.",
                    });
                  }}
                >
                  Copy Address
                </Button>
              </Card>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={100}>
              <Card className="p-8 md:p-10 bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:bg-zinc-900/70 transition-all">
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
            </ScrollReveal>
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
            <Link to="/career" className="text-muted-foreground hover:text-foreground transition-colors">
              Career
            </Link>
            <a 
              href="#mentorship" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('mentorship')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Mentorship
            </a>
            <a href="mailto:priyata.kalra@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <p className="text-muted-foreground text-sm mb-2">
            © {new Date().getFullYear()} Priyata Kalra • State of Being
          </p>
          <p className="text-xs text-muted-foreground">
            Computational Pharmacologist • AI Product Manager • Mentor
          </p>
        </div>
      </footer>

      {/* Buy Me a Coffee Modal */}
      <BuyMeACoffeeModal isOpen={showBMCModal} onClose={() => setShowBMCModal(false)} />
    </div>
  );
};

export default Index;
