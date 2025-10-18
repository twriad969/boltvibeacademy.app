'use client';

import { SITE_CONFIG } from '@/lib/constants';
import Link from 'next/link';
import { Facebook, Mail, Heart } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Add an ID to the footer for the MobileCheckoutButton to detect
    if (footerRef.current) {
      footerRef.current.id = 'footer';
    }
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-b from-white to-[#f5f7ff] py-12 relative z-10"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <h2 className="font-hind-siliguri text-2xl font-bold tracking-tight bg-gradient-to-r from-[#0a2463] to-[#5D28E0] bg-clip-text text-transparent mb-6">
            VIBE ACADEMY
          </h2>

          {/* Contact and Links - Compact Row */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <a 
              href="mailto:vibeacademybangla@gmail.com"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md text-[#5D28E0] hover:bg-[#5D28E0] hover:text-white transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email us"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a 
              href="https://www.facebook.com/vibeacademy1"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md text-[#5D28E0] hover:bg-[#5D28E0] hover:text-white transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <Link 
              href="/privacy" 
              className="px-4 py-2 rounded-full bg-white shadow-md text-[#5D28E0] hover:bg-[#5D28E0] hover:text-white transition-all duration-300 text-sm font-medium"
            >
              Privacy & Refund Policy
            </Link>
          </div>

          {/* Copyright and Credits */}
          <div className="text-center space-y-2">
            <p className="font-hind-siliguri text-sm text-gray-600">
              &copy; {new Date().getFullYear()}। সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p className="font-hind-siliguri text-sm text-gray-600 flex items-center justify-center gap-1">
              Designed by Ronok Sheikh, your mentor in this course <Heart className="h-4 w-4 text-red-500 inline fill-current" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
