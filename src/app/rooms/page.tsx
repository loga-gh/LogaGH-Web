import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { RoomCard } from "@/components/ui/RoomCard";
import { BookingWidget } from "@/components/ui/BookingWidget";
import { SAMPLE_ROOMS } from "@/lib/sample-data";
import { KolamSVG } from "@/components/ui/KolamSVG";

// SAMPLE — Replace with Supabase query: supabase.from('rooms').select('*').eq('is_active', true)

export const metadata: Metadata = {
    title: "Rooms & Suites",
    description:
        "Browse Loga Guest House's heritage rooms and suites in Jaffna. From intimate superior rooms to sprawling family suites — all steeped in Tamil culture.",
};

export default function RoomsPage() {
    const rooms = SAMPLE_ROOMS.filter((r) => r.is_active);

    return (
        <>
            <Navbar />
            <main id="main-content">
                {/* Page hero */}
                <section
                    className="relative pt-32 pb-20 overflow-hidden"
                    style={{ background: "hsl(220 25% 8%)" }}
                    aria-label="Rooms page hero"
                >
                    <div className="absolute inset-0 pointer-events-none opacity-5" aria-hidden="true">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "repeating-linear-gradient(45deg, hsl(42 85% 58% / 0.3) 0px, transparent 1px, transparent 40px, hsl(42 85% 58% / 0.3) 41px)",
                            }}
                        />
                    </div>
                    <div className="absolute top-16 right-12 opacity-10 pointer-events-none" aria-hidden="true">
                        <KolamSVG size={200} />
                    </div>

                    <div className="container-luxury relative z-10 text-center">
                        <p className="section-eyebrow mb-4" style={{ color: "hsl(18 58% 52%)" }}>
                            Accommodation
                        </p>
                        <h1
                            className="text-5xl sm:text-6xl font-bold text-white mb-4"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Rooms &{" "}
                            <span className="text-gradient-gold">Suites</span>
                        </h1>
                        <p className="text-[hsl(43_35%_95%/0.6)] max-w-xl mx-auto text-lg leading-relaxed mb-12">
                            Each room at Loga is a curated experience — from hand-carved teak to hand-block-printed
                            linens. Choose your sanctuary.
                        </p>

                        {/* Search widget */}
                        <div className="max-w-3xl mx-auto">
                            <BookingWidget variant="hero" />
                        </div>
                    </div>
                </section>

                {/* Rooms grid */}
                <section
                    className="py-20"
                    style={{ background: "hsl(43 35% 96%)" }}
                    aria-label="All rooms listing"
                >
                    <div className="container-luxury">
                        {/* Category filter pills */}
                        <div className="flex flex-wrap gap-2 mb-10 justify-center" role="group" aria-label="Filter rooms by category">
                            {["All", "Suite", "Deluxe", "Superior", "Family"].map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
                                    style={{
                                        background: cat === "All" ? "hsl(42 85% 58%)" : "transparent",
                                        color: cat === "All" ? "hsl(220 25% 8%)" : "hsl(35 8% 45%)",
                                        borderColor: cat === "All" ? "hsl(42 85% 58%)" : "hsl(35 8% 80%)",
                                    }}
                                    aria-pressed={cat === "All"}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Room grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {rooms.map((room) => (
                                <RoomCard key={room.id} room={room} featured />
                            ))}
                        </div>

                        {rooms.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-[hsl(35_8%_55%)] text-lg">No rooms available for the selected dates.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
