import Image from "next/image";
import Link from "next/link";
import { BookingWidget } from "@/components/ui/BookingWidget";
import { KolamSVG } from "@/components/ui/KolamSVG";

export function HeroSection() {
    return (
        <section
            className="relative min-h-dvh flex flex-col justify-end overflow-hidden"
            aria-label="Hero section — Welcome to Loga Guest House"
        >
            {/* Background image — main photo */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/DSC05363.JPG.jpeg"
                    alt="Loga Guest House exterior — Jaffna heritage property"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                    quality={90}
                />
                {/* Multi-layer gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_25%_8%)] via-[hsl(220_25%_8%/0.5)] to-[hsl(220_25%_8%/0.15)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220_25%_8%/0.4)] to-transparent" />
            </div>

            {/* Kolam decorative — top right */}
            <div
                className="absolute top-20 right-8 opacity-15 pointer-events-none animate-float"
                aria-hidden="true"
            >
                <KolamSVG size={220} color="hsl(42, 85%, 58%)" />
            </div>

            {/* Small kolam — bottom left */}
            <div
                className="absolute bottom-36 left-8 opacity-10 pointer-events-none"
                style={{ animation: "float 6s ease-in-out infinite 2s" }}
                aria-hidden="true"
            >
                <KolamSVG size={100} color="hsl(42, 85%, 58%)" />
            </div>

            {/* Hero content */}
            <div className="relative z-10 container-luxury pb-24 pt-32">
                <div className="max-w-3xl">
                    {/* Eyebrow */}
                    <div
                        className="inline-flex items-center gap-2 mb-5 opacity-0 animate-fade-in-up"
                        style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
                    >
                        <span className="w-8 h-px bg-[hsl(42_85%_58%)]" aria-hidden="true" />
                        <span className="text-xs font-bold tracking-[0.25em] uppercase text-[hsl(42_85%_58%)]">
                            Heritage Boutique · Jaffna, Sri Lanka
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 opacity-0 animate-fade-in-up"
                        style={{
                            fontFamily: "var(--font-playfair)",
                            animationDelay: "0.25s",
                            animationFillMode: "forwards",
                        }}
                    >
                        Where Tamil Heritage{" "}
                        <em
                            className="not-italic"
                            style={{
                                fontFamily: "var(--font-great-vibes)",
                                color: "hsl(42, 85%, 58%)",
                                fontSize: "1.15em",
                            }}
                        >
                            Meets
                        </em>
                        <br />
                        Boutique Luxury
                    </h1>

                    {/* Sub-headline */}
                    <p
                        className="text-lg sm:text-xl text-[hsl(43_35%_95%/0.75)] max-w-xl mb-10 leading-relaxed opacity-0 animate-fade-in-up"
                        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
                    >
                        In the heart of Jaffna, a lovingly restored heritage home welcomes you
                        with hand-carved teak, freshly drawn kolam, and the warmth of a culture
                        that has endured for centuries.
                    </p>

                    {/* CTA buttons */}
                    <div
                        className="flex flex-wrap gap-4 mb-14 opacity-0 animate-fade-in-up"
                        style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
                    >
                        <Link
                            href="/rooms"
                            className="btn btn-gold px-8 py-4 text-base"
                            id="hero-explore-rooms-btn"
                        >
                            Explore Rooms
                        </Link>
                        <Link
                            href="/about"
                            className="btn btn-outline px-8 py-4 text-base"
                            style={{ color: "hsl(43 35% 95%)", borderColor: "hsl(43 35% 95% / 0.4)" }}
                            id="hero-our-story-btn"
                        >
                            Our Story
                        </Link>
                    </div>

                    {/* Booking widget */}
                    <div
                        className="opacity-0 animate-fade-in-up"
                        style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
                    >
                        <BookingWidget variant="hero" />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[hsl(43_35%_95%/0.4)] opacity-0 animate-fade-in"
                style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
                aria-hidden="true"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-[hsl(42_85%_58%/0.6)] to-transparent" />
            </div>
        </section>
    );
}
