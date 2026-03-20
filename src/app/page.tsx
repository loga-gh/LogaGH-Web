import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";

export const metadata: Metadata = {
  title: "Loga Guest House — Heritage Luxury in the Heart of Jaffna",
  description:
    "Experience authentic Tamil heritage hospitality at Loga Guest House, Jaffna. Boutique luxury rooms blending Dutch-colonial architecture with warm Sri Lankan tradition. Book direct for the best rates.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <RoomsSection />
        <WhyUsSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
