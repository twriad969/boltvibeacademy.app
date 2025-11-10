'use client';

import GridBackground from '@/components/ui/grid-background';
import { Button } from '@/components/ui/button';
import { CheckCircle, Crown, Gift } from 'lucide-react';

export function ValueBundle() {
  const bonusItems = [
    { 
      name: 'N8N 3year pro plan', 
      value: '২৫,০০০ টাকা', 
      originalPrice: '$240',
      icon: <Crown className="h-5 w-5 text-[#5D28E0]" />,
      highlight: true
    },
    
    { 
      name: 'AI Automation Mastery Course', 
      value: '৭,৫০০ টাকা',
      icon: <Crown className="h-5 w-5 text-[#5D28E0]" />,
    },
        {
      name: 'ভাইব কোডিং (Vibe Coding)',
      value: '৮,০০০ টাকা',
      icon: <Crown className="h-5 w-5 text-[#5D28E0]" />,
      highlight: true,
      upcoming: true
    },
    { 
      name: 'AI Prompt Engineering', 
      value: '২,০০০ টাকা',
      icon: <CheckCircle className="h-5 w-5 text-[#5D28E0]" />
    },
    { 
      name: 'Whatsapp connection and automation', 
      value: '১,০০০ টাকা',
      icon: <CheckCircle className="h-5 w-5 text-[#5D28E0]" />
    },
    { 
      name: 'full facebook automation setup comments/messenger', 
      value: '১,৫০০ টাকা',
      icon: <CheckCircle className="h-5 w-5 text-[#5D28E0]" />
    },
    { 
      name: 'Business Automation Strategies', 
      value: '২,০০০ টাকা',
      icon: <CheckCircle className="h-5 w-5 text-[#5D28E0]" />
    },
    { 
      name: 'Lifetime Community Access', 
      value: '৩,০০০ টাকা',
      icon: <CheckCircle className="h-5 w-5 text-[#5D28E0]" />
    },
    { 
      name: 'Priority Support & Mentoring', 
      value: '৫,০০০ টাকা',
      icon: <CheckCircle className="h-5 w-5 text-[#5D28E0]" />
    },
  ];

  return (
    <section className="relative py-6 md:py-8 bg-[#f5f7ff] overflow-hidden">
      {/* Grid Background */}
      <GridBackground />
      {/* Additional overlay to make grid more subtle */}
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>
      
      <div className="container relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="font-hind-siliguri text-xl font-bold tracking-tight text-[#0a2463] md:text-2xl mb-1">
            আপনি যা যা পাচ্ছেন
          </h2>
          <p className="font-hind-siliguri mx-auto max-w-2xl text-sm text-slate-600">
            শুধু কোর্স নয়, সম্পূর্ণ বিজনেস প্যাকেজ যা আপনাকে সফল অটোমেশন এক্সপার্ট বানাবে
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* Main Value Card - Inspired by screenshot structure */}
          <div className="bg-white rounded-xl shadow-md border-2 border-gray-200/80 overflow-hidden">
            
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-[#5D28E0] to-[#4A20B5] p-3">
              <div className="flex items-center justify-center mb-1">
                <Gift className="h-4 w-4 text-white mr-2" />
                <h3 className="font-hind-siliguri text-base font-bold text-white">
                  PRICELESS VALUE
                </h3>
              </div>
              <p className="font-hind-siliguri text-white/90 text-center text-sm">
                ৫৫,০০০ টাকা মূল্যের সম্পূর্ণ প্যাকেজ পাচ্ছেন মাত্র ১,৫০০ টাকায়
              </p>
            </div>

            {/* Items List - Table-like structure inspired by screenshot */}
            <div className="p-3">
              <div className="space-y-1 mb-3">
                {bonusItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-1.5 px-3 bg-gray-50 hover:bg-gray-100 transition-all duration-200 rounded-lg border border-gray-100">
                    <div className="flex items-center flex-1">
                      <div className="mr-2">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-hind-siliguri text-sm font-medium text-[#0a2463]">
                          {item.name}
                          {item.upcoming && (
                            <span className="ml-2 inline-block bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                              Upcoming
                            </span>
                          )}
                        </h4>
                        {item.originalPrice && (
                          <p className="font-hind-siliguri text-xs text-slate-500">
                            সাধারণত {item.originalPrice}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <span className="font-hind-siliguri text-sm font-bold text-[#5D28E0]">
                        ৳ {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Value Section - Inspired by screenshot's total section */}
              <div className="border-t-2 border-[#5D28E0] pt-3">
                <div className="bg-gradient-to-r from-[#5D28E0] to-[#4A20B5] rounded-lg p-3 mb-3">
                  <div className="text-center">
                    <p className="font-hind-siliguri text-white/90 text-sm mb-1">
                      Total Value
                    </p>
                    <h3 className="font-hind-siliguri text-xl font-bold text-white mb-1">
                      ৳ 55,000/-
                    </h3>
                    <p className="font-hind-siliguri text-white/80 text-xs">
                      আপনি পাচ্ছেন ৫৫,০০০ টাকা মূল্যের সম্পূর্ণ প্যাকেজ
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="font-hind-siliguri text-sm text-[#0a2463] mb-1 font-bold">
                    কোর্স ফি মাত্র ১,৫০০ টাকা
                  </p>
                  <p className="font-hind-siliguri text-xs text-green-600 font-bold mb-3">
                    বিশেষ অফার (নিয়মিত ৪,৫০০ টাকা)
                  </p>
                  
                  <div className="mb-1">
                    <a href="#checkout">
                      <Button className="font-hind-siliguri bg-gradient-to-r from-[#5D28E0] to-[#4A20B5] hover:from-[#4A20B5] hover:to-[#5D28E0] text-white py-2 px-6 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        এখনই এনরোল করুন
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
