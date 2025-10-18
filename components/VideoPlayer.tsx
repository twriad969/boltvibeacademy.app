'use client';

import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export function VideoPlayer({ src, className }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={cn('relative group', className)}>
      <video
        ref={videoRef}
        className="w-full h-full rounded-xl"
        src={src}
        onEnded={() => setIsPlaying(false)}
      >
        Your browser does not support the video tag.
      </video>
      <button
        onClick={togglePlay}
        className={cn(
          'absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-200',
          isPlaying ? 'opacity-0' : 'opacity-100 group-hover:opacity-100'
        )}
      >
        {isPlaying ? (
          <Pause className="w-16 h-16 text-white" />
        ) : (
          <Play className="w-16 h-16 text-white" />
        )}
      </button>
    </div>
  );
}
