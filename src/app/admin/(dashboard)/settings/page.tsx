import type { Metadata } from "next";
import { Settings, Shield, Globe, Bell, RefreshCw, Key } from "lucide-react";

export const metadata: Metadata = { title: "Settings" };

export default function AdminSettingsPage() {
  const envVars = [
    {
      name: "NEXT_PUBLIC_SUPABASE_URL",
      value: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mysgjggwestpeephgdft.supabase.co",
      status: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Active" : "Using Default",
    },
    {
      name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "••••••••••••••••" : "sb_publishable_cNErqDVo3pj9BBhGJG2Z3A_E_Tbm5uA",
      status: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Active" : "Using Default (Default publishable fallback)",
    },
  ];

  return (
    <div className="p-8 space-y-8 text-[#F8F5F0]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[hsl(42_85%_58%/0.1)]">
        <div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[hsl(42_85%_58%)] bg-[hsl(42_85%_58%/0.1)] px-3 py-1 rounded-full">
            Loga Guest House Settings
          </span>
          <h1
            className="text-4xl font-bold text-white mt-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            System Settings
          </h1>
          <p className="text-sm text-[hsl(43_35%_65%)] mt-1.5 font-light">
            Configure system parameters, verify Supabase credentials, and manage admin privileges.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings Sections */}
        <div className="lg:col-span-2 space-y-8">
          {/* Supabase Config Check */}
          <div
            className="rounded-2xl p-6 border space-y-6"
            style={{
              background: "hsl(220 25% 12%)",
              borderColor: "hsl(42 85% 58% / 0.08)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[hsl(42_85%_58%/0.1)] text-[hsl(42_85%_58%)] flex items-center justify-center">
                <Key size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                  Supabase Integration
                </h3>
                <p className="text-xs text-[hsl(43_35%_55%)] font-light">
                  Connection credentials configured for database synchronisation.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {envVars.map((env) => (
                <div
                  key={env.name}
                  className="p-4 rounded-xl space-y-2 border border-[hsl(220_25%_18%)]"
                  style={{ background: "hsl(220 25% 10%)" }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-[hsl(43_35%_60%)] tracking-wide font-mono">
                      {env.name}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: env.status === "Active" ? "hsl(140 55% 30% / 0.15)" : "hsl(42 85% 58% / 0.15)",
                        color: env.status === "Active" ? "hsl(140 75% 70%)" : "hsl(42 95% 65%)",
                      }}
                    >
                      {env.status}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-white truncate break-all">{env.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Booking & General Settings form mock */}
          <div
            className="rounded-2xl p-6 border space-y-6"
            style={{
              background: "hsl(220 25% 12%)",
              borderColor: "hsl(42 85% 58% / 0.08)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[hsl(42_85%_58%/0.1)] text-[hsl(42_85%_58%)] flex items-center justify-center">
                <Globe size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                  General Stay Rules
                </h3>
                <p className="text-xs text-[hsl(43_35%_55%)] font-light">
                  Basic operational options for guest checking and messaging.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-[hsl(43_35%_55%)]">
                  Check-in Time
                </label>
                <input
                  type="text"
                  defaultValue="14:00 PM"
                  disabled
                  className="w-full px-4 py-3 rounded-xl border text-sm text-white focus:outline-none"
                  style={{
                    background: "hsl(220 25% 9%)",
                    borderColor: "hsl(220 25% 18%)",
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-[hsl(43_35%_55%)]">
                  Check-out Time
                </label>
                <input
                  type="text"
                  defaultValue="11:00 AM"
                  disabled
                  className="w-full px-4 py-3 rounded-xl border text-sm text-white focus:outline-none"
                  style={{
                    background: "hsl(220 25% 9%)",
                    borderColor: "hsl(220 25% 18%)",
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-[hsl(43_35%_55%)]">
                  Default Currency
                </label>
                <input
                  type="text"
                  defaultValue="LKR (Sri Lankan Rupee)"
                  disabled
                  className="w-full px-4 py-3 rounded-xl border text-sm text-white focus:outline-none"
                  style={{
                    background: "hsl(220 25% 9%)",
                    borderColor: "hsl(220 25% 18%)",
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-[hsl(43_35%_55%)]">
                  Tax Multiplier
                </label>
                <input
                  type="text"
                  defaultValue="1.00 (No extra tax)"
                  disabled
                  className="w-full px-4 py-3 rounded-xl border text-sm text-white focus:outline-none"
                  style={{
                    background: "hsl(220 25% 9%)",
                    borderColor: "hsl(220 25% 18%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info Section */}
        <div className="space-y-8">
          <div
            className="rounded-2xl p-6 border space-y-6"
            style={{
              background: "hsl(220 25% 12%)",
              borderColor: "hsl(42 85% 58% / 0.08)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[hsl(42_85%_58%/0.1)] text-[hsl(42_85%_58%)] flex items-center justify-center">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Security & Role</h3>
                <p className="text-[11px] text-[hsl(43_35%_50%)]">Your administrative security profile</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-[hsl(220_25%_18%)]">
                <span className="text-[hsl(43_35%_60%)]">User Role</span>
                <span className="font-semibold text-white">Full Administrator</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[hsl(220_25%_18%)]">
                <span className="text-[hsl(43_35%_60%)]">Permissions</span>
                <span className="font-semibold text-white">Read, Write, Edit</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[hsl(43_35%_60%)]">Status</span>
                <span className="font-semibold text-[hsl(140_75%_70%)]">Active Session</span>
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl p-6 border space-y-6"
            style={{
              background: "hsl(220 25% 12%)",
              borderColor: "hsl(42 85% 58% / 0.08)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[hsl(42_85%_58%/0.1)] text-[hsl(42_85%_58%)] flex items-center justify-center">
                <Bell size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">System Logs</h3>
                <p className="text-[11px] text-[hsl(43_35%_50%)]">Recent service responses</p>
              </div>
            </div>

            <div className="space-y-3 font-mono text-[10px]">
              <div className="p-2.5 rounded bg-[hsl(220_25%_10%)] text-[hsl(140_75%_70%)] border border-[hsl(220_25%_15%)]">
                [OK] Supabase client initialized.
              </div>
              <div className="p-2.5 rounded bg-[hsl(220_25%_10%)] text-[hsl(42_95%_65%)] border border-[hsl(220_25%_15%)]">
                [WARN] Fallback Supabase anonymous key is currently active.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
