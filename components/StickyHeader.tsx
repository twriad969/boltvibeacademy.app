'use client';

import { useEffect, useState } from 'react';
import { hindSiliguri } from '@/lib/fonts';

const StickyHeader = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const savedTargetTime = localStorage.getItem('countdownTargetTime');

    if (savedTargetTime) {
      const targetTime = parseInt(savedTargetTime);
      setTargetDate(new Date(targetTime));
    } else {
      const newTargetDate = new Date();
      newTargetDate.setDate(newTargetDate.getDate() + 2);
      localStorage.setItem('countdownTargetTime', newTargetDate.getTime().toString());
      setTargetDate(newTargetDate);
    }
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);

      if (difference <= 0) {
        clearInterval(interval);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="sticky top-0 z-50 w-full bg-[#5D28E0] text-white shadow-lg">
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="diagonalLines"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="10" stroke="white" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#diagonalLines)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-2 relative z-10">
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
            {/* Banner text bigger */}
            <div
              className={`${hindSiliguri.className} text-center md:text-left text-base md:text-lg font-extrabold tracking-wide`}
            >
              অফার শেষ হয়ে যাচ্ছে, দেরি করবেন না!
            </div>

            {/* Countdown smaller & sleek */}
            <div className="flex items-center justify-center space-x-1 md:space-x-2 mt-1 md:mt-0">
              {[
                { label: 'দিন', value: days },
                { label: 'ঘন্টা', value: hours },
                { label: 'মিনিট', value: minutes },
                { label: 'সেকেন্ড', value: seconds },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="bg-white text-[#5D28E0] rounded-md px-1.5 py-0.5 font-semibold text-xs md:text-sm shadow-sm">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <span className={`${hindSiliguri.className} text-[9px] md:text-[10px]`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;
