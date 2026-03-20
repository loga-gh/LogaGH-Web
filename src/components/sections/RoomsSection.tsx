import Link from "next/link";
import { RoomCard } from "@/components/ui/RoomCard";
import { SAMPLE_ROOMS } from "@/lib/sample-data";

export function RoomsSection() {
    const featuredRooms = SAMPLE_ROOMS.filter((r) => r.is_active).slice(0, 3);

    return (
        <section
            className="py-24 overflow-hidden"
            style={{ background: "hsl(43 35% 96%)" }}
            aria-labelledby="rooms-heading"
        >
            <div className="container-luxury">
                {/* Header */}
                <div className="text-center mb-14">
                    <p className="section-eyebrow mb-3">Accommodation</p>

                    <div className="divider-gold max-w-xs mx-auto mb-4" aria-hidden="true">
                        <span
                            className="text-lg"
                            style={{ color: "hsl(42, 85%, 58%)", fontFamily: "var(--font-great-vibes)" }}
                        >
                            ✦
                        </span>
                    </div>

                    <h2
                        id="rooms-heading"
                        className="text-4xl sm:text-5xl font-bold mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Rooms & Suites
                    </h2>
                    <p className="text-base text-[hsl(35_8%_45%)] max-w-xl mx-auto leading-relaxed">
                        Each of our rooms tells a story — of Dutch-colonial grandeur, Tamil artisanship,
                        and the serene rhythm of Jaffna life.
                    </p>
                </div>

                {/* Room grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {featuredRooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>

                {/* View all CTA */}
                <div className="text-center">
                    <Link
                        href="/rooms"
                        className="btn btn-outline text-[hsl(220_25%_8%)] border-[hsl(35_8%_70%)]"
                        id="rooms-view-all-btn"
                    >
                        View All Rooms & Pricing
                    </Link>
                </div>
            </div>
        </section>
    );
}
