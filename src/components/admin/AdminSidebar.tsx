"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck, exact: false },
  { href: "/admin/rooms", label: "Rooms", icon: BedDouble, exact: false },
  { href: "/admin/settings", label: "Settings", icon: Settings, exact: false },
];

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside
      className="w-60 shrink-0 flex flex-col border-r"
      style={{
        background: "hsl(220 25% 7%)",
        borderColor: "hsl(42 85% 58% / 0.1)",
      }}
      aria-label="Admin navigation"
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b" style={{ borderColor: "hsl(42 85% 58% / 0.1)" }}>
        <Link href="/admin" aria-label="Admin home">
          <p
            className="text-3xl text-[hsl(42_85%_58%)]"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            Loga
          </p>
          <p className="text-[10px] text-[hsl(43_35%_50%)] tracking-widest uppercase">
            Admin Panel
          </p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Admin menu">
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname.startsWith(href) && href !== "/admin";
          // special case for dashboard
          const active = href === "/admin" ? pathname === "/admin" : isActive;

          return (
            <Link
              key={href}
              href={href}
              id={`admin-nav-${label.toLowerCase()}`}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? "text-[hsl(220_25%_8%)] shadow-md"
                  : "text-[hsl(43_35%_55%)] hover:text-[hsl(43_35%_80%)] hover:bg-[hsl(43_35%_80%/0.06)]"
              )}
              style={
                active
                  ? { background: "linear-gradient(135deg, hsl(42,85%,58%), hsl(35,85%,50%))" }
                  : {}
              }
              aria-current={active ? "page" : undefined}
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + sign out */}
      <div className="px-4 py-4 border-t" style={{ borderColor: "hsl(42 85% 58% / 0.1)" }}>
        <p className="text-xs text-[hsl(43_35%_45%)] mb-3 truncate px-1">{userEmail}</p>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-[hsl(0_60%_65%)] hover:bg-[hsl(0_50%_30%/0.15)] transition-colors"
          id="admin-signout-btn"
          aria-label="Sign out of admin panel"
        >
          <LogOut size={15} aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
