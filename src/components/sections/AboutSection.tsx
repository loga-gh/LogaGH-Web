"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function AboutSection() {
    const { t } = useLanguage();

    return (
        <section
            id="about"
            className="py-16 md:py-24 lg:py-32 bg-[#F8F5F0] text-[#1E3A5F] overflow-hidden"
            aria-label="About Loga Guest House"
        >
            <div className="container-luxury">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
                    {/* Story Content */}
                    <div className="order-2 lg:order-1 relative z-10">
                        <div className="inline-flex items-center gap-4 mb-6">
                            <span className="w-12 h-px bg-[#2F5D50]"></span>
                            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#2F5D50]">
                                {t("about.eyebrow")}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-serif leading-[1.15] text-[#1E3A5F]">
                            {t("about.title")}
                        </h2>
                        <div className="space-y-6 text-base md:text-lg text-[#1E3A5F]/80 leading-relaxed font-light">
                            <p>
                                {t("about.p1")}
                            </p>
                            <p>
                                {t("about.p2")}
                            </p>
                        </div>
                        
                        <div className="mt-12 pt-12 border-t border-[#D6C3A3]/40 grid grid-cols-2 gap-6 md:gap-8">
                            <div>
                                <h4 className="text-2xl md:text-3xl font-serif text-[#D6C3A3] mb-3">{t("about.serenity")}</h4>
                                <p className="text-sm md:text-base text-[#1E3A5F]/70 leading-relaxed">{t("about.serenityDesc")}</p>
                            </div>
                            <div>
                                <h4 className="text-2xl md:text-3xl font-serif text-[#D6C3A3] mb-3">{t("about.culture")}</h4>
                                <p className="text-sm md:text-base text-[#1E3A5F]/70 leading-relaxed">{t("about.cultureDesc")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Collage */}
                    <div className="order-1 lg:order-2 relative w-full max-w-md mx-auto lg:max-w-none">
                        <div className="relative aspect-[4/5] rounded-tl-[80px] rounded-br-[80px] md:rounded-tl-[120px] md:rounded-br-[120px] overflow-hidden shadow-2xl">
                            <Image
                                src="/assets/Enterance.jpeg"
                                alt="Loga Guest House Entrance"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        {/* Secondary Image - Hidden on mobile to prevent overflow, visible on tablet+ */}
                        <div className="absolute -bottom-8 -left-8 lg:-bottom-12 lg:-left-12 w-3/5 aspect-square rounded-tr-[60px] rounded-bl-[60px] overflow-hidden shadow-2xl border-8 border-[#F8F5F0] hidden md:block z-20">
                            <Image
                                src="/assets/garden.png"
                                alt="Lush Garden"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                sizes="33vw"
                            />
                        </div>
                        
                        {/* Decorative Kolam/Accent Background */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 border-[1px] border-[#D6C3A3] rounded-full opacity-30 -z-10 hidden md:block"></div>
                        <div className="absolute -bottom-10 -right-4 w-32 h-32 border-[1px] border-[#D6C3A3] rounded-full opacity-30 -z-10 hidden md:block"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
