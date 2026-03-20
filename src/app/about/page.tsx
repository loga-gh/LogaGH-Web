import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { KolamSVG } from "@/components/ui/KolamSVG";
import {
    Heart,
    Leaf,
    Star,
    Shield,
    Users,
    MapPin,
    Award,
    Coffee,
} from "lucide-react";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Discover the story of Loga Guest House — a heritage boutique retreat in the heart of Jaffna, Sri Lanka, where Tamil culture, warm hospitality, and luxury meet.",
};

const VALUES = [
    {
        icon: Heart,
        title: "Heartfelt Hospitality",
        description:
            "Every guest is welcomed as family. Our team takes pride in anticipating your needs before you voice them.",
        color: "hsl(350 72% 48%)",
        bg: "hsl(350 72% 48% / 0.08)",
    },
    {
        icon: Leaf,
        title: "Sustainable Living",
        description:
            "We source ingredients locally, minimise single‑use plastics, and invest in solar power to honour the land we call home.",
        color: "hsl(140 55% 30%)",
        bg: "hsl(140 55% 30% / 0.08)",
    },
    {
        icon: Star,
        title: "Authentic Heritage",
        description:
            "Our architecture, cuisine, and décor are rooted in Jaffna's rich Tamil culture — nothing here is manufactured for tourists.",
        color: "hsl(42 85% 58%)",
        bg: "hsl(42 85% 58% / 0.08)",
    },
    {
        icon: Shield,
        title: "Safety & Privacy",
        description:
            "Discreet service, secure premises, and CCTV monitoring ensure every guest enjoys complete peace of mind.",
        color: "hsl(220 60% 50%)",
        bg: "hsl(220 60% 50% / 0.08)",
    },
    {
        icon: Users,
        title: "Community First",
        description:
            "We employ locally, collaborate with artisans, and donate a portion of bookings to Jaffna heritage restoration.",
        color: "hsl(18 58% 52%)",
        bg: "hsl(18 58% 52% / 0.08)",
    },
    {
        icon: Coffee,
        title: "Curated Experiences",
        description:
            "From sunrise temple visits to home‑cooked Jaffna feasts, we craft memories that linger long after checkout.",
        color: "hsl(30 70% 40%)",
        bg: "hsl(30 70% 40% / 0.08)",
    },
];

const MILESTONES = [
    { year: "2010", event: "Loga Guest House opens its doors with 3 rooms" },
    { year: "2014", event: "Expanded to 8 rooms; rooftop terrace added" },
    { year: "2017", event: "Awarded Best Heritage Stay — Northern Sri Lanka Tourism" },
    { year: "2020", event: "Full renovation completing the heritage wing" },
    { year: "2023", event: "TripAdvisor Travelers' Choice — Top 5 Jaffna properties" },
    { year: "2025", event: "Launched curated cultural experience packages" },
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main id="main-content">

                {/* ── Hero ── */}
                <section
                    className="relative pt-32 pb-20 overflow-hidden"
                    style={{ background: "hsl(220 25% 8%)" }}
                    aria-label="About page hero"
                >
                    <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at 20% 50%, hsl(42 85% 58%) 0%, transparent 60%), radial-gradient(circle at 80% 50%, hsl(350 72% 48%) 0%, transparent 60%)",
                            }}
                        />
                    </div>
                    <div className="absolute top-20 right-16 opacity-10 pointer-events-none" aria-hidden="true">
                        <KolamSVG size={220} />
                    </div>
                    <div className="absolute bottom-10 left-10 opacity-8 pointer-events-none" aria-hidden="true">
                        <KolamSVG size={120} />
                    </div>

                    <div className="container-luxury relative z-10 text-center">
                        <p className="section-eyebrow mb-4" style={{ color: "hsl(18 58% 52%)" }}>
                            Our Story
                        </p>
                        <h1
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            A Home Away From{" "}
                            <span className="text-gradient-gold">Home</span>
                        </h1>
                        <p className="text-[hsl(43_35%_95%/0.65)] max-w-2xl mx-auto text-lg leading-relaxed">
                            Nestled in the cultural heart of Jaffna, Loga Guest House has been a sanctuary
                            of authentic Tamil hospitality for over a decade — where every stone, scent,
                            and smile tells a story of heritage.
                        </p>
                    </div>
                </section>

                {/* ── Founding Story ── */}
                <section
                    className="py-20"
                    style={{ background: "hsl(43 35% 96%)" }}
                    aria-label="Our founding story"
                >
                    <div className="container-luxury">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <p className="section-eyebrow mb-3">Since 2010</p>
                                <h2
                                    className="text-4xl font-bold mb-6 leading-snug"
                                    style={{ fontFamily: "var(--font-playfair)", color: "hsl(220 25% 8%)" }}
                                >
                                    Where Jaffna&apos;s Soul{" "}
                                    <span className="text-gradient-gold">Lives On</span>
                                </h2>
                                <div className="space-y-4 text-[hsl(35_8%_38%)] leading-relaxed">
                                    <p>
                                        Loga Guest House was born from a simple conviction: that the finest way to
                                        experience Jaffna is through the eyes of those who love it most. Our founders,
                                        rooted in generations of Northern Sri Lankan tradition, transformed their
                                        ancestral home into a boutique retreat that celebrates everything that makes
                                        this city extraordinary.
                                    </p>
                                    <p>
                                        Every room is named after a cultural landmark or natural wonder of Jaffna.
                                        The architecture preserves original Jaffna Dutch‑colonial arches and hand‑laid
                                        terracotta floors, while the interior blends heirloom antiques with modern
                                        comforts — air conditioning, high‑speed Wi‑Fi, and premium linens included.
                                    </p>
                                    <p>
                                        Guests who stay here don&apos;t merely visit Jaffna — they become a part of it,
                                        if only for a few precious nights.
                                    </p>
                                </div>
                                <div className="mt-8 flex gap-4 flex-wrap">
                                    <Link href="/rooms" className="btn btn-gold">
                                        Explore Our Rooms
                                    </Link>
                                    <Link href="/contact" className="btn btn-outline">
                                        Get in Touch
                                    </Link>
                                </div>
                            </div>

                            {/* Image collage */}
                            <div className="relative h-[520px]">
                                <div className="absolute top-0 left-0 w-[68%] h-[62%] rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/assets/exterior.jpg"
                                        alt="Loga Guest House exterior showing Dutch-colonial architecture"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 w-[58%] h-[55%] rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/assets/dining.jpg"
                                        alt="Traditional Jaffna breakfast spread at Loga Guest House"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 35vw"
                                    />
                                </div>
                                {/* Stat pill */}
                                <div
                                    className="absolute top-[52%] left-[56%] z-10 px-5 py-3 rounded-xl shadow-xl text-center"
                                    style={{ background: "hsl(220 25% 8%)" }}
                                >
                                    <p
                                        className="text-2xl font-bold text-gradient-gold"
                                        style={{ fontFamily: "var(--font-playfair)" }}
                                    >
                                        15+
                                    </p>
                                    <p className="text-xs text-[hsl(43_35%_80%)] mt-0.5 font-medium">
                                        Years of Hospitality
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Milestones ── */}
                <section
                    className="py-20 overflow-hidden"
                    style={{ background: "hsl(220 25% 8%)" }}
                    aria-label="Our journey milestones"
                >
                    <div className="container-luxury">
                        <div className="text-center mb-14">
                            <p className="section-eyebrow mb-3" style={{ color: "hsl(18 58% 52%)" }}>
                                Our Journey
                            </p>
                            <h2
                                className="text-4xl font-bold text-white"
                                style={{ fontFamily: "var(--font-playfair)" }}
                            >
                                A Decade of <span className="text-gradient-gold">Milestones</span>
                            </h2>
                        </div>

                        <ol className="relative border-l-2 border-[hsl(42_85%_58%/0.3)] ml-4 space-y-10" aria-label="Timeline of milestones">
                            {MILESTONES.map(({ year, event }, i) => (
                                <li key={year} className="pl-8 relative">
                                    <div
                                        className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2"
                                        style={{
                                            background: i % 2 === 0 ? "hsl(42 85% 58%)" : "hsl(18 58% 52%)",
                                            borderColor: "hsl(220 25% 8%)",
                                        }}
                                        aria-hidden="true"
                                    />
                                    <time
                                        dateTime={year}
                                        className="text-xs font-bold tracking-widest uppercase"
                                        style={{ color: "hsl(42 85% 58%)" }}
                                    >
                                        {year}
                                    </time>
                                    <p className="text-[hsl(43_35%_90%)] mt-1 text-sm leading-relaxed">
                                        {event}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* ── Values ── */}
                <section
                    className="py-20"
                    style={{ background: "hsl(43 35% 96%)" }}
                    aria-label="Our values"
                >
                    <div className="container-luxury">
                        <div className="text-center mb-14">
                            <p className="section-eyebrow mb-3">What We Stand For</p>
                            <h2
                                className="text-4xl font-bold"
                                style={{ fontFamily: "var(--font-playfair)", color: "hsl(220 25% 8%)" }}
                            >
                                Our <span className="text-gradient-gold">Core Values</span>
                            </h2>
                        </div>
                        <ul
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            role="list"
                            aria-label="Values list"
                        >
                            {VALUES.map(({ icon: Icon, title, description, color, bg }) => (
                                <li
                                    key={title}
                                    className="card-heritage p-7 group hover:-translate-y-1 transition-transform duration-300"
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                        style={{ background: bg, color }}
                                        aria-hidden="true"
                                    >
                                        <Icon size={22} />
                                    </div>
                                    <h3
                                        className="text-base font-bold mb-2"
                                        style={{ color: "hsl(220 25% 8%)" }}
                                    >
                                        {title}
                                    </h3>
                                    <p className="text-sm text-[hsl(35_8%_42%)] leading-relaxed">
                                        {description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ── Location Highlights ── */}
                <section
                    className="py-20 overflow-hidden"
                    style={{ background: "white" }}
                    aria-label="Location highlights"
                >
                    <div className="container-luxury">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <p className="section-eyebrow mb-3">Prime Location</p>
                                <h2
                                    className="text-4xl font-bold mb-6 leading-snug"
                                    style={{ fontFamily: "var(--font-playfair)", color: "hsl(220 25% 8%)" }}
                                >
                                    At the Heart of{" "}
                                    <span className="text-gradient-gold">Jaffna</span>
                                </h2>
                                <p className="text-[hsl(35_8%_38%)] leading-relaxed mb-8">
                                    Situated in one of Jaffna&apos;s most peaceful neighbourhoods, Loga Guest House
                                    places you minutes away from the city&apos;s greatest attractions, yet far
                                    enough to enjoy the quiet of a private retreat.
                                </p>
                                <ul className="space-y-4" role="list" aria-label="Nearby attractions">
                                    {[
                                        ["Nallur Kandaswamy Temple", "5 min drive"],
                                        ["Jaffna Fort (Dutch Fort)", "8 min drive"],
                                        ["Jaffna Public Library", "6 min drive"],
                                        ["Casuarina Beach", "25 min drive"],
                                        ["Jaffna Market (Chundikuli)", "4 min drive"],
                                        ["KKS Harbour", "30 min drive"],
                                    ].map(([place, distance]) => (
                                        <li key={place} className="flex items-center gap-3">
                                            <MapPin
                                                size={16}
                                                style={{ color: "hsl(42 85% 58%)" }}
                                                className="shrink-0"
                                                aria-hidden="true"
                                            />
                                            <span className="text-sm text-[hsl(220 25% 12%)] font-medium">
                                                {place}
                                            </span>
                                            <span className="ml-auto text-xs text-[hsl(35_8%_55%)] font-medium">
                                                {distance}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/assets/pool.jpg"
                                    alt="Serene outdoor pool surrounded by tropical palms at Loga Guest House"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background:
                                            "linear-gradient(to top, hsl(220 25% 8% / 0.5), transparent 60%)",
                                    }}
                                    aria-hidden="true"
                                />
                                <div className="absolute bottom-6 left-6">
                                    <p
                                        className="text-white text-2xl font-bold"
                                        style={{ fontFamily: "var(--font-playfair)" }}
                                    >
                                        Jaffna, Sri Lanka
                                    </p>
                                    <p className="text-[hsl(43_35%_90%/0.8)] text-sm mt-1">
                                        Northern Province · 40000
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Awards ── */}
                <section
                    className="py-16"
                    style={{ background: "hsl(43 35% 96%)" }}
                    aria-label="Awards and recognition"
                >
                    <div className="container-luxury text-center">
                        <p className="section-eyebrow mb-3">Recognition</p>
                        <h2
                            className="text-3xl font-bold mb-12"
                            style={{ fontFamily: "var(--font-playfair)", color: "hsl(220 25% 8%)" }}
                        >
                            Honoured by <span className="text-gradient-gold">Travellers</span>
                        </h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            {[
                                { icon: Award, label: "Best Heritage Stay", sub: "Northern Sri Lanka Tourism, 2017" },
                                { icon: Star, label: "Travelers' Choice", sub: "TripAdvisor Top 5 Jaffna, 2023" },
                                { icon: Shield, label: "4.9 / 5 Rating", sub: "Based on 320+ verified reviews" },
                            ].map(({ icon: Icon, label, sub }) => (
                                <div
                                    key={label}
                                    className="card-heritage p-8 flex flex-col items-center gap-3 min-w-[200px] flex-1 max-w-[270px]"
                                >
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center"
                                        style={{ background: "hsl(42 85% 58% / 0.1)", color: "hsl(42 85% 58%)" }}
                                        aria-hidden="true"
                                    >
                                        <Icon size={26} />
                                    </div>
                                    <p className="font-semibold text-sm text-[hsl(220 25% 8%)]">{label}</p>
                                    <p className="text-xs text-[hsl(35_8%_50%)]">{sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section
                    className="py-20"
                    style={{ background: "hsl(220 25% 8%)" }}
                    aria-label="Call to action"
                >
                    <div className="container-luxury text-center">
                        <KolamSVG size={80} color="hsl(42 85% 58% / 0.15)" className="mx-auto mb-6" />
                        <h2
                            className="text-4xl font-bold text-white mb-4"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Ready to Experience <span className="text-gradient-gold">Jaffna?</span>
                        </h2>
                        <p className="text-[hsl(43_35%_90%/0.6)] mb-8 max-w-md mx-auto">
                            Book your stay at Loga Guest House and let us show you the Jaffna we love.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link href="/rooms" className="btn btn-gold px-10">
                                Browse Rooms
                            </Link>
                            <Link href="/contact" className="btn btn-ghost">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
