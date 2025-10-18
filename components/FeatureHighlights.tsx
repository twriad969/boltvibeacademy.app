'use client';

import React from 'react';
import GridBackground from '@/components/ui/grid-background';
import { CheckCircle, Sparkles, CreditCard, Headphones } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle className="h-6 w-6 text-[#5D28E0]" />,
    title: 'লাইফটাইম এক্সেস',
    description: 'আমাদের কোর্সে আপনি পাবেন লাইফটাইম এক্সেস, এবং ফ্রি আপডেট।',
  },
  {
    icon: <Sparkles className="h-6 w-6 text-[#5D28E0]" />,
    title: '১০০% মানি ব্যাক গ্যারান্টি',
    description:
      'আপনি যদি আমাদের কোর্স থেকে যথেষ্ট ভ্যালু না পান, তাহলে ১০০% টাকা ফেরত পাবেন।',
  },
  {
    icon: <CreditCard className="h-6 w-6 text-[#5D28E0]" />,
    title: 'সিকিউর পেমেন্ট',
    description:
      'আমরা Bkash Live পেমেন্ট প্রসেস করি, তাই আপনি ১০০% সিকিউর ভাবে পেমেন্ট করতে পারবেন।',
  },
  {
    icon: <Headphones className="h-6 w-6 text-[#5D28E0]" />,
    title: 'ডেডিকেটেড সাপোর্ট',
    description:
      'আমাদের কোর্সে আপনি পাবেন ডেডিকেটেড সাপোর্ট, একজন একাউন্ট ম্যানেজার আপনাকে প্রতি স্টেপ পার্সোনালি হেল্প করবে।',
  },
];

export function FeatureHighlights() {
  return (
    <section className="relative py-12 md:py-16 bg-[#f5f7ff] overflow-hidden">
      {/* Grid Background */}
      <GridBackground />
      {/* Additional overlay to make grid more subtle */}
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>
      
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-hind-siliguri mb-3 text-2xl font-bold md:text-3xl text-[#0a2463]">
            আমাদের কোর্সের বিশেষ সুবিধাসমূহ
          </h2>
          <p className="font-hind-siliguri mx-auto max-w-2xl text-sm text-slate-600">
            আমরা আপনাকে সেরা অভিজ্ঞতা দেওয়ার জন্য নিম্নলিখিত সুবিধাগুলো নিশ্চিত করি
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-[#5D28E0]/20 group"
            >
              <div className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#5D28E0]/10 group-hover:bg-[#5D28E0]/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-hind-siliguri mb-3 text-lg font-bold text-[#0a2463] group-hover:text-[#5D28E0] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="font-hind-siliguri text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
