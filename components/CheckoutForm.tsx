'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { PRICING, LESSONS } from '@/lib/constants';
import { cn, sendWebhookNotification } from '@/lib/utils';
import { COURSE_PRICE, getRegularCheckoutEventData } from '@/lib/price';
import { Check, Sparkles, ArrowRight, Users, Lock, X, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GridBackground from '@/components/ui/grid-background';
import { trackEvent } from '@/lib/fbPixel';
import { getCookie } from 'cookies-next';
import confetti from 'canvas-confetti';
import Image from 'next/image';

type FormData = {
  name: string;
  email: string;
  phone: string;
};


const USE_FIXED_NOVEMBER_1_DEADLINE = true;

function getOfferDeadline(): Date {
  const now = new Date();
  const currentYear = now.getFullYear();
  // Months are 0-based: 10 => November
  const thisYearNov1 = new Date(currentYear, 10, 1, 0, 0, 0, 0);
  
  if (now.getTime() < thisYearNov1.getTime()) {
    // Before Nov 1: countdown to Nov 1
    return thisYearNov1;
  } else {
    // On/after Nov 1: countdown to Nov 11 (10 days extension)
    const nov11 = new Date(currentYear, 10, 11, 0, 0, 0, 0);
    if (now.getTime() < nov11.getTime()) {
      return nov11;
    }
    // If past Nov 11, return next year's Nov 1
    return new Date(currentYear + 1, 10, 1, 0, 0, 0, 0);
  }
}

export function CheckoutForm() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [purchaseCount, setPurchaseCount] = useState<number>(0);
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 7, hours: 0, minutes: 0, seconds: 0 });
  const [showExtensionPopup, setShowExtensionPopup] = useState(false);
  const [showNovemberExtensionPopup, setShowNovemberExtensionPopup] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Function to trigger confetti effect
  const triggerConfetti = () => {
    if (confettiRef.current) {
      const rect = confettiRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      const count = 200;
      const defaults = { 
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
        spread: 100,
        ticks: 100,
        gravity: 0.8,
        decay: 0.94,
        startVelocity: 30
      };
      
      const fire = (particleRatio: number, opts: any) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      };
      
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  };

  useEffect(() => {
    if (USE_FIXED_NOVEMBER_1_DEADLINE) {
      // Fixed deadline countdown to November 1, then extends to November 6. No localStorage usage.
      const target = getOfferDeadline();

      const update = () => {
        const now = new Date();
        let totalSeconds = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));

        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        totalSeconds -= days * 24 * 60 * 60;
        const hours = Math.floor(totalSeconds / (60 * 60));
        totalSeconds -= hours * 60 * 60;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds - minutes * 60;

        setCountdown({ days, hours, minutes, seconds });

        // Update the displayed values if elements exist
        const d = document.getElementById('days');
        const h = document.getElementById('hours');
        const m = document.getElementById('minutes');
        const s = document.getElementById('seconds');
        if (d) d.textContent = days.toString().padStart(2, '0');
        if (h) h.textContent = hours.toString().padStart(2, '0');
        if (m) m.textContent = minutes.toString().padStart(2, '0');
        if (s) s.textContent = seconds.toString().padStart(2, '0');
      };

      update();
      const timer = setInterval(update, 1000);
      return () => clearInterval(timer);
    }

    // Legacy: localStorage-based 7-day countdown with extension popup.
    // Kept for future use; currently disabled by USE_FIXED_NOVEMBER_1_DEADLINE.
    // To re-enable, set USE_FIXED_NOVEMBER_1_DEADLINE = false.
    // Load countdown from localStorage or set initial value
    const savedCountdown = localStorage.getItem('offerCountdown');
    const initialTime = savedCountdown ? JSON.parse(savedCountdown) : {
      days: 7,
      hours: 0,
      minutes: 0,
      seconds: 0,
      lastUpdated: new Date().getTime(),
      extensions: 0
    };

    if (savedCountdown) {
      const now = new Date().getTime();
      const elapsed = Math.floor((now - initialTime.lastUpdated) / 1000);
      
      let totalSeconds = (
        initialTime.days * 24 * 60 * 60 +
        initialTime.hours * 60 * 60 +
        initialTime.minutes * 60 +
        initialTime.seconds
      ) - elapsed;

      // Check if countdown has ended and should be extended
      if (totalSeconds <= 0 && initialTime.extensions < 3) {
        // Reset countdown to 3 days (instead of 7)
        totalSeconds = 3 * 24 * 60 * 60;
        initialTime.extensions += 1;
        
        // Show extension popup instead of toast
        setShowExtensionPopup(true);
        
        // Trigger confetti effect after a short delay
        setTimeout(() => {
          triggerConfetti();
        }, 500);
      } else if (totalSeconds < 0) {
        totalSeconds = 0;
      }

      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setCountdown({ days, hours, minutes, seconds });
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        const currentState = JSON.parse(localStorage.getItem('offerCountdown') || '{"extensions": 0}');
        localStorage.setItem('offerCountdown', JSON.stringify({
          days,
          hours,
          minutes,
          seconds,
          lastUpdated: new Date().getTime(),
          extensions: currentState.extensions || 0
        }));

        const d = document.getElementById('days');
        const h = document.getElementById('hours');
        const m = document.getElementById('minutes');
        const s = document.getElementById('seconds');
        if (d) d.textContent = days.toString().padStart(2, '0');
        if (h) h.textContent = hours.toString().padStart(2, '0');
        if (m) m.textContent = minutes.toString().padStart(2, '0');
        if (s) s.textContent = seconds.toString().padStart(2, '0');

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Function to generate a random number between 5 and 20
    const getRandomCount = () => Math.floor(Math.random() * (20 - 5 + 1)) + 5;

    // Get stored data from localStorage
    const storedData = localStorage.getItem('courseVisitData');
    const today = new Date().toDateString();

    if (storedData) {
      const { date, count } = JSON.parse(storedData);
      
      // If it's a new day, generate new count
      if (date !== today) {
        const newCount = getRandomCount();
        localStorage.setItem('courseVisitData', JSON.stringify({
          date: today,
          count: newCount
        }));
        setPurchaseCount(newCount);
      } else {
        setPurchaseCount(count);
      }
    } else {
      const newCount = getRandomCount();
      localStorage.setItem('courseVisitData', JSON.stringify({
        date: today,
        count: newCount
      }));
      setPurchaseCount(newCount);
    }

    // No countdown timer needed anymore
    return () => {};
  }, []);

  useEffect(() => {
    // Load saved user form data from localStorage
    const savedUserData = localStorage.getItem('userFormData');
    if (savedUserData) {
      try {
        const userData = JSON.parse(savedUserData);
        // Pre-fill the form with saved data
        setValue('name', userData.name || '');
        setValue('email', userData.email || '');
        setValue('phone', userData.phone || '');
      } catch (error) {
        console.error('Error loading saved user data:', error);
      }
    }
  }, [setValue]); // Run once on component mount
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Save user data to localStorage for future use
      localStorage.setItem('userFormData', JSON.stringify(data));

      // Send webhook notification for checkout initiation
      await sendWebhookNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        purchased: false
      });

      // Get Facebook cookies for better event matching
      const fbc = getCookie('_fbc');
      const fbp = getCookie('_fbp');

      // Track checkout initiation with hashed user data and fbp/fbc
      await trackEvent(
        'InitiateCheckout',
        getRegularCheckoutEventData(),
        {
          name: data.name,
          email: data.email,
          phone: data.phone
        },
        { fbc: typeof fbc === 'string' ? fbc : undefined, fbp: typeof fbp === 'string' ? fbp : undefined }
      );

      // Store user details in localStorage before calling the payment function
      // This is a temporary solution for passing data to the success page
      localStorage.setItem('checkoutUserDetails', JSON.stringify(data));

      // Use client-side payment function instead of server API
      const { createClientSidePayment } = await import('@/lib/utils');
      const paymentResult = await createClientSidePayment({
        name: data.name,
        email: data.email,
        phone: data.phone,
        amountOverride: COURSE_PRICE.regular,
      });

      if (paymentResult.success && paymentResult.payment_url) {
        // Redirect to UddoktaPay payment page
        window.location.href = paymentResult.payment_url;
        // No need to setIsSubmitting(false) here, as page will redirect
      } else {
        toast({
          title: "পেমেন্ট শুরু করতে ব্যর্থ হয়েছে",
          description: paymentResult.message || "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।",
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      let errorMessage = "পেমেন্ট শুরু করার সময় একটি ত্রুটি ঘটেছে।";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "পেমেন্ট ত্রুটি",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  // Function to close the extension popup
  const closeExtensionPopup = () => {
    setShowExtensionPopup(false);
  };

  // Function to close the November extension popup
  const closeNovemberExtensionPopup = () => {
    setShowNovemberExtensionPopup(false);
    localStorage.setItem('novemberExtensionPopupSeen', 'true');
  };
  
  // Check if November extension popup should be shown (only when using fixed deadline mode)
  useEffect(() => {
    // Only show November extension popup if using fixed November 1st deadline mode
    if (!USE_FIXED_NOVEMBER_1_DEADLINE) return;
    
    const checkNovemberExtension = () => {
      const now = new Date();
      const nov1 = new Date(now.getFullYear(), 10, 1); // November 1st of current year
      
      // Show popup on or after November 1st
      if (now >= nov1) {
        const hasSeenPopup = localStorage.getItem('novemberExtensionPopupSeen');
        if (!hasSeenPopup) {
          setShowNovemberExtensionPopup(true);
          setTimeout(() => {
            triggerConfetti();
          }, 500);
        }
      }
    };
    
    checkNovemberExtension();
  }, []);
  
  // For testing purposes - can be removed in production
  useEffect(() => {
    // Uncomment the line below to test the popup and confetti effect
    // setShowExtensionPopup(true);
    // setShowNovemberExtensionPopup(true);
  }, []);

  return (
    <section
      id="checkout"
      className="relative bg-[#f5f7ff] py-12 md:py-20 overflow-hidden"
      ref={confettiRef}
    >
      {/* Extension Popup */}
      {showExtensionPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50" onClick={closeExtensionPopup}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Popup Header with Gradient */}
            <div className="bg-gradient-to-r from-[#5D28E0] to-[#4A20B5] p-4 text-white relative">
              <button 
                onClick={closeExtensionPopup}
                className="absolute right-4 top-4 text-white hover:text-white/80 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Gift className="h-6 w-6" />
                </div>
                <h3 className="font-hind-siliguri text-xl font-bold">বিশেষ অফার!</h3>
              </div>
            </div>
            
            {/* Popup Content */}
            <div className="p-6">
              <p className="font-hind-siliguri text-lg font-medium text-[#0a2463] mb-4 text-center">
                শুধুমাত্র আপনার জন্য আরো ৩ দিনের অফার!
              </p>
              <p className="font-hind-siliguri text-sm text-slate-600 mb-6">
                আমরা দেখলাম আপনি আমাদের কোর্সে আগ্রহী, তাই আপনার জন্য বিশেষভাবে আরও ৩ দিন বাড়িয়ে দিয়েছি। এই সুযোগটি মিস করবেন না!
              </p>
              
              {/* Timer in Popup */}
              <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto mb-6">
                <div className="bg-[#5D28E0]/10 p-2 rounded-lg border border-[#5D28E0]/20">
                  <div className="font-bold text-xl text-[#5D28E0] text-center">
                    {countdown.days.toString().padStart(2, '0')}
                  </div>
                  <div className="font-hind-siliguri text-xs text-gray-600 text-center">দিন</div>
                </div>
                <div className="bg-[#5D28E0]/10 p-2 rounded-lg border border-[#5D28E0]/20">
                  <div className="font-bold text-xl text-[#5D28E0] text-center">
                    {countdown.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="font-hind-siliguri text-xs text-gray-600 text-center">ঘণ্টা</div>
                </div>
                <div className="bg-[#5D28E0]/10 p-2 rounded-lg border border-[#5D28E0]/20">
                  <div className="font-bold text-xl text-[#5D28E0] text-center">
                    {countdown.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="font-hind-siliguri text-xs text-gray-600 text-center">মিনিট</div>
                </div>
                <div className="bg-[#5D28E0]/10 p-2 rounded-lg border border-[#5D28E0]/20">
                  <div className="font-bold text-xl text-[#5D28E0] text-center">
                    {countdown.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="font-hind-siliguri text-xs text-gray-600 text-center">সেকেন্ড</div>
                </div>
              </div>
              
              <Button
                onClick={closeExtensionPopup}
                className="font-hind-siliguri w-full bg-gradient-to-b from-[#E9236E] to-[#D41F61] hover:from-[#D41F61] hover:to-[#E9236E] text-white shadow-lg hover:shadow-xl transition-all duration-200 h-[52px] text-lg rounded-[14px]"
              >
                ধন্যবাদ, অফার গ্রহণ করুন
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* November Extension Popup */}
      {showNovemberExtensionPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50" onClick={closeNovemberExtensionPopup}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Popup Header with Gradient */}
            <div className="bg-gradient-to-r from-[#E9236E] to-[#D41F61] p-4 text-white relative">
              <button 
                onClick={closeNovemberExtensionPopup}
                className="absolute right-4 top-4 text-white hover:text-white/80 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Gift className="h-6 w-6" />
                </div>
                <h3 className="font-hind-siliguri text-xl font-bold">চাকুরিজীবী ভাইদের জন্য বিশেষ সুবিধা!</h3>
              </div>
            </div>
            
            {/* Popup Content */}
            <div className="p-6">
              <p className="font-hind-siliguri text-lg font-medium text-[#0a2463] mb-4 text-center">
                অফারটি আরো ১০ দিন চলবে!
              </p>
              <p className="font-hind-siliguri text-sm text-slate-600 mb-4">
                অনেকে আমাদের রিকোয়েস্ট করেছেন সেলারি পেলে কোর্সটা কিনবেন। এ কারণে আমরা চাকুরিজীবী ভাইদের জন্য অফারের মেয়াদ আরো ১০ দিন বাড়ালাম।
              </p>
              <p className="font-hind-siliguri text-sm text-[#E9236E] font-medium mb-6 text-center">
                এই সুযোগটি হাতছাড়া করবেন না!
              </p>
              
              {/* Timer in Popup */}
              <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto mb-6">
                <div className="bg-[#E9236E]/10 p-2 rounded-lg border border-[#E9236E]/20">
                  <div className="font-bold text-xl text-[#E9236E] text-center">
                    {countdown.days.toString().padStart(2, '0')}
                  </div>
                  <div className="font-hind-siliguri text-xs text-gray-600 text-center">দিন</div>
                </div>
                <div className="bg-[#E9236E]/10 p-2 rounded-lg border border-[#E9236E]/20">
                  <div className="font-bold text-xl text-[#E9236E] text-center">
                    {countdown.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="font-hind-siliguri text-xs text-gray-600 text-center">ঘণ্টা</div>
                </div>
                <div className="bg-[#E9236E]/10 p-2 rounded-lg border border-[#E9236E]/20">
                  <div className="font-bold text-xl text-[#E9236E] text-center">
                    {countdown.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="font-hind-siliguri text-xs text-gray-600 text-center">মিনিট</div>
                </div>
                <div className="bg-[#E9236E]/10 p-2 rounded-lg border border-[#E9236E]/20">
                  <div className="font-bold text-xl text-[#E9236E] text-center">
                    {countdown.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="font-hind-siliguri text-xs text-gray-600 text-center">সেকেন্ড</div>
                </div>
              </div>
              
              <Button
                onClick={closeNovemberExtensionPopup}
                className="font-hind-siliguri w-full bg-gradient-to-b from-[#E9236E] to-[#D41F61] hover:from-[#D41F61] hover:to-[#E9236E] text-white shadow-lg hover:shadow-xl transition-all duration-200 h-[52px] text-lg rounded-[14px]"
              >
                বুঝেছি, অফার গ্রহণ করুন
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Grid Background */}
      <GridBackground />
      {/* Additional overlay to make grid more subtle */}
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>
      
      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="mb-10 text-center"
        >
          <h2 className="font-hind-siliguri mb-4 text-2xl font-bold md:text-3xl text-[#0a2463]">
            আজই কোর্সে যোগ দিন
          </h2>
          <p className="font-hind-siliguri mx-auto max-w-2xl text-slate-600 mb-6">
          n8n এআই কোর্সে আজই যোগ দিন — অটোমেশন শিখুন আর নিজের নতুন একটি স্কিল তৈরি করুন
          </p>

          {/* Offer expiration warning */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="border-2 border-dashed border-[#E9236E]/30 rounded-lg p-6 text-center bg-[#E9236E]/5">
              <p className="font-hind-siliguri text-base text-[#E9236E] mb-4">
                অফার শেষ হয়ে গেলে আর ফ্রি n8n পাবেন না
              </p>
              
              {/* Countdown Timer */}
              <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
                <div className="bg-white p-2 rounded-lg border border-[#E9236E]/20">
                  <div className="font-bold text-xl text-[#E9236E]" id="days">05</div>
                  <div className="font-hind-siliguri text-xs text-gray-600">দিন</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#E9236E]/20">
                  <div className="font-bold text-xl text-[#E9236E]" id="hours">24</div>
                  <div className="font-hind-siliguri text-xs text-gray-600">ঘণ্টা</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#E9236E]/20">
                  <div className="font-bold text-xl text-[#E9236E]" id="minutes">60</div>
                  <div className="font-hind-siliguri text-xs text-gray-600">মিনিট</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#E9236E]/20">
                  <div className="font-bold text-xl text-[#E9236E]" id="seconds">60</div>
                  <div className="font-hind-siliguri text-xs text-gray-600">সেকেন্ড</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card
            className="border-2 border-gray-200/80 overflow-hidden relative card-modern"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300"></div>
            <CardContent className="p-4">
              {/* Warning Banner */}
              <div className="mb-4 -mt-1 bg-red-50 rounded-lg p-2 border-2 border-dashed border-red-200">
                <p className="font-hind-siliguri text-base text-red-500 text-center font-medium">
                নভেম্বর মাসের <span className="font-bold">১০</span> তারিখে অফার শেষ হয়ে যাবে! এর পর থেকে কোর্সের দাম হবে ৪৫০০ টাকা।
                </p>
              </div>

              {/* Pricing Section */}
              <div className="mb-6 bg-[#5D28E0]/5 p-4 rounded-xl border border-[#5D28E0]/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-hind-siliguri text-base font-medium text-[#5D28E0]">কোর্স ফি</h3>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-green-600" />
                    <p className="font-hind-siliguri text-xs font-medium text-green-600">
                    2512 Enrolled
                    </p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold text-[#0a2463]">{COURSE_PRICE.display.regular}</span>
                  <span className="font-hind-siliguri text-xs text-gray-400 line-through">{COURSE_PRICE.display.original}</span>
                  <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-medium">Special Offer</span>
                </div>
                <p className="font-hind-siliguri text-xs text-slate-600 mb-3">একবার পেমেন্ট, লাইফটাইম অ্যাক্সেস</p>
                
                <div className="grid grid-cols-1 gap-2">
                  {PRICING.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <div className="flex h-3 w-3 items-center justify-center text-[#5D28E0]">
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span className="font-hind-siliguri text-xs text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="font-hind-siliguri mb-6 text-2xl font-bold text-center">
                তথ্য দিয়ে এনরোল করুন
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-hind-siliguri text-sm font-medium">
                      নাম <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      {...register('name', { required: true })}
                      className="font-hind-siliguri text-sm h-10 rounded-lg focus:border-[#5D28E0] focus:ring-[#5D28E0]/20"
                      placeholder="আপনার নাম"
                    />
                  </div>
                
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-hind-siliguri text-sm font-medium">
                      ইমেইল <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email', { required: true })}
                      className="font-hind-siliguri text-sm h-10 rounded-lg focus:border-[#5D28E0] focus:ring-[#5D28E0]/20"
                      placeholder="আপনার ইমেইল"
                    />
                  </div>
                
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-hind-siliguri text-sm font-medium">
                      মোবাইল নাম্বার <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      {...register('phone', { required: true })}
                      className="font-hind-siliguri text-sm h-10 rounded-lg focus:border-[#5D28E0] focus:ring-[#5D28E0]/20"
                      placeholder="আপনার মোবাইল নাম্বার"
                    />
                  </div>
                </div>


                <div className="bg-white rounded-md p-3 mb-3 border border-gray-200">
                  <div className="mb-3">
                    <Image
                      src="/eps.png"
                      alt="Payment Methods"
                      width={500}
                      height={120}
                      className="w-full h-auto"
                      priority={false}
                    />
                  </div>
                  <p className="font-hind-siliguri text-[11px] text-gray-700 text-center">
                    সিকিউর লেনদেনের জন্য নিচের 'পেমেন্ট করুন' বাটনে ক্লিক করুন
                  </p>
                </div>

            
                <Button
                  type="submit"
                  className="font-hind-siliguri w-full bg-gradient-to-b from-[#E9236E] to-[#D41F61] hover:from-[#D41F61] hover:to-[#E9236E] text-white shadow-lg hover:shadow-xl transition-all duration-200 h-[52px] text-lg rounded-[14px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="flex space-x-1 items-center">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '-0.3s', animationDuration: '1s' }}></span>
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '-0.15s', animationDuration: '1s' }}></span>
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '1s' }}></span>
                      </div>
                      <span className="text-sm">প্রক্রিয়াকরণ চলছে...</span>
                    </span>
                  ) : (
                    <span className="text-xl font-medium">পেমেন্ট করুন {COURSE_PRICE.display.regularWithDecimals}</span>
                  )}
                </Button>
              </form>

              {/* Highlighted trusted badge for visibility */}
              <div className="flex flex-col items-center justify-center mt-4 mb-2">
                <div className="bg-[#5D28E0]/5 border border-[#5D28E0]/20 rounded-lg px-4 py-2">
                  <p className="font-hind-siliguri text-sm font-medium text-[#0a2463] text-center">
                    Trusted by 2000+ Students
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Contact Section */}
          <div className="mt-6">
            <div className="border-2 border-dashed border-[#E9236E]/30 rounded-xl p-6 bg-white shadow-sm">
              <p className="font-hind-siliguri text-base text-[#0a2463] text-center mb-2">
                কিনতে কোনো সমস্যা হলে বা কিছু জানার প্রয়োজন হলে
              </p>
              <h3 className="font-hind-siliguri text-lg font-bold text-[#0a2463] text-center mb-4">
                কল করুন
              </h3>
              <a 
                href="tel:+8801779749047"
                className="flex items-center justify-center gap-2 bg-gradient-to-b from-[#E9236E] to-[#D41F61] hover:from-[#D41F61] hover:to-[#E9236E] text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 mx-auto w-fit shadow-lg hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.36 11.36 0 004.48.9 1 1 0 011 1v3.36a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.9 4.48 1 1 0 01-.27 1.11l-2.2 2.2z"/>
                </svg>
                <span>+880 1779-749047</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}