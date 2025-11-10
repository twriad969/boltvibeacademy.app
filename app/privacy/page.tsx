'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function PrivacyPage() {
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  return (
    <main className="flex min-h-screen flex-col">
      <div className="relative bg-[#5D28E0] py-12 text-white">
        <div className="absolute inset-0 z-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10" />
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-hind-siliguri text-3xl font-bold md:text-4xl">
                {lang === 'en' ? 'Privacy Policy' : 'গোপনীয়তা নীতি'}
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
                <h2 className="font-hind-siliguri mb-4 text-2xl font-bold">Privacy Policy</h2>
                <p className="font-hind-siliguri mb-4">
                  Your privacy is important to us. This Privacy Policy explains how Vibe Academy collects, uses, and protects your personal data when you use our website vibeacademy.app and our services.
                </p>

                <h3 className="font-hind-siliguri mb-3 mt-6 text-xl font-bold">Information We Collect</h3>
                <p className="font-hind-siliguri mb-4">
                  We collect personal data that you voluntarily provide to us when you register on the website, make a purchase, or contact us. This may include:
                </p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Payment information</li>
                  <li>Course progress and learning data</li>
                  <li>Any other information you choose to provide</li>
                </ul>

                <h3 className="font-hind-siliguri mb-3 mt-6 text-xl font-bold">How We Use Your Information</h3>
                <p className="font-hind-siliguri mb-4">We use the collected information to:</p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>Provide and maintain our services</li>
                  <li>Process transactions and send purchase confirmations</li>
                  <li>Send you important updates and marketing communications (you can opt-out anytime)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h3 className="font-hind-siliguri mb-3 mt-6 text-xl font-bold">Data Security</h3>
                <p className="font-hind-siliguri mb-4">
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We do not sell or rent your personal data to third parties.
                </p>

                <h3 className="font-hind-siliguri mb-3 mt-6 text-xl font-bold">Your Rights</h3>
                <p className="font-hind-siliguri mb-4">You have the right to:</p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>Access your personal data</li>
                  <li>Request correction of your data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                </ul>

                <h3 className="font-hind-siliguri mb-3 mt-6 text-xl font-bold">Contact Us</h3>
                <p className="font-hind-siliguri mb-4">
                  By using our website, you consent to the collection and use of your information as described in this Privacy Policy. If you have any questions about this policy, please contact us at <a href="mailto:vibeacademybangla@gmail.com" className="text-[#5D28E0] underline">vibeacademybangla@gmail.com</a>.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-hind-siliguri mb-4 text-2xl font-bold">গোপনীয়তা নীতি</h2>
                <p className="font-hind-siliguri mb-4">
                  আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ। এই গোপনীয়তা নীতি ব্যাখ্যা করে যে Vibe Academy কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত করে যখন আপনি আমাদের ওয়েবসাইট vibeacademy.app এবং আমাদের সেবা ব্যবহার করেন।
                </p>

                <h3 className="font-hind-siliguri mb-3 mt-6 text-xl font-bold">আমরা যে তথ্য সংগ্রহ করি</h3>
                <p className="font-hind-siliguri mb-4">
                  আমরা ব্যক্তিগত তথ্য সংগ্রহ করি যা আপনি স্বেচ্ছায় প্রদান করেন যখন আপনি ওয়েবসাইটে নিবন্ধন করেন, কেনাকাটা করেন, অথবা আমাদের সাথে যোগাযোগ করেন। এর মধ্যে অন্তর্ভুক্ত থাকতে পারে:
                </p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>নাম এবং যোগাযোগের তথ্য (ইমেইল ঠিকানা, ফোন নম্বর)</li>
                  <li>পেমেন্ট তথ্য</li>
                  <li>কোর্সের অগ্রগতি এবং শেখার তথ্য</li>
                  <li>আপনি যে অন্যান্য তথ্য প্রদান করতে চান</li>
                </ul>

                <h3 className="font-hind-siliguri mb-3 mt-6 text-xl font-bold">আমরা কীভাবে আপনার তথ্য ব্যবহার করি</h3>
                <p className="font-hind-siliguri mb-4">আমরা সংগৃহীত তথ্য ব্যবহার করি:</p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>আমাদের সেবা প্রদান এবং বজায় রাখতে</li>
                  <li>লেনদেন প্রক্রিয়া করতে এবং ক্রয় নিশ্চিতকরণ পাঠাতে</li>
                  <li>গুরুত্বপূর্ণ আপডেট এবং মার্কেটিং যোগাযোগ পাঠাতে (আপনি যেকোনো সময় অপ্ট-আউট করতে পারেন)</li>
                  <li>আমাদের ওয়েবসাইট এবং সেবা উন্নত করতে</li>
                  <li>আইনি বাধ্যবাধকতা মেনে চলতে</li>
                </ul>

                <h3 className="font-hind-siliguri mb-3 mt-6 text-xl font-bold">তথ্য সুরক্ষা</h3>
                <p className="font-hind-siliguri mb-4">
                  আমরা আপনার ব্যক্তিগত তথ্য অননুমোদিত অ্যাক্সেস, পরিবর্তন, প্রকাশ বা ধ্বংস থেকে রক্ষা করতে উপযুক্ত প্রযুক্তিগত এবং সাংগঠনিক ব্যবস্থা বাস্তবায়ন করি। আমরা আপনার ব্যক্তিগত তথ্য তৃতীয় পক্ষের কাছে বিক্রি বা ভাড়া দিই না।
                </p>

                <h3 className="font-hind-siliguri mb-3 mt-6 text-xl font-bold">আপনার অধিকার</h3>
                <p className="font-hind-siliguri mb-4">আপনার অধিকার আছে:</p>
                <ul className="font-hind-siliguri mb-4 list-disc pl-6">
                  <li>আপনার ব্যক্তিগত তথ্য অ্যাক্সেস করতে</li>
                  <li>আপনার তথ্য সংশোধনের অনুরোধ করতে</li>
                  <li>আপনার তথ্য মুছে ফেলার অনুরোধ করতে</li>
                  <li>মার্কেটিং যোগাযোগ থেকে অপ্ট-আউট করতে</li>
                </ul>

                <h3 className="font-hind-siliguri mb-3 mt-6 text-xl font-bold">আমাদের সাথে যোগাযোগ করুন</h3>
                <p className="font-hind-siliguri mb-4">
                  আমাদের ওয়েবসাইট ব্যবহার করে, আপনি এই গোপনীয়তা নীতিতে বর্ণিত হিসাবে আপনার তথ্য সংগ্রহ এবং ব্যবহারে সম্মতি দেন। এই নীতি সম্পর্কে আপনার কোন প্রশ্ন থাকলে, দয়া করে আমাদের সাথে যোগাযোগ করুন <a href="mailto:vibeacademybangla@gmail.com" className="text-[#5D28E0] underline">vibeacademybangla@gmail.com</a>।
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
