'use client';

import React from 'react';
import GridBackground from './ui/grid-background';

export function WhatIsN8N() {
  return (
    <section className="relative overflow-hidden py-12 md:py-16 lg:py-20 bg-[#f5f7ff]">
      <GridBackground />
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>
      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-hind-siliguri mb-4 text-3xl font-bold text-[#0a2463] md:text-4xl">
            n8n কি?
          </h2>
          <p className="font-hind-siliguri max-w-3xl text-gray-700 text-lg md:text-xl mb-6">
            n8n একটি ভিজ্যুয়াল অটোমেশন টুল, যেখানে আপনি বিভিন্ন সার্ভিসকে একসাথে সংযুক্ত করে সহজে কাজ অটোমেট করতে পারেন। এটি ব্যবহার করতে কোনো কোডিং জানতে হয় না, তাই যে কেউ সহজেই ব্যবহার করতে পারবে।
          </p>
        </div>
      </div>
    </section>
  );
}
