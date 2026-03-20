import { Star, Quote } from "lucide-react";
import { SAMPLE_TESTIMONIALS } from "@/lib/sample-data";
import { KolamSVG } from "@/components/ui/KolamSVG";

export function TestimonialsSection() {
    const featured = SAMPLE_TESTIMONIALS.filter((t) => t.is_featured);

    return (
        <section
            className="relative py-24 overflow-hidden"
            style={{ background: "hsl(220 25% 8%)" }}
            aria-labelledby="testimonials-heading"
        >
            {/* Decorative kolam */}
            <div className="absolute top-0 left-0 w-64 opacity-5 pointer-events-none -translate-x-1/4 -translate-y-1/4">
                <KolamSVG size={256} color="hsl(42, 85%, 58%)" />
            </div>
            <div className="absolute bottom-0 right-0 w-64 opacity-5 pointer-events-none translate-x-1/4 translate-y-1/4">
                <KolamSVG size={256} color="hsl(42, 85%, 58%)" />
            </div>

            <div className="container-luxury relative z-10">
                {/* Header */}
                <div className="text-center mb-14">
                    <p className="section-eyebrow mb-3" style={{ color: "hsl(18 58% 52%)" }}>
                        Guest Stories
                    </p>
                    <div className="divider-gold max-w-xs mx-auto mb-4" aria-hidden="true">
                        <span
                            className="text-lg"
                            style={{ color: "hsl(42, 85%, 58%)", fontFamily: "var(--font-great-vibes)" }}
                        >
                            ✦
                        </span>
                    </div>
                    <h2
                        id="testimonials-heading"
                        className="text-white text-4xl sm:text-5xl font-bold mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Words That Warm
                    </h2>
                    <p className="text-[hsl(43_35%_95%/0.55)] max-w-xl mx-auto leading-relaxed">
                        Our greatest honour is hearing how Loga touched your heart. These are their words.
                    </p>
                </div>

                {/* Testimonial cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featured.map((testimonial, idx) => (
                        <blockquote
                            key={testimonial.id}
                            className="relative glass-night rounded-2xl p-6 flex flex-col"
                            style={{
                                background: "hsl(220 20% 12%)",
                                border: "1px solid hsl(42 85% 58% / 0.12)",
                                animationDelay: `${idx * 0.15}s`,
                            }}
                        >
                            {/* Quote icon */}
                            <div className="mb-4">
                                <Quote
                                    size={28}
                                    className="text-[hsl(42_85%_58%)]"
                                    fill="currentColor"
                                    opacity={0.3}
                                    aria-hidden="true"
                                />
                            </div>

                            {/* Stars */}
                            <div
                                className="flex gap-0.5 mb-4"
                                aria-label={`${testimonial.rating} out of 5 stars`}
                            >
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={
                                            i < testimonial.rating
                                                ? "text-[hsl(42_85%_58%)] fill-current"
                                                : "text-[hsl(43_35%_95%/0.2)]"
                                        }
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-[hsl(43_35%_95%/0.75)] text-sm leading-loose mb-6 flex-1 italic">
                                &ldquo;{testimonial.comment}&rdquo;
                            </p>

                            {/* Guest info */}
                            <footer className="flex items-center justify-between">
                                <div>
                                    <cite className="not-italic text-white font-semibold text-sm">
                                        {testimonial.guest_name}
                                    </cite>
                                    <p className="text-[hsl(42_85%_58%/0.7)] text-xs mt-0.5">
                                        {testimonial.guest_country}
                                        {testimonial.room_name ? ` · ${testimonial.room_name}` : ""}
                                    </p>
                                </div>
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                                    style={{
                                        background: "hsl(42 85% 58% / 0.15)",
                                        color: "hsl(42, 85%, 58%)",
                                    }}
                                    aria-hidden="true"
                                >
                                    {testimonial.guest_name.charAt(0)}
                                </div>
                            </footer>
                        </blockquote>
                    ))}
                </div>

                {/* Rating summary */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-3 glass-night rounded-full px-6 py-3"
                        style={{ background: "hsl(220 20% 12%)", border: "1px solid hsl(42 85% 58% / 0.15)" }}>
                        <div className="flex gap-0.5" aria-hidden="true">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star key={i} size={16} className="text-[hsl(42_85%_58%)] fill-current" />
                            ))}
                        </div>
                        <p className="text-white font-bold text-lg">5.0</p>
                        <span className="text-[hsl(43_35%_95%/0.4)] text-sm">·</span>
                        <p className="text-[hsl(43_35%_95%/0.55)] text-sm">Rated by 200+ guests</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
