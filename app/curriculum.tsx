'use client';

import GridBackground from '@/components/ui/grid-background';
import { Button } from '@/components/ui/button';

// Triangle icon component to match the design
const TriangleIcon = () => (
  <span className="text-[#5D28E0] text-lg font-bold">▲</span>
);

export default function Curriculum() {
  // Shortened AI automation learning outcomes
  const learningOutcomes = [
    'লোকাল মার্কেটে ওয়ার্কফ্লো বানিয়ে মাসিক সার্ভিস বিক্রি করার স্ট্র্যাটেজি শিখবেন',
    'AI এজেন্ট ও অটোমেশন দিয়ে কাজ ১০ গুণ দ্রুত করতে পারবেন',
    'নিজের কাজ অটোমেট করে সময় ও শ্রম বাঁচাতে পারবেন',
    'AI দিয়ে কনটেন্ট লেখা ও কাস্টমার সাপোর্ট অটোমেট করবেন',
    'ফাইভারে AI অটোমেশন সার্ভিস দিয়ে আয় করতে পারবেন',
    'কাস্টম AI ওয়ার্কফ্লো ডিজাইন করে ক্লায়েন্ট সার্ভিস দিবেন',
    'ভালো ক্লায়েন্ট খুঁজে তাদের কাছে সার্ভিস বিক্রির কৌশল শিখবেন',
  ];
  

  return (
    <section className="relative bg-[#f5f7ff] py-16 md:py-24 overflow-hidden">
      {/* Grid Background */}
      <GridBackground />
      {/* Additional overlay to make grid more subtle */}
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>
      
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-hind-siliguri text-3xl font-bold tracking-tight text-[#0a2463] sm:text-4xl md:text-5xl">
          কোর্সটি থেকে যা যা শিখতে পারবেন
          </h2>
          <p className="font-hind-siliguri mx-auto mt-4 max-w-3xl text-lg text-slate-600">
          এই স্কিল দিয়ে নিজে অটোমেশন করতে পারবেন, ফ্রিল্যান্সিং করতে পারবেন এবং নিজের কাজ সহজ করতে পারবেন। এর ভ্যালু অনেক বেশি, আর সামনে এই স্কিলের চাহিদা আরও অনেক বাড়বে।
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-7 shadow-md border-2 border-gray-200/80">
            <div className="space-y-4">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <TriangleIcon />
                  </div>
                  <p className="font-hind-siliguri text-base font-medium leading-relaxed text-slate-800">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-10">
            <p className="font-hind-siliguri text-base font-medium text-slate-900 mb-6">
              আপনি যদি সবগুলো লেসন দেখার পরেও মনে করেন এই কোর্স থেকে আপনি কোনো ভ্যালু পাননি — তাহলে আমরা আপনার ১০০% টাকা রিফান্ড করে দেব।
            </p>
            
            {/* Enrollment Button */}
            <div className="flex justify-center mt-6">
              <a href="#checkout">
                <Button className="font-hind-siliguri bg-[#5D28E0] hover:bg-[#4A20B5] text-white py-2 px-6 rounded-lg text-lg transition-all duration-300">
                  এখনই এনরোল করুন
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
