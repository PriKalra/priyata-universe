import { ExternalLink, Mic, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "./AudioPlayer";
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
}

interface ImmersiveContentCardProps {
  item: ContentItem;
  layout?: 'full' | 'card' | 'minimal';
}

export const ImmersiveContentCard = ({ 
  item, 
  layout = 'card' 
}: ImmersiveContentCardProps) => {
  
  // Full-bleed layout for featured content
  if (layout === 'full' && item.image) {
    return (
      <ScrollReveal direction="scale">
        <div className="relative w-full min-h-[80vh] flex items-end">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 w-full max-w-4xl mx-auto p-8 md:p-12 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                {item.type === 'audio' ? (
                  <>
                    <Mic className="h-3 w-3 mr-1" />
                    Audio Post
                  </>
                ) : item.type === 'image' ? (
                  <>
                    <ImageIcon className="h-3 w-3 mr-1" />
                    Visual
                  </>
                ) : (
                  'Article'
                )}
              </Badge>
              {item.audioLength && (
                <span className="text-sm text-white/80">{item.audioLength}</span>
              )}
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight">
              {item.title}
            </h2>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              {item.excerpt}
            </p>

            {item.type === 'audio' && item.audioUrl && (
              <div className="max-w-md mb-6">
                <AudioPlayer audioUrl={item.audioUrl} title={item.title} />
              </div>
            )}

            <a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white hover:text-accent transition-colors text-lg group"
            >
              {item.type === 'audio' ? 'Listen on Buy Me a Coffee' : 'Read Full Article'}
              <ExternalLink className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </ScrollReveal>
    );
  }

  // Minimal layout for inline content
  if (layout === 'minimal') {
    return (
      <ScrollReveal direction="up">
        <div className="py-8 border-b border-border last:border-0">
          <div className="flex items-start justify-between gap-6">
            {item.image && (
              <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {item.source}
                </Badge>
                {item.type === 'audio' && item.audioLength && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Mic className="h-3 w-3" />
                    {item.audioLength}
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-light mb-2 leading-tight">
                {item.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {item.excerpt}
              </p>

              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-accent transition-colors inline-flex items-center group"
              >
                {item.type === 'audio' ? 'Listen' : 'Read'}
                <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {item.type === 'audio' && item.audioUrl && layout === 'minimal' && (
            <div className="mt-4 max-w-md">
              <AudioPlayer audioUrl={item.audioUrl} title={item.title} />
            </div>
          )}
        </div>
      </ScrollReveal>
    );
  }

  // Default card layout (enhanced version of ContentCard)
  return (
    <ScrollReveal direction="scale">
      <Card className="group relative bg-card border hover-lift overflow-hidden">
        {item.image && (
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {item.type === 'audio' && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-white/90 text-zinc-900 border-0 backdrop-blur-sm">
                  <Mic className="h-3 w-3 mr-1" />
                  Audio
                </Badge>
              </div>
            )}
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="text-xs font-normal">
              {item.source}
            </Badge>
            {item.type === 'audio' && item.audioLength && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Mic className="h-3 w-3" />
                {item.audioLength}
              </div>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-light mb-3 leading-tight">
            {item.title}
          </h3>
          
          <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
            {item.excerpt}
          </p>

          {item.type === 'audio' && item.audioUrl && (
            <AudioPlayer audioUrl={item.audioUrl} title={item.title} />
          )}

          <div className="flex items-center justify-between pt-6 border-t mt-6">
            <a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-accent transition-colors inline-flex items-center group/link"
            >
              {item.type === 'audio' ? 'Listen on Buy Me a Coffee' : 'Read More'}
              <ExternalLink className="h-3.5 w-3.5 ml-2 transition-transform group-hover/link:translate-x-0.5" />
            </a>
          </div>
        </div>
      </Card>
    </ScrollReveal>
  );
};