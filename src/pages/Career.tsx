import { Twitter, Mail, Coffee, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Career = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex gap-4">
            <Button 
              asChild
              size="sm"
              variant="outline"
            >
              <a href="https://twitter.com/DeliriusPri" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <Button 
              asChild
              size="sm"
              variant="outline"
            >
              <a href="https://world.hey.com/priyata" target="_blank" rel="noopener noreferrer">
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Career Content */}
      <main className="py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 tracking-tight">
            Career Journey
          </h1>
          <p className="text-xl text-muted-foreground font-light mb-20 max-w-2xl">
            Navigating the intersection of computational pharmacology, AI product management, and scientific research
          </p>

          <div className="space-y-12">
            {/* Current Role */}
            <div className="border-l-2 border-accent pl-8 pb-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                <h2 className="text-2xl md:text-3xl font-light">Product Manager AI & Automation</h2>
                <span className="text-sm text-muted-foreground mt-2 lg:mt-0">Oct 2021 - Present</span>
              </div>
              <p className="text-lg text-accent font-light mb-4">Simulations Plus Inc, Lancaster USA</p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Working 100% remote, leading product strategy and innovation in AI-driven pharmaceutical software solutions.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Own product strategy and roadmap for AI/automation across Simulations Plus' scientific software suite</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Spearheaded end-to-end development of GPX automation platform, improving pharma client adoption</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Drove integration of AI/ML workflows into pharmaceutical modeling and simulation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>PI and lead for additional dosage routes: Oral cavity PBPK model for FDA, new approach methodologies (NAMs) for ICCS consortia</span>
                </li>
              </ul>
            </div>

            {/* Bayer */}
            <div className="border-l-2 border-muted pl-8 pb-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                <h2 className="text-2xl md:text-3xl font-light">Data Scientist with PBPK Expertise</h2>
                <span className="text-sm text-muted-foreground mt-2 lg:mt-0">Mar 2020 - Aug 2021</span>
              </div>
              <p className="text-lg text-accent font-light mb-4">Bayer AG, Frankfurt</p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Onboarded and worked 100% remote during the pandemic, bridging pharmaceutical and agricultural sciences through AI innovation.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Artificial intelligence for bioavailability prediction and optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Cross-divisional work within Crop Science & Pharma divisions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>PBPK modeling and automation pipeline for design of experiments</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Cheminformatic analysis and project management</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Led Plant AI-PBPK activities, pioneering novel systemicity approaches</span>
                </li>
              </ul>
            </div>

            {/* BASF */}
            <div className="border-l-2 border-muted pl-8 pb-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                <h2 className="text-2xl md:text-3xl font-light">Postdoctoral Researcher</h2>
                <span className="text-sm text-muted-foreground mt-2 lg:mt-0">Jan 2019 - Feb 2020</span>
              </div>
              <p className="text-lg text-accent font-light mb-4">BASF SE, Germany</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>In vitro to in vivo extrapolation (IVIVE) research</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Reverse dosimetry for toxicology assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>PBPK for preclinical species</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Quantitative systems toxicology (QST) for thyroid modeling</span>
                </li>
              </ul>
            </div>

            {/* PhD */}
            <div className="border-l-2 border-muted pl-8 pb-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                <h2 className="text-2xl md:text-3xl font-light">PhD Natural Sciences</h2>
                <span className="text-sm text-muted-foreground mt-2 lg:mt-0">Mar 2014 - Nov 2018</span>
              </div>
              <p className="text-lg text-accent font-light mb-4">University of Heidelberg & Bayer Technology Services, Germany</p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Thesis:</strong> Quantitative systems pharmacology (QSP) models of IFN-α signaling in mice and humans
              </p>
              <p className="text-accent mb-4">Cum Laude</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Quantitative systems pharmacology for biologics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Thesis supervisor for two master theses: Deterministic Modeling and PBPK Modeling</span>
                </li>
              </ul>
            </div>

            {/* Entrepreneurship */}
            <div className="border-l-2 border-muted pl-8 pb-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                <h2 className="text-2xl md:text-3xl font-light">Entrepreneur</h2>
                <span className="text-sm text-muted-foreground mt-2 lg:mt-0">May 2016 - Oct 2018</span>
              </div>
              <p className="text-lg text-accent font-light mb-4">meHealthX, Berlin, Germany</p>
              <p className="text-muted-foreground">
                Explored blockchain technology applications in healthcare, bridging technology and medicine during doctoral studies.
              </p>
            </div>

            {/* Early Research */}
            <div className="border-l-2 border-muted pl-8">
              <h3 className="text-xl font-light mb-6 text-foreground">Early Research Experience</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                    <h4 className="font-light">Internship - KeyPathwayMiner Tool Development</h4>
                    <span className="text-sm text-muted-foreground">Oct 2012 - Dec 2012</span>
                  </div>
                  <p className="text-sm text-accent">Max Planck Institute of Informatics</p>
                </div>

                <div>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                    <h4 className="font-light">Project Trainee - Systems Biology</h4>
                    <span className="text-sm text-muted-foreground">Dec 2010 - May 2011</span>
                  </div>
                  <p className="text-sm text-accent">Indian Institute of Technology, Mumbai, India</p>
                  <p className="text-sm text-muted-foreground mt-1">Systems level analysis of osmotic effect on the growth of Saccharomyces Cerevisiae</p>
                </div>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-24 pt-16 border-t">
            <h2 className="text-4xl md:text-5xl font-light mb-12 tracking-tight">Education</h2>
            
            <div className="space-y-10">
              <div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                  <h3 className="text-2xl font-light">PhD Natural Sciences</h3>
                  <span className="text-sm text-muted-foreground">2014 - 2018</span>
                </div>
                <p className="text-accent mb-2">University of Heidelberg, Germany</p>
                <p className="text-muted-foreground mb-1">Thesis: Quantitative systems pharmacology (QSP) models of IFN-α signaling in mice and humans</p>
                <p className="text-accent">Cum Laude</p>
              </div>

              <div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                  <h3 className="text-2xl font-light">Masters in Systems Biology</h3>
                  <span className="text-sm text-muted-foreground">2011 - 2013</span>
                </div>
                <p className="text-accent mb-2">University of Heidelberg, Germany</p>
                <p className="text-muted-foreground mb-1">Thesis: Establishing whole body IFN-α signaling model</p>
                <p className="text-muted-foreground">GPA: 1.7</p>
              </div>

              <div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                  <h3 className="text-2xl font-light">Bachelor of Technology in Bioinformatics</h3>
                  <span className="text-sm text-muted-foreground">2006 - 2010</span>
                </div>
                <p className="text-accent mb-2">D.Y. Patil Institute of Bioinformatics and Biotechnology, India</p>
                <p className="text-muted-foreground mb-1">Thesis: Modeling of Cyanobacteria Ammonium metabolism pathway</p>
                <p className="text-muted-foreground">73%</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-24 text-center">
            <Button 
              asChild
              size="lg"
              className="bg-accent text-white hover:bg-accent/90"
            >
              <Link to="/">
                <Coffee className="h-5 w-5 mr-2" />
                Connect With Me
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 border-t">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Priyata • State of Being
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Career;
