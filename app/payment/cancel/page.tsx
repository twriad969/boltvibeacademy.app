'use client';

import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GridBackground from '@/components/ui/grid-background'; // Assuming similar background

export default function PaymentCancelPage() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-background py-16 md:py-24">
      <GridBackground />
      <div className="container relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <XCircle className="mb-6 h-20 w-20 text-destructive" />
        <h1 className="font-hind-siliguri mb-4 text-3xl font-bold md:text-4xl">
          পেমেন্ট বাতিল করা হয়েছে
        </h1>
        <p className="font-hind-siliguri mb-8 max-w-md text-muted-foreground">
          আপনার পেমেন্ট প্রক্রিয়া বাতিল করা হয়েছে। আপনি চাইলে আবার চেষ্টা করতে পারেন অথবা আমাদের সাথে যোগাযোগ করতে পারেন।
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/#checkout">আবার চেষ্টা করুন</Link>
          </Button>
          <Button asChild className="bg-[#5D28E0] hover:bg-[#4A20B5]">
            <Link href="/">হোমপেজে ফিরে যান</Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 
