'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface YouTubeEmbedProps {
  videoId: string;
  className?: string;
  title?: string;
}

export function YouTubeEmbed({
  videoId,
  className,
  title = 'YouTube video player',
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-xl shadow-lg transition-all',
        className
      )}
      style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
    >
      {isLoaded && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute left-0 top-0 h-full w-full border-0"
          onLoad={() => setIsLoaded(true)}
        />
      )}
      {!isLoaded && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-muted">
          <span className="text-muted-foreground">Loading video...</span>
        </div>
      )}
    </div>
  );
}
