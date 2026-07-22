import { Cta } from "@/components/cta";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SocialProof } from "@/components/social-proof";
import { Testimonials } from "@/components/testimonials";
import { WhyChooseUs } from "@/components/why-choose-us";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <SocialProof />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <Cta />
    </main>
  );
}
