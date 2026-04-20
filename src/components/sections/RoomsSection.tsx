import { RoomCard } from "@/components/ui/RoomCard";
import { SAMPLE_ROOMS } from "@/lib/sample-data";

export function RoomsSection() {
    const featuredRooms = SAMPLE_ROOMS.filter((r) => r.is_active).slice(0, 3);

    return (
        <section
            id="rooms"
            className="py-24 overflow-hidden bg-[#F8F5F0]"
            aria-labelledby="rooms-heading"
        >
            <div className="container-luxury">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <span className="w-12 h-px bg-[#2F5D50]" aria-hidden="true" />
                        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#2F5D50]">
                            Accommodation
                        </span>
                        <span className="w-12 h-px bg-[#2F5D50]" aria-hidden="true" />
                    </div>

                    <h2
                        id="rooms-heading"
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#1E3A5F] drop-shadow-sm"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Rooms & Suites
                    </h2>
                    <p className="text-base md:text-lg text-[#1E3A5F]/70 max-w-2xl mx-auto leading-relaxed font-light">
                        Each of our rooms tells a story — combining traditional craftsmanship
                        with modern comfort, offering a serene retreat after a day of exploration.
                    </p>
                </div>

                {/* Room grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredRooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
        </section>
    );
}
