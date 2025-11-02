import { ExternalLink, Mic } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface ContentCardProps {
  item: ContentItem;
}

export const ContentCard = ({ item }: ContentCardProps) => {
  const isLarge = item.size === "large";
  const isMedium = item.size === "medium";
  
  const aspectRatioClass = isLarge 
    ? "aspect-[16/9]" 
    : isMedium 
    ? "aspect-[4/3]" 
    : "aspect-[4/3]";
  
  return (
    <Card
      className={`group relative bg-card border hover-lift ${
        isLarge ? "md:col-span-2 md:row-span-2" : 
        isMedium ? "md:col-span-2" : ""
      }`}
    >
      <div className="p-6 md:p-8 h-full flex flex-col">
        {item.image && (
          <div className={`relative w-full ${aspectRatioClass} mb-4 overflow-hidden rounded-lg bg-muted`}>
            <img 
              src={item.image} 
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
        
        <div className="flex items-center justify-between mb-4">
          {!(item.type === "audio" && item.image) && (
            <Badge variant="secondary" className="text-xs font-normal">
              {item.source}
            </Badge>
          )}
          {item.type === "audio" && item.audioLength && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mic className="h-3 w-3" />
              {item.audioLength}
            </div>
          )}
        </div>

        <h3 className={`${isLarge ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-light mb-3 leading-tight`}>
          {item.title}
        </h3>
        
        <p className="text-sm md:text-base text-muted-foreground mb-6 flex-grow leading-relaxed">
          {item.excerpt}
        </p>

        <div className="flex items-center justify-between pt-6 border-t">
          <a 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-accent transition-colors inline-flex items-center group/link"
          >
            {item.type === "audio" ? "Listen on Buy Me a Coffee" : "Read More"}
            <ExternalLink className="h-3.5 w-3.5 ml-2 transition-transform group-hover/link:translate-x-0.5" />
          </a>
          {item.views && (
            <span className="text-xs text-muted-foreground">
              {item.views} views
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
