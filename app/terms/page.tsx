import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="relative bg-[#5D28E0] py-12 text-white">
        <div className="absolute inset-0 z-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10" />
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-hind-siliguri text-3xl font-bold md:text-4xl">Terms and Conditions</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <div className="rounded-xl border-2 border-[#5D28E0] bg-white p-8 shadow-lg">
            <h2 className="font-hind-siliguri mb-6 text-2xl font-bold">Course Usage Terms and Conditions</h2>
            
            <p className="font-hind-siliguri mb-4">
              Thank you for participating in our n8n AI course. On this page, we are providing information about the terms and conditions of using the course.
            </p>
            
            <div className="mb-8 rounded-lg border-2 border-red-500 bg-red-50 p-4">
              <h3 className="font-hind-siliguri mb-2 text-xl font-bold text-red-600">Very Important Notice</h3>
              <p className="font-hind-siliguri font-semibold text-red-600">
                By purchasing our course, you agree to the following terms and conditions:
              </p>
              <ul className="font-hind-siliguri mt-2 list-inside list-disc text-red-600">
                <li>After purchasing the course, <strong>you will have 2 days to apply for a refund</strong>, after which no refund will be given.</li>
                <li>We <strong>do not guarantee any income</strong> - your success depends entirely on your learning process and application.</li>
                <li>There is no legal or administrative process to question or claim the quality of the course.</li>
                <li>You have sufficient information before purchasing the course and are making this decision consciously.</li>
              </ul>
            </div>

            <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">Action-Based Refund Policy</h3>
            <p className="font-hind-siliguri mb-4">
              You must implement every step on time and provide verifiable proof of your efforts (screenshots, links, etc.). You are required to watch all videos and follow every guideline exactly as shown in the course.
            </p>
            <p className="font-hind-siliguri mb-4">
              This policy is designed not just to offer peace of mind, but to motivate you to take real action—because when you follow the system, it works.
            </p>
            
            <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">Payment and Access</h3>
            
            <p className="font-hind-siliguri mb-4">
              The course fee is a one-time payment, which gives you full access to the course. After purchasing the course, there are no additional fees or monthly charges.
            </p>
            
            <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">Course Content Usage</h3>
            
            <p className="font-hind-siliguri mb-4">
              All course content can only be used for personal educational purposes. Sharing, reselling, or putting the course material on sale is prohibited.
            </p>
            
            <p className="font-hind-siliguri mb-4">
              Downloading our course and selling it online is illegal. We will take legal action against such activities.
            </p>
            
            <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">Complaints and Feedback</h3>
            
            <p className="font-hind-siliguri mb-4">
              We are always trying to improve our course. Your feedback is important, but please review all content before purchasing the course.
            </p>
            
            <p className="font-hind-siliguri mb-4">
              Please ensure that the course is suitable for your needs before purchasing.
            </p>
            
            <div className="mt-8 text-center">
              <Button asChild className="font-hind-siliguri bg-[#5D28E0] hover:bg-[#4A20B5]">
                <Link href="/">Go back to the homepage</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
