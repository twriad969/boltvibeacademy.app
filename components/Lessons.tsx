'use client';

import { Clock, ArrowRight, Bot, Database, MessageSquare, Zap, BookOpen, Video, Server, Code, Brain, Search, Share2, Globe, Cog, Cpu, FileText, ChevronDown, ChevronRight, DatabaseZap, Mic, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Lessons() {
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  
const modules = [
  {
    id: 1,
    title: "Module 1: Fundamentals of n8n",
    subtitle: "n8n introduction, AI workflow setup, and API configurations",
    icon: <Database className="h-5 w-5 text-white" />,
    description: "n8n প্ল্যাটফর্মের বেসিক শিখে Google, OpenAI, এবং Gemini API সেটআপ করুন।",
    topics: [
      "Introduction to n8n",
      "What is AI Automation",
      "How to accept n8n invitation",
      "AI Agent and AI Workflow explanation",
      "Setting up Google Credential",
      "Telegram connection",
      "How to use n8n Cloud vs Self-hosted",
      "Difference between Cloud n8n vs Local Self-hosting",
      "n8n install in docker",
      "Setting up OpenAI API",
      "Setting up Gemini API",
      "Building first ai agent with gemini api",
      "n8n memory keys explained",
      "n8n core helper nodes explained"
    ]
  },
  {
    id: 2,
    title: "Module 2: API Connection",
    subtitle: "Master API requests, JSON, and webhooks",
    icon: <Globe className="h-5 w-5 text-white" />,
    description: "HTTP requests, JSON parsing, এবং API authorization প্র্যাকটিক্যালি শিখুন।",
    topics: [
      "What is api? in depth explanation",
      "JSON explained A–Z",
      "API rate limits and error handling",
      "API Authorization explained",
      "Parsing JSON",
      "HTTP Request",
      "Tavily API connection",
      "Timezones explained",
      "Tavily search with API",
      "Making first Webhook listener",
      "Webhook Explained in depth",
      "Brutal apis for all api needs"
    ]
  },
  {
    id: 3,
    title: "Module 3: Basic AI Agent Building",
    subtitle: "Create your first AI agents with n8n",
    icon: <Bot className="h-5 w-5 text-white" />,
    description: "ইমেইল, ওয়েব, টেলিগ্রাম এবং ইমেজ-বেইসড স্মার্ট এজেন্ট বানানো শিখুন।",
    topics: [
      "AI Agent structure explained (input → processing → output)",
      "Error handling & fallback prompts in AI agents",
      "Real-world project: Task reminder AI agent",
      "Gmail automation agent",
      "WhatsApp agent build",
      "Image analysis with OpenAI and Gemini",
      "AI Email Summarizer Agent",
      "Website agent",
      "Prompt Enhancer agent",
      "Gmail Labeler agent",
      "Daily weather report agent",
      "Daily motivational quote sending agent",
      "Telegram connection",
      "AI inventory management agent",
      "AI restaurant management agent"
    ]
  },
  {
    id: 5,
    title: "Module 5: Social Media Agent",
    subtitle: "Automate Facebook, Messenger, and content creation",
    icon: <Share2 className="h-5 w-5 text-white" />,
    description: "Facebook পোস্ট, কমেন্ট, ও চ্যাটবট অটোমেশন শিখে প্রফেশনাল সোশ্যাল এজেন্ট তৈরি করুন।",
    topics: [
      "Facebook content autoposting – Part 1",
      "Facebook content autoposting – Part 2",
      "Facebook content autoposting – Part 3",
      "Facebook content autoposting – Part 4",
      "Social media connection",
      "Facebook webhook verify",
      "Facebook comment agent [RAG]",
      "Facebook bad comment deletor agent with admin notification",
      "Basic Messenger chatbot",
      "Advanced Messenger chatbot – Part 1",
      "Advanced Messenger chatbot – Part 2",
      "Advanced Messenger chatbot – Part 3",
      "Advanced Messenger chatbot – Part 4",
      "Messenger chatbot with chat transfer protocol (first in BD)",
      "Social media caption generator for auto posting",
      "Content scheduler for social media agent",
      "Social media agent selling as a service guide"
    ]
  },
  {
    id: 6,
    title: "Module 6: Voice AI",
    subtitle: "Build AI voice agents using ElevenLabs and RAG",
    icon: <Mic className="h-5 w-5 text-white" />,
    description: "ভয়েস এজেন্ট তৈরি করে অটোমেটিক অর্ডার কনফার্মেশন ও কথোপকথন সিস্টেম শিখুন।",
    topics: [
      "ElevenLabs introduction",
      "ElevenLabs voice agent building",
      "RAG usage in voice agent",
      "Voice agent system message",
      "Voice agent tool calls",
      "VAPI (coming soon)",
      "Own custom-made calling agent (coming soon)",
      "Ratalai voice agent (coming soon)",
      "Voice agent for order confirmation (coming soon – high demand in BD)"
    ]
  },
   {
    id: 4,
    title: "Module 4: RAG",
    subtitle: "Learn Retrieval-Augmented Generation (RAG) from scratch",
    icon: <DatabaseZap className="h-5 w-5 text-white" />,
    description: "RAG কীভাবে ডেটাবেসের সাথে কাজ করে এবং Pinecone ও Supabase ব্যবহার শিখুন।",
    topics: [
      "Intro to RAG",
      "What is Pinecone",
      "RAG database explained in depth",
      "Creating your own custom knowledge base",
      "RAG-powered email reply agent",
      "RAG-powered Messenger agent",
      "Real example: RAG support agent for website FAQs",
      "RAG WordPress chatbot",
      "Supabase RAG implementation",
      "Supabase RAG connection setup"
    ]
  },
  {
    id: 7,
    title: "Module 7: MCP Server",
    subtitle: "Explore MCP Server and integrate it with n8n",
    icon: <Server className="h-5 w-5 text-white" />,
    description: "নিজস্ব MCP সার্ভার বানানো, হোস্টিং এবং n8n এর সাথে ইন্টিগ্রেশন শেখানো হবে।",
    topics: [
      "Intro to MCP server",
      "Use cases of MCP servers in AI automation",
      "What is MCP server (in depth)",
      "Making your first MCP server",
      "Use any MCP server inside n8n",
      "Host your MCP server",
      "More lessons on MCP coming soon"
    ]
  },
  {
    id: 8,
    title: "Module 8: Web Scraping",
    subtitle: "Learn web and data scraping with n8n and Apify",
    icon: <Globe2 className="h-5 w-5 text-white" />,
    description: "ওয়েবসাইট থেকে ডেটা, ইমেইল এবং ম্যাপ ইনফরমেশন স্ক্র্যাপিং শেখানো হবে।",
    topics: [
      "What is web scraping",
      "Website content scraper",
      "Apify web scraping",
      "Google Maps scraping",
      "Instagram scraping",
      "Data extraction",
      "Email scraping from websites",
      "Data cleaning and formatting inside n8n"
    ]
  },
  {
    id: 9,
    title: "Module 9: Vibe Coding (Coming Soon)",
    subtitle: "Learn how to connect AI agents with web apps using Vibe Code",
    icon: <Code className="h-5 w-5 text-white" />,
    description: "React, Next.js, Supabase ও no-code টুল দিয়ে আধুনিক ওয়েবসাইট তৈরি শেখানো হবে।",
    topics: [
      "What is Vibe Coding",
      "Softwares and web applications to Vibe Code",
      "React.js, Next.js explained",
      "Next.js SSR explained",
      "Bolt.new",
      "Trae.ai",
      "Cursor.ai",
      "Lovable.ai",
      "Connecting n8n AI agents with Vibe-coded websites",
      "Deploying Vibe-coded projects on Vercel / Netlify",
      "Supabase explained",
      "Cursor to Bolt to Loveable Seamless Switch",
      "Supabase database connection with websites",
      "Shadcn UI implementation",
      "Aceternity UI implementation",
      "Full modern web design tactics",
      "Bangladeshi landing page making guide with no-code AI tools"
    ]
  }
];

  const toggleModule = (moduleId: number) => {
    console.log('Toggling module:', moduleId); // Debug log
    setExpandedModules(prev => {
      const newExpanded = prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId];
      console.log('New expanded modules:', newExpanded); // Debug log
      return newExpanded;
    });
  };

  return (
    <section id="lessons" className="relative py-12 md:py-16 bg-[#f5f7ff]">
      {/* Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>
      
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-hind-siliguri mb-3 text-2xl font-bold md:text-3xl text-[#0a2463]">
            কোর্স মডিউল সমূহ
          </h2>
          <p className="font-hind-siliguri mx-auto max-w-2xl text-sm text-slate-600">
            আমাদের কোর্সের সিজন <strong>১</strong> এ <strong>৯টি</strong> বিস্তারিত মডিউল রয়েছে যা আপনাকে n8n এবং এআই নিয়ে কাজ করার জন্য প্রয়োজনীয় সবকিছু শেখাবে।
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {modules.map((module) => {
            const isExpanded = expandedModules.includes(module.id);
            return (
              <div
                key={module.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
              >
                {/* Header Section - Clickable */}
                <div 
                  className="bg-gradient-to-r from-[#5D28E0] to-[#4A20B5] p-4 cursor-pointer hover:from-[#4A20B5] hover:to-[#3D1A96] transition-all duration-300 select-none"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleModule(module.id);
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className="p-1.5 bg-white/20 rounded-md mr-3">
                        {module.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-hind-siliguri text-lg font-bold text-white">
                          মডিউল {module.id}: {module.title}
                        </h3>
                        <p className="font-hind-siliguri text-xs text-white/90 mt-0.5">
                          {module.subtitle}
                        </p>
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
                  <p className="font-hind-siliguri text-white/80 text-xs mt-2">
                    {module.description}
                  </p>
                </div>

                {/* Content Section - Collapsible with Animation */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 bg-white">
                    {(module as any).specialContent ? (
                      <div className="font-hind-siliguri text-base text-slate-700 leading-relaxed p-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
                        <div 
                          className="font-bold text-[#5D28E0]"
                          dangerouslySetInnerHTML={{ 
                            __html: (module as any).specialContent
                              ?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              ?.replace(/\n\n/g, '<br/><br/>')
                              ?.replace(/\n/g, '<br/>')
                          }}
                        />
                      </div>
                    ) : module.topics && module.topics.length > 0 ? (
                      <div className="space-y-2">
                        {module.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#5D28E0] mt-1.5 flex-shrink-0"></div>
                            <p className="font-hind-siliguri text-sm text-slate-700 leading-normal">
                              {topic}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>



{/* Ek Kothai Section */}
<div className="mt-8 text-center">
  <div className="bg-gradient-to-r from-[#5D28E0] to-[#4A20B5] rounded-xl p-5 inline-block">
    <p className="font-hind-siliguri text-base text-white mb-2">
      সিজন ২ খুব তাড়াতাড়ি আসছে—আরও অ্যাডভান্সড লেসন ও মডিউল নিয়ে। আমাদের লক্ষ্য আপনাকে স্কিলফুল করা।
    </p>
    <h3 className="font-hind-siliguri text-xl font-bold text-white">
      কোর্স সম্পূর্ণ বাংলায় এবং ভিজ্যুয়ালি ড্রিভেন। জটিল কিছু নেই, কোডিং জানার প্রয়োজন নেই।<br /><br />এক কথায়, বেসিক থেকে প্রো অটোমেশন এক্সপার্ট হয়ে উঠতে পারবেন।
    </h3>
  </div>
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
