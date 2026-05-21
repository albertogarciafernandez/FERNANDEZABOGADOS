import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import HowItWorks from "@/components/landing/HowItWorks";
import Services from "@/components/landing/Services";
import DisruptiveFeatures from "@/components/landing/DisruptiveFeatures";
import AIEngine from "@/components/landing/AIEngine";
import Pricing from "@/components/landing/Pricing";
import TrustSection from "@/components/landing/TrustSection";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050508]">
      <Header />
      <Hero />
      <Stats />
      <HowItWorks />
      <Services />
      <DisruptiveFeatures />
      <AIEngine />
      <Pricing />
      <TrustSection />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
