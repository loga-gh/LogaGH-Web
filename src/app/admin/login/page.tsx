"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { KolamSVG } from "@/components/ui/KolamSVG";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "hsl(220 25% 8%)" }}
    >
      {/* Decorative Kolam */}
      <div className="absolute top-10 right-10 opacity-10 pointer-events-none" aria-hidden="true">
        <KolamSVG size={220} />
      </div>
      <div className="absolute bottom-10 left-10 opacity-6 pointer-events-none" aria-hidden="true">
        <KolamSVG size={140} />
      </div>

      <div
        className="relative z-10 w-full max-w-sm rounded-2xl p-8 border"
        style={{
          background: "hsl(220 25% 12%)",
          borderColor: "hsl(42 85% 58% / 0.2)",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <p
            className="text-4xl text-[hsl(42_85%_58%)]"
            style={{ fontFamily: "var(--font-great-vibes)" }}
            aria-label="Loga Guest House"
          >
            Loga
          </p>
          <p className="text-xs text-[hsl(43_35%_70%)] tracking-widest uppercase mt-1">
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleLogin} noValidate aria-label="Admin login form">
          <div className="mb-4">
            <label htmlFor="admin-email" className="block text-xs font-semibold tracking-wide uppercase text-[hsl(43_35%_65%)] mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(43_35%_55%)]"
                aria-hidden="true"
              />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm bg-[hsl(220_25%_8%)] border border-[hsl(42_85%_58%/0.2)] text-white placeholder:text-[hsl(43_35%_40%)] focus:border-[hsl(42_85%_58%)] outline-none transition-colors"
                placeholder="admin@logagh.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="admin-password" className="block text-xs font-semibold tracking-wide uppercase text-[hsl(43_35%_65%)] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(43_35%_55%)]"
                aria-hidden="true"
              />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm bg-[hsl(220_25%_8%)] border border-[hsl(42_85%_58%/0.2)] text-white placeholder:text-[hsl(43_35%_40%)] focus:border-[hsl(42_85%_58%)] outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 text-xs p-3 rounded-lg mb-4"
              style={{ background: "hsl(0 50% 30% / 0.3)", color: "hsl(0 80% 75%)" }}
            >
              <AlertCircle size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-gold w-full py-3"
            id="admin-login-btn"
            aria-label="Sign in to admin panel"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              <>
                <Lock size={16} aria-hidden="true" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
