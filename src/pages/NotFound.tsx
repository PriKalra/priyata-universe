import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { CosmicBackground } from "@/components/CosmicBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[hsl(var(--cosmic-dark))]">
      <CosmicBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none" />
      
      <div className="relative z-10 text-center px-6">
        <h1 className="text-8xl md:text-9xl font-lato font-light mb-6 text-white cosmic-glow">
          404
        </h1>
        <p className="text-2xl md:text-3xl text-zinc-300 font-light mb-12">
          This page has wandered into the void
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            size="lg"
            className="bg-accent text-white hover:bg-accent/90 transition-all"
          >
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Link>
          </Button>
          <Button 
            asChild
            size="lg"
            variant="outline"
            className="border-zinc-600 bg-zinc-900/50 backdrop-blur-sm text-zinc-200 hover:bg-zinc-800/70 hover:text-white hover:border-accent transition-all"
            onClick={() => window.history.back()}
          >
            <button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
