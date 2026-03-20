import Image from "next/image";
import Link from "next/link";
import { Users, Maximize2, Bed, Star } from "lucide-react";
import { cn, formatPriceLKR, formatPriceUSD, roomCategoryLabel } from "@/lib/utils";
import type { Room } from "@/lib/types";

interface RoomCardProps {
    room: Room;
    className?: string;
    featured?: boolean;
}

export function RoomCard({ room, className, featured = false }: RoomCardProps) {
    return (
        <article
            className={cn("card-heritage group", className)}
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
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_25%_8%/0.6)] via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className="badge badge-gold">
                        {roomCategoryLabel(room.category)}
                    </span>
                </div>

                {/* Price tag */}
                <div className="absolute bottom-3 right-3 glass-night rounded-xl px-3 py-2 text-right">
                    <p className="text-[hsl(42_85%_58%)] font-bold text-lg leading-none">
                        {formatPriceLKR(room.price_lkr)}
                    </p>
                    <p className="text-[hsl(43_35%_95%/0.6)] text-xs mt-0.5">
                        ≈ {formatPriceUSD(room.price_usd)} / night
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-2" aria-label="5 star rating">
                    {Array.from({ length: 5 }, (_, i) => (
                        <Star
                            key={i}
                            size={12}
                            className="star-filled fill-current"
                            aria-hidden="true"
                        />
                    ))}
                </div>

                <h3
                    className="text-xl font-semibold mb-2 group-hover:text-[hsl(38_80%_40%)] transition-colors"
                    style={{ fontFamily: "var(--font-playfair)" }}
                >
                    {room.name}
                </h3>

                <p className="text-sm leading-relaxed mb-4"
                    style={{ color: "hsl(35 8% 45%)" }}>
                    {room.description.slice(0, 110)}…
                </p>

                {/* Room specs */}
                <div className="flex flex-wrap items-center gap-4 mb-5 text-xs"
                    style={{ color: "hsl(35 8% 50%)" }}>
                    <span className="flex items-center gap-1.5">
                        <Maximize2 size={13} aria-hidden="true" />
                        <span>{room.size_sqft} sq ft</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Users size={13} aria-hidden="true" />
                        <span>Up to {room.max_guests} guests</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Bed size={13} aria-hidden="true" />
                        <span>{room.beds}</span>
                    </span>
                </div>

                {/* Top amenities */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {room.amenities.slice(0, 4).map((amenity) => (
                        <span
                            key={amenity}
                            className="text-xs px-2 py-0.5 rounded-full bg-[hsl(43_35%_95%)] text-[hsl(35_8%_40%)]"
                        >
                            {amenity}
                        </span>
                    ))}
                    {room.amenities.length > 4 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(43_35%_95%)] text-[hsl(35_8%_40%)]">
                            +{room.amenities.length - 4} more
                        </span>
                    )}
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                    <Link
                        href={`/rooms/${room.slug}`}
                        className="btn btn-ghost text-sm px-4 py-2.5 flex-1 text-center border border-[hsl(35_8%_80%)]"
                        aria-label={`View details for ${room.name}`}
                    >
                        View Details
                    </Link>
                    <Link
                        href={`/rooms/${room.slug}?book=1`}
                        className="btn btn-gold text-sm px-4 py-2.5 flex-1 text-center"
                        id={`book-${room.slug}-btn`}
                        aria-label={`Book ${room.name}`}
                    >
                        Book Room
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default RoomCard;
