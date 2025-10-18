'use client';

import { useEffect } from 'react';
import { initFacebookPixel, trackPageView } from '@/lib/fbPixel';

export default function FacebookPixelProvider() {
  useEffect(() => {
    // Initialize Facebook Pixel only on the client side
    const loadPixel = async () => {
      await initFacebookPixel();
      await trackPageView();
    };
    
    loadPixel();
  }, []);
  
  return null;
} 
