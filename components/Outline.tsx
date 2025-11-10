'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

export function Outline() {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const toggleOutline = () => {
    setIsExpanded(prev => !prev);
  };

  const markdownContent = `# আপনার ব্যবসা ও ক্যারিয়ারের জন্য স্মার্ট অটোমেশন  
**Bangladesh-এর সবচেয়ে প্র্যাকটিক্যাল n8n Automation Program** — নিয়মিত নতুন প্রজেক্ট যোগ করা হয়।

---

## অটোমেশন কী?
- **অটোমেশন মানে হলো কাজকে সিস্টেম দিয়ে নিজে নিজে করানো।**  
- উদাহরণ: প্রতিদিন রিপোর্ট বানানো, ইমেইল পাঠানো, ফেসবুকে পোস্ট দেওয়া।  
- এগুলো মানুষ না করে সিস্টেম করলে সময় বাঁচে, ভুল কমে, স্কেল করা সহজ হয়।  
- **সহজ বাংলায়:** একবার বলে দিলেই, কাজগুলো বারবার নিজে নিজে হয়ে যাবে—অনলাইনের প্রায় সব কাজেই প্রযোজ্য।

---

## কেন n8n?
অনেকে বলে *“n8n শিখে অটোমেশন এক্সপার্ট হওয়া যায় না”* — আসলে এটা ভুল ধারণা।  

- **Zapier/Make.com**: closed-source, তাদের সীমার মধ্যে কাজ, কাস্টম নোড/সিস্টেম এক্সটেনশন সীমিত, স্কেল করলে খরচ দ্রুত বাড়ে।  
- **n8n**: সম্পূর্ণ **open-source** — আপনি **custom node**, নিজের **logic**, এমনকি পুরো **system modify** করতে পারবেন। শুধু drag-and-drop নয়, **full freedom**।  
- **LangChain/ LangGraph**: শক্তিশালী কিন্তু পুরোটা **code-based** (Python/Node.js দরকার), **n8n বেশি beginner-friendly** — কোডিং না জেনেও শক্তিশালী অটোমেশন সম্ভব।

---

## n8n কী?
- **n8n হলো একটি নো-কোড/লো-কোড অটোমেশন টুল।**  
- কোড না লিখেই বিভিন্ন অ্যাপ, ওয়েবসাইট ও AI সিস্টেম কানেক্ট করুন।  
- একবার সেটআপ করলে, কাজগুলো নিজে নিজেই চলবে—**২৪/৭**।  
- **প্রোগ্রামিং জানার বাধ্যবাধকতা নেই**—একেবারে নতুনরাও শুরু করতে পারবেন।

---



## n8n কীভাবে কাজ করে?
- আপনি তৈরি করবেন একটি **Workflow** (ধাপ অনুযায়ী কাজের পরিকল্পনা)।  
- এতে থাকবে **Trigger** (কাজ শুরু হওয়ার শর্ত) এবং **Action** (যে কাজটি হবে)।  
- একবার সেট করলে সব কাজ চলবে **অটোমেটিকভাবে**।

---

## সহজ কিছু উদাহরণ
- ওয়েবসাইটে ফর্ম পূরণ ⇒ **অটো ইমেইল/CRM এন্ট্রি**  
- ফেসবুক পেজে কমেন্ট ⇒ **ইনস্ট্যান্ট রিপ্লাই + ইনবক্স মেসেজ**  
- দৈনিক সেলস রিপোর্ট ⇒ **অটোভাবে Google Sheets/ড্যাশবোর্ডে**  
- হোয়াটসঅ্যাপে কাস্টমার মেসেজ ⇒ **AI বট রিপ্লাই**  

---

## এই প্রোগ্রামে যা শিখবেন

* n8n **বেসিক থেকে প্রফেশনাল** ওয়ার্কফ্লো ডিজাইন
* **AI + RAG ইন্টিগ্রেশন:** নিজের ডেটা দিয়ে কনভার্সেশনাল এজেন্ট তৈরি
* **Messenger Full Bot (বাংলাদেশ মার্কেট ফোকাসড)**

  * ইনবক্স, কমেন্ট, অর্ডার, পেমেন্ট — সব এক জায়গায় অটোমেট
  * Pathao, bKash ইন্টিগ্রেশনসহ ফুল বিজনেস সিস্টেম
* **মাল্টি-এজেন্ট স্ট্রাকচার:**

  * সেলস এজেন্ট (লিড ফলোআপ, রিপোর্ট অটো)
  * সাপোর্ট এজেন্ট (মেসেজ/ইমেইল হ্যান্ডলিং)
  * সোশ্যাল এজেন্ট (পোস্ট, কমেন্ট, কন্টেন্ট ম্যানেজ)
* **রিয়েল-ওয়ার্ল্ড প্রজেক্ট (নিয়মিত নতুন যুক্ত হয়):**

  * Messenger F-Commerce Automation
  * কাস্টমার সাপোর্ট বট
  * Facebook/Instagram অটো রিপ্লাই
  * নিজের বিজনেসে **AI ইন্টিগ্রেশন**

💡 **ফাইনাল রেজাল্ট:** নিজের AI টিম বানান — যা ২৪ ঘণ্টা আপনার হয়ে কাজ করবে।

> *পূর্ণ মডিউল লিস্ট নিচে স্ক্রোল করুন*

---

## বিশেষ অ্যাড-অন ও বোনাস

### ✅ Vibe Coding Module — **ফ্রি**
- **AI দিয়ে ওয়েবসাইট তৈরি** (ল্যান্ডিং, ফর্ম, CMS)  
- n8n **Workflow ↔ Web UI** কানেক্ট করে **ফুল-স্ট্যাক অটোমেশন**  
- ডিপ্লয়মেন্ট (VPS/Vercel), ডাটাবেস, ওয়েবহুক, অথ — হ্যান্ডস-অন

### ⚡ Web Interface Add-On (10× বেশি শক্তি)  
- শুধু ওয়ার্কফ্লো না—**ওয়েব ড্যাশবোর্ড/পোর্টাল** পাবেন  
- **Live tracking** (লিড/অর্ডার/KPI), **Role-based access**, **AI Copilot**  
- **One-click actions**: ফ্লো রি-রান, ম্যানুয়াল ওভাররাইড, লগস  
> ফলাফল: ভ্যালু স্পষ্ট, ডেলিভারি স্পিড বেশি, প্রাইসিং পাওয়ার বাড়ে।

---

## কারা জয়েন করবেন?
- যারা অনলাইন থেকে **প্যাসিভ ইনকাম** তৈরি করতে চান  
- **বাংলাদেশি F-commerce/লোকাল বিজনেস**-এ সার্ভিস দিয়ে আয় করতে চান  
- **শিক্ষার্থী** ও **ফ্রেশার** যারা নতুন টেক-স্কিল চান  
- **উদ্যোক্তা/ব্যবসায়ী** যারা কাজকে দ্রুত ও স্মার্ট করতে চান  
- **ফ্রিল্যান্সার** যারা **হাই-ভ্যালু সার্ভিস** অফার করতে চান  
- **টেক-প্রেমী** যারা ফিউচার-প্রুফ **AI অটোমেশন** স্কিল চান

---

## প্রোগ্রাম শেষে যা পাবেন
- নিজের **AI Agent** ডিজাইন ও ডিপ্লয় করার দক্ষতা  
- ব্যবসায় **এন্ড-টু-এন্ড অটোমেশন** সেটআপের স্কিল  
- নতুন **ইনকাম সোর্স** তৈরির সুযোগ  
- **মাত্র একজন ক্লায়েন্টেই ROI**—এরপর থেকে সব প্রফিট  
- আমাদের **কমিউনিটি-তে আজীবন অ্যাক্সেস** (সাপোর্ট + নেটওয়ার্ক)  
- আগামী **৫–১০ বছর** চাহিদায় থাকবে এমন **ফিউচার-প্রুফ স্কিল**

---

## কমিউনিটি, সাপোর্ট ও মেন্টরশিপ
- **Bangladesh-এর বড় Discord অটোমেশন কমিউনিটি** — ২৫০০+ সদস্য  
- **১:১ সাপোর্ট**, **Weekly Live Session**, **Expert Mentorship**  
- **হায়ার হওয়ার সুযোগ**: কমিউনিটি-ভিত্তিক গিগ/প্রজেক্ট পোস্টিং

---

## বিশেষ অফার (সীমিত সময়)
- **n8n Access (৩ বছর)** — প্র্যাকটিস, এক্সপেরিমেন্ট, রিয়েল প্রজেক্ট বানাতে পারবেন  
- **Giveaways** আমাদের কমিউনিটির জন্য:  
  - **OpenAI API keys** (শর্তসাপেক্ষ/লিমিটেড)  
  - **n8n Premium Templates**  
  - আরও টুল/রিসোর্স—নিয়মিত আপডেট  
- অফারটি থাকবে **মাত্র ৭ দিন**  
- সময় শেষ হলে এই সুবিধা আর থাকবে না; আলাদাভাবে **n8n ব্যবহার করতে ~$20/মাস** লাগতে পারে

> এখন জয়েন না করলে শুধু অফারই নয়—একটা **গেম-চেঞ্জিং স্কিল** থেকেও পিছিয়ে পড়বেন।

---

## সোশ্যাল প্রুফ
- আমাদের একজন সদস্য বাংলাদেশ থেকেই **৭০+ ক্লায়েন্ট** নিয়ে সার্ভিস দিচ্ছেন  
- আপনিও এই স্কিল দিয়ে **ফ্রিল্যান্সিং** বা **লোকাল বিজনেস সার্ভিস** শুরু করতে পারেন

---

## কেন এখনই জয়েন করবেন?
- **AI অটোমেশন**-এর চাহিদা প্রতিদিন বাড়ছে  
- **ব্যবসা ও ক্যারিয়ারে এজ** পেতে এখনই সেরা সময়  
- সীমিত-সময়ের বোনাস/গিভঅ্যাওয়ে মিস করলে পরে **খরচ ও সময়** দুটোই বেশি  
- দ্রুত **ROI** — মাত্র **একজন ক্লায়েন্টেই** ফি উঠে আসবে

---

## এখনই পদক্ষেপ নিন
শিখুন, প্র্যাকটিস করুন, আর আপনার নিজের  
**n8n-powered AI Agent** তৈরি করুন।  
**আজই আমাদের প্রোগ্রামে যোগ দিন** — নতুন প্রজেক্ট ও টেমপ্লেট **নিয়মিত যুক্ত হচ্ছে**।

> স্কিল ডেভলপ করতে সময় লাগে কিন্তু যারা আগে শিখবে তারাই market dominate করবে।
`;

  return (
    <section className="relative py-12 md:py-16 bg-[#f5f7ff]">
      {/* Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>
      
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 text-center">
          <h2 className="font-hind-siliguri mb-2 text-3xl font-bold md:text-4xl text-[#0a2463]">
            কোর্স বিবরণ
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {/* Header Section - Clickable */}
            <div 
              className="bg-gradient-to-r from-[#5D28E0] to-[#4A20B5] p-4 cursor-pointer hover:from-[#4A20B5] hover:to-[#3D1A96] transition-all duration-300 select-none"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleOutline();
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="p-1.5 bg-white/20 rounded-md mr-3">
                    <span className="text-white text-xl">💡</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-hind-siliguri text-xl font-bold text-white">
                      n8n অটোমেশন - ভবিষ্যতের প্রযুক্তি
                    </h3>

                  </div>
                </div>
                <div className="ml-4">
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-white" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-white" />
                  )}
                </div>
              </div>
            </div>

            {/* Content Section - Collapsible with Animation */}
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? 'opacity-100' : 'max-h-0 opacity-0'
              }`}
              style={{
                maxHeight: isExpanded ? 'none' : '0px',
                transition: isExpanded ? 'opacity 0.3s ease-in-out' : 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out'
              }}
            >
              <div className="p-5 sm:p-7 bg-white">
                <div className="markdown-content font-hind-siliguri prose prose-base md:prose-lg max-w-none overflow-x-hidden space-y-6 
                  prose-headings:font-bold prose-headings:text-[#0a2463] prose-headings:mb-4 prose-headings:mt-6
                  prose-p:text-slate-700 prose-p:mb-4 prose-p:leading-relaxed
                  prose-strong:text-[#5D28E0] prose-strong:font-semibold
                  prose-blockquote:border-l-4 prose-blockquote:border-[#5D28E0] prose-blockquote:bg-[#f5f7ff] 
                  prose-blockquote:p-4 prose-blockquote:rounded-r prose-blockquote:text-slate-700 prose-blockquote:italic
                  prose-hr:border-[#5D28E0]/20 prose-hr:my-6
                  prose-ul:mb-4 prose-li:mb-2 prose-li:text-slate-700
                  prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-0
                  prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
                  prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6">
                  <ReactMarkdown
                    components={{
                      // Custom rendering for better spacing
                      h1: ({children}) => <h1 className="font-hind-siliguri text-xl font-bold text-[#0a2463] mb-6 mt-0">{children}</h1>,
                      h2: ({children}) => <h2 className="font-hind-siliguri text-lg font-bold text-[#0a2463] mb-4 mt-8">{children}</h2>,
                      h3: ({children}) => <h3 className="font-hind-siliguri text-base font-bold text-[#0a2463] mb-3 mt-6">{children}</h3>,
                      p: ({children}) => <p className="font-hind-siliguri text-[15px] text-slate-700 mb-4 leading-relaxed">{children}</p>,
                      blockquote: ({children}) => (
                        <blockquote className="font-hind-siliguri border-l-4 border-[#5D28E0] bg-[#f5f7ff] p-4 rounded-r text-slate-700 italic mb-4 text-[15px]">
                          {children}
                        </blockquote>
                      ),
                      hr: () => <hr className="border-[#5D28E0]/20 my-6" />,
                      ul: ({children}) => <ul className="font-hind-siliguri mb-4 space-y-2 list-disc pl-5">{children}</ul>,
                      li: ({children}) => <li className="font-hind-siliguri text-[15px] text-slate-700 ml-2">{children}</li>,
                      strong: ({children}) => <strong className="font-hind-siliguri text-[#5D28E0] font-semibold">{children}</strong>,
                    }}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Button */}
        <div className="flex justify-center mt-12">
          <a href="#checkout">
            <Button className="font-hind-siliguri bg-[#5D28E0] hover:bg-[#4A20B5] text-white py-3 px-8 rounded-lg text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              এখনই এনরোল করুন
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}