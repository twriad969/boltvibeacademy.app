'use client';

import React from 'react';
import GridBackground from '@/components/ui/grid-background';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

// Minimal, clear, and respectful: Student reviews screenshot gallery.
// Mobile: touchable slider. Desktop: 4 images side by side (no slider).
export default function ReviewsByStudent() {
  const images = ['/5.webp', '/1.webp', '/2.webp', '/3.webp', '/4.webp'];
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loadedImages, setLoadedImages] = React.useState<Record<number, boolean>>({});

  // Handle image loading
  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({
      ...prev,
      [index]: true
    }));
  };

  // Keep track of current slide for dot indicators
  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section id="reviews" className="relative py-12 md:py-16 bg-[#f5f7ff] overflow-hidden">
      {/* Background grid to match existing design */}
      <GridBackground />
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-hind-siliguri text-2xl md:text-3xl font-bold text-[#0a2463]">
            শিক্ষার্থীদের রিভিউ
          </h2>
          {/* Note: real screenshots and community reassurance copy */}
          <p className="font-hind-siliguri mx-auto max-w-1xl text-base md:text-lg text-slate-600 mt-2">
  এগুলো আমাদের কমিউনিটি গ্রুপ থেকে নেওয়া স্ক্রিনশট। এখানে সবাই একে অপরের সাথে কাজ আর 
  সমস্যাগুলো শেয়ার করে। আমাদের কমিউনিটিতে 800+ মেম্বার আছে, আর কোর্সে এনরোল করলেই 
  পেয়ে যাবেন ইন্সট্যান্ট কমিউনিটি অ্যাক্সেস। কমিউনিটি বাদেও, ইন্ডিভিজুয়াল সাপোর্ট তো আছেই।
          </p>
        </div>

        {/* Mobile: slider */}
        <div className="sm:hidden">
          <Carousel
            setApi={setApi}
            opts={{ dragFree: true, containScroll: 'trimSnaps' }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((src, idx) => (
                <CarouselItem key={idx} className="basis-full">
                  <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm relative aspect-[4/3]">
                    {!loadedImages[idx] && (
                      <Skeleton className="absolute inset-0 w-full h-full bg-[#5D28E0]/20" />
                    )}
                    <Image
                      src={src}
                      alt={`Student review ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className={`object-cover select-none transition-opacity duration-300 ${
                        loadedImages[idx] ? 'opacity-100' : 'opacity-0'
                      }`}
                      draggable={false}
                      loading={idx < 2 ? "eager" : "lazy"}
                      priority={idx < 2}
                      onLoad={() => handleImageLoad(idx)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12" />
            <CarouselNext className="-right-4 md:-right-12" />
          </Carousel>
          {/* Simple pagination dots for mobile slider */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to review ${idx + 1}`}
                onClick={() => api?.scrollTo(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  currentIndex === idx ? 'bg-[#5D28E0]' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: larger 2x2 grid (no slider) */}
        <div className="hidden sm:grid grid-cols-2 gap-4">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm relative aspect-[4/3]"
            >
              {!loadedImages[idx] && (
                <Skeleton className="absolute inset-0 w-full h-full bg-[#5D28E0]/20" />
              )}
              <Image
                src={src}
                alt={`Student review ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className={`object-cover select-none transition-opacity duration-300 ${
                  loadedImages[idx] ? 'opacity-100' : 'opacity-0'
                }`}
                draggable={false}
                loading="lazy"
                onLoad={() => handleImageLoad(idx)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

