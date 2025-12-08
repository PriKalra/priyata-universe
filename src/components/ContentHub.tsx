import { ExternalLink, Mic, Image as ImageIcon, FileText, ArrowRight, Coffee, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./ScrollReveal";

interface ContentItem {
  type: string;
  title: string;
  excerpt: string;
  link: string;
  source: string;
  date: string;
  audioLength?: string;
  audioUrl?: string;
  image?: string;
  views?: number;
}

interface ContentHubProps {
  audioContent: ContentItem[];
  blogPosts: ContentItem[];
  visualContent: ContentItem[];
}

const ContentSourceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  href, 
  color 
}: { 
  icon: typeof Coffee; 
  title: string; 
  description: string; 
  href: string; 
  color: string;
}) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group block"
  >
    <Card className={`p-6 h-full border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 ${color}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-foreground/5 group-hover:bg-accent/10 transition-colors">
          <Icon className="h-6 w-6 text-foreground group-hover:text-accent transition-colors" />
        </div>
        <div>
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-accent transition-colors">
        Visit {title}
        <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Card>
  </a>
);

const ContentListItem = ({ item }: { item: ContentItem }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'audio': return Mic;
      case 'image': return ImageIcon;
      default: return FileText;
    }
  };
  const Icon = getIcon();

  return (
    <a 
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border"
    >
      {item.image ? (
        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          <img 
            src={item.image} 
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-muted/50 flex items-center justify-center">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="secondary" className="text-xs">
            {item.source}
          </Badge>
          {item.audioLength && (
            <span className="text-xs text-muted-foreground">{item.audioLength}</span>
          )}
        </div>
        
        <h4 className="text-base font-medium leading-snug mb-1 group-hover:text-accent transition-colors line-clamp-2">
          {item.title}
        </h4>
        
        <p className="text-sm text-muted-foreground line-clamp-1">
          {item.excerpt}
        </p>
      </div>
      
      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-all group-hover:translate-x-1 flex-shrink-0 mt-2" />
    </a>
  );
};

export const ContentHub = ({ audioContent, blogPosts, visualContent }: ContentHubProps) => {
  return (
    <section id="content" className="py-24 md:py-32 bg-muted/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
              Explore My Content
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover audio posts, blog articles, and visual reflections across platforms
            </p>
          </div>
        </ScrollReveal>

        {/* Content Source Cards */}
        <ScrollReveal direction="up" delay={100}>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <ContentSourceCard 
              icon={Coffee}
              title="Buy Me a Coffee"
              description="Audio posts, visual art, and exclusive content"
              href="https://buymeacoffee.com/priyata"
              color="bg-card"
            />
            <ContentSourceCard 
              icon={Mail}
              title="Hey World Blog"
              description="Long-form writing on science, philosophy, and life"
              href="https://world.hey.com/priyata"
              color="bg-card"
            />
          </div>
        </ScrollReveal>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Audio Content */}
          {audioContent.length > 0 && (
            <ScrollReveal direction="left" delay={150}>
              <div className="bg-card rounded-2xl border p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Mic className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-2xl font-light">Audio Posts</h3>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <a href="https://buymeacoffee.com/priyata" target="_blank" rel="noopener noreferrer">
                      View All
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {audioContent.slice(0, 4).map((item, index) => (
                    <ContentListItem key={index} item={item} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Blog Posts */}
          {blogPosts.length > 0 && (
            <ScrollReveal direction="right" delay={150}>
              <div className="bg-card rounded-2xl border p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-2xl font-light">Blog Posts</h3>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <a href="https://world.hey.com/priyata" target="_blank" rel="noopener noreferrer">
                      View All
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {blogPosts.slice(0, 4).map((item, index) => (
                    <ContentListItem key={index} item={item} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Visual Content Row */}
        {visualContent.length > 0 && (
          <ScrollReveal direction="up" delay={200}>
            <div className="mt-8 bg-card rounded-2xl border p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <ImageIcon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-2xl font-light">Visual Reflections</h3>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <a href="https://buymeacoffee.com/priyata" target="_blank" rel="noopener noreferrer">
                    View All
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visualContent.slice(0, 3).map((item, index) => (
                  <a 
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square rounded-xl overflow-hidden"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div>
                        <h4 className="text-white font-medium mb-1 line-clamp-2">{item.title}</h4>
                        <span className="text-white/80 text-sm flex items-center gap-1">
                          View on Buy Me a Coffee
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};
