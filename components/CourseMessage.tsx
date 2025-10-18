'use client';

import { cn } from '@/lib/utils';
import { Sparkles, ShieldCheck } from 'lucide-react';
import GridBackground from '@/components/ui/grid-background';

export function CourseMessage() {
  return (
    <section
      className="relative bg-[#f5f7ff] py-12 md:py-16 overflow-hidden"
    >
      {/* Grid Background */}
      <GridBackground />
      {/* Additional overlay to make grid more subtle */}
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>

      <div className="container relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="mb-3 sm:mb-0 flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-[#5D28E0]/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-[#5D28E0]" />
                </div>
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <h2 className="font-hind-siliguri text-xl sm:text-2xl font-bold text-[#0a2463]">
                  ১০০% রিফান্ড গ্যারান্টি
                </h2>

                <p className="font-hind-siliguri text-sm sm:text-base text-slate-600 leading-relaxed">
                  আপনি যদি সবগুলো লেসন দেখার পরেও মনে করেন এই কোর্স থেকে আপনি কোনো ভ্যালু পাননি — তাহলে আমরা আপনার ১০০% টাকা রিফান্ড করে দেব। আমরা বিশ্বাস করি আপনার সময় এবং বিনিয়োগ মূল্যবান, তাই আপনার সন্তুষ্টি আমাদের প্রথম অগ্রাধিকার।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
