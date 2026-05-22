import Image from "next/image";
import Link from "next/link";
import { TypingBookingButton } from "../ui/TypingBookingButton";

export function HeroSection() {
    return (
        <section
            className="relative min-h-dvh flex flex-col justify-end overflow-hidden"
            aria-label="Hero section — Welcome to Loga Guest House"
        >
            {/* Background image — main photo */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/top-front-view.jpeg"
                    alt="Loga Guest House exterior — A quiet escape in Sri Lanka"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                    quality={90}
                />
                {/* Multi-layer gradient overlay for readability */}
                <div className="absolute inset-0 bg-[#1E3A5F]/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/90 via-[#1E3A5F]/50 to-transparent" />
            </div>

            {/* Hero content */}
            <div className="relative z-10 container-luxury pb-24 pt-32 flex flex-col items-center text-center">
                <div className="max-w-4xl flex flex-col items-center">
                    {/* Logo Image */}
                    <div 
                        className="mb-8 opacity-0 animate-fade-in-up flex flex-col items-center"
                        style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
                    >
                        <img 
                            src="/logo.png" 
                            alt="Loga Guest House Logo" 
                            className="h-28 md:h-36 w-auto object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Eyebrow */}
                    <div
                        className="inline-flex items-center gap-2 mb-6 opacity-0 animate-fade-in-up"
                        style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
                    >
                        <span className="w-12 h-px bg-[#D6C3A3]" aria-hidden="true" />
                        <span className="text-sm font-semibold tracking-widest uppercase text-[#D6C3A3]">
                            Welcome to Sri Lanka
                        </span>
                        <span className="w-12 h-px bg-[#D6C3A3]" aria-hidden="true" />
                    </div>

                    {/* Headline */}
                    <h1
                        className="text-5xl md:text-6xl lg:text-8xl font-bold text-[#F8F5F0] leading-[1.05] mb-6 md:mb-8 opacity-0 animate-fade-in-up"
                        style={{
                            fontFamily: "var(--font-serif)",
                            animationDelay: "0.25s",
                            animationFillMode: "forwards",
                            textShadow: "0 4px 12px rgba(0,0,0,0.3)"
                        }}
                    >
                        Welcome to Loga Guest House in Mallakam
                    </h1>

                    {/* Sub-headline */}
                    <p
                        className="text-base md:text-xl lg:text-2xl text-[#F8F5F0]/90 max-w-2xl mb-10 md:mb-12 leading-relaxed opacity-0 animate-fade-in-up font-light tracking-wide"
                        style={{ 
                            animationDelay: "0.4s", 
                            animationFillMode: "forwards",
                            textShadow: "0 2px 8px rgba(0,0,0,0.4)"
                        }}
                    >
                        Where nature, comfort and culture come together.
                    </p>

                    {/* CTA buttons */}
                    <div
                        className="flex flex-wrap justify-center items-center gap-4 mb-8 opacity-0 animate-fade-in-up"
                        style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
                    >
                        <TypingBookingButton />
                        <a
                            href="#rooms"
                            className="btn px-8 py-4 text-base border-2 border-[#F8F5F0]/80 text-[#F8F5F0] hover:bg-[#F8F5F0]/10 hover:border-[#F8F5F0] h-[58px] flex items-center justify-center font-semibold"
                        >
                            Explore Stay
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F8F5F0]/60 opacity-0 animate-fade-in"
                style={{ animationDelay: "1s", animationFillMode: "forwards" }}
                aria-hidden="true"
            >
                <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#D6C3A3]/80 to-transparent" />
            </div>
        </section>
    );
}
