import { useRef, useState } from 'react';
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
}

export const AudioPlayer = ({ audioUrl, title }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="mt-3">
      <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
      <Button
        onClick={togglePlay}
        size="sm"
        variant="outline"
        className="w-full"
      >
        {isPlaying ? (
          <>
            <Pause className="h-3.5 w-3.5 mr-2" />
            Pause
          </>
        ) : (
          <>
            <Play className="h-3.5 w-3.5 mr-2" />
            Play
          </>
        )}
      </Button>
    </div>
  );
};
