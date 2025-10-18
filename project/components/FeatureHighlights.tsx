'use client';

import { cn } from '@/lib/utils';

export function FeatureHighlights() {
  return (
    <section className="relative bg-cover bg-center py-8 md:py-12 overflow-hidden rounded-2xl mx-3 sm:mx-4 lg:mx-6 my-4" style={{ backgroundImage: "url('/bg-feature-highlights.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-30 rounded-2xl"></div>
      
      <div className="container relative z-10 mx-auto max-w-2xl px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-hind-siliguri text-xl sm:text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-red-300">
            বৈশিষ্ট্য হাইলাইটস
          </h2>
          
          <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm mt-4">
            <p className="font-hind-siliguri text-sm sm:text-base text-white/90 leading-relaxed">
              আমাদের প্ল্যাটফর্মের বিশেষ বৈশিষ্ট্যগুলি আবিষ্কার করুন যা আপনার কাজকে আরও সহজ এবং কার্যকর করে তোলে। 
              <span className="block mt-2 font-semibold text-blue-300">এটি আপনার সাফল্যের জন্য একটি গুরুত্বপূর্ণ পদক্ষেপ!</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
