import Image from "next/image";
import { Users, Maximize2, Bed, Star } from "lucide-react";
import { cn, roomCategoryLabel } from "@/lib/utils";
import type { Room } from "@/lib/types";

interface RoomCardProps {
    room: Room;
    className?: string;
    featured?: boolean;
}

export function RoomCard({ room, className, featured = false }: RoomCardProps) {
    return (
        <article
            className={cn("bg-white border border-[#D6C3A3]/40 rounded-2xl overflow-hidden shadow-md group", className)}
            aria-label={`${room.name} room details`}
        >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                    src={room.thumbnail}
                    alt={`${room.name} — Loga Guest House`}
                    fill
                    sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/60 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#F8F5F0]/90 text-[#2F5D50] backdrop-blur-sm shadow-sm">
                        {roomCategoryLabel(room.category)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-3" aria-label="5 star rating">
                    {Array.from({ length: 5 }, (_, i) => (
                        <Star
                            key={i}
                            size={14}
                            className="fill-[#D6C3A3] text-[#D6C3A3]"
                            aria-hidden="true"
                        />
                    ))}
                </div>

                <h3
                    className="text-2xl font-bold mb-3 group-hover:text-[#2F5D50] transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    {room.name}
                </h3>

                <p className="text-sm leading-relaxed mb-6 text-[#1E3A5F]/70">
                    {room.description.slice(0, 110)}…
                </p>

                {/* Room specs */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-[#1E3A5F]/80">
                    <span className="flex items-center gap-1.5">
                        <Maximize2 size={14} aria-hidden="true" />
                        <span>{room.size_sqft} sq ft</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Users size={14} aria-hidden="true" />
                        <span>Up to {room.max_guests}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Bed size={14} aria-hidden="true" />
                        <span>{room.beds}</span>
                    </span>
                </div>

                {/* Top amenities */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {room.amenities.slice(0, 3).map((amenity) => (
                        <span
                            key={amenity}
                            className="text-xs px-2.5 py-1 rounded-full bg-[#F8F5F0] text-[#1E3A5F]/70 border border-[#D6C3A3]/30"
                        >
                            {amenity}
                        </span>
                    ))}
                    {room.amenities.length > 3 && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-[#F8F5F0] text-[#1E3A5F]/70 border border-[#D6C3A3]/30">
                            +{room.amenities.length - 3}
                        </span>
                    )}
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                    <a
                        href={`https://wa.me/94770000000?text=I'm interested in the ${room.name}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn w-full text-center bg-[#1E3A5F] text-[#F8F5F0] hover:bg-[#1E3A5F]/90"
                    >
                        Enquire Availability
                    </a>
                </div>
            </div>
        </article>
    );
}

export default RoomCard;
