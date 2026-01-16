import { ExternalLink, Mic, Image as ImageIcon, FileText, ArrowRight, Coffee, Mail, Calendar, Clock, Loader2 } from "lucide-react";
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
  loading?: boolean;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 7) {
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  }
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
};

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
    <Card className={`p-4 sm:p-6 h-full border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 ${color}`}>
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="p-2 sm:p-3 rounded-xl bg-foreground/5 group-hover:bg-accent/10 transition-colors flex-shrink-0">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground group-hover:text-accent transition-colors" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-medium truncate">{title}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground group-hover:text-accent transition-colors">
        Visit {title}
        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
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
      className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border"
    >
      {item.image ? (
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          <img 
            src={item.image} 
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg bg-muted/50 flex items-center justify-center">
          <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
          <Badge variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
            {item.source}
          </Badge>
          {item.date && (
            <span className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              {formatDate(item.date)}
            </span>
          )}
          {item.audioLength && (
            <span className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              {item.audioLength}
            </span>
          )}
        </div>
        
        <h4 className="text-sm sm:text-base font-medium leading-snug mb-1 group-hover:text-accent transition-colors line-clamp-2">
          {item.title}
        </h4>
        
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 sm:line-clamp-2">
          {item.excerpt}
        </p>
      </div>
      
      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-accent transition-all group-hover:translate-x-1 flex-shrink-0 mt-1 sm:mt-2 hidden sm:block" />
    </a>
  );
};

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-start gap-4 p-4">
        <div className="w-20 h-20 rounded-lg bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="h-5 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export const ContentHub = ({ audioContent, blogPosts, visualContent, loading = false }: ContentHubProps) => {
  const allContent = [...audioContent, ...blogPosts, ...visualContent];
  const hasContent = allContent.length > 0;

  return (
    <section id="content" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <ScrollReveal direction="up">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 tracking-tight">
              Latest Content
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl sm:max-w-2xl mx-auto px-2">
              Audio posts, blog articles, and visual reflections across platforms
            </p>
          </div>
        </ScrollReveal>

        {/* Content Source Cards - stacked on mobile */}
        <ScrollReveal direction="up" delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
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

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="ml-3 text-muted-foreground">Loading latest content...</span>
          </div>
        )}

        {!loading && !hasContent && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No content available at the moment.</p>
          </div>
        )}

        {!loading && hasContent && (
          <>
            {/* Content Grid - single column on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* Audio Content */}
              {audioContent.length > 0 && (
                <ScrollReveal direction="left" delay={150}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                          <Mic className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-light">Audio Posts</h3>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs sm:text-sm">
                        <a href="https://buymeacoffee.com/priyata" target="_blank" rel="noopener noreferrer">
                          All
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                        </a>
                      </Button>
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
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
                  <div className="bg-card rounded-xl sm:rounded-2xl border p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                          <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-light">Blog Posts</h3>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs sm:text-sm">
                        <a href="https://world.hey.com/priyata" target="_blank" rel="noopener noreferrer">
                          All
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                        </a>
                      </Button>
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
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
                <div className="mt-4 sm:mt-6 lg:mt-8 bg-card rounded-xl sm:rounded-2xl border p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                        <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-light">Visual Reflections</h3>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs sm:text-sm">
                      <a href="https://buymeacoffee.com/priyata" target="_blank" rel="noopener noreferrer">
                        All
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                      </a>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                    {visualContent.slice(0, 3).map((item, index) => (
                      <a 
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-square rounded-lg sm:rounded-xl overflow-hidden"
                      >
                        <img 
                          src={item.image} 
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-end p-2 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div>
                            <h4 className="text-white text-xs sm:text-sm font-medium mb-0.5 sm:mb-1 line-clamp-2">{item.title}</h4>
                            <span className="text-white/80 text-[10px] sm:text-xs flex items-center gap-1">
                              View
                              <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            </span>
                          </div>
                        </div>
                        {/* Always visible date badge on mobile */}
                        <div className="absolute top-2 left-2 sm:hidden">
                          <Badge variant="secondary" className="text-[8px] px-1 py-0.5 bg-black/50 text-white border-0">
                            {formatDate(item.date)}
                          </Badge>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </>
        )}
      </div>
    </section>
  );
};