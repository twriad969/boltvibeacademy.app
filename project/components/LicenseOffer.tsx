'use client';

import { cn } from '@/lib/utils';
import { Key } from 'lucide-react';

export function LicenseOffer() {
  return (
    <section className="relative bg-[#0A2463] py-8 md:py-12 overflow-hidden rounded-2xl mx-3 sm:mx-4 lg:mx-6 my-4">
      {/* Grid lines */}
      <div className="absolute inset-0 w-full rounded-2xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={`h-${i}`} 
            className="absolute w-full border-t border-white/10" 
            style={{ top: `${(i + 1) * 16.67}%` }}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 h-full grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 opacity-20 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`v-${i}`} className={cn(
            "border-r border-white/10 h-full",
            i >= 4 && i < 6 ? "hidden md:block" : "",
            i >= 6 ? "hidden lg:block" : ""
          )} />
        ))}
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
      <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-green-400 opacity-20 blur-3xl"></div>
      
      <div className="container relative z-10 mx-auto max-w-2xl px-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="mb-2 sm:mb-0 flex-shrink-0">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center shadow-lg shadow-green-400/30 transform rotate-3 transition-transform duration-300 hover:rotate-0">
              <Key className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <div className="space-y-3 text-center sm:text-left">
            <h2 className="font-hind-siliguri text-xl sm:text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-300">
              ১ বছরের জন্য ফ্রি n8n লাইসেন্স!
            </h2>
            
            <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <p className="font-hind-siliguri text-sm sm:text-base text-white/90 leading-relaxed">
                কোর্সে এনরোল করলেই পাচ্ছেন n8n প্রো প্ল্যানের ১ বছরের জন্য ফ্রি লাইসেন্স কী যার মূল্য <span className="font-bold text-green-300">২০ ডলার প্রতি মাসে</span>। 
                আমাদের সুপারফাস্ট সার্ভারে n8n প্রো প্ল্যান সম্পূর্ণ বিনামূল্যে ব্যবহার করুন ১ বছর।
                <span className="block mt-2 font-semibold text-blue-300">এই অফার শুধুমাত্র সীমিত সময়ের জন্য উপলব্ধ!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
