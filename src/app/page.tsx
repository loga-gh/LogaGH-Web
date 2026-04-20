import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { NearbySection } from "@/components/sections/NearbySection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";

export const metadata: Metadata = {
  title: "Loga Guest House — A Quiet Escape in the Heart of Sri Lanka",
  description:
    "Experience authentic Sri Lankan heritage hospitality at Loga Guest House. Boutique luxury rooms blending peaceful environment with warm tradition.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <RoomsSection />
        <ExperienceSection />
        <NearbySection />
        <GallerySection />
        <TestimonialsSection />
        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
