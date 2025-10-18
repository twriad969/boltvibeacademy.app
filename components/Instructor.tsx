'use client';

import GridBackground from '@/components/ui/grid-background';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Instructor() {
  return (
    <section className="relative py-10 md:py-12 bg-[#f5f7ff]">
      {/* Grid Background with reduced opacity */}
      <div className="opacity-20">
        <GridBackground />
      </div>
      
      <div className="container relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-2xl font-bold md:text-3xl text-[#0a2463] tracking-tight">
            Meet Your Instructor
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Learn from an expert who brings real-world experience
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="overflow-hidden border border-[#5D28E0]/20 bg-white shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full overflow-hidden border border-[#5D28E0]/20">
                    <Image 
                      src="/inst.jpg" 
                      alt="Ronok Sheikh" 
                      fill
                      sizes="80px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-[#0a2463] mb-1">
                    Ronok Sheikh
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-flex items-center bg-[#5D28E0]/5 px-2 py-0.5 rounded-full text-[#5D28E0] font-medium text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Founder at VibeAcademy
                    </span>
                    <span className="inline-flex items-center bg-[#5D28E0]/5 px-2 py-0.5 rounded-full text-[#5D28E0] font-medium text-xs">
                      Automation Expert
                    </span>
                  </div>
                  <p className="text-slate-700 text-xs">
                    Automation specialist with 2+ years of experience in LangChain & n8n
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="px-4 py-3 bg-gradient-to-r from-[#5D28E0]/5 to-transparent border-t border-[#5D28E0]/10">
              <p className="text-[#5D28E0] text-xs font-medium">
                Join Ronok's course to master automation
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}