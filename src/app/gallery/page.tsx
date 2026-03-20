"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { KolamSVG } from "@/components/ui/KolamSVG";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryItem = {
    src: string;
    alt: string;
    caption: string;
    category: "all" | "rooms" | "dining" | "garden" | "exterior" | "experience";
    span?: "wide" | "tall" | "normal";
};

const GALLERY_ITEMS: GalleryItem[] = [
    {
        src: "/assets/exterior.jpg",
        alt: "Loga Guest House colonial-era exterior facade at golden hour",
        caption: "The Heritage Exterior",
        category: "exterior",
        span: "wide",
    },
    {
        src: "/assets/suite.jpg",
        alt: "Jaffna Heritage Suite with four-poster bed and kolam floor art",
        caption: "Jaffna Heritage Suite",
        category: "rooms",
        span: "tall",
    },
    {
        src: "/assets/pool.jpg",
        alt: "Outdoor infinity pool surrounded by palmyra palms at sunset",
        caption: "The Garden Pool",
        category: "garden",
    },
    {
        src: "/assets/dining.jpg",
        alt: "Traditional Jaffna breakfast spread with idli, sambar, and chutneys",
        caption: "Authentic Jaffna Breakfast",
        category: "dining",
        span: "wide",
    },
    {
        src: "/assets/deluxe.jpg",
        alt: "Palmyra Deluxe Room with warm terracotta tones and wooden furnishings",
        caption: "Palmyra Deluxe Room",
        category: "rooms",
    },
    {
        src: "/assets/garden.jpg",
        alt: "Lush tropical garden courtyard in the morning light",
        caption: "The Inner Courtyard",
        category: "garden",
        span: "tall",
    },
    {
        src: "/assets/superior.jpg",
        alt: "Lotus Superior Room with serene white linens and garden view",
        caption: "Lotus Superior Room",
        category: "rooms",
    },
    {
        src: "/assets/family.jpg",
        alt: "Nallur Family Suite spacious living area with traditional décor",
        caption: "Nallur Family Suite",
        category: "rooms",
        span: "wide",
    },
];

const CATEGORIES: { id: GalleryItem["category"]; label: string }[] = [
    { id: "all", label: "All" },
    { id: "rooms", label: "Rooms" },
    { id: "dining", label: "Dining" },
    { id: "garden", label: "Garden" },
    { id: "exterior", label: "Exterior" },
    { id: "experience", label: "Experiences" },
];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState<GalleryItem["category"]>("all");
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

    const filtered = GALLERY_ITEMS.filter(
        (item) => activeCategory === "all" || item.category === activeCategory
    );

    const openLightbox = useCallback((idx: number) => {
        setLightboxIdx(idx);
        document.body.style.overflow = "hidden";
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxIdx(null);
        document.body.style.overflow = "";
    }, []);

    const prev = useCallback(() => {
        if (lightboxIdx === null) return;
        setLightboxIdx((lightboxIdx - 1 + filtered.length) % filtered.length);
    }, [lightboxIdx, filtered.length]);

    const next = useCallback(() => {
        if (lightboxIdx === null) return;
        setLightboxIdx((lightboxIdx + 1) % filtered.length);
    }, [lightboxIdx, filtered.length]);

    // Keyboard navigation
    useEffect(() => {
        if (lightboxIdx === null) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightboxIdx, closeLightbox, prev, next]);

    const activeItem = lightboxIdx !== null ? filtered[lightboxIdx] : null;

    return (
        <>
            <Navbar />
            <main id="main-content">

                {/* ── Hero ── */}
                <section
                    className="relative pt-32 pb-16 overflow-hidden"
                    style={{ background: "hsl(220 25% 8%)" }}
                    aria-label="Gallery hero"
                >
                    <div className="absolute top-16 right-12 opacity-10 pointer-events-none" aria-hidden="true">
                        <KolamSVG size={180} />
                    </div>
                    <div className="container-luxury relative z-10 text-center">
                        <p className="section-eyebrow mb-4" style={{ color: "hsl(18 58% 52%)" }}>
                            Visual Journey
                        </p>
                        <h1
                            className="text-5xl sm:text-6xl font-bold text-white mb-4"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Our <span className="text-gradient-gold">Gallery</span>
                        </h1>
                        <p className="text-[hsl(43_35%_95%/0.6)] max-w-md mx-auto leading-relaxed">
                            A glimpse into the spaces, flavours, and moments that make a stay at
                            Loga Guest House unforgettable.
                        </p>
                    </div>
                </section>

                {/* ── Filter Tabs ── */}
                <section style={{ background: "hsl(43 35% 96%)" }}>
                    <div className="container-luxury pt-12 pb-4">
                        <div
                            className="flex gap-2 flex-wrap justify-center"
                            role="tablist"
                            aria-label="Gallery categories"
                        >
                            {CATEGORIES.map(({ id, label }) => (
                                <button
                                    key={id}
                                    role="tab"
                                    aria-selected={activeCategory === id}
                                    onClick={() => setActiveCategory(id)}
                                    className={cn(
                                        "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                                        activeCategory === id
                                            ? "text-[hsl(220_25%_8%)] shadow-md"
                                            : "bg-white border border-[hsl(35_8%_85%)] text-[hsl(35_8%_45%)] hover:border-[hsl(42_85%_58%)] hover:text-[hsl(42_85%_48%)]"
                                    )}
                                    style={
                                        activeCategory === id
                                            ? { background: "linear-gradient(135deg, hsl(42,85%,58%), hsl(35,85%,50%))" }
                                            : {}
                                    }
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Masonry Grid ── */}
                    <div className="container-luxury py-8 pb-20">
                        <div
                            className="grid gap-4"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                                gridAutoRows: "220px",
                            }}
                            role="list"
                            aria-label="Gallery images"
                        >
                            {filtered.map((item, idx) => (
                                <button
                                    key={item.src}
                                    role="listitem"
                                    onClick={() => openLightbox(idx)}
                                    className="relative overflow-hidden rounded-2xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(42_85%_58%)] focus-visible:ring-offset-2"
                                    style={{
                                        gridColumn:
                                            item.span === "wide" ? "span 2" : "span 1",
                                        gridRow:
                                            item.span === "tall" ? "span 2" : "span 1",
                                    }}
                                    aria-label={`Open ${item.caption} in fullscreen`}
                                    id={`gallery-item-${idx}`}
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    {/* Overlay */}
                                    <div
                                        className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                        style={{
                                            background:
                                                "linear-gradient(to top, hsl(220 25% 8% / 0.85), transparent 55%)",
                                        }}
                                        aria-hidden="true"
                                    >
                                        <p className="text-white text-sm font-semibold leading-snug">
                                            {item.caption}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1 text-[hsl(42_85%_70%)] text-xs font-medium">
                                            <ZoomIn size={12} aria-hidden="true" />
                                            <span>View fullscreen</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <p className="text-center py-20 text-[hsl(35_8%_50%)]">
                                No photos in this category yet. Check back soon!
                            </p>
                        )}
                    </div>
                </section>

            </main>
            <Footer />

            {/* ── Lightbox Modal ── */}
            {activeItem && lightboxIdx !== null && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center"
                    style={{ background: "hsl(220 25% 5% / 0.97)" }}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Photo: ${activeItem.caption}`}
                    onClick={closeLightbox}
                >
                    {/* Close */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Close gallery lightbox"
                        id="lightbox-close-btn"
                    >
                        <X size={20} aria-hidden="true" />
                    </button>

                    {/* Prev */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prev(); }}
                        className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Previous photo"
                        id="lightbox-prev-btn"
                    >
                        <ChevronLeft size={24} aria-hidden="true" />
                    </button>

                    {/* Image */}
                    <div
                        className="relative w-[90vw] max-w-5xl h-[80vh] rounded-xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={activeItem.src}
                            alt={activeItem.alt}
                            fill
                            className="object-contain"
                            sizes="90vw"
                            priority
                        />
                    </div>

                    {/* Next */}
                    <button
                        onClick={(e) => { e.stopPropagation(); next(); }}
                        className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Next photo"
                        id="lightbox-next-btn"
                    >
                        <ChevronRight size={24} aria-hidden="true" />
                    </button>

                    {/* Caption */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                        <p className="text-white text-sm font-medium">{activeItem.caption}</p>
                        <p className="text-[hsl(43_35%_80%/0.6)] text-xs mt-0.5">
                            {lightboxIdx + 1} / {filtered.length}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
