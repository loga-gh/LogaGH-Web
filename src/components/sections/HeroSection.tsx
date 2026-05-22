"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TypingBookingButton } from "../ui/TypingBookingButton";

export function HeroSection() {
    const { t } = useLanguage();

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
                        <p className="inline-flex items-center gap-3 text-[#D6C3A3] text-sm md:text-base tracking-[0.25em] uppercase font-bold drop-shadow-md">
                            <span className="w-8 md:w-12 h-px bg-[#D6C3A3]"></span>
                            {t("hero.eyebrow")}
                            <span className="w-8 md:w-12 h-px bg-[#D6C3A3]"></span>
                        </p>
                    </div>

                    {/* Headline */}
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#F8F5F0] leading-[1.1] mb-6 md:mb-8 opacity-0 animate-fade-in-up drop-shadow-lg"
                        style={{
                            animationDelay: "0.25s",
                            animationFillMode: "forwards"
                        }}
                    >
                        {t("hero.title").split("Loga Guest House").map((part: string, i: number, arr: any[]) => (
                            <span key={i}>
                                {part}
                                {i < arr.length - 1 && (
                                    <span className="text-[#D6C3A3] italic block mt-2 sm:mt-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-script)" }}>
                                        Loga Guest House
                                    </span>
                                )}
                            </span>
                        ))}
                    </h1>

                    {/* Sub-headline */}
                    <p
                        className="text-lg md:text-xl text-[#F8F5F0]/90 font-light max-w-2xl mb-10 md:mb-12 leading-relaxed opacity-0 animate-fade-in-up drop-shadow"
                        style={{ 
                            animationDelay: "0.4s", 
                            animationFillMode: "forwards"
                        }}
                    >
                        {t("hero.subtitle")}
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
                            <span className="relative z-10">{t("hero.explore")}</span>
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
