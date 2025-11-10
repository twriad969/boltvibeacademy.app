'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function TermsPage() {
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  return (
    <main className="flex min-h-screen flex-col">
      <div className="relative bg-[#5D28E0] py-12 text-white">
        <div className="absolute inset-0 z-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10" />
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-hind-siliguri text-3xl font-bold md:text-4xl">
                {lang === 'en' ? 'Terms & Conditions' : 'শর্তাবলী'}
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
                <h2 className="font-hind-siliguri mb-4 text-2xl font-bold">Terms of Service</h2>
                
                <h3 className="font-hind-siliguri mb-4 text-xl font-bold">1. Use of the Website</h3>
                <p className="font-hind-siliguri mb-4">
                  You must be at least 18 years old or have parental permission to access and use our content.
                </p>
                <p className="font-hind-siliguri mb-4">
                  You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others.
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">2. Account Registration</h3>
                <p className="font-hind-siliguri mb-4">
                  To access certain features or enroll in courses, you may need to create an account.
                </p>
                <p className="font-hind-siliguri mb-4">
                  You are responsible for maintaining the confidentiality of your account and password.
                </p>
                <p className="font-hind-siliguri mb-4">
                  All information provided during registration must be accurate and current.
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">3. Course Access and License</h3>
                <p className="font-hind-siliguri mb-4">
                  When you purchase a course, you are granted a non-transferable, non-exclusive license to access the content for personal, educational use only.
                </p>
                <p className="font-hind-siliguri mb-4">
                  You may not share, resell, copy, or distribute any course materials without written permission.
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">4. Payment</h3>
                <p className="font-hind-siliguri mb-4">
                  All payments for courses are processed securely. By purchasing a course, you agree to the price listed at the time of purchase.
                </p>
                <p className="font-hind-siliguri mb-4">
                  The course fee is a one-time payment, which gives you full access to the course. After purchasing the course, there are no additional fees or monthly charges.
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">5. Intellectual Property</h3>
                <p className="font-hind-siliguri mb-4">
                  All content on vibeacademy.app, including videos, graphics, text, logos, and course materials, are the property of Vibe Academy and are protected by copyright and intellectual property laws.
                </p>
                <p className="font-hind-siliguri mb-4">
                  You may not use our content for commercial purposes without explicit written consent.
                </p>
                <p className="font-hind-siliguri mb-4">
                  Downloading our course and selling it online is illegal. We will take legal action against such activities.
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">6. Prohibited Conduct</h3>
                <p className="font-hind-siliguri mb-4">You agree not to:</p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>Violate any local, national, or international law.</li>
                  <li>Attempt to hack, disable, or interfere with the website.</li>
                  <li>Harass, abuse, or harm other users or team members.</li>
                </ul>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">7. No Income Guarantee</h3>
                <p className="font-hind-siliguri mb-4">
                  We do not guarantee that you will earn money from this course. Results vary based on individual effort, time invested, skills, knowledge, and various market factors outside our control. The course provides educational content and tools, but success depends on your implementation and other external factors.
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">8. Limitation of Liability</h3>
                <p className="font-hind-siliguri mb-4">Vibe Academy is not liable for:</p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>Any direct, indirect, or incidental damages resulting from the use of our services.</li>
                  <li>Technical issues, interruptions, or unauthorized access to your data.</li>
                </ul>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">9. Modifications to the Service</h3>
                <p className="font-hind-siliguri mb-4">
                  We reserve the right to modify or discontinue any part of the website or courses at any time, without notice.
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">10. Changes to Terms</h3>
                <p className="font-hind-siliguri mb-4">
                  These Terms may be updated from time to time. It is your responsibility to review them periodically. Continued use of the site constitutes your acceptance of any changes.
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">11. Governing Law</h3>
                <p className="font-hind-siliguri mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of Bangladesh.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-hind-siliguri mb-4 text-2xl font-bold">সেবার শর্তাবলী</h2>
                
                <h3 className="font-hind-siliguri mb-4 text-xl font-bold">১. ওয়েবসাইট ব্যবহার</h3>
                <p className="font-hind-siliguri mb-4">
                  আমাদের কন্টেন্ট অ্যাক্সেস এবং ব্যবহার করতে আপনার বয়স কমপক্ষে ১৮ বছর হতে হবে বা পিতামাতার অনুমতি থাকতে হবে।
                </p>
                <p className="font-hind-siliguri mb-4">
                  আপনি সম্মত হন যে ওয়েবসাইট শুধুমাত্র আইনি উদ্দেশ্যে এবং এমনভাবে ব্যবহার করবেন যা অন্যদের অধিকার লঙ্ঘন করে না।
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">২. অ্যাকাউন্ট নিবন্ধন</h3>
                <p className="font-hind-siliguri mb-4">
                  নির্দিষ্ট বৈশিষ্ট্য অ্যাক্সেস করতে বা কোর্সে ভর্তি হতে, আপনার একটি অ্যাকাউন্ট তৈরি করতে হতে পারে।
                </p>
                <p className="font-hind-siliguri mb-4">
                  আপনার অ্যাকাউন্ট এবং পাসওয়ার্ডের গোপনীয়তা বজায় রাখার দায়িত্ব আপনার।
                </p>
                <p className="font-hind-siliguri mb-4">
                  নিবন্ধনের সময় প্রদত্ত সমস্ত তথ্য অবশ্যই সঠিক এবং বর্তমান হতে হবে।
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">৩. কোর্স অ্যাক্সেস এবং লাইসেন্স</h3>
                <p className="font-hind-siliguri mb-4">
                  যখন আপনি একটি কোর্স ক্রয় করেন, আপনাকে শুধুমাত্র ব্যক্তিগত, শিক্ষামূলক ব্যবহারের জন্য কন্টেন্ট অ্যাক্সেস করার জন্য একটি অ-হস্তান্তরযোগ্য, অ-একচেটিয়া লাইসেন্স দেওয়া হয়।
                </p>
                <p className="font-hind-siliguri mb-4">
                  লিখিত অনুমতি ছাড়া আপনি কোন কোর্স উপাদান শেয়ার, পুনঃবিক্রয়, কপি বা বিতরণ করতে পারবেন না।
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">৪. পেমেন্ট</h3>
                <p className="font-hind-siliguri mb-4">
                  কোর্সের জন্য সমস্ত পেমেন্ট নিরাপদে প্রক্রিয়া করা হয়। একটি কোর্স ক্রয় করে, আপনি ক্রয়ের সময় তালিকাভুক্ত মূল্যে সম্মত হন।
                </p>
                <p className="font-hind-siliguri mb-4">
                  কোর্স ফি একটি একবারের পেমেন্ট, যা আপনাকে কোর্সে সম্পূর্ণ অ্যাক্সেস দেয়। কোর্স ক্রয়ের পরে, কোন অতিরিক্ত ফি বা মাসিক চার্জ নেই।
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">৫. বুদ্ধিবৃত্তিক সম্পত্তি</h3>
                <p className="font-hind-siliguri mb-4">
                  vibeacademy.app-এর সমস্ত কন্টেন্ট, ভিডিও, গ্রাফিক্স, টেক্সট, লোগো এবং কোর্স উপাদান সহ, Vibe Academy-এর সম্পত্তি এবং কপিরাইট এবং বুদ্ধিবৃত্তিক সম্পত্তি আইন দ্বারা সুরক্ষিত।
                </p>
                <p className="font-hind-siliguri mb-4">
                  স্পষ্ট লিখিত সম্মতি ছাড়া আপনি বাণিজ্যিক উদ্দেশ্যে আমাদের কন্টেন্ট ব্যবহার করতে পারবেন না।
                </p>
                <p className="font-hind-siliguri mb-4">
                  আমাদের কোর্স ডাউনলোড করে অনলাইনে বিক্রি করা অবৈধ। আমরা এই ধরনের কার্যকলাপের বিরুদ্ধে আইনি ব্যবস্থা নেব।
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">৬. নিষিদ্ধ আচরণ</h3>
                <p className="font-hind-siliguri mb-4">আপনি সম্মত হন যে করবেন না:</p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>কোনো স্থানীয়, জাতীয় বা আন্তর্জাতিক আইন লঙ্ঘন করা।</li>
                  <li>ওয়েবসাইট হ্যাক, নিষ্ক্রিয় বা হস্তক্ষেপ করার চেষ্টা করা।</li>
                  <li>অন্যান্য ব্যবহারকারী বা টিম সদস্যদের হয়রানি, অপব্যবহার বা ক্ষতি করা।</li>
                </ul>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">৭. আয়ের কোন গ্যারান্টি নেই</h3>
                <p className="font-hind-siliguri mb-4">
                  আমরা গ্যারান্টি দিই না যে আপনি এই কোর্স থেকে অর্থ উপার্জন করবেন। ফলাফল ব্যক্তিগত প্রচেষ্টা, বিনিয়োগকৃত সময়, দক্ষতা, জ্ঞান এবং আমাদের নিয়ন্ত্রণের বাইরে বিভিন্ন বাজার কারণের উপর ভিত্তি করে পরিবর্তিত হয়। কোর্স শিক্ষামূলক কন্টেন্ট এবং সরঞ্জাম প্রদান করে, কিন্তু সাফল্য আপনার বাস্তবায়ন এবং অন্যান্য বাহ্যিক কারণের উপর নির্ভর করে।
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">৮. দায়বদ্ধতার সীমাবদ্ধতা</h3>
                <p className="font-hind-siliguri mb-4">Vibe Academy দায়ী নয়:</p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>আমাদের সেবা ব্যবহারের ফলে কোনো প্রত্যক্ষ, পরোক্ষ বা আনুষঙ্গিক ক্ষতির জন্য।</li>
                  <li>প্রযুক্তিগত সমস্যা, বাধা বা আপনার ডেটাতে অননুমোদিত অ্যাক্সেসের জন্য।</li>
                </ul>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">৯. সেবার পরিবর্তন</h3>
                <p className="font-hind-siliguri mb-4">
                  আমরা বিজ্ঞপ্তি ছাড়াই যেকোনো সময় ওয়েবসাইট বা কোর্সের কোনো অংশ পরিবর্তন বা বন্ধ করার অধিকার সংরক্ষণ করি।
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">১০. শর্তাবলীর পরিবর্তন</h3>
                <p className="font-hind-siliguri mb-4">
                  এই শর্তাবলী সময়ে সময়ে আপডেট হতে পারে। পর্যায়ক্রমে এগুলি পর্যালোচনা করা আপনার দায়িত্ব। সাইটের অব্যাহত ব্যবহার যেকোনো পরিবর্তনের আপনার গ্রহণযোগ্যতা গঠন করে।
                </p>

                <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">১১. প্রযোজ্য আইন</h3>
                <p className="font-hind-siliguri mb-4">
                  এই শর্তাবলী বাংলাদেশের আইন অনুযায়ী পরিচালিত এবং ব্যাখ্যা করা হবে।
                </p>
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
