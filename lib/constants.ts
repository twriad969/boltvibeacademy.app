import { COURSE_PRICE } from './price';

export const SITE_CONFIG = {
  name: 'n8n AI কোর্স',
  description: 'n8n এআই টুলস ব্যবহার করে আপনার কাজকে অটোমেট করুন',
  url: 'https://n8n-ai-course.com',
  ogImage: 'https://n8n-ai-course.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/n8n_io',
    github: 'https://github.com/n8n-io/n8n',
    comingSoon: 'https://n8n-ai-course.com/coming-soon',
  },
};

export const LESSONS = [
  {
    id: 1,
    title: 'অটোমেশন কি এবং AI এজেন্ট পরিচিতি',
    description:
      'এই লেসনে আপনি অটোমেশনের মূল ধারণা, এর সুবিধা এবং বিভিন্ন প্রকারভেদ সম্পর্কে জানবেন। AI এজেন্ট কি, কিভাবে কাজ করে এবং এর ভবিষ্যৎ সম্ভাবনা নিয়ে আলোচনা করা হবে।',
    image: '/1.png',
    iframeSrc: 'https://iframe.mediadelivery.net/embed/430610/ba5b7143-c028-4551-877c-8d3842b0b6fe?autoplay=true&loop=false&muted=false&preload=true&responsive=true'
  },
  {
    id: 2,
    title: 'n8n পরিচিতি এবং সেটআপ',
    description:
      'এই লেসনে আপনি n8n কি, কিভাবে ইনস্টল করবেন, এবং বেসিক কনফিগারেশন সম্পর্কে জানবেন। আমরা প্রথম ওয়ার্কফ্লো তৈরি করব এবং ইন্টারফেস পরিচিতি দেব।',
    image: '/chapter1.png',
    iframeSrc: 'https://iframe.mediadelivery.net/embed/430610/dc8c2a92-45ad-40a9-9ec2-9d7af0a5a5e1?autoplay=true&loop=false&muted=false&preload=true&responsive=true'
  },
  {
    id: 3,
    title: 'AI নোডস এবং ইন্টিগ্রেশন',
    description:
      'তৃতীয় লেসনে আমরা AI নোডস এবং ইন্টিগ্রেশন নিয়ে আলোচনা করব। আপনি OpenAI, HuggingFace এবং অন্যান্য AI সার্ভিসগুলি n8n এর সাথে ইন্টিগ্রেট করতে শিখবেন।',
    image: '/chapter2.png',
    iframeSrc: 'https://iframe.mediadelivery.net/embed/430610/7045ecb4-eac5-4514-8198-e8cfc0d11028?autoplay=true&loop=false&muted=false&preload=true&responsive=true'
  },
  {
    id: 4,
    title: 'মডিউল ৪: লিড জেনারেশন প্রজেক্ট',
    description:
      'ফর্স ডেটা সংগ্রহ, প্রোসেসিং এবং CSV আউটপুটের মাধ্যমে ক্লায়েন্ট লিড তৈরি ও ম্যানেজমেন্ট কিভাবে করবেন তা পূর্ণাঙ্গ ওয়ার্কফ্লো দেখানো হবে।',
    image: '/2.png',
    iframeSrc: 'https://iframe.mediadelivery.net/embed/457218/859c807a-7cda-495f-bd8f-390df844649a?autoplay=false&loop=false&muted=false&preload=true&responsive=true'
  },
  {
    id: 5,
    title: 'মডিউল ৫: Facebook Messenger এজেন্ট',
    description:
      'Messenger এজেন্ট তৈরি করে স্বয়ংক্রিয় মেসেজ পাঠানো, পেজে চ্যাট করার ব্যবস্থা, ফেসবুক কমেন্ট ম্যানেজমেন্ট এজেন্ট এবং পুরো কনভার্সেশন ফ্লো ডিজাইন শেখানো হবে (পার্ট ১-৪)।',
    image: '/real.png',
    iframeSrc: 'https://iframe.mediadelivery.net/embed/457218/e6d7d4ee-239f-48bb-ac32-b63da9c533d5?autoplay=false&loop=false&muted=false&preload=true&responsive=true'
  },
  {
    id: 6,
    title: 'মডিউল ৬: অ্যাকাউন্ট কানেকশন',
    description:
      'Google, Facebook, AWS সহ বিভিন্ন প্ল্যাটফর্মের অ্যাকাউন্ট কীভাবে সংযোগ করবেন এবং ম্যানেজ করবেন, সেটআপ থেকে টroubleshooting সব ধাপে গাইড থাকবে।',
    image: '/c.jpg',
    iframeSrc: 'https://iframe.mediadelivery.net/embed/457218/28d08f71-90c2-4d59-a509-3cab047b6f7a?autoplay=false&loop=false&muted=false&preload=true&responsive=true'
  },
  {
    id: 7,
    title: 'ফাইভার অ্যাকাউন্ট সেটআপ ও অপটিমাইজেশন',
    description:
      'সফল Fiverr প্রোফাইল তৈরির স্টেপ-বাই-স্টেপ গাইড, সার্ভিস লিস্টিং অপ্টিমাইজেশন এবং ভিজিবিলিটি বাড়ানোর ট্রিকস শিখুন।',
    image: '/fivver.png',
    iframeSrc: ''
  },
  {
    id: 8,
    title: 'ফাইভার গিগ পাবলিশিং ও মার্কেটিং',
    description:
      'আকর্ষণীয় গিগ ডেফিনিশন, কীওয়ার্ড রিসার্চ, প্রমোশনাল স্ট্র্যাটেজি এবং AI টুলস ব্যবহার করে গিগ মার্কেটিংয়ের পদ্ধতি জানতে পারবেন।',
    image: '/fivver.png',
    iframeSrc: ''
  },
  {
    id: 9,
    title: 'ক্লায়েন্ট অর্জন কৌশল',
    description:
      'টার্গেট ক্লায়েন্ট সনাক্তকরণ, আউটরিচ স্ট্র্যাটেজি, কাস্টমার এনগেজমেন্ট এবং দীর্ঘমেয়াদী সম্পর্ক গড়ার টেকনিক শেখানো হবে।',
    image: '/c.jpg',
    iframeSrc: ''
  }
];

export const PRICING = {
  originalAmount: COURSE_PRICE.display.original,
  amount: COURSE_PRICE.display.regular,
  discountBadge: 'Special Offer',
  features: [
  'ফ্রি n8n অ্যাক্সেস (3 Year)',
  'সাপোর্ট কমিউনিটি অ্যাক্সেস',
  'রিয়েল ওয়ার্ল্ড প্রজেক্ট (নিয়মিত আপডেট হচ্ছে)',
  'কোর্সের সময়সীমা লাইফ টাইম',
  '১০০% মানি ব্যাক গ্যারান্টি',
  'ফ্রি সিজন ২ অ্যাক্সেস',
   ],

};
