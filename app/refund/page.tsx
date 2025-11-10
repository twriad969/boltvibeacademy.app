'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function RefundPage() {
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  return (
    <main className="flex min-h-screen flex-col">
      <div className="relative bg-[#5D28E0] py-12 text-white">
        <div className="absolute inset-0 z-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10" />
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-hind-siliguri text-3xl font-bold md:text-4xl">
                {lang === 'en' ? 'Refund Policy' : 'রিফান্ড নীতি'}
              </h1>
              <p className="font-hind-siliguri mt-2 text-sm md:text-base">
                {lang === 'en' ? 'Last Updated: July 14, 2025' : 'সর্বশেষ আপডেট: ১৪ জুলাই, ২০২৫'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setLang('en')}
                className={`font-hind-siliguri ${lang === 'en' ? 'bg-white text-[#5D28E0]' : 'bg-[#4A20B5] text-white'}`}
              >
                English
              </Button>
              <Button
                onClick={() => setLang('bn')}
                className={`font-hind-siliguri ${lang === 'bn' ? 'bg-white text-[#5D28E0]' : 'bg-[#4A20B5] text-white'}`}
              >
                বাংলা
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <div className="rounded-xl border-2 border-[#5D28E0] bg-white p-8 shadow-lg">
            {lang === 'en' ? (
              <>
                <div className="mb-8 rounded-xl border-2 border-red-500 bg-red-50 p-6 shadow-lg">
                  <h2 className="font-hind-siliguri mb-4 text-2xl font-bold text-red-600">Important Notice</h2>
                  <p className="font-hind-siliguri mb-3 font-semibold text-red-600">
                    By purchasing our course, you agree to the following refund terms:
                  </p>
                  <ul className="font-hind-siliguri list-inside list-disc space-y-2 text-red-600">
                    <li>You have <strong>2 days (48 hours)</strong> from purchase to request a refund</li>
                    <li>We <strong>do not guarantee any income</strong> from this course</li>
                    <li>Success depends entirely on your effort and implementation</li>
                    <li>You have sufficient information before purchase and are making this decision consciously</li>
                  </ul>
                </div>

                <h2 className="font-hind-siliguri mb-4 text-2xl font-bold">AI Agent Automation Course Money-Back Guarantee</h2>
                <p className="font-hind-siliguri mb-4">
                  At Vibe Academy, we stand behind the quality and impact of our AI Agent Automation Course. We've designed this course to be highly practical, hands-on, and result-driven — built with real-world use cases using n8n.
                </p>
                <p className="font-hind-siliguri mb-4">
                  That's why we offer a 100% money-back guarantee — but only if you've genuinely completed and applied the course, and still feel that it didn't provide value to you.
                </p>
                <p className="font-hind-siliguri mb-4">
                  This policy is here to protect you, the sincere learner — but also to protect us from misuse.
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">Refund Request Deadline</h3>
                <p className="font-hind-siliguri mb-4">
                  You must submit your refund request within <strong>2 days (48 hours)</strong> of purchasing the course.
                </p>
                <p className="font-hind-siliguri mb-4">
                  Due to the downloadable and recorded nature of our digital products, refunds cannot be processed after 48 hours from the time of purchase.
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">Action-Based Refund Requirements</h3>
                <p className="font-hind-siliguri mb-4">
                  To qualify for a refund, you must demonstrate genuine effort by:
                </p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>Implementing every step shown in the course on time</li>
                  <li>Providing verifiable proof of your efforts (screenshots, links, project files, etc.)</li>
                  <li>Watching all videos and following every guideline exactly as shown</li>
                  <li>Submitting comprehensive documentation of your work</li>
                </ul>
                <p className="font-hind-siliguri mb-4">
                  This policy is designed not just to offer peace of mind, but to motivate you to take real action—because when you follow the system, it works.
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">What Happens After Refund</h3>
                <p className="font-hind-siliguri mb-4">
                  If a refund is approved and processed:
                </p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>Your 1-year n8n access will be immediately revoked</li>
                  <li>All course access will be terminated</li>
                  <li>Any bonuses or additional materials will be removed</li>
                </ul>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">How to Request a Refund</h3>
                <p className="font-hind-siliguri mb-4">
                  Email your refund request to: <a href="mailto:vibeacademybangla@gmail.com" className="text-[#5D28E0] underline">vibeacademybangla@gmail.com</a>
                </p>
                <p className="font-hind-siliguri mb-4">
                  <strong>Important:</strong> Include all necessary proof and attachments in your first message. Incomplete requests may delay processing.
                </p>
                <p className="font-hind-siliguri mb-4">
                  We will review your refund request within 3–5 business days and approve it only if all conditions are met without exceptions.
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">No Income Guarantee Disclaimer</h3>
                <div className="rounded-lg border-2 border-yellow-500 bg-yellow-50 p-4">
                  <p className="font-hind-siliguri mb-2 font-semibold text-yellow-800">
                    We do not guarantee that you will earn money from this course.
                  </p>
                  <p className="font-hind-siliguri text-yellow-800">
                    Results vary based on individual effort, time invested, skills, knowledge, and various market factors outside our control. The course provides educational content and tools, but success depends on your implementation and other external factors.
                  </p>
                </div>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">Non-Refundable Situations</h3>
                <p className="font-hind-siliguri mb-4">Refunds will NOT be granted in the following cases:</p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>Requests made after 48 hours of purchase</li>
                  <li>Failure to provide adequate proof of course completion</li>
                  <li>Lack of implementation or effort demonstrated</li>
                  <li>Change of mind without valid reason</li>
                  <li>Already having access to course materials beyond the refund period</li>
                </ul>
              </>
            ) : (
              <>
                <div className="mb-8 rounded-xl border-2 border-red-500 bg-red-50 p-6 shadow-lg">
                  <h2 className="font-hind-siliguri mb-4 text-2xl font-bold text-red-600">গুরুত্বপূর্ণ বিজ্ঞপ্তি</h2>
                  <p className="font-hind-siliguri mb-3 font-semibold text-red-600">
                    আমাদের কোর্স ক্রয় করে, আপনি নিম্নলিখিত রিফান্ড শর্তাবলীতে সম্মত হন:
                  </p>
                  <ul className="font-hind-siliguri list-inside list-disc space-y-2 text-red-600">
                    <li>রিফান্ড অনুরোধ করার জন্য আপনার কাছে ক্রয়ের <strong>২ দিন (৪৮ ঘণ্টা)</strong> সময় আছে</li>
                    <li>আমরা এই কোর্স থেকে <strong>কোনো আয়ের গ্যারান্টি দিই না</strong></li>
                    <li>সাফল্য সম্পূর্ণভাবে আপনার প্রচেষ্টা এবং বাস্তবায়নের উপর নির্ভর করে</li>
                    <li>ক্রয়ের আগে আপনার যথেষ্ট তথ্য রয়েছে এবং আপনি সচেতনভাবে এই সিদ্ধান্ত নিচ্ছেন</li>
                  </ul>
                </div>

                <h2 className="font-hind-siliguri mb-4 text-2xl font-bold">AI এজেন্ট অটোমেশন কোর্স মানি-ব্যাক গ্যারান্টি</h2>
                <p className="font-hind-siliguri mb-4">
                  Vibe Academy-তে, আমরা আমাদের AI এজেন্ট অটোমেশন কোর্সের গুণমান এবং প্রভাবের পিছনে দাঁড়িয়ে আছি। আমরা এই কোর্সটি অত্যন্ত ব্যবহারিক, হাতে-কলমে, এবং ফলাফল-চালিত হিসাবে ডিজাইন করেছি — n8n ব্যবহার করে বাস্তব-বিশ্বের ব্যবহারের ক্ষেত্রে তৈরি।
                </p>
                <p className="font-hind-siliguri mb-4">
                  এজন্যই আমরা ১০০% মানি-ব্যাক গ্যারান্টি অফার করি — কিন্তু শুধুমাত্র যদি আপনি সত্যিকারভাবে কোর্সটি সম্পূর্ণ এবং প্রয়োগ করেন, এবং এখনও মনে করেন যে এটি আপনার জন্য মূল্য প্রদান করেনি।
                </p>
                <p className="font-hind-siliguri mb-4">
                  এই নীতিটি আপনাকে, আন্তরিক শিক্ষার্থীকে রক্ষা করার জন্য এখানে রয়েছে — কিন্তু আমাদের অপব্যবহার থেকেও রক্ষা করতে।
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">রিফান্ড অনুরোধের সময়সীমা</h3>
                <p className="font-hind-siliguri mb-4">
                  কোর্স ক্রয়ের <strong>২ দিন (৪৮ ঘণ্টা)</strong> এর মধ্যে আপনাকে অবশ্যই আপনার রিফান্ড অনুরোধ জমা দিতে হবে।
                </p>
                <p className="font-hind-siliguri mb-4">
                  আমাদের ডিজিটাল পণ্যের ডাউনলোডযোগ্য এবং রেকর্ড করা প্রকৃতির কারণে, ক্রয়ের সময় থেকে ৪৮ ঘণ্টা পরে রিফান্ড প্রক্রিয়া করা যাবে না।
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">কর্ম-ভিত্তিক রিফান্ড প্রয়োজনীয়তা</h3>
                <p className="font-hind-siliguri mb-4">
                  রিফান্ডের জন্য যোগ্য হতে, আপনাকে অবশ্যই প্রকৃত প্রচেষ্টা প্রদর্শন করতে হবে:
                </p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>সময়মতো কোর্সে প্রদর্শিত প্রতিটি ধাপ বাস্তবায়ন করা</li>
                  <li>আপনার প্রচেষ্টার যাচাইযোগ্য প্রমাণ প্রদান করা (স্ক্রিনশট, লিংক, প্রজেক্ট ফাইল ইত্যাদি)</li>
                  <li>সমস্ত ভিডিও দেখা এবং প্রদর্শিত প্রতিটি নির্দেশিকা অনুসরণ করা</li>
                  <li>আপনার কাজের বিস্তৃত ডকুমেন্টেশন জমা দেওয়া</li>
                </ul>
                <p className="font-hind-siliguri mb-4">
                  এই নীতিটি শুধুমাত্র মানসিক শান্তি প্রদানের জন্য নয়, বরং আপনাকে প্রকৃত কর্ম নিতে অনুপ্রাণিত করার জন্য ডিজাইন করা হয়েছে—কারণ যখন আপনি সিস্টেম অনুসরণ করেন, এটি কাজ করে।
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">রিফান্ডের পরে কী হয়</h3>
                <p className="font-hind-siliguri mb-4">
                  যদি রিফান্ড অনুমোদিত এবং প্রক্রিয়া করা হয়:
                </p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>আপনার ১-বছরের n8n অ্যাক্সেস অবিলম্বে প্রত্যাহার করা হবে</li>
                  <li>সমস্ত কোর্স অ্যাক্সেস বন্ধ করা হবে</li>
                  <li>যেকোনো বোনাস বা অতিরিক্ত উপাদান সরানো হবে</li>
                </ul>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">কীভাবে রিফান্ড অনুরোধ করবেন</h3>
                <p className="font-hind-siliguri mb-4">
                  আপনার রিফান্ড অনুরোধ ইমেল করুন: <a href="mailto:vibeacademybangla@gmail.com" className="text-[#5D28E0] underline">vibeacademybangla@gmail.com</a>
                </p>
                <p className="font-hind-siliguri mb-4">
                  <strong>গুরুত্বপূর্ণ:</strong> আপনার প্রথম বার্তায় সমস্ত প্রয়োজনীয় প্রমাণ এবং সংযুক্তি অন্তর্ভুক্ত করুন। অসম্পূর্ণ অনুরোধ প্রক্রিয়াকরণে বিলম্ব হতে পারে।
                </p>
                <p className="font-hind-siliguri mb-4">
                  আমরা ৩–৫ ব্যবসায়িক দিনের মধ্যে আপনার রিফান্ড অনুরোধ পর্যালোচনা করব এবং সমস্ত শর্ত ব্যতিক্রম ছাড়াই পূরণ হলেই এটি অনুমোদন করব।
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">আয়ের কোনো গ্যারান্টি নেই দাবিত্যাগ</h3>
                <div className="rounded-lg border-2 border-yellow-500 bg-yellow-50 p-4">
                  <p className="font-hind-siliguri mb-2 font-semibold text-yellow-800">
                    আমরা গ্যারান্টি দিই না যে আপনি এই কোর্স থেকে অর্থ উপার্জন করবেন।
                  </p>
                  <p className="font-hind-siliguri text-yellow-800">
                    ফলাফল ব্যক্তিগত প্রচেষ্টা, বিনিয়োগকৃত সময়, দক্ষতা, জ্ঞান এবং আমাদের নিয়ন্ত্রণের বাইরে বিভিন্ন বাজার কারণের উপর ভিত্তি করে পরিবর্তিত হয়। কোর্স শিক্ষামূলক কন্টেন্ট এবং সরঞ্জাম প্রদান করে, কিন্তু সাফল্য আপনার বাস্তবায়ন এবং অন্যান্য বাহ্যিক কারণের উপর নির্ভর করে।
                  </p>
                </div>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">অ-ফেরতযোগ্য পরিস্থিতি</h3>
                <p className="font-hind-siliguri mb-4">নিম্নলিখিত ক্ষেত্রে রিফান্ড দেওয়া হবে না:</p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>ক্রয়ের ৪৮ ঘণ্টা পরে করা অনুরোধ</li>
                  <li>কোর্স সম্পূর্ণ করার পর্যাপ্ত প্রমাণ প্রদান করতে ব্যর্থতা</li>
                  <li>বাস্তবায়ন বা প্রচেষ্টার প্রদর্শনের অভাব</li>
                  <li>বৈধ কারণ ছাড়া মন পরিবর্তন</li>
                  <li>রিফান্ড সময়সীমার বাইরে কোর্স উপাদানের অ্যাক্সেস থাকা</li>
                </ul>
              </>
            )}

            <div className="mt-8 text-center">
              <Button asChild className="font-hind-siliguri bg-[#5D28E0] hover:bg-[#4A20B5]">
                <Link href="/">{lang === 'en' ? 'Go back to the homepage' : 'হোমপেজে ফিরে যান'}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

