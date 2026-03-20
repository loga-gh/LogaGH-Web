import type { Metadata } from "next";
import {
  CalendarCheck,
  BedDouble,
  DollarSign,
  Clock,
} from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDisplayDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats(supabase: Awaited<ReturnType<typeof createServerClient>>) {
  const [
    { count: totalBookings },
    { count: confirmedBookings },
    { count: pendingBookings },
    { data: revenueData },
    { count: totalRooms },
  ] = await Promise.all([
    supabase.from("bookings").select("*", { count: "exact", head: true }),
    supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "confirmed"),
    supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("bookings")
      .select("total_lkr")
      .eq("payment_status", "paid"),
    supabase.from("rooms").select("*", { count: "exact", head: true }),
  ]);

  const totalRevenue = (revenueData ?? []).reduce(
    (sum, b) => sum + Number(b.total_lkr),
    0
  );

  return {
    totalBookings: totalBookings ?? 0,
    confirmedBookings: confirmedBookings ?? 0,
    pendingBookings: pendingBookings ?? 0,
    totalRevenue,
    totalRooms: totalRooms ?? 0,
  };
}

async function getRecentBookings(supabase: Awaited<ReturnType<typeof createServerClient>>) {
  const { data } = await supabase
    .from("bookings")
    .select("id, guest_name, guest_email, check_in, check_out, total_lkr, status, payment_status, rooms(name)")
    .order("created_at", { ascending: false })
    .limit(8);
  return data ?? [];
}

type Booking = {
  id: string;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  total_lkr: number;
  status: string;
  payment_status: string;
  // Supabase returns foreign-key joins as arrays
  rooms: { name: string }[] | null;
};

const STATUS_STYLE: Record<string, { label: string; bg: string; color: string }> = {
  confirmed: { label: "Confirmed", bg: "hsl(140 55% 30% / 0.12)", color: "hsl(140 55% 25%)" },
  pending:   { label: "Pending",   bg: "hsl(42 85% 58% / 0.12)",  color: "hsl(35 85% 38%)" },
  cancelled: { label: "Cancelled", bg: "hsl(0 60% 42% / 0.12)",   color: "hsl(0 60% 35%)" },
};

export default async function AdminDashboardPage() {
  const supabase = await createServerClient();
  const [stats, recentBookings] = await Promise.all([
    getStats(supabase),
    getRecentBookings(supabase),
  ]);

  const STAT_CARDS = [
    {
      icon: CalendarCheck,
      label: "Total Bookings",
      value: stats.totalBookings,
      color: "hsl(42 85% 58%)",
      bg: "hsl(42 85% 58% / 0.1)",
    },
    {
      icon: Clock,
      label: "Pending",
      value: stats.pendingBookings,
      color: "hsl(18 58% 52%)",
      bg: "hsl(18 58% 52% / 0.1)",
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: `LKR ${stats.totalRevenue.toLocaleString("en-LK")}`,
      color: "hsl(140 55% 30%)",
      bg: "hsl(140 55% 30% / 0.1)",
    },
    {
      icon: BedDouble,
      label: "Total Rooms",
      value: stats.totalRooms,
      color: "hsl(220 60% 60%)",
      bg: "hsl(220 60% 60% / 0.1)",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Dashboard
          </h1>
          <p className="text-sm text-[hsl(43_35%_50%)] mt-1">
            Welcome back. Here&apos;s what&apos;s happening at Loga.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/bookings"
            className="text-xs font-semibold px-4 py-2 rounded-lg border border-[hsl(42_85%_58%/0.5)] text-[hsl(42_85%_58%)] hover:bg-[hsl(42_85%_58%/0.1)] transition-colors"
          >
            Manage Bookings
          </Link>
          <Link
            href="/admin/rooms"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[hsl(42_85%_58%)] text-[hsl(220_25%_8%)] hover:bg-[hsl(42_85%_65%)] transition-colors shadow-[0_0_15px_hsl(42_85%_58%/0.2)]"
          >
            View Rooms
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map(({ icon: Icon, label, value, color, bg }) => (
          <div
            key={label}
            className="rounded-xl p-5 border"
            style={{
              background: "hsl(220 25% 12%)",
              borderColor: "hsl(42 85% 58% / 0.1)",
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ background: bg, color }}
              aria-hidden="true"
            >
              <Icon size={18} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-[hsl(43_35%_50%)] mt-1 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{
          background: "hsl(220 25% 12%)",
          borderColor: "hsl(42 85% 58% / 0.1)",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "hsl(42 85% 58% / 0.1)" }}
        >
          <h2 className="text-sm font-semibold text-white">Recent Bookings</h2>
          <Link
            href="/admin/bookings"
            className="text-xs font-medium hover:underline"
            style={{ color: "hsl(42 85% 58%)" }}
          >
            View all →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Recent bookings">
            <thead>
              <tr style={{ background: "hsl(220 25% 10%)" }}>
                {["Booking ID", "Guest", "Room", "Check-in", "Check-out", "Amount", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-xs font-semibold tracking-wide uppercase"
                    style={{ color: "hsl(43_35%_45%)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "hsl(42 85% 58% / 0.06)" }}>
              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-[hsl(43_35%_40%)] text-sm">
                    No bookings yet. They will appear here once guests book.
                  </td>
                </tr>
              )}
              {(recentBookings as unknown as Booking[]).map((b) => {
                const s = STATUS_STYLE[b.status] ?? STATUS_STYLE["pending"]!;
                return (
                  <tr
                    key={b.id}
                    className="hover:bg-[hsl(43_35%_80%/0.03)] transition-colors"
                  >
                    <td className="px-6 py-4 text-[hsl(43_35%_65%)] text-xs font-mono uppercase">
                      {b.id.split("-")[0]}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-medium text-sm">{b.guest_name}</p>
                      <p className="text-[hsl(43_35%_45%)] text-xs">{b.guest_email}</p>
                    </td>
                    <td className="px-6 py-4 text-[hsl(43_35%_65%)] text-xs">
                      {(b.rooms as { name: string }[] | null)?.[0]?.name ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-[hsl(43_35%_65%)] text-xs">
                      {formatDisplayDate(b.check_in)}
                    </td>
                    <td className="px-6 py-4 text-[hsl(43_35%_65%)] text-xs">
                      {formatDisplayDate(b.check_out)}
                    </td>
                    <td className="px-6 py-4 text-white text-xs font-medium">
                      LKR {Number(b.total_lkr).toLocaleString("en-LK")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                        style={{ background: s.bg, color: s.color }}
                      >
                        {s.label}
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
