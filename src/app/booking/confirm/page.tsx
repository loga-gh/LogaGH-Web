import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, XCircle, Clock, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { KolamSVG } from "@/components/ui/KolamSVG";
import { createServerClient } from "@/lib/supabase/server";
import { formatDisplayDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Booking Confirmation",
  description: "Your booking confirmation for Loga Guest House, Jaffna.",
  robots: "noindex",
};

interface PageProps {
  searchParams: Promise<{ order_id?: string; booking_id?: string }>;
}

export default async function ConfirmPage({ searchParams }: PageProps) {
  const { booking_id } = await searchParams;

  // Fetch booking from Supabase
  let booking = null;
  if (booking_id) {
    const supabase = await createServerClient();
    const { data } = await supabase
      .from("bookings")
      .select("*, rooms(name, slug)")
      .eq("id", booking_id)
      .single();
    booking = data;
  }

  const isConfirmed = booking?.payment_status === "paid";
  const isPending = booking?.payment_status === "unpaid" && booking?.status === "pending";

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen py-32 px-4"
        style={{ background: "hsl(43 35% 96%)" }}
      >
        <div className="container-luxury max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-[hsl(35_8%_90%)] overflow-hidden">

            {/* Status header */}
            <div
              className="p-10 text-center relative overflow-hidden"
              style={{
                background: isConfirmed
                  ? "hsl(220 25% 8%)"
                  : isPending
                  ? "hsl(42 85% 42%)"
                  : "hsl(0 50% 30%)",
              }}
            >
              <div className="absolute top-4 right-4 opacity-10 pointer-events-none" aria-hidden="true">
                <KolamSVG size={100} />
              </div>

              <div className="relative z-10">
                {isConfirmed ? (
                  <CheckCircle
                    size={52}
                    className="mx-auto mb-4 text-[hsl(42_85%_58%)]"
                    aria-hidden="true"
                  />
                ) : isPending ? (
                  <Clock size={52} className="mx-auto mb-4 text-white" aria-hidden="true" />
                ) : (
                  <XCircle size={52} className="mx-auto mb-4 text-red-300" aria-hidden="true" />
                )}

                <h1
                  className="text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {isConfirmed
                    ? "Booking Confirmed!"
                    : isPending
                    ? "Payment Pending"
                    : "Payment Unsuccessful"}
                </h1>
                <p className="text-[hsl(43_35%_90%/0.7)] text-sm">
                  {isConfirmed
                    ? "We can't wait to welcome you to Jaffna. A confirmation email is on its way."
                    : isPending
                    ? "Your payment is being processed. We'll email you once it clears."
                    : "Something went wrong with your payment. Please try again or contact us."}
                </p>
              </div>
            </div>

            {/* Booking details */}
            {booking ? (
              <div className="p-8 space-y-5">
                <h2
                  className="text-lg font-semibold"
                  style={{ fontFamily: "var(--font-playfair)", color: "hsl(220 25% 8%)" }}
                >
                  Booking Summary
                </h2>

                <dl className="divide-y divide-[hsl(35_8%_92%)]">
                  {[
                    ["Room", (booking.rooms as { name: string } | null)?.name ?? "—"],
                    ["Guest Name", booking.guest_name],
                    ["Email", booking.guest_email],
                    [
                      "Check-in",
                      formatDisplayDate(booking.check_in),
                    ],
                    [
                      "Check-out",
                      formatDisplayDate(booking.check_out),
                    ],
                    ["Guests", `${booking.guests} guest${booking.guests > 1 ? "s" : ""}`],
                    [
                      "Total",
                      `LKR ${Number(booking.total_lkr).toLocaleString("en-LK")}`,
                    ],
                    ["Booking ID", booking.id.slice(0, 8).toUpperCase()],
                    [
                      "Payment Status",
                      booking.payment_status === "paid"
                        ? "✅ Paid"
                        : booking.payment_status === "failed"
                        ? "❌ Failed"
                        : "⏳ Pending",
                    ],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-3 text-sm">
                      <dt className="text-[hsl(35_8%_50%)] font-medium">{label}</dt>
                      <dd className="text-[hsl(220_25%_8%)] font-semibold text-right max-w-[55%]">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Contact strip */}
                <div
                  className="rounded-xl p-4 mt-4 flex flex-col sm:flex-row gap-3"
                  style={{ background: "hsl(43 35% 95%)" }}
                >
                  <a
                    href="tel:+94XXXXXXXXX"
                    className="flex items-center gap-2 text-sm text-[hsl(220_25%_12%)] hover:text-[hsl(42_85%_48%)] transition-colors font-medium"
                    aria-label="Call Loga Guest House"
                  >
                    <Phone size={14} style={{ color: "hsl(42 85% 48%)" }} aria-hidden="true" />
                    +94 77 XXX XXXX
                  </a>
                  <a
                    href="mailto:logaguesthouse@gmail.com"
                    className="flex items-center gap-2 text-sm text-[hsl(220_25%_12%)] hover:text-[hsl(42_85%_48%)] transition-colors font-medium"
                    aria-label="Email Loga Guest House"
                  >
                    <Mail size={14} style={{ color: "hsl(42 85% 48%)" }} aria-hidden="true" />
                    logaguesthouse@gmail.com
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-sm text-[hsl(35_8%_50%)]">
                <p>Could not load booking details. Please contact us with your Order ID.</p>
              </div>
            )}

            {/* CTAs */}
            <div className="px-8 pb-8 flex flex-col sm:flex-row gap-3">
              <Link href="/" className="btn btn-gold flex-1 text-center py-3">
                Back to Home
              </Link>
              {!isConfirmed && (
                <Link href="/rooms" className="btn btn-outline flex-1 text-center py-3">
                  Try Another Room
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
