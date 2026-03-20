"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    Cashfree: (opts: { mode: string }) => {
      checkout: (opts: {
        paymentSessionId: string;
        returnUrl: string;
        redirectTarget: string;
      }) => void;
    };
  }
}

function CheckoutInner() {
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = params.get("session_id");
  const orderId = params.get("order_id");
  const bookingId = params.get("booking_id");

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const cashfreeRef = useRef<ReturnType<typeof window.Cashfree> | null>(null);

  useEffect(() => {
    if (!sessionId || !orderId || !bookingId) {
      setError("Invalid checkout session. Please start your booking again.");
      setStatus("error");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => {
      cashfreeRef.current = window.Cashfree({
        mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === "production" ? "production" : "sandbox",
      });
      setStatus("ready");
    };
    script.onerror = () => {
      setError("Failed to load payment gateway. Please check your connection.");
      setStatus("error");
    };
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [sessionId, orderId, bookingId]);

  const handlePay = () => {
    if (!cashfreeRef.current || !sessionId || !orderId || !bookingId) return;
    const returnUrl = `${window.location.origin}/booking/confirm?order_id=${orderId}&booking_id=${bookingId}`;
    cashfreeRef.current.checkout({ paymentSessionId: sessionId, returnUrl, redirectTarget: "_self" });
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "hsl(43 35% 96%)" }}
    >
      <div className="bg-white rounded-2xl shadow-lg border border-[hsl(35_8%_90%)] p-10 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <Loader2 size={40} className="mx-auto mb-5 animate-spin" style={{ color: "hsl(42 85% 58%)" }} aria-hidden="true" />
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)", color: "hsl(220 25% 8%)" }}>
              Preparing Checkout…
            </h1>
            <p className="text-sm text-[hsl(35_8%_45%)]">Loading the secure payment gateway.</p>
          </>
        )}
        {status === "ready" && (
          <>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "hsl(42 85% 58% / 0.1)", color: "hsl(42 85% 58%)" }} aria-hidden="true">
              <ShieldCheck size={28} />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)", color: "hsl(220 25% 8%)" }}>
              Secure Payment
            </h1>
            <p className="text-sm text-[hsl(35_8%_45%)] mb-6">
              Your booking is reserved. Complete payment to confirm your stay at Loga Guest House.
            </p>
            <p className="text-xs text-[hsl(35_8%_55%)] mb-6 font-mono">Order: {orderId}</p>
            <button type="button" onClick={handlePay} className="btn btn-gold w-full py-4 text-base" id="cashfree-pay-btn" aria-label="Proceed to pay">
              <ShieldCheck size={18} aria-hidden="true" /> Pay Now
            </button>
            <p className="text-xs text-[hsl(35_8%_55%)] mt-4">Secured by Cashfree · SSL · PCI-DSS</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "hsl(0 68% 42% / 0.1)", color: "hsl(0 68% 42%)" }} aria-hidden="true">
              <AlertCircle size={28} />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)", color: "hsl(220 25% 8%)" }}>
              Payment Error
            </h1>
            <p className="text-sm text-[hsl(35_8%_45%)] mb-6">{error}</p>
            <Link href="/rooms" className="btn btn-gold w-full py-4 text-base flex items-center justify-center">Browse Rooms</Link>
          </>
        )}
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center" style={{ background: "hsl(43 35% 96%)" }}>
          <Loader2 size={36} className="animate-spin" style={{ color: "hsl(42 85% 58%)" }} aria-label="Loading checkout" />
        </main>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}
