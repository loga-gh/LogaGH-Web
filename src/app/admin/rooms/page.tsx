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
  const { data: rooms } = await supabase
    .from("rooms")
    .select("*")
    .order("price_lkr", { ascending: true });

  const rows = (rooms ?? []) as Room[];

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Rooms
          </h1>
          <p className="text-sm text-[hsl(43_35%_50%)] mt-1">
            {rows.length} room{rows.length !== 1 ? "s" : ""} configured
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            className="text-[10px] font-semibold uppercase tracking-wide px-4 py-2 rounded-lg border border-[hsl(43_35%_80%/0.2)] text-[hsl(43_35%_80%)] hover:bg-[hsl(43_35%_80%/0.08)] transition-colors"
          >
            Sync Metadata
          </button>
          <button
            type="button"
            className="text-[10px] font-semibold uppercase tracking-wide px-4 py-2 rounded-lg bg-[hsl(42_85%_58%)] text-[hsl(220_25%_8%)] hover:bg-[hsl(42_85%_65%)] transition-colors shadow-sm"
          >
            + Add New Room
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {rows.length === 0 && (
          <div
            className="col-span-full rounded-xl border py-16 text-center"
            style={{
              background: "hsl(220 25% 12%)",
              borderColor: "hsl(42 85% 58% / 0.1)",
              color: "hsl(43_35%_40%)",
            }}
          >
            No rooms in the database yet. Add them via Supabase Studio or the API.
          </div>
        )}
        {rows.map((room) => (
          <div
            key={room.id}
            className="rounded-xl border overflow-hidden"
            style={{
              background: "hsl(220 25% 12%)",
              borderColor: "hsl(42 85% 58% / 0.1)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: "hsl(42 85% 58% / 0.08)" }}
            >
              <div>
                <p className="text-sm font-semibold text-white">{room.name}</p>
                <p className="text-[10px] text-[hsl(43_35%_45%)] uppercase tracking-wide mt-0.5">
                  {room.category.replace(/_/g, " ")}
                </p>
              </div>
              {room.is_active ? (
                <span
                  className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
                  style={{ background: "hsl(140 55% 30% / 0.15)", color: "hsl(140 55% 35%)" }}
                >
                  <CheckCircle size={10} aria-hidden="true" /> Active
                </span>
              ) : (
                <span
                  className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
                  style={{ background: "hsl(0 60% 42% / 0.12)", color: "hsl(0 60% 45%)" }}
                >
                  <XCircle size={10} aria-hidden="true" /> Inactive
                </span>
              )}
            </div>

            {/* Details */}
            <div className="px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[hsl(43_35%_50%)] text-xs">Price / Night</span>
                <span className="text-white text-sm font-bold">
                  LKR {Number(room.price_lkr).toLocaleString("en-LK")}
                </span>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-xs text-[hsl(43_35%_55%)]">
                  <Users size={12} aria-hidden="true" />
                  {room.max_guests} guests
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[hsl(43_35%_55%)]">
                  <BedDouble size={12} aria-hidden="true" />
                  {room.beds}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[hsl(43_35%_55%)]">
                  <Maximize2 size={12} aria-hidden="true" />
                  {room.size_sqft} ft²
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 mt-2 border-t" style={{ borderColor: "hsl(42 85% 58% / 0.08)" }}>
                <span className="text-[hsl(43_35%_40%)] font-mono text-[10px] pt-1">
                  ID: {room.id?.split("-")[0]?.toUpperCase() ?? room.slug}
                </span>
                <div className="flex items-center gap-3 pt-1">
                  <a
                    href={`/rooms/${room.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-medium hover:underline"
                    style={{ color: "hsl(42 85% 58%)" }}
                    aria-label={`View ${room.name} on public site`}
                  >
                    View public →
                  </a>
                  <button className="text-[10px] font-medium px-3 py-1.5 rounded bg-[hsl(43_35%_80%/0.08)] hover:bg-[hsl(43_35%_80%/0.15)] text-white transition-colors border border-[hsl(43_35%_80%/0.1)]">
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
