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

  const markdownContent = `# N8N AI Agent কোর্স  

### আপনার ব্যবসা ও ক্যারিয়ারের জন্য স্মার্ট অটোমেশন  

---

## অটোমেশন কী?  

- **অটোমেশন মানে হলো কাজকে কম্পিউটার বা সিস্টেম দিয়ে নিজে নিজে করানো।**  
- উদাহরণ: প্রতিদিন রিপোর্ট বানানো, ইমেইল পাঠানো, ফেসবুকে পোস্ট দেওয়া।  
- এগুলো মানুষ না করে সিস্টেম করলে সময় বাঁচে, ঝামেলা কমে।  
- **সহজ বাংলায়:** একবার বলে দিলেই, কাজগুলো বারবার নিজে নিজে হয়ে যাবে—আপনাকে আর হাত দিতে হবে না। সেটা হতে পারে অনলাইনের যেকোনো কাজ।

---

## N8N কী?  

- **N8N হলো একটি নো-কোড অটোমেশন টুল।**  
- কোড না লিখেই বিভিন্ন অ্যাপ, ওয়েবসাইট ও AI সিস্টেম একসাথে কানেক্ট করতে পারবেন।  
- একবার সেটআপ করলে, কাজগুলো নিজে নিজেই চলবে—২৪/৭।  
- **প্রোগ্রামিং জানতে হবে না** – একেবারে নতুনরাও সহজে শিখতে পারবেন。  

---

## N8N কীভাবে কাজ করে?  

- আপনি তৈরি করবেন একটি **Workflow** (ধাপ অনুযায়ী কাজের পরিকল্পনা)।  
- এতে থাকবে **Trigger** (কাজ শুরু হওয়ার শর্ত) এবং **Action** (যে কাজটি সম্পন্ন হবে)।  
- একবার সেট করলে সব কাজ চলবে অটোমেটিকভাবে।  

---

## সহজ কিছু উদাহরণ  

- কেউ আপনার ওয়েবসাইটে ফর্ম পূরণ করলে → অটোমেটিক ইমেইল পাঠানো  
- ফেসবুক পেজে কেউ কমেন্ট করলে → সাথে সাথে রিপ্লাই + ইনবক্স ম্যাসেজ  
- প্রতিদিন সেলস রিপোর্ট → অটোমেটিক গুগল শিটসে জমা  
- হোয়াটসঅ্যাপে কাস্টমার মেসেজ করলে → AI বট রিপ্লাই  

---

## এই কোর্সে যা শিখবেন  

- N8N বেসিক থেকে প্রফেশনাল লেভেল ওয়ার্কফ্লো তৈরি  
- AI API (যেমন OpenAI / Google Gemini) ইন্টিগ্রেশন  
- রিয়েল-টাইম অটোমেশন (চ্যাটবট, কমেন্ট রিপ্লাই, ইমেইল অটো)  
- প্র্যাকটিক্যাল প্রজেক্ট:  
  - কাস্টমার সাপোর্ট বট  
  - ফেসবুক/ইনস্টাগ্রাম অটো কমেন্ট রিপ্লাই  
  - ডেটা ম্যানেজমেন্ট অটোমেশন  
  - নিজের ব্যবসায় AI ইন্টিগ্রেশন  
  - আরও অনেক ধরনের রিয়েল-ওয়ার্ল্ড প্রজেক্ট...
  
*পুরো মডিউল দেখতে নিচে স্ক্রোল করুন*

---



## কারা জয়েন করবেন?  

- যারা অনলাইন থেকে প্যাসিভ ইনকাম করতে চান  
- বাংলাদেশি ফেসবুক বিজনেসগুলোকে সার্ভিস দিয়ে প্যাসিভ ইনকাম জেনারেট করতে চান 
- শিক্ষার্থী যারা নতুন টেক স্কিল শিখে এগিয়ে যেতে চান  
- উদ্যোক্তা ও ব্যবসায়ী যারা কাজকে দ্রুত ও স্মার্ট করতে চান  
- ফ্রিল্যান্সার যারা ক্লায়েন্টদের জন্য হাই-ভ্যালু সার্ভিস অফার করতে চান  
- টেক-প্রেমী যারা ভবিষ্যতের জন্য প্র্যাকটিক্যাল AI স্কিল অর্জন করতে চান  


---

## কোর্স শেষে যা পাবেন  

- নিজের AI Agent তৈরি করার দক্ষতা  
- ব্যবসায় অটোমেশন সেটআপ করার স্কিল  
- নতুন ইনকাম সোর্স তৈরির সুযোগ  
- মাত্র একজন ক্লায়েন্ট পেলেই কোর্স ফি উঠে আসবে—এরপর থেকে সব প্রফিট  
- আমাদের ১০০০+ স্টুডেন্ট কমিউনিটিতে আজীবন এক্সেস  
- একটি ফিউচার-প্রুফ স্কিল যা আগামী ৫-১০ বছরেও চাহিদায় থাকবে  

---

## সীমিত সময়ের অফার  

- **ফ্রি N8N Access** – এই কোর্সে এনরোল করলে 3 বছরের জন্য ব্যবহার করতে পারবেন!
- অফারটি থাকবে মাত্র **৭ দিন**
- সময় শেষ হলে এই সুবিধা আর পাওয়া যাবে না  
- অফার শেষ হলে N8N ব্যবহার করতে মাসে ২০$ খরচ করতে হবে  
- এখন জয়েন না করলে শুধু অফারই মিস করবেন না—একটা গেম-চেঞ্জিং স্কিল থেকেও পিছিয়ে পড়বেন  

---

## সোশ্যাল প্রুফ  

- আমাদের একজন স্টুডেন্ট বাংলাদেশ থেকেই ইতিমধ্যে **৭০+ ক্লায়েন্ট** পেয়ে সার্ভিস দিচ্ছে
- আপনিও চাইলে এই স্কিল দিয়ে ফ্রিল্যান্সিং বা লোকাল বিজনেস সার্ভিস দিয়ে আয় শুরু করতে পারবেন  

---

## কেন এখনই জয়েন করবেন?  

- AI অটোমেশন স্কিলের চাহিদা প্রতিদিন বাড়ছে  
- ব্যবসা ও ক্যারিয়ারে এগিয়ে থাকার জন্য এখনই সঠিক সময়  
- সীমিত সময়ের ফ্রি অফার মিস করলে পরবর্তীতে খরচ বেশি হবে  
- একবার জয়েন করলে দ্রুত ROI পাবেন—মাত্র একজন ক্লায়েন্ট পেলেই কোর্স ফি উঠে আসবে  

---

## এখনই পদক্ষেপ নিন  

শিখুন, প্র্যাকটিস করুন এবং আপনার নিজের  
**N8N AI Agent তৈরি করুন।**  
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