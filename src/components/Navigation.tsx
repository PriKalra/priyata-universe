import { useState, useEffect } from 'react';
import { Coffee, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className={`text-lg font-light tracking-wide transition-colors ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}
          >
            Priyata Kalra
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className={`text-sm font-light tracking-wide transition-colors hover:text-accent ${
                isScrolled ? 'text-foreground' : 'text-white/90'
              }`}
            >
              About
            </button>
            <Link
              to="/career"
              className={`text-sm font-light tracking-wide transition-colors hover:text-accent ${
                isScrolled ? 'text-foreground' : 'text-white/90'
              }`}
            >
              Career
            </Link>
            <button
              onClick={() => scrollToSection('mentorship')}
              className={`text-sm font-light tracking-wide transition-colors hover:text-accent ${
                isScrolled ? 'text-foreground' : 'text-white/90'
              }`}
            >
              Mentorship
            </button>
            <button
              onClick={() => scrollToSection('support')}
              className={`text-sm font-light tracking-wide transition-colors hover:text-accent ${
                isScrolled ? 'text-foreground' : 'text-white/90'
              }`}
            >
              Contact
            </button>
            <Button
              asChild
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a href="https://buymeacoffee.com/priyata" target="_blank" rel="noopener noreferrer">
                <Coffee className="h-4 w-4 mr-2" />
                Book a Session
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-sm font-light tracking-wide text-foreground hover:text-accent text-left px-2 py-2"
              >
                About
              </button>
              <Link
                to="/career"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-light tracking-wide text-foreground hover:text-accent px-2 py-2"
              >
                Career
              </Link>
              <button
                onClick={() => scrollToSection('mentorship')}
                className="text-sm font-light tracking-wide text-foreground hover:text-accent text-left px-2 py-2"
              >
                Mentorship
              </button>
              <button
                onClick={() => scrollToSection('support')}
                className="text-sm font-light tracking-wide text-foreground hover:text-accent text-left px-2 py-2"
              >
                Contact
              </button>
              <Button
                asChild
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90 w-full"
              >
                <a href="https://buymeacoffee.com/priyata" target="_blank" rel="noopener noreferrer">
                  <Coffee className="h-4 w-4 mr-2" />
                  Book a Session
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
