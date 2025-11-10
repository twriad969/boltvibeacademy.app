'use client';

import { CheckCircle, MailCheck, AlertTriangle, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GridBackground from '@/components/ui/grid-background';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { trackPurchase } from '@/lib/fbPixel';
import { sendWebhookNotification } from '@/lib/utils';
import { getCookie } from 'cookies-next';
import { 
  type UserDetails 
} from '@/lib/fbUtils';

// Function to get Facebook cookies for better event matching
const getFbCookie = async (name: string): Promise<string | undefined> => {
  return getCookie(name);
};

// Separate component that uses useSearchParams
function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<'success' | 'error' | 'pending'>('pending');
  const [message, setMessage] = useState('');
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    const currentInvoiceId = searchParams.get('invoice_id');
    setInvoiceId(currentInvoiceId);

    if (currentInvoiceId) {
      // Use localStorage instead of sessionStorage for persistent deduplication across page reloads
      const pixelFiredKey = `fb_pixel_fired_${currentInvoiceId}`;
      const isPixelFired = localStorage.getItem(pixelFiredKey);

      const storedUserDetails = localStorage.getItem('checkoutUserDetails');
      let userDetails: UserDetails | null = null;
      if (storedUserDetails) {
        try {
          userDetails = JSON.parse(storedUserDetails) as UserDetails;
          
          // Only fire pixel and CAPI if not already fired for this invoiceId (persistent check)
          if (userDetails && userDetails.name && userDetails.email && !isPixelFired) {
            console.log(`Firing Facebook Pixel for invoice ${currentInvoiceId} - first time`);
            
            // Type-safe reference to userDetails
            const validUserDetails = userDetails;

            // Consolidated function to track purchase event ONCE
            const trackPurchaseEventOnce = async () => {
              try {
                // Get Facebook cookies for better event matching and attribution
                const fbc = await getFbCookie('_fbc');
                const fbp = await getFbCookie('_fbp');

                // Fire Facebook Pixel (client-side) only with rich hashed user data (handled inside trackPurchase)
                await trackPurchase({
                  name: validUserDetails.name,
                  email: validUserDetails.email,
                  phone: validUserDetails.phone || '',
                }, { fbc: typeof fbc === 'string' ? fbc : undefined, fbp: typeof fbp === 'string' ? fbp : undefined });
                
                // Send webhook notification for successful purchase
                await sendWebhookNotification({
                  name: validUserDetails.name,
                  email: validUserDetails.email,
                  phone: validUserDetails.phone || '',
                  purchased: true
                });

                // Mark this invoice as processed to prevent future duplicate events
                localStorage.setItem(pixelFiredKey, 'true');
                console.log(`Purchase tracking completed for invoice ${currentInvoiceId}`);
                
              } catch (error) {
                console.error('Error in trackPurchaseEventOnce:', error);
                // Don't set the flag if there was an error, so it can retry on next page load
              }
            };

            trackPurchaseEventOnce();
          } else if (isPixelFired) {
            console.log(`Facebook Pixel already fired for invoice ${currentInvoiceId}. Skipping to prevent duplicates.`);
          }
        } catch (e) {
          console.error('Error parsing userDetails from localStorage:', e);
          setErrorDetails('ব্যবহারকারী তথ্য পার্স করতে সমস্যা হয়েছে।');
        }
      }

      if (!userDetails || !userDetails.name || !userDetails.email) {
        console.warn('User details not found in localStorage or incomplete.');
        setErrorDetails('ব্যবহারকারী তথ্য পাওয়া যায়নি বা অসম্পূর্ণ।');
      }

      const postPaymentData = {
        invoiceId: currentInvoiceId,
        userName: userDetails?.name || 'N/A', // Provide default if not found
        userEmail: userDetails?.email, // Email is crucial for Resend
        phone: userDetails?.phone || 'N/A'
      };

      if (!postPaymentData.userEmail) {
        setMessage('ব্যবহারকারীর ইমেইল তথ্য না পাওয়ায় ইমেইল পাঠানো সম্ভব হয়নি। অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।');
        setStatus('error');
        setIsLoading(false);
        return;
      }

      // Use client-side post-payment function
      const handlePostPayment = async () => {
        try {
          const { handleClientSidePostPayment } = await import('@/lib/utils');
          // Ensure userEmail is a string (TypeScript safety)
          const safePostPaymentData = {
            ...postPaymentData,
            userEmail: postPaymentData.userEmail as string
          };
          
          console.log('Sending post-payment request with data:', safePostPaymentData);
          
          const result = await handleClientSidePostPayment(safePostPaymentData);
          
          if (result.success) {
            setMessage(
              `আপনার কোর্স এনরোলমেন্ট সম্পন্ন হয়েছে এবং একটি নিশ্চিতকরণ ইমেইল (${postPaymentData.userEmail}) এ পাঠানো হয়েছে। আপনার ইনভয়েস আইডি: ${currentInvoiceId}`
            );
            setStatus('success');
            localStorage.removeItem('checkoutUserDetails'); // Clean up
            // Store payment success state in localStorage with a 3-day expiration
            const threeDays = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
            const expirationTime = new Date().getTime() + threeDays;
            localStorage.setItem('paymentSuccess', JSON.stringify({
              email: postPaymentData.userEmail,
              expires: expirationTime,
            }));
          } else {
            throw new Error(result.message || 'Unknown error occurred');
          }
        } catch (error) {
          console.error('Error in post-payment processing:', error);
          let errMsg = 'একটি ত্রুটি ঘটেছে। আপনার পেমেন্ট সফল হয়েছে, কিন্তু ইমেইল পাঠাতে সমস্যা হয়েছে।';
          
          if (error instanceof Error) {
            errMsg = error.message;
            setErrorDetails(error.message);
          }
          
          setMessage(`${errMsg} আপনার ইনভয়েস আইডি: ${currentInvoiceId}. অনুগ্রহ করে সাপোর্টে যোগাযোগ করুন।`);
          setStatus('error');
        } finally {
          setIsLoading(false);
        }
      };

      handlePostPayment();
    } else {
      setMessage('ইনভয়েস আইডি পাওয়া যায়নি। পেমেন্ট স্ট্যাটাস যাচাই করা যাচ্ছে না।');
      setStatus('error');
      setIsLoading(false);
    }
  }, [searchParams]);

  // WhatsApp support link
  const whatsappNumber = '01744136934';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=আমার পেমেন্ট সফল হয়েছে, কিন্তু সমস্যা হচ্ছে। আমার ইনভয়েস আইডি: ${invoiceId}`;
  const courseAreaSupportLink = `https://wa.me/${whatsappNumber}?text=কোর্স এরিয়া অ্যাক্সেস করতে সমস্যা হচ্ছে। আমার ইনভয়েস আইডি: ${invoiceId}`;

  const renderStatus = () => {
    if (isLoading) {
      return <p className="font-hind-siliguri text-lg">আপনার তথ্য প্রসেস করা হচ্ছে...</p>;
    }
    if (status === 'success') {
      return (
        <>
          <MailCheck className="mb-6 h-20 w-20 text-green-500" />
          <h1 className="font-hind-siliguri mb-4 text-3xl font-bold md:text-4xl">
            🎉 পেমেন্ট সফল ও ইমেইল পাঠানো হয়েছে!
          </h1>
          <div className="font-hind-siliguri mb-8 max-w-2xl text-muted-foreground space-y-4">
            <p className="text-lg">{message}</p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h3 className="font-semibold text-blue-800 mb-2">📧 ইমেইল সম্পর্কে গুরুত্বপূর্ণ তথ্য:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• আপনার ইনবক্স চেক করুন - নিশ্চিতকরণ ইমেইল পাঠানো হয়েছে</li>
                <li>• <strong>স্প্যাম/জাঙ্ক ফোল্ডার অবশ্যই চেক করুন</strong> - কখনো কখনো ইমেইল সেখানে চলে যায়</li>
                <li>• কোর্স অ্যাক্সেস লিঙ্ক ইমেইলে দেওয়া থাকবে</li>
                <li>• ইমেইল না পেলে নিচের WhatsApp সাপোর্টে যোগাযোগ করুন</li>
              </ul>
            </div>
          </div>
        </>
      );
    }
    if (status === 'error') {
      return (
        <>
          <AlertTriangle className="mb-6 h-20 w-20 text-destructive" />
          <h1 className="font-hind-siliguri mb-4 text-3xl font-bold md:text-4xl">
            একটি সমস্যা হয়েছে
          </h1>
          <p className="font-hind-siliguri mb-8 max-w-xl text-muted-foreground">
            {message}
          </p>
          {errorDetails && (
            <p className="font-hind-siliguri mb-4 text-sm text-destructive">
              সমস্যার বিবরণ: {errorDetails}
            </p>
          )}
          {/* Add WhatsApp Contact Button for errors */}
          <div className="mt-4">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp এ যোগাযোগ করুন
              </a>
            </Button>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="font-hind-siliguri text-sm text-yellow-800">
                <strong>দয়া করে স্প্যাম ফোল্ডার চেক করুন!</strong> ইমেইল সেখানে থাকতে পারে।
              </p>
            </div>
          </div>
        </>
      );
    }
    // Fallback for pending or other states, though ideally covered by isLoading
    return <CheckCircle className="mb-6 h-20 w-20 text-green-500" />;
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-background py-16 md:py-24">
      <GridBackground />
      <div className="container relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {renderStatus()}
        {!isLoading && (
          <div className="mt-8 space-y-4 w-full max-w-md">
            {status === 'success' && (
              <>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700 font-hind-siliguri text-lg py-6">
                  <Link href="https://vibeacademy.app/course-area" target="_blank" rel="noopener noreferrer">
                    📚 কোর্স এরিয়াতে প্রবেশ করুন
                  </Link>
                </Button>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-green-800 mb-2">কোর্স এরিয়া সম্পর্কে:</h4>
                  <p className="text-sm text-green-700 mb-3">
                    কোর্স এরিয়াতে লগইন করতে আপনার ক্রয়ের সময় ব্যবহৃত ইমেইল দিন। 
                    যেকোনো সমস্যার জন্য নিচের সাপোর্ট বোতামে ক্লিক করুন।
                  </p>
                  <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                    <a href={courseAreaSupportLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      কোর্স এরিয়া সাপোর্ট
                    </a>
                  </Button>
                </div>
              </>
            )}
            
            {/* Add a temporary message for local storage status */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="font-hind-siliguri text-sm text-yellow-800">
                <strong>Note:</strong> Course access is temporarily stored in your browser for 3 days.
              </p>
            </div>
            
            {status === 'error' && (
              <p className="mt-6 text-sm text-center">
                কোনো সমস্যা হলে <a href={`tel:${whatsappNumber}`} className="text-[#5D28E0] font-bold">{whatsappNumber}</a> নম্বরে যোগাযোগ করুন
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-background py-16 md:py-24">
      <GridBackground />
      <div className="container relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="font-hind-siliguri text-lg">লোড হচ্ছে...</p>
      </div>
    </section>
  );
}

// Main page component with Suspense boundary
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
