"use client";

import { Star, Quote } from "lucide-react";
import { SAMPLE_TESTIMONIALS } from "@/lib/sample-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function TestimonialsSection() {
    const { t } = useLanguage();
    const featured = SAMPLE_TESTIMONIALS.filter((t) => t.is_featured);

    return (
        <section
            className="relative py-24 overflow-hidden bg-[#1E3A5F]"
            aria-labelledby="testimonials-heading"
        >
            <div className="container-luxury relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="w-8 h-px bg-[#D6C3A3]" aria-hidden="true" />
                        <span className="text-sm font-semibold tracking-widest uppercase text-[#D6C3A3]">
                            {t("testimonials.eyebrow")}
                        </span>
                        <span className="w-8 h-px bg-[#D6C3A3]" aria-hidden="true" />
                    </div>
                    <h2
                        id="testimonials-heading"
                        className="text-[#F8F5F0] text-4xl md:text-5xl font-bold mb-6 font-serif"
                    >
                        {t("testimonials.title")}
                    </h2>
                    <p className="text-[#F8F5F0]/80 max-w-2xl mx-auto leading-relaxed text-lg">
                        {t("testimonials.subtitle")}
                    </p>
                </div>

                {/* Testimonial cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featured.map((testimonial, idx) => (
                        <blockquote
                            key={testimonial.id}
                            className="relative bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col backdrop-blur-sm shadow-lg transition-transform duration-300 hover:-translate-y-2"
                            style={{ animationDelay: `${idx * 0.15}s` }}
                        >
                            {/* Quote icon */}
                            <div className="mb-6">
                                <Quote
                                    size={32}
                                    className="text-[#D6C3A3] opacity-40"
                                    fill="currentColor"
                                    aria-hidden="true"
                                />
                            </div>

                            {/* Stars */}
                            <div
                                className="flex gap-1 mb-6"
                                aria-label={`${testimonial.rating} out of 5 stars`}
                            >
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={
                                            i < testimonial.rating
                                                ? "text-[#D6C3A3] fill-current"
                                                : "text-white/20"
                                        }
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-[#F8F5F0]/90 text-base leading-relaxed mb-8 flex-1 italic">
                                &ldquo;{testimonial.comment}&rdquo;
                            </p>

                            {/* Guest info */}
                            <footer className="flex items-center justify-between border-t border-white/10 pt-6">
                                <div>
                                    <cite className="not-italic text-[#F8F5F0] font-semibold text-base">
                                        {testimonial.guest_name}
                                    </cite>
                                    <p className="text-[#D6C3A3] text-sm mt-1">
                                        {testimonial.guest_country}
                                    </p>
                                </div>
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-[#D6C3A3]/20 text-[#D6C3A3]"
                                    aria-hidden="true"
                                >
                                    {testimonial.guest_name.charAt(0)}
                                </div>
                            </footer>
                        </blockquote>
                    ))}
                </div>
            </div>
        </section>
    );
}
