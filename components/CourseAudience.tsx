'use client';

import { Users, Briefcase, ShoppingBag, Sparkles, Bot, Zap, Clock, ArrowRight, GraduationCap, BarChart } from 'lucide-react';
import GridBackground from '@/components/ui/grid-background';
import { Button } from '@/components/ui/button';

export function CourseAudience() {
  const audiences = [
    {
      id: 1,
      title: "ফ্রেশার",
      subtitle: "নতুন স্কিল শিখে ক্যারিয়ার শুরু করুন",
      icon: <GraduationCap className="h-5 w-5 text-white" />,
      // উল্লেখ করা হয়েছে লোকাল মার্কেটেও কাজের সুযোগ এবং মাসিক চার্জের সুবিধা
      description: "আপনি যদি একেবারে নতুন হন, তাহলে AI অটোমেশন আপনার জন্য সেরা শুরুর জায়গা হতে পারে। এই স্কিল শেখার জন্য আগের কোনো অভিজ্ঞতা দরকার নেই। আপনি শিখেই লোকাল মার্কেটে ছোট বিজনেসদের জন্য অটোমেশন সেটআপ করে দিতে পারেন, অথবা ফ্রিল্যান্সিং মার্কেটপ্লেসে ক্লায়েন্টদের সার্ভিস দিতে পারেন। এমনকি মাসিক ভিত্তিতে সার্ভিস চার্জ নিয়ে স্থায়ী ইনকামের সুযোগও তৈরি করতে পারেন।",
      benefits: []
    },
    {
      id: 2,
      title: "ফ্রিল্যান্সার",
      subtitle: "AI অটোমেশন সার্ভিস দিয়ে আয় করুন",
      icon: <Users className="h-5 w-5 text-white" />,
      description: "AI অটোমেশন একটি হাই-ডিমান্ড স্কিল যা দিয়ে আপনি বাজারে সহজেই ক্লায়েন্ট পেতে পারবেন এবং ভালো আয় করতে পারবেন। ফাইভার, আপওয়ার্কে AI অটোমেশন সার্ভিস দিয়ে উচ্চ মূল্যে প্রজেক্ট পেতে পারবেন। বর্তমান মার্কেটে AI অটোমেশন স্কিলের চাহিদা বেশি হওয়ায় নিয়মিত ক্লায়েন্ট পাবেন। একবার সেটআপ করে দিলে মাসিক রিকারিং ইনকাম তৈরি করতে পারবেন।",
      benefits: []
    },
    {
      id: 3,
      title: "ডিজিটাল মার্কেটার",
      subtitle: "ক্লায়েন্টদের পেজ ম্যানেজমেন্ট অটোমেট করুন",
      icon: <BarChart className="h-5 w-5 text-white" />,
      // Added: উল্লেখ করা হয়েছে মাসিক আয়ের সুযোগ
      description: "ডিজিটাল মার্কেটিং সার্ভিসে আপনার ক্লায়েন্টদের পেজ ইনবক্স, কমেন্টস ম্যানেজমেন্ট অটোমেট করে অতিরিক্ত চার্জ করতে পারেন। AI এজেন্ট দিয়ে ক্লায়েন্টদের সোশ্যাল মিডিয়া পেজের কমেন্টস, ইনবক্স অটোরিপ্লাই, এবং কাস্টমার সাপোর্ট অটোমেট করে প্রিমিয়াম সার্ভিস হিসেবে অফার করতে পারেন। এতে আপনার ক্লায়েন্টরা সময় বাঁচাবে এবং আপনি অতিরিক্ত আয় করতে পারবেন। মাসিক ভিত্তিতে সার্ভিস দিয়ে নিয়মিত ইনকাম করতে পারবেন।",
      benefits: []
    },
    {
      id: 4,
      title: "ওয়েব ডেভেলপার",
      subtitle: "n8n দিয়ে ব্যাকএন্ড অটোমেশন করুন",
      icon: <Briefcase className="h-5 w-5 text-white" />,
      description: "ওয়েব ডেভেলপাররা n8n ব্যবহার করে সহজেই ব্যাকএন্ড অটোমেশন, API ইন্টিগ্রেশন, ও ডেটা প্রসেসিং করতে পারেন। কোড ছাড়াই বিভিন্ন সার্ভিস কানেক্ট করুন, ওয়ার্কফ্লো তৈরি করুন এবং ক্লায়েন্টের জন্য দ্রুত সলিউশন ডেলিভার করুন। n8n দিয়ে ফর্ম সাবমিশন, ইমেইল অটোমেশন, ডাটাবেস আপডেট, ও আরও অনেক কিছু সহজে করা যায়।",
      benefits: []
    },
    {
      id: 5,
      title: "ই-কমার্স ব্যবসায়ী",
      subtitle: "অর্ডার ও কাস্টমার সাপোর্ট অটোমেট করুন",
      icon: <ShoppingBag className="h-5 w-5 text-white" />,
      description: "অর্ডার প্রসেসিং, ইনভেন্টরি ম্যানেজমেন্ট, এবং কাস্টমার সাপোর্ট অটোমেট করুন। AI এজেন্ট দিয়ে আপনার ই-কমার্স বিজনেস স্কেল করুন। অর্ডার ট্র্যাকিং এবং নোটিফিকেশন সিস্টেম অটোমেট করুন। প্রোডাক্ট ডেটাবেস আপডেট এবং স্টক ম্যানেজমেন্ট সহজে করুন। AI চ্যাটবট দিয়ে কাস্টমার কোয়েরি হ্যান্ডেল করুন।",
      benefits: []
    },
    {
      id: 6,
      title: "এজেন্সি মালিক",
      subtitle: "ক্লায়েন্টদের জন্য অটোমেশন সলিউশন তৈরি করুন",
      icon: <Briefcase className="h-5 w-5 text-white" />,
      description: "আপনার যদি এজেন্সি থাকে — সেটা মার্কেটিং, ওয়েব ডেভেলপমেন্ট বা বিজনেস কনসালটেন্সি — তাহলে এই কোর্স আপনাকে ক্লায়েন্টদের জন্য হাই-ভ্যালু AI ও অটোমেশন সলিউশন দিতে শিখাবে। আপনি ক্লায়েন্টের জন্য চ্যাটবট, লিড জেনারেশন ফানেল, অর্ডার প্রসেসিং, রিপোর্টিং, বা কমপ্লেক্স কাজ একদম অটোমেট করতে পারবেন। এতে আপনার এজেন্সির প্রোডাক্টিভিটি বাড়বে, কস্ট কমবে, আর প্রফিট মার্জিনও অনেক বাড়বে।",
      benefits: []
    }
  ];

  return (
    <section className="relative py-12 md:py-16 bg-[#f5f7ff]">
      {/* Grid Background */}
      <GridBackground />
      {/* Additional overlay to make grid more subtle */}
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>
      
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-hind-siliguri mb-3 text-2xl font-bold md:text-3xl text-[#0a2463]">
            কাদের জন্য এই কোর্সটি?
          </h2>
          <p className="font-hind-siliguri mx-auto max-w-2xl text-base text-slate-600">
            এই কোর্সটি তাদের জন্য যারা AI অটোমেশন দিয়ে নিজের বিজনেস, ক্যারিয়ার, অথবা ফ্রিল্যান্সিং করতে চান
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {audiences.map((audience) => (
            <div
              key={audience.id}
              className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Header Section */}
              <div className="bg-gradient-to-r from-[#5D28E0] to-[#4A20B5] p-4">
                <div className="flex items-center">
                  <div className="p-1.5 bg-white/20 rounded-md mr-3">
                    {audience.icon}
                  </div>
                  <div>
                    <h3 className="font-hind-siliguri text-lg font-bold text-white">
                      {audience.title}
                    </h3>
                    <p className="font-hind-siliguri text-white/90 text-xs mt-0.5">
                      {audience.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-grow p-4 bg-white">
                <p className="font-hind-siliguri text-sm text-slate-700 leading-normal">
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enrollment Button */}
        <div className="flex justify-center mt-12">
          <a href="#checkout">
            <Button className="font-hind-siliguri bg-[#5D28E0] hover:bg-[#4A20B5] text-white py-2 px-6 rounded-lg text-lg transition-all duration-300">
              এখনই এনরোল করুন
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
} 
