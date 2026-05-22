"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const GALLERY_IMAGES = [
    { src: "/assets/Enterance2.jpeg", alt: "Loga Guest House Entrance", style: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto min-h-[300px] md:min-h-[600px]" },
    { src: "/assets/bed3.jpeg", alt: "Comfortable Bedroom", style: "md:col-span-1 md:row-span-1 aspect-[4/3] md:aspect-auto md:min-h-[290px]" },
    { src: "/assets/front-view.jpeg", alt: "Front View of Property", style: "md:col-span-1 md:row-span-1 aspect-[4/3] md:aspect-auto md:min-h-[290px]" },
    { src: "/assets/dinning.png", alt: "Dining Area", style: "md:col-span-2 md:row-span-1 aspect-[16/9] md:aspect-auto md:min-h-[290px]" },
    { src: "/assets/garden.png", alt: "Lush Green Garden", style: "md:col-span-2 md:row-span-1 aspect-[16/9] md:aspect-auto md:min-h-[290px]" },
    { src: "/assets/sideview.jpeg", alt: "Side View of Guest House", style: "md:col-span-1 md:row-span-1 aspect-[4/3] md:aspect-auto md:min-h-[290px]" },
    { src: "/assets/hall.png", alt: "Elegant Heritage Hall", style: "md:col-span-1 md:row-span-1 aspect-[4/3] md:aspect-auto md:min-h-[290px]" },
    { src: "/assets/top-view-house.jpeg", alt: "Aerial View of the Property", style: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto min-h-[300px] md:min-h-[600px]" },
];

export function GallerySection() {
    const { t } = useLanguage();

    return (
        <section
            id="gallery"
            className="py-32 relative overflow-hidden bg-[#F8F5F0]"
            aria-labelledby="gallery-heading"
        >
            <div className="container-luxury max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <span className="w-12 h-[1px] bg-[#D6C3A3]" aria-hidden="true" />
                        <span className="text-sm font-semibold tracking-[0.25em] uppercase text-[#D6C3A3]">
                            {t("gallery.eyebrow")}
                        </span>
                        <span className="w-12 h-[1px] bg-[#D6C3A3]" aria-hidden="true" />
                    </div>
                    <h2
                        id="gallery-heading"
                        className="text-4xl md:text-6xl font-bold mb-6 text-[#1E3A5F] drop-shadow-sm"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {t("gallery.title")}
                    </h2>
                    <p className="text-lg text-[#1E3A5F]/70 max-w-2xl mx-auto leading-relaxed">
                        {t("gallery.subtitle")}
                    </p>
                </div>

                {/* Premium Bento Grid Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                    {GALLERY_IMAGES.map((img, i) => (
                        <div
                            key={i}
                            className={`relative overflow-hidden rounded-xl group cursor-pointer shadow-lg border border-[#D6C3A3]/20 ${img.style}`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                            />
                            
                            {/* Inner Glass border effect on hover */}
                            <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-colors duration-500 z-10 pointer-events-none rounded-lg" />
                            
                            {/* Elegant Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/90 via-[#1E3A5F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Caption Text */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                <span className="text-[#FBBF24] text-xs font-bold tracking-[0.2em] uppercase mb-2">
                                    Loga Guest House
                                </span>
                                <h3 className="text-[#F8F5F0] text-xl md:text-2xl font-serif font-medium drop-shadow-md">
                                    {img.alt}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
