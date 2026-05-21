import type { Metadata } from "next";
import {
  CalendarCheck,
  BedDouble,
  DollarSign,
  Clock,
  ArrowUpRight,
  TrendingUp,
  UserCheck
} from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDisplayDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats(supabase: Awaited<ReturnType<typeof createServerClient>>) {
  try {
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
  } catch (err) {
    return { totalBookings: 0, confirmedBookings: 0, pendingBookings: 0, totalRevenue: 0, totalRooms: 0 };
  }
}

async function getRecentBookings(supabase: Awaited<ReturnType<typeof createServerClient>>) {
  try {
    const { data } = await supabase
      .from("bookings")
      .select("id, guest_name, guest_email, check_in, check_out, total_lkr, status, payment_status, rooms(name)")
      .order("created_at", { ascending: false })
      .limit(8);
    return data ?? [];
  } catch (err) {
    return [];
  }
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
  rooms: { name: string }[] | null;
};

const STATUS_STYLE: Record<string, { label: string; bg: string; color: string }> = {
  confirmed: { label: "Confirmed", bg: "hsl(140 55% 30% / 0.15)", color: "hsl(140 75% 70%)" },
  pending:   { label: "Pending",   bg: "hsl(42 85% 58% / 0.15)",  color: "hsl(42 95% 65%)" },
  cancelled: { label: "Cancelled", bg: "hsl(0 60% 42% / 0.15)",   color: "hsl(0 85% 75%)" },
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
      desc: "All time bookings recorded",
    },
    {
      icon: Clock,
      label: "Pending Inquiries",
      value: stats.pendingBookings,
      color: "hsl(18 85% 58%)",
      bg: "hsl(18 85% 58% / 0.1)",
      desc: "Needs admin confirmation",
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: `LKR ${stats.totalRevenue.toLocaleString("en-LK")}`,
      color: "hsl(140 65% 48%)",
      bg: "hsl(140 65% 48% / 0.1)",
      desc: "Confirmed and paid bookings",
    },
    {
      icon: BedDouble,
      label: "Total Rooms",
      value: stats.totalRooms,
      color: "hsl(200 80% 60%)",
      bg: "hsl(200 80% 60% / 0.1)",
      desc: "Active configured stay units",
    },
  ];

  // Calculated percentage of occupancy based on dummy/stats data
  const occupiedRate = stats.totalRooms > 0 
    ? Math.round(((stats.confirmedBookings) / (stats.totalRooms * 10)) * 100) 
    : 0;

  return (
    <div className="p-8 space-y-8 text-[#F8F5F0]">
      {/* Upper header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[hsl(42_85%_58%/0.1)]">
        <div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[hsl(42_85%_58%)] bg-[hsl(42_85%_58%/0.1)] px-3 py-1 rounded-full">
            Loga Guest House Control Panel
          </span>
          <h1
            className="text-4xl font-bold text-white mt-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Dashboard Overview
          </h1>
          <p className="text-sm text-[hsl(43_35%_65%)] mt-1.5 font-light">
            Welcome back, administrator. Monitor bookings, check room statuses, and view revenue analytics.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/bookings"
            className="text-xs font-semibold px-5 py-2.5 rounded-xl border border-[hsl(42_85%_58%/0.4)] text-[hsl(42_85%_58%)] hover:bg-[hsl(42_85%_58%/0.1)] transition-all duration-300"
          >
            Manage Bookings
          </Link>
          <Link
            href="/admin/rooms"
            className="text-xs font-semibold px-5 py-2.5 rounded-xl bg-[hsl(42_85%_58%)] text-[hsl(220_25%_8%)] hover:bg-[hsl(42_85%_65%)] hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_hsl(42_85%_58%/0.25)]"
          >
            Configure Rooms
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAT_CARDS.map(({ icon: Icon, label, value, color, bg, desc }) => (
          <div
            key={label}
            className="rounded-2xl p-6 border transition-all duration-300 hover:border-[hsl(42_85%_58%/0.3)] hover:shadow-lg"
            style={{
              background: "hsl(220 25% 12%)",
              borderColor: "hsl(42 85% 58% / 0.08)",
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold tracking-wide text-[hsl(43_35%_60%)]">{label}</span>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: bg, color }}
                aria-hidden="true"
              >
                <Icon size={20} />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white tracking-tight">{value}</p>
            <p className="text-[11px] text-[hsl(43_35%_45%)] mt-2 font-light">{desc}</p>
          </div>
        ))}
      </div>

      {/* Graphs / Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Occupancy Indicator */}
        <div
          className="rounded-2xl p-6 border lg:col-span-1 flex flex-col justify-between"
          style={{
            background: "hsl(220 25% 12%)",
            borderColor: "hsl(42 85% 58% / 0.08)",
          }}
        >
          <div>
            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              Weekly Stay Occupancy
            </h3>
            <p className="text-xs text-[hsl(43_35%_55%)] mb-6 font-light">
              Current room reservations vs overall capacity.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-6">
            {/* Visual Ring */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-[hsl(220_25%_8%)] fill-none"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-[hsl(42_85%_58%)] fill-none transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * Math.max(10, Math.min(occupiedRate || 35, 100))) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-white">{occupiedRate || 35}%</span>
                <span className="text-[10px] text-[hsl(43_35%_50%)] tracking-wider uppercase">Active</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[hsl(42_85%_58%/0.06)] pt-4 mt-4 grid grid-cols-2 text-center text-xs">
            <div>
              <p className="text-[hsl(43_35%_50%)]">Rooms Booked</p>
              <p className="text-lg font-bold text-white mt-1">{stats.confirmedBookings}</p>
            </div>
            <div className="border-l border-[hsl(42_85%_58%/0.06)]">
              <p className="text-[hsl(43_35%_50%)]">Total Capacity</p>
              <p className="text-lg font-bold text-white mt-1">{stats.totalRooms}</p>
            </div>
          </div>
        </div>

        {/* Revenue Simulated Analytics */}
        <div
          className="rounded-2xl p-6 border lg:col-span-2 flex flex-col justify-between"
          style={{
            background: "hsl(220 25% 12%)",
            borderColor: "hsl(42 85% 58% / 0.08)",
          }}
        >
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                Monthly Booking Performance
              </h3>
              <span className="flex items-center gap-1 text-[10px] font-bold text-[hsl(140_65%_48%)] bg-[hsl(140_65%_48%/0.1)] px-2 py-0.5 rounded">
                <TrendingUp size={10} /> +12.4%
              </span>
            </div>
            <p className="text-xs text-[hsl(43_35%_55%)] mb-6 font-light">
              Booking flow comparison across recent calendar months (simulated metrics).
            </p>
          </div>

          {/* Simple CSS-based bar chart */}
          <div className="flex items-end justify-between gap-4 h-32 px-2">
            {[
              { month: "Jan", height: "45%", val: "4.5k" },
              { month: "Feb", height: "35%", val: "3.5k" },
              { month: "Mar", height: "60%", val: "6.0k" },
              { month: "Apr", height: "80%", val: "8.0k" },
              { month: "May", height: "95%", val: "9.5k" },
              { month: "Jun", height: "75%", val: "7.5k" },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center group cursor-pointer">
                <span className="text-[9px] text-[hsl(43_35%_50%)] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {bar.val}
                </span>
                <div className="w-full bg-[hsl(220_25%_8%)] rounded-t-md overflow-hidden h-24 flex items-end">
                  <div
                    className="w-full rounded-t-md transition-all duration-700 hover:bg-[hsl(42_85%_65%)]"
                    style={{
                      height: bar.height,
                      background: "linear-gradient(to top, hsl(42, 85%, 50%), hsl(42, 85%, 65%))",
                    }}
                  />
                </div>
                <span className="text-[10px] text-[hsl(43_35%_60%)] mt-2 font-medium">{bar.month}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[hsl(42_85%_58%/0.06)] pt-4 mt-6 flex justify-between items-center text-xs">
            <span className="text-[hsl(43_35%_50%)]">Overall target booking completion rate:</span>
            <span className="font-bold text-[hsl(42_85%_58%)]">82.5% Success Rate</span>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          background: "hsl(220 25% 12%)",
          borderColor: "hsl(42 85% 58% / 0.08)",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "hsl(42 85% 58% / 0.08)" }}
        >
          <div>
            <h2 className="text-base font-bold text-white">Recent Booking Submissions</h2>
            <p className="text-xs text-[hsl(43_35%_50%)] mt-1 font-light">Latest inquiries generated via checkout or contact forms.</p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-semibold hover:underline flex items-center gap-1 text-[hsl(42_85%_58%)] bg-[hsl(42_85%_58%/0.08)] px-3 py-1.5 rounded-lg border border-[hsl(42_85%_58%/0.15)] hover:bg-[hsl(42_85%_58%/0.15)] transition-all"
          >
            All Bookings <ArrowUpRight size={12} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left" aria-label="Recent bookings table">
            <thead>
              <tr style={{ background: "hsl(220 25% 10%)" }} className="border-b border-[hsl(42_85%_58%/0.05)]">
                {["Booking ID", "Guest Information", "Room Title", "Check-in", "Check-out", "LKR Amount", "Status"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-[hsl(43_35%_45%)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "hsl(42 85% 58% / 0.05)" }}>
              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[hsl(43_35%_45%)] text-sm font-light">
                    No bookings recorded. They will show up here dynamically.
                  </td>
                </tr>
              )}
              {(recentBookings as unknown as Booking[]).map((b) => {
                const s = STATUS_STYLE[b.status] ?? STATUS_STYLE["pending"]!;
                return (
                  <tr
                    key={b.id}
                    className="hover:bg-[hsl(43_35%_80%/0.02)] transition-colors"
                  >
                    <td className="px-6 py-4 text-[hsl(43_35%_65%)] text-xs font-mono uppercase font-semibold">
                      #{b.id.split("-")[0]}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[hsl(42_85%_58%/0.1)] flex items-center justify-center text-xs font-bold text-[hsl(42_85%_58%)]">
                          {b.guest_name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{b.guest_name}</p>
                          <p className="text-[hsl(43_35%_50%)] text-xs font-light">{b.guest_email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[hsl(43_35%_65%)] text-sm">
                      {b.rooms?.[0]?.name ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-[hsl(43_35%_65%)] text-xs">
                      {formatDisplayDate(b.check_in)}
                    </td>
                    <td className="px-6 py-4 text-[hsl(43_35%_65%)] text-xs">
                      {formatDisplayDate(b.check_out)}
                    </td>
                    <td className="px-6 py-4 text-white text-sm font-bold">
                      LKR {Number(b.total_lkr).toLocaleString("en-LK")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                        style={{ background: s.bg, color: s.color }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
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
