import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { BookingWidget } from "@/components/ui/BookingWidget";
import { SAMPLE_ROOMS } from "@/lib/sample-data";
import {
    formatPriceLKR,
    formatPriceUSD,
    roomCategoryLabel,
} from "@/lib/utils";
import { Users, Maximize2, Bed, Star, Check, ArrowLeft } from "lucide-react";

// SAMPLE — Replace with Supabase calls when DB is ready

interface RoomPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
    const { slug } = await params;
    const room = SAMPLE_ROOMS.find((r) => r.slug === slug);
    if (!room) return { title: "Room Not Found" };

    return {
        title: room.name,
        description: room.description.slice(0, 160),
        openGraph: {
            images: [{ url: room.thumbnail, alt: room.name }],
        },
    };
}

export async function generateStaticParams() {
    return SAMPLE_ROOMS.map((r) => ({ slug: r.slug }));
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
    const { slug } = await params;
    const room = SAMPLE_ROOMS.find((r) => r.slug === slug);
    if (!room) notFound();

    return (
        <>
            <Navbar />
            <main id="main-content">
                {/* Header image strip */}
                <div className="relative h-[60vh] overflow-hidden">
                    <Image
                        src={room.images[0] ?? room.thumbnail}
                        alt={`${room.name} — Loga Guest House`}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_25%_8%/0.8)] via-[hsl(220_25%_8%/0.3)] to-transparent" />

                    {/* Back link */}
                    <div className="absolute top-24 left-0 right-0">
                        <div className="container-luxury">
                            <Link
                                href="/rooms"
                                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[hsl(42_85%_58%)] transition-colors"
                            >
                                <ArrowLeft size={14} aria-hidden="true" />
                                All Rooms
                            </Link>
                        </div>
                    </div>

                    {/* Overlay info */}
                    <div className="absolute bottom-8 left-0 right-0">
                        <div className="container-luxury">
                            <span className="badge badge-gold mb-3">{roomCategoryLabel(room.category)}</span>
                            <h1
                                className="text-4xl sm:text-5xl font-bold text-white"
                                style={{ fontFamily: "var(--font-playfair)" }}
                            >
                                {room.name}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div
                    className="py-16"
                    style={{ background: "hsl(43 35% 96%)" }}
                >
                    <div className="container-luxury">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                            {/* Left: Room details */}
                            <div className="lg:col-span-2">
                                {/* Specs */}
                                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-[hsl(35_8%_88%)]">
                                    <div className="flex items-center gap-2 text-sm text-[hsl(35_8%_45%)]">
                                        <Maximize2 size={16} aria-hidden="true" className="text-[hsl(42_85%_58%)]" />
                                        <span>{room.size_sqft} sq ft</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[hsl(35_8%_45%)]">
                                        <Users size={16} aria-hidden="true" className="text-[hsl(42_85%_58%)]" />
                                        <span>Up to {room.max_guests} guests</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[hsl(35_8%_45%)]">
                                        <Bed size={16} aria-hidden="true" className="text-[hsl(42_85%_58%)]" />
                                        <span>{room.beds}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[hsl(35_8%_45%)]">
                                        <Star size={16} fill="currentColor" aria-hidden="true" className="text-[hsl(42_85%_58%)]" />
                                        <span>5.0 · Exceptional</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <h2
                                    className="text-2xl font-semibold mb-4"
                                    style={{ fontFamily: "var(--font-playfair)" }}
                                >
                                    About This Room
                                </h2>
                                <p className="text-[hsl(35_8%_35%)] leading-loose mb-10 text-base">
                                    {room.description}
                                </p>

                                {/* Amenities */}
                                <h2
                                    className="text-2xl font-semibold mb-6"
                                    style={{ fontFamily: "var(--font-playfair)" }}
                                >
                                    Amenities
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                                    {room.amenities.map((amenity) => (
                                        <div key={amenity} className="flex items-center gap-2 text-sm text-[hsl(35_8%_40%)]">
                                            <Check size={14} className="text-[hsl(42_85%_58%)] shrink-0" aria-hidden="true" />
                                            {amenity}
                                        </div>
                                    ))}
                                </div>

                                {/* Image gallery */}
                                {room.images.length > 1 && (
                                    <>
                                        <h2
                                            className="text-2xl font-semibold mb-6"
                                            style={{ fontFamily: "var(--font-playfair)" }}
                                        >
                                            Room Gallery
                                        </h2>
                                        <div className="grid grid-cols-2 gap-3">
                                            {room.images.map((img, i) => (
                                                <div
                                                    key={i}
                                                    className="relative aspect-[4/3] rounded-xl overflow-hidden"
                                                >
                                                    <Image
                                                        src={img}
                                                        alt={`${room.name} — photo ${i + 1}`}
                                                        fill
                                                        sizes="(max-width: 768px) 50vw, 33vw"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Right: Sticky booking sidebar */}
                            <aside>
                                <div
                                    className="sticky top-28 bg-white rounded-2xl shadow-[0_8px_32px_hsl(220_25%_8%/0.12)] border border-[hsl(35_8%_90%)] p-6"
                                    aria-label="Booking panel"
                                >
                                    {/* Price */}
                                    <div className="mb-5">
                                        <p className="text-xs text-[hsl(35_8%_50%)] uppercase tracking-wider mb-1">
                                            Starting from
                                        </p>
                                        <p className="text-3xl font-bold text-gradient-gold">
                                            {formatPriceLKR(room.price_lkr)}
                                        </p>
                                        <p className="text-sm text-[hsl(35_8%_50%)] mt-0.5">
                                            ≈ {formatPriceUSD(room.price_usd)} per night
                                        </p>
                                    </div>

                                    <div className="h-px bg-[hsl(35_8%_90%)] mb-5" role="separator" />

                                    {/* Booking widget */}
                                    <BookingWidget variant="inline" defaultRoomId={room.id} />

                                    <p className="text-xs text-center text-[hsl(35_8%_55%)] mt-4">
                                        Free cancellation up to 48 hours before check-in
                                    </p>

                                    <div className="h-px bg-[hsl(35_8%_90%)] my-5" role="separator" />

                                    {/* Contact to book */}
                                    <div className="text-center">
                                        <p className="text-xs text-[hsl(35_8%_50%)] mb-3">
                                            Prefer to book directly?
                                        </p>
                                        <Link
                                            href="/contact"
                                            className="btn btn-ghost text-sm w-full border border-[hsl(35_8%_80%)]"
                                            id={`room-${room.slug}-contact-btn`}
                                        >
                                            Send an Inquiry
                                        </Link>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
