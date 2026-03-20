import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { KolamSVG } from "@/components/ui/KolamSVG";

export function ContactCTASection() {
    return (
        <section
            className="relative py-24 overflow-hidden"
            style={{
                background: "linear-gradient(135deg, hsl(220 25% 8%) 0%, hsl(220 20% 14%) 100%)",
            }}
            aria-labelledby="contact-cta-heading"
        >
            {/* Kolam decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
                    <KolamSVG size={600} color="hsl(42, 85%, 58%)" strokeWidth={1} />
                </div>
            </div>

            {/* Gold top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(42_85%_58%/0.5)] to-transparent" />

            <div className="container-luxury relative z-10 text-center">
                <p className="section-eyebrow mb-4" style={{ color: "hsl(18 58% 52%)" }}>
                    Reserve Your Stay
                </p>

                <h2
                    id="contact-cta-heading"
                    className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                    style={{ fontFamily: "var(--font-playfair)" }}
                >
                    Ready to Experience{" "}
                    <span
                        style={{
                            fontFamily: "var(--font-great-vibes)",
                            color: "hsl(42, 85%, 58%)",
                            fontSize: "1.1em",
                        }}
                    >
                        Jaffna
                    </span>
                    ?
                </h2>

                <p className="text-[hsl(43_35%_95%/0.6)] max-w-xl mx-auto text-lg leading-relaxed mb-10">
                    Book direct for the best rates — no agency fees, no hidden charges.
                    Simply a heartfelt welcome from our family to yours.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
                    <Link
                        href="/rooms"
                        className="btn btn-gold px-8 py-4 text-base group"
                        id="cta-book-room-btn"
                    >
                        Book a Room
                        <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                        />
                    </Link>
                    <Link
                        href="/contact"
                        className="btn btn-outline text-white px-8 py-4 text-base"
                        style={{ borderColor: "hsl(43 35% 95% / 0.3)" }}
                        id="cta-contact-btn"
                    >
                        Send an Inquiry
                    </Link>
                </div>

                {/* Quick contact */}
                <div className="flex flex-wrap items-center justify-center gap-8">
                    <a
                        href="tel:+94XXXXXXXXX"
                        className="flex items-center gap-2 text-[hsl(43_35%_95%/0.55)] hover:text-[hsl(42_85%_58%)] transition-colors text-sm"
                    >
                        <Phone size={15} aria-hidden="true" />
                        +94 77 XXX XXXX
                    </a>
                    <span className="text-[hsl(43_35%_95%/0.2)] text-xl">·</span>
                    <a
                        href="mailto:logaguesthouse@gmail.com"
                        className="flex items-center gap-2 text-[hsl(43_35%_95%/0.55)] hover:text-[hsl(42_85%_58%)] transition-colors text-sm"
                    >
                        <Mail size={15} aria-hidden="true" />
                        logaguesthouse@gmail.com
                    </a>
                    <span className="text-[hsl(43_35%_95%/0.2)] text-xl hidden sm:inline">·</span>
                    <p className="text-[hsl(43_35%_95%/0.55)] text-sm hidden sm:block">
                        Typically responds within 2 hours
                    </p>
                </div>
            </div>
        </section>
    );
}
