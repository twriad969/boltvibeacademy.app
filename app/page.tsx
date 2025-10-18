import { HeroSection } from '@/components/HeroSection';
import { Outline } from '@/components/Outline';
import { Lessons } from '@/components/Lessons';
import { FAQs } from '@/components/FAQs';
import { CheckoutForm } from '@/components/CheckoutForm';
import { Footer } from '@/components/Footer';
import { CourseMessage } from '@/components/CourseMessage';
import ReviewsByStudent from '@/components/ReviewsByStudent';
import { FeatureHighlights } from '@/components/FeatureHighlights';
import { MobileCheckoutButton } from '@/components/MobileCheckoutButton';
import { CourseAudience } from '@/components/CourseAudience';
import { Instructor } from '@/components/Instructor';
import { ValueBundle } from '@/components/ValueBundle';
import { N8nIntroAndOffer } from '@/components/N8nIntroAndOffer';
import Curriculum from './curriculum';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <Outline />
      <N8nIntroAndOffer />
      <CourseAudience />
      <Lessons />
      <Instructor />
      <ReviewsByStudent />
      <ValueBundle />
      <CheckoutForm />
      <FAQs />
      <Footer />
      <MobileCheckoutButton />
    </main>
  );
}
