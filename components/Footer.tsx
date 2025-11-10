'use client';

import { SITE_CONFIG } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import GridBackground from '@/components/ui/grid-background';
import { Facebook, Mail, Heart, MapPin, Phone } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.id = 'footer';
    }
  }, []);

  return (
    <>
      <footer 
        ref={footerRef}
        className="relative bg-[#f5f7ff] py-12 md:py-14 overflow-hidden"
      >
        {/* Grid Background */}
        <div className="opacity-30">
          <GridBackground />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>

        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Brand Section */}
            <div className="flex flex-col items-start md:items-center md:col-span-1">
              <h2 className="font-hind-siliguri text-2xl font-bold tracking-tight bg-gradient-to-r from-[#0a2463] to-[#5D28E0] bg-clip-text text-transparent mb-2">
                VIBE ACADEMY
              </h2>
              <div className="h-0.5 w-16 bg-gradient-to-r from-[#0a2463] to-[#5D28E0] rounded-full mb-3"></div>
              <p className="font-hind-siliguri text-xs text-gray-600 max-w-sm">
                Learn AI Automation and transform your career
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-start">
              <h3 className="font-hind-siliguri text-base font-bold text-[#0a2463] mb-3">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link href="/privacy" className="font-hind-siliguri text-xs text-gray-600 hover:text-[#5D28E0] transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#5D28E0] rounded-full"></span>
                  Privacy Policy
                </Link>
                <Link href="/terms" className="font-hind-siliguri text-xs text-gray-600 hover:text-[#5D28E0] transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#5D28E0] rounded-full"></span>
                  Terms & Conditions
                </Link>
                <Link href="/refund" className="font-hind-siliguri text-xs text-gray-600 hover:text-[#5D28E0] transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#5D28E0] rounded-full"></span>
                  Refund Policy
                </Link>
                <Link href="#reviews" className="font-hind-siliguri text-xs text-gray-600 hover:text-[#5D28E0] transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#5D28E0] rounded-full"></span>
                  Reviews
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-start">
              <h3 className="font-hind-siliguri text-base font-bold text-[#0a2463] mb-3">
                Get In Touch
              </h3>
              <div className="space-y-2">
                <a href="mailto:support@vibeacademy.app" className="font-hind-siliguri text-xs text-gray-600 hover:text-[#5D28E0] transition-colors duration-300 flex items-start gap-2 group">
                  <Mail className="h-4 w-4 text-[#5D28E0] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="break-all">support@vibeacademy.app</span>
                </a>
                <a href="https://www.facebook.com/vibeacademy1" target="_blank" rel="noopener noreferrer" className="font-hind-siliguri text-xs text-gray-600 hover:text-[#5D28E0] transition-colors duration-300 flex items-center gap-2 group">
                  <Facebook className="h-4 w-4 text-[#5D28E0] group-hover:scale-110 transition-transform" />
                  <span>Follow us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>

          {/* Bottom Section with Copyright */}
          <div className="text-center space-y-2">
            <p className="font-hind-siliguri text-xs text-gray-700 font-medium">
              &copy; {new Date().getFullYear()}। সর্বস্বত্ব সংরক্ষিত। VIBE ACADEMY
            </p>
            <p className="font-hind-siliguri text-xs text-gray-600 flex items-center justify-center gap-1">
              Designed & Engineered by{' '}
              <a 
                href="https://www.facebook.com/enigmronok" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold bg-gradient-to-r from-[#5D28E0] to-[#0a2463] bg-clip-text text-transparent hover:from-[#0a2463] hover:to-[#5D28E0] transition-all duration-300"
              >
                Ronok Sheikh
              </a>
              <Heart className="h-3 w-3 text-red-500 fill-current animate-pulse" />
            </p>
          </div>
        </div>
      </footer>

      {/* EPS Payment Methods Section */}
      <div className="relative bg-gradient-to-b from-[#f5f7ff] to-white py-8 overflow-hidden">
        {/* Subtle grid background */}
        <div className="opacity-20">
          <GridBackground />
        </div>
        
        <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col items-center">
            <h3 className="font-hind-siliguri text-lg font-bold text-[#0a2463] mb-4 text-center">
              Secure Payment Methods
            </h3>
            <div className="bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 p-4 w-full max-w-2xl">
              <Image
                src="/eps.png"
                alt="Payment Methods - EEPS Verified"
                width={1200}
                height={300}
                className="w-full h-auto"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
