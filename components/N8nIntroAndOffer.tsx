'use client';

import { Key } from 'lucide-react';
import GridBackground from '@/components/ui/grid-background';

export function N8nIntroAndOffer() {
  return (
    <section className="relative bg-[#f5f7ff] py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Grid Background */}
      <GridBackground />
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>
      
      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md border-2 border-gray-200/80 overflow-hidden">
          
          {/* License Offer Section */}
          <div className="p-8 md:p-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-[#5D28E0]/10 flex items-center justify-center">
                  <Key className="h-6 w-6 text-[#5D28E0]" />
                </div>
              </div>
              
              <div className="space-y-4 text-center sm:text-left">
                <h2 className="font-hind-siliguri text-xl sm:text-2xl font-bold text-[#0a2463]">
                  <span className="font-bold">৩</span> বছরের জন্য ফ্রি n8n লাইসেন্স!
                </h2>
                
                <p className="font-hind-siliguri text-base sm:text-lg text-slate-600 leading-relaxed">
                  কোর্সে এনরোল করলেই পাচ্ছেন n8n প্রো প্ল্যানের <span className="font-bold">৩</span> বছরের জন্য ফ্রি লাইসেন্স কী যার মূল্য 
                  <span className="font-bold text-[#5D28E0]"> ২০ ডলার প্রতি মাসে</span>। 
                  n8n প্রো প্ল্যান সম্পূর্ণ বিনামূল্যে ব্যবহার করুন <span className="font-bold">৩</span> বছর।
                </p>
                
                <div className="inline-block bg-[#5D28E0]/5 text-[#5D28E0] px-4 py-2 rounded-lg font-medium text-sm">
                  <span className="font-hind-siliguri">এই অফার শুধুমাত্র সীমিত সময়ের জন্য উপলব্ধ!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}