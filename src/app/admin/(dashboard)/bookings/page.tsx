import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import { formatDisplayDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Bookings" };

const STATUS_STYLE: Record<string, { label: string; bg: string; color: string }> = {
  confirmed: { label: "Confirmed", bg: "hsl(140 55% 30% / 0.15)", color: "hsl(140 75% 70%)" },
  pending:   { label: "Pending",   bg: "hsl(42 85% 58% / 0.15)",  color: "hsl(42 95% 65%)" },
  cancelled: { label: "Cancelled", bg: "hsl(0 60% 42% / 0.15)",   color: "hsl(0 85% 75%)" },
};

const PAYMENT_STYLE: Record<string, { label: string; color: string }> = {
  paid:   { label: "Paid",    color: "hsl(140 65% 48%)" },
  unpaid: { label: "Unpaid",  color: "hsl(42 85% 58%)" },
  failed: { label: "Failed",  color: "hsl(0 75% 65%)" },
};

type Booking = {
  id: string;
  room_id: string;
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
  let bookings = null;
  try {
    const { data } = await supabase
      .from("bookings")
      .select("*, rooms(name)")
      .order("created_at", { ascending: false });
    bookings = data;
  } catch (err) {
    // Ignore fetch errors from mock Supabase endpoint
  }

  const rows = (bookings ?? []) as unknown as Booking[];

  return (
    <div className="p-8 space-y-8 text-[#F8F5F0]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[hsl(42_85%_58%/0.1)]">
        <div>
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Bookings Ledger
          </h1>
          <p className="text-sm text-[hsl(43_35%_60%)] mt-1 font-light">
            {rows.length} total booking{rows.length !== 1 ? "s" : ""} recorded in the system.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            className="text-xs font-semibold px-4 py-2.5 rounded-xl border border-[hsl(43_35%_80%/0.15)] text-[hsl(43_35%_80%)] hover:bg-[hsl(43_35%_80%/0.08)] transition-all duration-300"
          >
            Export CSV
          </button>
          <button
            type="button"
            className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-[hsl(42_85%_58%)] text-[hsl(220_25%_8%)] hover:bg-[hsl(42_85%_65%)] transition-all duration-300 shadow-sm"
          >
            + Add Booking
          </button>
        </div>
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          background: "hsl(220 25% 12%)",
          borderColor: "hsl(42 85% 58% / 0.08)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left" aria-label="All bookings">
            <thead>
              <tr style={{ background: "hsl(220 25% 9%)" }} className="border-b border-[hsl(42_85%_58%/0.05)]">
                {["Booking ID", "Guest Information", "Room", "Check-in", "Check-out", "Guests", "Amount", "Status", "Payment"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-4 text-xs font-bold tracking-wider uppercase text-[hsl(43_35%_45%)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "hsl(42 85% 58% / 0.05)" }}>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-16 text-center text-[hsl(43_35%_45%)] text-sm font-light">
                    No bookings found.
                  </td>
                </tr>
              )}
              {rows.map((b) => {
                const s = STATUS_STYLE[b.status] ?? STATUS_STYLE["pending"]!;
                const p = PAYMENT_STYLE[b.payment_status] ?? PAYMENT_STYLE["unpaid"]!;
                return (
                  <tr
                    key={b.id}
                    className="hover:bg-[hsl(43_35%_80%/0.02)] transition-colors"
                  >
                    <td className="px-4 py-4 text-[hsl(43_35%_65%)] text-xs font-mono uppercase font-semibold">
                      #{b.id.split("-")[0]}
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-white font-semibold text-sm">{b.guest_name}</p>
                      <p className="text-[hsl(43_35%_50%)] text-xs font-light">{b.guest_email}</p>
                      {b.guest_phone && (
                        <p className="text-[hsl(43_35%_40%)] text-xs mt-0.5 font-light">{b.guest_phone}</p>
                      )}
                    </td>
                    <td className="px-4 py-4 text-[hsl(43_35%_65%)] text-sm whitespace-nowrap">
                      {b.rooms?.[0]?.name ?? "—"}
                    </td>
                    <td className="px-4 py-4 text-[hsl(43_35%_65%)] text-xs whitespace-nowrap">
                      {formatDisplayDate(b.check_in)}
                    </td>
                    <td className="px-4 py-4 text-[hsl(43_35%_65%)] text-xs whitespace-nowrap">
                      {formatDisplayDate(b.check_out)}
                    </td>
                    <td className="px-4 py-4 text-[hsl(43_35%_65%)] text-xs text-center font-medium">
                      {b.guests}
                    </td>
                    <td className="px-4 py-4 text-white text-sm font-bold whitespace-nowrap">
                      LKR {Number(b.total_lkr).toLocaleString("en-LK")}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap inline-flex items-center gap-1.5"
                        style={{ background: s.bg, color: s.color }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="text-xs font-bold whitespace-nowrap"
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
