import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import { formatDisplayDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Bookings" };

const STATUS_STYLE: Record<string, { label: string; bg: string; color: string }> = {
  confirmed: { label: "Confirmed", bg: "hsl(140 55% 30% / 0.12)", color: "hsl(140 55% 25%)" },
  pending:   { label: "Pending",   bg: "hsl(42 85% 58% / 0.12)",  color: "hsl(35 85% 38%)" },
  cancelled: { label: "Cancelled", bg: "hsl(0 60% 42% / 0.12)",   color: "hsl(0 60% 35%)" },
};

const PAYMENT_STYLE: Record<string, { label: string; color: string }> = {
  paid:   { label: "Paid",    color: "hsl(140 55% 30%)" },
  unpaid: { label: "Unpaid",  color: "hsl(42 85% 48%)" },
  failed: { label: "Failed",  color: "hsl(0 60% 45%)" },
};

type Booking = {
  id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string | null;
  check_in: string;
  check_out: string;
  guests: number;
  total_lkr: number;
  status: string;
  payment_status: string;
  created_at: string;
  rooms: { name: string }[] | null;
};

export default async function AdminBookingsPage() {
  const supabase = await createServerClient();
    const { data: bookings } = await supabase
    .from("bookings")
    .select("*, rooms(name)")
    .order("created_at", { ascending: false });

  const rows = (bookings ?? []) as unknown as Booking[];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Bookings
        </h1>
        <p className="text-sm text-[hsl(43_35%_50%)] mt-1">
          {rows.length} total booking{rows.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{
          background: "hsl(220 25% 12%)",
          borderColor: "hsl(42 85% 58% / 0.1)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="All bookings">
            <thead>
              <tr style={{ background: "hsl(220 25% 9%)" }}>
                {["#", "Guest", "Room", "Check-in", "Check-out", "Guests", "Amount", "Status", "Payment"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap"
                    style={{ color: "hsl(43_35%_45%)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "hsl(42 85% 58% / 0.06)" }}>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-16 text-center text-[hsl(43_35%_40%)] text-sm">
                    No bookings yet.
                  </td>
                </tr>
              )}
              {rows.map((b, idx) => {
                const s = STATUS_STYLE[b.status] ?? STATUS_STYLE["pending"]!;
                const p = PAYMENT_STYLE[b.payment_status] ?? PAYMENT_STYLE["unpaid"]!;
                return (
                  <tr
                    key={b.id}
                    className="hover:bg-[hsl(43_35%_80%/0.03)] transition-colors"
                  >
                    <td className="px-4 py-4 text-[hsl(43_35%_40%)] text-xs font-mono">
                      {rows.length - idx}
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-white font-medium text-sm">{b.guest_name}</p>
                      <p className="text-[hsl(43_35%_45%)] text-xs">{b.guest_email}</p>
                      {b.guest_phone && (
                        <p className="text-[hsl(43_35%_40%)] text-xs">{b.guest_phone}</p>
                      )}
                    </td>
                    <td className="px-4 py-4 text-[hsl(43_35%_65%)] text-xs whitespace-nowrap">
                      {b.rooms?.[0]?.name ?? "—"}
                    </td>
                    <td className="px-4 py-4 text-[hsl(43_35%_65%)] text-xs whitespace-nowrap">
                      {formatDisplayDate(b.check_in)}
                    </td>
                    <td className="px-4 py-4 text-[hsl(43_35%_65%)] text-xs whitespace-nowrap">
                      {formatDisplayDate(b.check_out)}
                    </td>
                    <td className="px-4 py-4 text-[hsl(43_35%_65%)] text-xs text-center">
                      {b.guests}
                    </td>
                    <td className="px-4 py-4 text-white text-xs font-semibold whitespace-nowrap">
                      LKR {Number(b.total_lkr).toLocaleString("en-LK")}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap"
                        style={{ background: s.bg, color: s.color }}
                      >
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="text-xs font-semibold"
                        style={{ color: p.color }}
                      >
                        {p.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
