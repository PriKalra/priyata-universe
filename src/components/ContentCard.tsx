import { ExternalLink, Mic } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "./AudioPlayer";

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
  
  return (
    <Card
      className={`group relative bg-card border hover-lift ${
        isLarge ? "md:col-span-2 md:row-span-2" : 
        isMedium ? "md:col-span-2" : ""
      }`}
    >
      <div className="p-8 md:p-10 h-full flex flex-col">
        {item.type === "audio" && item.image && (
          <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-lg bg-muted">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="text-xs font-normal">
            {item.source}
          </Badge>
          {item.type === "audio" && (
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

        {item.type === "audio" && item.audioUrl && (
          <AudioPlayer audioUrl={item.audioUrl} title={item.title} />
        )}

        <div className="flex items-center justify-between mt-6 pt-6 border-t">
          <a 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-accent transition-colors inline-flex items-center group/link"
          >
            {item.type === "audio" ? "Listen" : "Read"}
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
