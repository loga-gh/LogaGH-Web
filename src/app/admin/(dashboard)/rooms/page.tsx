import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import { BedDouble, Users, Maximize2, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = { title: "Rooms" };

type Room = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price_lkr: number;
  price_usd: number;
  size_sqft: number;
  max_guests: number;
  beds: string;
  is_active: boolean;
};

export default async function AdminRoomsPage() {
  const supabase = await createServerClient();
  let rooms = null;
  try {
    const { data } = await supabase
      .from("rooms")
      .select("*")
      .order("price_lkr", { ascending: true });
    rooms = data;
  } catch (err) {
    // Ignore fetch errors from mock Supabase endpoint
  }

  const rows = (rooms ?? []) as Room[];

  return (
    <div className="p-8 space-y-8 text-[#F8F5F0]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[hsl(42_85%_58%/0.1)]">
        <div>
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Configured Accommodations
          </h1>
          <p className="text-sm text-[hsl(43_35%_60%)] mt-1 font-light">
            {rows.length} room type{rows.length !== 1 ? "s" : ""} currently set up.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            className="text-xs font-semibold px-4 py-2.5 rounded-xl border border-[hsl(43_35%_80%/0.15)] text-[hsl(43_35%_80%)] hover:bg-[hsl(43_35%_80%/0.08)] transition-all duration-300"
          >
            Sync Metadata
          </button>
          <button
            type="button"
            className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-[hsl(42_85%_58%)] text-[hsl(220_25%_8%)] hover:bg-[hsl(42_85%_65%)] transition-all duration-300 shadow-sm"
          >
            + Add New Room
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rows.length === 0 && (
          <div
            className="col-span-full rounded-2xl border py-16 text-center text-sm font-light text-[hsl(43_35%_45%)]"
            style={{
              background: "hsl(220 25% 12%)",
              borderColor: "hsl(42 85% 58% / 0.08)",
            }}
          >
            No room types configured. Add entries via Supabase Studio or dashboard options.
          </div>
        )}
        {rows.map((room) => (
          <div
            key={room.id}
            className="rounded-2xl border overflow-hidden transition-all duration-300 hover:border-[hsl(42_85%_58%/0.3)] hover:shadow-lg"
            style={{
              background: "hsl(220 25% 12%)",
              borderColor: "hsl(42 85% 58% / 0.08)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: "hsl(42 85% 58% / 0.05)" }}
            >
              <div>
                <p className="text-base font-bold text-white">{room.name}</p>
                <p className="text-[10px] text-[hsl(43_35%_50%)] uppercase tracking-wider mt-0.5 font-medium">
                  {room.category.replace(/_/g, " ")}
                </p>
              </div>
              {room.is_active ? (
                <span
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                  style={{ background: "hsl(140 55% 30% / 0.15)", color: "hsl(140 75% 70%)" }}
                >
                  <CheckCircle size={10} aria-hidden="true" /> Active
                </span>
              ) : (
                <span
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                  style={{ background: "hsl(0 60% 42% / 0.15)", color: "hsl(0 85% 75%)" }}
                >
                  <XCircle size={10} aria-hidden="true" /> Inactive
                </span>
              )}
            </div>

            {/* Details */}
            <div className="px-5 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[hsl(43_35%_55%)] text-xs font-light">Rate Per Night</span>
                <span className="text-[#FBBF24] text-base font-extrabold">
                  LKR {Number(room.price_lkr).toLocaleString("en-LK")}
                </span>
              </div>

              <div className="flex gap-4 border-t border-b border-[hsl(42_85%_58%/0.04)] py-3">
                <div className="flex items-center gap-1.5 text-xs text-[hsl(43_35%_60%)] font-light">
                  <Users size={12} className="text-[hsl(42_85%_58%)]" aria-hidden="true" />
                  {room.max_guests} Guests
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[hsl(43_35%_60%)] font-light">
                  <BedDouble size={12} className="text-[hsl(42_85%_58%)]" aria-hidden="true" />
                  {room.beds}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[hsl(43_35%_60%)] font-light">
                  <Maximize2 size={12} className="text-[hsl(42_85%_58%)]" aria-hidden="true" />
                  {room.size_sqft} ft²
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[hsl(43_35%_45%)] font-mono text-[10px]">
                  ID: #{room.id?.split("-")[0]?.toUpperCase() ?? room.slug}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`/rooms/${room.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold hover:underline text-[hsl(42_85%_58%)]"
                    aria-label={`View ${room.name} on live site`}
                  >
                    View Live →
                  </a>
                  <button className="text-[10px] font-semibold px-3 py-1.5 rounded-lg bg-[hsl(43_35%_80%/0.06)] hover:bg-[hsl(43_35%_80%/0.12)] text-white transition-colors border border-[hsl(43_35%_80%/0.1)]">
                    Edit Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
