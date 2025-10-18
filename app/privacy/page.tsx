import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="relative bg-[#5D28E0] py-12 text-white">
        <div className="absolute inset-0 z-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10" />
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-hind-siliguri text-3xl font-bold md:text-4xl">Privacy & Refund Policy</h1>
          <p className="font-hind-siliguri mt-2 text-sm md:text-base">Last Updated: July 14, 2025</p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <div className="rounded-xl border-2 border-[#5D28E0] bg-white p-8 shadow-lg">
            <h2 className="font-hind-siliguri mb-4 text-2xl font-bold">Privacy Policy</h2>
            <p className="font-hind-siliguri mb-4">Your privacy is important to us. This Privacy Policy explains how Vibe Academy collects, uses, and protects your personal data when you use our website vibeacademy.app and our services.</p>
            <p className="font-hind-siliguri mb-4">We collect personal data that you voluntarily provide to us when you register on the website, make a purchase, or contact us. This may include your name, email address, payment information, and any other information you choose to provide.</p>
            <p className="font-hind-siliguri mb-4">We use the collected information to: provide and maintain our services, process transactions, send you important updates and marketing communications (from which you can opt-out), improve our website and services, and comply with legal obligations.</p>
            <p className="font-hind-siliguri mb-4">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We do not sell or rent your personal data to third parties.</p>
            <p className="font-hind-siliguri mb-4">By using our website, you consent to the collection and use of your information as described in this Privacy Policy. If you have any questions about this policy, please contact us at vibevibeacademybangla@gmail.com.</p>

            <h2 className="font-hind-siliguri mb-4 mt-6 text-2xl font-bold">Terms of Service</h2>
            <h2 className="font-hind-siliguri mb-4 text-2xl font-bold">1. Use of the Website</h2>
            <p className="font-hind-siliguri mb-4">You must be at least 18 years old or have parental permission to access and use our content.</p>
            <p className="font-hind-siliguri mb-4">You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others.</p>

            <h2 className="font-hind-siliguri mb-4 mt-6 text-2xl font-bold">2. Account Registration</h2>
            <p className="font-hind-siliguri mb-4">To access certain features or enroll in courses, you may need to create an account.</p>
            <p className="font-hind-siliguri mb-4">You are responsible for maintaining the confidentiality of your account and password.</p>
            <p className="font-hind-siliguri mb-4">All information provided during registration must be accurate and current.</p>

            <h2 className="font-hind-siliguri mb-4 mt-6 text-2xl font-bold">3. Course Access and License</h2>
            <p className="font-hind-siliguri mb-4">When you purchase a course, you are granted a non-transferable, non-exclusive license to access the content for personal, educational use only.</p>
            <p className="font-hind-siliguri mb-4">You may not share, resell, copy, or distribute any course materials without written permission.</p>

            <h2 className="font-hind-siliguri mb-4 mt-6 text-2xl font-bold">4. Payment and Refund Policy</h2>
            <p className="font-hind-siliguri mb-4">All payments for courses are processed securely. By purchasing a course, you agree to the price listed at the time of purchase.</p>

            <div className="rounded-xl border-2 border-red-500 bg-white p-8 shadow-lg">
              <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">AI Agent Automation Course Money-Back Guarantee</h3>
              <p className="font-hind-siliguri mb-4">At Vibe Academy, we stand behind the quality and impact of our AI Agent Automation Course. We've designed this course to be highly practical, hands-on, and result-driven — built with real-world use cases using n8n.</p>
              <p className="font-hind-siliguri mb-4">That's why we offer a 100% money-back guarantee — but only if you've genuinely completed and applied the course, and still feel that it didn't provide value to you.</p>
              <p className="font-hind-siliguri mb-4">This policy is here to protect you, the sincere learner — but also to protect us from misuse.</p>

              <h3 className="font-hind-siliguri mb-4 mt-6 text-xl font-bold">No Income Guarantee</h3>
              <p className="font-hind-siliguri mb-4">We do not guarantee that you will earn money from this course. Results vary based on individual effort, time invested, skills, knowledge, and various market factors outside our control. The course provides educational content and tools, but success depends on your implementation and other external factors.</p>

              <h4 className="font-hind-siliguri mb-4 mt-6 text-lg font-bold">Refund Request Deadline</h4>
              <p className="font-hind-siliguri mb-4">You must submit your refund request within 2 days (48 hours) of purchasing the course.</p>
              <p className="font-hind-siliguri mb-4">Due to the downloadable and recorded nature of our digital products, refunds cannot be processed after 48 hours from the time of purchase.</p>
              <p className="font-hind-siliguri mb-4">If a refund is claimed, your 1-year n8n access will be revoked.</p>
              <p className="font-hind-siliguri mb-4">Email your request to: vibevibeacademybangla@gmail.com</p>
              <p className="font-hind-siliguri mb-4">Include all necessary proof and attachments in your first message</p>
              <p className="font-hind-siliguri mb-4">We will review your refund request within 3–5 business days and approve it only if all conditions are met without exceptions.</p>

            </div>

            <h2 className="font-hind-siliguri mb-4 mt-6 text-2xl font-bold">5. Intellectual Property</h2>
            <p className="font-hind-siliguri mb-4">All content on vibeacademy.app, including videos, graphics, text, logos, and course materials, are the property of Hype Corporation and are protected by copyright and intellectual property laws.</p>
            <p className="font-hind-siliguri mb-4">You may not use our content for commercial purposes without explicit written consent.</p>

            <h2 className="font-hind-siliguri mb-4 mt-6 text-2xl font-bold">6. Prohibited Conduct</h2>
            <p className="font-hind-siliguri mb-4">You agree not to:</p>
            <ul className="font-hind-siliguri list-disc pl-6">
              <li>Violate any local, national, or international law.</li>
              <li>Attempt to hack, disable, or interfere with the website.</li>
              <li>Harass, abuse, or harm other users or team members.</li>
            </ul>

            <h2 className="font-hind-siliguri mb-4 mt-6 text-2xl font-bold">7. Limitation of Liability</h2>
            <p className="font-hind-siliguri mb-4">Hype Corporation is not liable for:</p>
            <ul className="font-hind-siliguri list-disc pl-6">
              <li>Any direct, indirect, or incidental damages resulting from the use of our services.</li>
              <li>Technical issues, interruptions, or unauthorized access to your data.</li>
            </ul>

            <h2 className="font-hind-siliguri mb-4 mt-6 text-2xl font-bold">8. Modifications to the Service</h2>
            <p className="font-hind-siliguri mb-4">We reserve the right to modify or discontinue any part of the website or courses at any time, without notice.</p>

            <h2 className="font-hind-siliguri mb-4 mt-6 text-2xl font-bold">9. Changes to Terms</h2>
            <p className="font-hind-siliguri mb-4">These Terms may be updated from time to time. It is your responsibility to review them periodically. Continued use of the site constitutes your acceptance of any changes.</p>

            <h2 className="font-hind-siliguri mb-4 mt-6 text-2xl font-bold">10. Governing Law</h2>
            <p className="font-hind-siliguri mb-4">These Terms shall be governed by and construed in accordance with the laws of Bangladesh.</p>

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
