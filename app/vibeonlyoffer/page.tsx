import { OfferCheckoutForm } from "@/components/OfferCheckoutForm";
import { FAQs } from "@/components/FAQs"; // Import FAQs

export default function OfferPage() {
  return (
    <main>
      <OfferCheckoutForm />
      <FAQs /> {/* Render FAQs component */}
    </main>
  );
}
