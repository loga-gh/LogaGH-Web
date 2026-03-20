"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Search } from "lucide-react";
import { cn, today, tomorrow } from "@/lib/utils";

interface BookingWidgetProps {
    className?: string;
    variant?: "hero" | "inline";
    defaultRoomId?: string;
}

export function BookingWidget({
    className,
    variant = "hero",
    defaultRoomId = "",
}: BookingWidgetProps) {
    const router = useRouter();
    const [checkIn, setCheckIn] = useState(today());
    const [checkOut, setCheckOut] = useState(tomorrow());
    const [guests, setGuests] = useState(2);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        const params = new URLSearchParams({
            check_in: checkIn,
            check_out: checkOut,
            guests: guests.toString(),
            ...(defaultRoomId ? { room_id: defaultRoomId } : {}),
        });
        router.push(`/rooms?${params.toString()}`);
    };

    const isHero = variant === "hero";

    return (
        <form
            onSubmit={handleSearch}
            className={cn(
                "flex flex-col sm:flex-row items-end gap-3",
                isHero
                    ? "glass rounded-2xl p-4 shadow-[0_8px_32px_hsl(220_25%_8%/0.2)]"
                    : "bg-white rounded-xl p-4 border border-[hsl(35_8%_88%)] shadow-sm",
                className
            )}
            aria-label="Room availability search"
            role="search"
        >
            {/* Check-in */}
            <div className="flex-1 min-w-0">
                <label
                    htmlFor="widget-check-in"
                    className={cn(
                        "flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase mb-1.5",
                        isHero ? "text-[hsl(42_85%_58%)]" : "text-[hsl(35_8%_45%)]"
                    )}
                >
                    <Calendar size={12} aria-hidden="true" />
                    Check-in
                </label>
                <input
                    id="widget-check-in"
                    type="date"
                    value={checkIn}
                    min={today()}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className={cn(
                        "w-full px-3 py-2 rounded-lg text-sm font-medium outline-none transition-colors",
                        isHero
                            ? "bg-white/90 border border-[hsl(42_85%_58%/0.2)] text-[hsl(220_25%_8%)] focus:border-[hsl(42_85%_58%)]"
                            : "bg-[hsl(43_35%_96%)] border border-[hsl(35_8%_88%)] text-[hsl(220_25%_8%)] focus:border-[hsl(42_85%_58%)]"
                    )}
                    aria-label="Check-in date"
                />
            </div>

            {/* Check-out */}
            <div className="flex-1 min-w-0">
                <label
                    htmlFor="widget-check-out"
                    className={cn(
                        "flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase mb-1.5",
                        isHero ? "text-[hsl(42_85%_58%)]" : "text-[hsl(35_8%_45%)]"
                    )}
                >
                    <Calendar size={12} aria-hidden="true" />
                    Check-out
                </label>
                <input
                    id="widget-check-out"
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className={cn(
                        "w-full px-3 py-2 rounded-lg text-sm font-medium outline-none transition-colors",
                        isHero
                            ? "bg-white/90 border border-[hsl(42_85%_58%/0.2)] text-[hsl(220_25%_8%)] focus:border-[hsl(42_85%_58%)]"
                            : "bg-[hsl(43_35%_96%)] border border-[hsl(35_8%_88%)] text-[hsl(220_25%_8%)] focus:border-[hsl(42_85%_58%)]"
                    )}
                    aria-label="Check-out date"
                />
            </div>

            {/* Guests */}
            <div className="w-28 shrink-0">
                <label
                    htmlFor="widget-guests"
                    className={cn(
                        "flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase mb-1.5",
                        isHero ? "text-[hsl(42_85%_58%)]" : "text-[hsl(35_8%_45%)]"
                    )}
                >
                    <Users size={12} aria-hidden="true" />
                    Guests
                </label>
                <select
                    id="widget-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className={cn(
                        "w-full px-3 py-2 rounded-lg text-sm font-medium outline-none transition-colors appearance-none cursor-pointer",
                        isHero
                            ? "bg-white/90 border border-[hsl(42_85%_58%/0.2)] text-[hsl(220_25%_8%)] focus:border-[hsl(42_85%_58%)]"
                            : "bg-[hsl(43_35%_96%)] border border-[hsl(35_8%_88%)] text-[hsl(220_25%_8%)] focus:border-[hsl(42_85%_58%)]"
                    )}
                    aria-label="Number of guests"
                >
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                            {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                    ))}
                </select>
            </div>

            {/* Search Button */}
            <button
                type="submit"
                disabled={isSearching}
                className="btn btn-gold shrink-0 px-6 py-2.5 text-sm"
                id="widget-search-btn"
                aria-label="Search available rooms"
            >
                <Search size={15} aria-hidden="true" />
                {isSearching ? "Searching…" : "Search Rooms"}
            </button>
        </form>
    );
}

export default BookingWidget;
