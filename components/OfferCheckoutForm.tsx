'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GridBackground from '@/components/ui/grid-background';
import { trackEvent } from '@/lib/fbPixel';
import { sendWebhookNotification, createClientSidePayment } from '@/lib/utils'; // Import directly

type FormData = {
  name: string;
  email: string;
  phone: string;
};

export function OfferCheckoutForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Send webhook notification for checkout initiation
      await sendWebhookNotification({
        email: data.email,
        purchased: false
      });

      // Track checkout initiation with specific value for offer
      await trackEvent(
        'InitiateCheckout',
        {
          value: 1000, // Hardcoded for offer
          currency: 'BDT',
          content_type: 'course',
          content_ids: ['N8NOFFERCOURSE1'], // New content ID for offer
          num_items: 1,
        },
        {
          name: data.name,
          email: data.email,
          phone: data.phone
        }
      );

      // Store user details in localStorage before calling the payment function
      localStorage.setItem('checkoutUserDetails', JSON.stringify(data));

      const paymentResult = await createClientSidePayment({
        name: data.name,
        email: data.email,
        phone: data.phone,
        amountOverride: 1000, // Pass the hardcoded amount
      });

      if (paymentResult.success && paymentResult.payment_url) {
        window.location.href = paymentResult.payment_url;
      } else {
        toast({
          title: 'পেমেন্ট শুরু করতে ব্যর্থ হয়েছে',
          description: paymentResult.message || 'একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।',
          variant: 'destructive',
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

  return (
    <section
      id="checkout"
      className="relative bg-[#f5f7ff] py-12 md:py-20 overflow-hidden"
    >
      {/* Grid Background */}
      <GridBackground />
      {/* Additional overlay to make grid more subtle */}
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7ff] opacity-70 z-[1]"></div>
      
      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="mb-10 text-center"
        >
          <h2 className="font-hind-siliguri mb-4 text-2xl font-bold md:text-3xl text-[#0a2463]">
            অফার প্রাইসে এনরোল করতে ফর্ম পূরণ করুন
          </h2>
        </div>

        <div className="mx-auto grid max-w-2xl">
          <Card
            className="border border-gray-200 hover:border-[#5D28E0] overflow-hidden relative shadow-sm"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300"></div>
            <CardContent className="p-5">
              {/* Price Display for Offer */} 
              <div className="mb-5 bg-gradient-to-r from-[#5D28E0]/10 to-transparent p-3 rounded-lg border border-[#5D28E0]/20">
                <p className="font-hind-siliguri mb-1 text-sm font-medium text-[#5D28E0]">Special Offer Price</p>
                <div className="flex flex-wrap items-center">
                  <div className="flex items-baseline">
                    <span className="text-xl sm:text-3xl font-bold text-destructive line-through mr-3">৳1500</span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#0a2463]">
                      ৳1000
                    </span>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold inline-block transform -rotate-2 shadow-sm">শুধুমাত্র আপনার জন্য</span>
                  </div>
                </div>
                <p className="font-hind-siliguri text-xs text-muted-foreground mt-1">One-time payment, lifetime access</p>
              </div>
              <h3 className="font-hind-siliguri mb-4 text-xl font-bold flex items-center">
                <span className="relative">
                এনরোল ফর্ম
                  <span className="absolute -top-1 -right-6 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5D28E0] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#5D28E0]"></span>
                  </span>
                </span>
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="font-hind-siliguri text-sm">
                      নাম <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      {...register('name', { required: true })}
                      className="font-hind-siliguri text-sm h-9"
                      placeholder="আপনার নাম"
                    />
                  </div>
                
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="font-hind-siliguri text-sm">
                      ইমেইল <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email', { required: true })}
                      className="font-hind-siliguri text-sm h-9"
                      placeholder="আপনার ইমেইল"
                    />
                    <p className="text-amber-600 text-xs font-hind-siliguri mt-1">
                      সঠিক ইমেইল দিন! কোর্স অ্যাক্সেস এই ইমেইলে পাঠানো হবে এবং লগইন করার জন্য ব্যবহার করা হবে।
                    </p>
                  </div>
                
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="font-hind-siliguri text-sm">
                      মোবাইল নাম্বার <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      {...register('phone', { required: true })}
                      className="font-hind-siliguri text-sm h-9"
                      placeholder="আপনার মোবাইল নাম্বার"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="font-hind-siliguri w-full bg-[#5D28E0] hover:bg-[#4A20B5] transition-all duration-300 group relative overflow-hidden h-10"
                  disabled={isSubmitting}
                >
                  <span className="absolute inset-0 w-full h-full transition duration-300 transform group-hover:translate-x-full ease">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#5D28E0]/20 via-transparent to-transparent"></span>
                  </span>
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                        <span className="text-sm">প্রক্রিয়াকরণ চলছে...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm">পরবর্তী ধাপ</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </Button>
                {/* Info: Payment notice in red Bangla text */}
                <p className="text-red-600 text-sm font-hind-siliguri mt-2 text-center">
                  পেমেন্ট করার সাথে সাথেই অ্যাক্সেস পেয়ে যাবেন। ইমেইলে কোর্স এরিয়া লিংক পাঠানো হবে।
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
