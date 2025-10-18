'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import GridBackground from '@/components/ui/grid-background';

export function FAQs() {
  const faqItems = [
    {
      question: "১. এই কোর্স করতে কি কোডিং জানতে হবে?",
      answer: "না, একদমই না। এই কোর্সটি এমনভাবে বানানো হয়েছে যাতে একেবারে নতুনরাও শিখতে পারে।"
    },
    {
      question: "২. পেমেন্ট করার পর কিভাবে অ্যাক্সেস পাবো?",
      answer: "পেমেন্ট করার পর আপনার ইমেইলে কোর্স অ্যাক্সেস লিংক পাঠানো হবে। এনরোল করার জন্য আলাদা করে অ্যাকাউন্ট বানানোর প্রয়োজন নেই।"
    },
    {
      question: "৩. n8n কি আমাকে নিজে ইন্সটল করতে হবে?",
      answer: "না। আমরা আগে থেকেই প্রস্তুত করে রাখা n8n দিচ্ছি, যেখানে আপনি শুধু লগইন করে কাজ শুরু করতে পারবেন।"
    },
    {
      question: "৪. আমার n8n কি শেয়ারড হবে নাকি ব্যক্তিগত?",
      answer: "আপনি পাবেন ব্যক্তিগত n8n, যেটা কেবলমাত্র আপনার জন্য। আপনার সব অটোমেশন নিরাপদ এবং গোপন থাকবে।"
    },
    {
      question: "৫. n8n এর ১ বছর অফার শেষ হওয়ার পর কি হবে?",
      answer: "১ বছর পর আপনি চাইলে আরো ১ বছরের জন্য n8n রিনিউ করতে পারবেন মাত্র ২০০০ টাকায়। এটি একটি বিশেষ রিনিউয়াল প্রাইস যা আমরা আমাদের স্টুডেন্টদের জন্য অফার করি।"
    },
    {
      question: "৬. কোর্স করতে গিয়ে যদি সমস্যা হয় তাহলে কি সাহায্য পাওয়া যাবে?",
      answer: "অবশ্যই। কোর্সের সাথে আপনি একটি প্রাইভেট সাপোর্ট গ্রুপে যুক্ত হতে পারবেন, যেখানে আপনি প্রশ্ন করতে পারবেন।"
    },
    {
      question: "৭. আমি কি এই কোর্স করে ফ্রিল্যান্সিং করতে পারব?",
      answer: "পারবেন। অটোমেশন সার্ভিস এখন খুবই চাহিদাসম্পন্ন একটি কাজ, ফাইভার, আপওয়ার্কসহ বিভিন্ন মার্কেটপ্লেসে এর অনেক ডিমান্ড আছে।"
    },
    {
      question: "৮. আমি একেবারে নতুন, তাও কি শুরু করতে পারব?",
      answer: "হ্যাঁ ভাই, এই কোর্স একদম নতুনদের জন্যই তৈরি। ধাপে ধাপে সবকিছু বুঝিয়ে শেখানো হয়েছে।"
    },
    {
      question: "৯. কোর্স কি লাইভ নাকি রেকর্ডেড?",
      answer: `মূল ক্লাসগুলো রেকর্ডেড, তার মানে আপনি এখন জয়েন করে এখনি শেখা শুরু করতে পারবেন।`
    }
  ];

  return (
    <section id="faqs" className="relative py-12 md:py-16 bg-[#f5f7ff]">
      {/* Grid Background */}
      <GridBackground />
      {/* Additional overlay to make grid more subtle */}
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>
      
      <div className="container relative z-10 mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-hind-siliguri text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0a2463] to-[#5D28E0] bg-clip-text text-transparent mb-4">
            সাধারণ জিজ্ঞাসা
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0a2463] to-[#5D28E0] mx-auto rounded-full mb-4"></div>
          <p className="font-hind-siliguri text-slate-600 max-w-2xl mx-auto">
            কোর্স সম্পর্কে আপনার মনে যে প্রশ্নগুলো আসতে পারে, সেগুলোর উত্তর নিচে দেওয়া হলো।
          </p>
        </div>

        <div className="mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <AccordionTrigger className="font-hind-siliguri text-left text-lg font-medium text-[#0a2463] hover:no-underline px-6 py-4 hover:bg-slate-50">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-hind-siliguri text-base text-slate-700 px-6 py-4 bg-slate-50/50">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
