'use client';

import { useEffect, useRef, useState } from 'react';
// import dynamic from 'next/dynamic'; // Removed dynamic import
import { ChevronDown } from 'lucide-react';
import GridBackground from '@/components/ui/grid-background';
import { Button } from '@/components/ui/button';
import 'plyr/dist/plyr.css'; // ✅ Import Plyr styles
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RotatingText from '@/component/RotatingText/RotatingText';

// Removed dynamic import for Plyr

export function HeroSection() {
  const playerRef = useRef<HTMLIFrameElement | null>(null);
  // const [PlyrComponent, setPlyrComponent] = useState<any>(null); // Removed useState
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (playerRef.current) {
      // Ensure Plyr is only initialized on the client-side
      if (typeof window !== 'undefined') {
        import('plyr').then((mod) => {
          const Plyr = mod.default;
          const player = new Plyr(playerRef.current!, {
            autoplay: true,
            muted: false, // try with sound
            controls: ['play', 'progress', 'mute', 'volume', 'fullscreen'],
          });

          // Try forcing sound on autoplay
          player.once('ready', () => {
            player.muted = false;
            player.play()?.catch(() => {
              console.warn('⚠️ Browser blocked autoplay with sound');
            });
          });
        });
      }
    }
  }, []); // Removed PlyrComponent from dependency array

  // Removed the extra useEffect for PlyrComponent

  return (
    <section className="relative overflow-hidden bg-[#f5f7ff]">
      <GridBackground />
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>

      {/* Navbar */}
      <header className="relative z-50 py-4">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="font-hind-siliguri text-2xl font-bold tracking-tight text-[#0a2463]">
              VIBE TECH
            </h2>
            {/* Desktop login button */}
            <a href="/course-area" className="hidden md:block">
              <Button
                variant="outline"
                className="font-hind-siliguri border-[#5D28E0] text-[#5D28E0] hover:bg-[#5D28E0]/10 py-2 px-4 rounded-lg text-base transition-all duration-300"
              >
                লগইন
              </Button>
            </a>
            {/* Mobile menu button */}
            <div className="md:hidden relative">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <a href="/course-area" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    লগইন
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Removed Mobile menu overlay */}

      <main className="relative z-10 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-4xl">
              <h2 className="font-hind-siliguri mb-3 text-xl font-medium text-gray-700 md:text-2xl">
                একটা নতুন স্কিল শিখতে চান?
              </h2>

              <h1 className="font-hind-siliguri mb-6 text-3xl font-bold text-[#0a2463] md:text-4xl lg:text-5xl">
                এআই অটোমেশন শিখে{' '}
                <RotatingText
                  texts={["ফ্রিল্যান্সিং", "ব্যবসা", "চাকরি"]}
                  className="inline-block text-white bg-[hsl(252,100%,58%)] px-2 py-1 rounded-md"
                  mainClassName="inline-block text-white bg-[hsl(252,100%,58%)] px-2 py-1 rounded-md"
                  elementLevelClassName="inline-block"
                />{' '}
                সব হবে একসাথে
              </h1>

              <p className="font-hind-siliguri mb-8 text-gray-600">
                এবং বেস্ট সাপোর্ট নিয়ে আমাদের AI অটোমেশন কোর্স
              </p>
            </div>

            <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-gray-200 shadow-xl">
              <iframe
                ref={playerRef}
                className="aspect-video w-full"
                src="https://www.youtube.com/embed/hkfT84lueuQ?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>

            {/* Course Stats Bar */}
            <div className="mt-6 w-full max-w-4xl">
              <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4">
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-yellow-500">★</span>
                      <span className="text-yellow-500">★</span>
                      <span className="text-yellow-500">★</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                    <a href="#reviews" className="font-medium text-[#5D28E0] hover:text-[#4A20B5] transition-colors cursor-pointer">
                      Reviews
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="font-medium">67 Lessons</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">40+ hours</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <span className="font-medium">1:1 Live Support</span>
                  </div>

                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href="#checkout" className="relative group">
                  <div className="absolute inset-0 rounded-lg bg-[#5D28E0] translate-y-[3px]"></div>
                  <div className="absolute inset-0 rounded-lg bg-red-500/30 translate-y-[6px]"></div>
                  <Button className="font-hind-siliguri relative bg-[#5D28E0] hover:bg-[#4A20B5] hover:translate-y-1 text-white py-5 px-10 rounded-lg text-xl font-semibold transition-all duration-300 min-w-[300px]">
                    এখনই এনরোল করুন
                  </Button>
                </a>
              </div>

              <div className="flex flex-col items-center animate-bounce">
                <p className="font-hind-siliguri text-gray-600 mb-2">
                  আরও দেখতে স্ক্রল করুন
                </p>
                <ChevronDown className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}