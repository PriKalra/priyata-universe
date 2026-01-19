import { useState } from 'react';
import { Twitter, Mail, Coffee, Mic, ArrowDown } from "lucide-react";
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
import { ContentHub } from "@/components/ContentHub";
import { useContentFeed } from "@/hooks/useContentFeed";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Index = () => {
  const { content, loading } = useContentFeed();
  const [showBMCModal, setShowBMCModal] = useState(false);
  const { toast } = useToast();

  // Separate content by type for better presentation
  const visualContent = content.filter(item => item.type === 'image');
  const latestVisualReflection = visualContent[0];
  const audioContent = content.filter(item => item.type === 'audio');
  const blogPosts = content.filter(item => item.type === 'blog');

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

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
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          {/* Main headline with refined typography - better mobile scaling */}
          <h1 className="font-lato font-light tracking-tight text-white leading-[0.9] cosmic-glow
                         text-[2.75rem] sm:text-5xl md:text-7xl lg:text-[8rem] xl:text-[10rem]
                         mb-4 sm:mb-6 md:mb-8 lg:mb-12
                         px-2 sm:px-0">
            State of Being
          </h1>


          {/* Tagline - improved mobile readability */}
          <p className="font-lato font-light tracking-wide text-white/80
                        text-base sm:text-lg md:text-xl lg:text-2xl
                        mb-4 sm:mb-6 md:mb-8
                        max-w-sm sm:max-w-xl md:max-w-2xl mx-auto
                        px-4 sm:px-2
                        leading-relaxed">
            Exploring consciousness, computation & the nature of existence
          </p>

          <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            <FractalSubtitle />
          </div>
          
          {/* Quick action buttons - stacked on mobile, inline on larger */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-0 w-full sm:w-auto max-w-md sm:max-w-none mx-auto">
            <Button
              asChild
              size="lg"
              className="font-lato w-full sm:w-auto bg-accent text-white hover:bg-accent/90 transition-all shadow-lg shadow-accent/25 text-base sm:text-base md:text-lg py-6 sm:py-3"
            >
              <a href="#mentorship" onClick={(e) => {
                e.preventDefault();
                document.getElementById('mentorship')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <Coffee className="h-5 w-5 mr-2" />
                Book Mentorship
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-lato w-full sm:w-auto border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/50 transition-all text-base sm:text-base md:text-lg py-6 sm:py-3"
            >
              <a href="#content" onClick={(e) => {
                e.preventDefault();
                document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <Mic className="h-5 w-5 mr-2" />
                Latest Content
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="font-lato w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/10 transition-all text-base sm:text-base md:text-lg py-6 sm:py-3"
            >
              <a href="https://world.hey.com/priyata" target="_blank" rel="noopener noreferrer">
                <Mail className="h-5 w-5 mr-2" />
                Read Blog
              </a>
            </Button>
          </div>

          {/* Social links - more visible on mobile */}
          <div className="flex gap-6 sm:gap-6 justify-center text-white/60">
            <a
              href="https://twitter.com/DeliriusPri"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-3 sm:p-3 rounded-full hover:bg-white/10 active:scale-95"
              aria-label="Follow on Twitter"
            >
              <Twitter className="h-6 w-6 sm:h-6 sm:w-6" />
            </a>
            <a
              href="https://open.spotify.com/episode/74BmnS3NAaR9cHEefbonzT"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-3 sm:p-3 rounded-full hover:bg-white/10 active:scale-95"
              aria-label="Listen on Spotify"
            >
              <Mic className="h-6 w-6 sm:h-6 sm:w-6" />
            </a>
          </div>
        </div>

        {/* Scroll indicator - larger touch target on mobile */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white/90 transition-all animate-bounce p-4 rounded-full hover:bg-white/10 active:scale-95"
          aria-label="Scroll to content"
        >
          <ArrowDown className="h-6 w-6 sm:h-6 sm:w-6" />
        </button>
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
          <h3 className="font-lato text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6">
            Poet • Scientist • Explorer
          </h3>
          <p className="font-lato text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
            I exist at the intersection of computational pharmacology, AI research, and philosophical inquiry — exploring liminal spaces where algorithms decode biological mysteries and consciousness contemplates its own emergence.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <h4 className="font-lato text-xl sm:text-2xl font-light mb-4 mt-8 sm:mt-12">Research Focus</h4>
          <div className="space-y-3 sm:space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed px-2 sm:px-0">
            <div className="flex items-start gap-3">
              <span className="text-accent text-lg sm:text-xl mt-1 flex-shrink-0">•</span>
              <span className="font-lato"><strong className="font-bold">PBPK/QSP Modeling</strong> — Simulating drug behavior through computational frameworks</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-accent text-lg sm:text-xl mt-1 flex-shrink-0">•</span>
              <span className="font-lato"><strong className="font-bold">AI in Pharma</strong> — Machine learning applications in drug discovery and toxicology</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-accent text-lg sm:text-xl mt-1 flex-shrink-0">•</span>
              <span className="font-lato"><strong className="font-bold">Philosophy & Science</strong> — Exploring consciousness, emergence, and the nature of being</span>
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

      {/* Content Hub - Unified Content Navigation */}
      <ContentHub 
        audioContent={audioContent}
        blogPosts={blogPosts}
        visualContent={visualContent}
        loading={loading}
      />

      {/* Mentorship Packages Section */}
      <MentorshipPackages />

      {/* Support Section - Simplified */}
      <section id="support" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[hsl(var(--cosmic-dark))] text-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-widest text-accent mb-4">
                Support My Work
              </p>
              <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight cosmic-glow-subtle">
                Keep the Exploration Going
              </h2>
              <p className="text-lg text-white/60 max-w-xl mx-auto">
                Your support enables independent research and creative exploration
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={100}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="bg-accent text-white hover:bg-accent/90 transition-all min-w-[200px]"
              >
                <a href="https://buymeacoffee.com/priyata" target="_blank" rel="noopener noreferrer">
                  <Coffee className="h-4 w-4 mr-2" />
                  Buy Me a Coffee
                </a>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 min-w-[200px]"
                onClick={() => {
                  navigator.clipboard.writeText('3BXv7zbYcFe1ocYqqC8LLwovDsMXyaHfY5');
                  toast({
                    title: "Bitcoin address copied!",
                    description: "Thanks for your support via Bitcoin.",
                  });
                }}
              >
                Bitcoin: Copy Address
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer - Refined */}
      <footer className="bg-background py-10 sm:py-12 md:py-16 border-t">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="flex flex-col items-center">
            {/* Navigation links */}
            <nav className="flex gap-6 md:gap-8 mb-8 flex-wrap justify-center" aria-label="Footer navigation">
              <a 
                href="https://world.hey.com/priyata" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                Blog
              </a>
              <button 
                onClick={() => setShowBMCModal(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                Audio
              </button>
              <a 
                href="https://twitter.com/DeliriusPri" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                Twitter
              </a>
              <Link 
                to="/career" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                Career
              </Link>
              <a 
                href="#mentorship" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('mentorship')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                Mentorship
              </a>
              <a 
                href="mailto:priyata.kalra@gmail.com" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                Contact
              </a>
            </nav>

            {/* Divider */}
            <div className="divider-gradient w-full max-w-xs mb-8" />
            
            {/* Copyright */}
            <p className="text-muted-foreground text-sm mb-2">
              © {new Date().getFullYear()} Priyata Kalra
            </p>
            <p className="text-xs text-muted-foreground/70">
              Computational Pharmacologist • AI Product Manager • Mentor
            </p>
          </div>
        </div>
      </footer>

      {/* Buy Me a Coffee Modal */}
      <BuyMeACoffeeModal isOpen={showBMCModal} onClose={() => setShowBMCModal(false)} />
    </div>
  );
};

export default Index;
