"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { calculateNights, formatPriceLKR } from "@/lib/utils";

interface BookNowButtonProps {
  roomId: string;
  roomName: string;
  priceLkrPerNight: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  /** Disable if form is incomplete */
  disabled?: boolean;
}

export function BookNowButton({
  roomId,
  roomName,
  priceLkrPerNight,
  checkIn,
  checkOut,
  guests,
  guestName,
  guestEmail,
  guestPhone,
  disabled,
}: BookNowButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nights = calculateNights(checkIn, checkOut);
  const totalLkr = nights * priceLkrPerNight;

  const handleBook = async () => {
    if (!guestName.trim() || !guestEmail.trim()) {
      setError("Please enter your name and email address to proceed.");
      return;
    }
    if (nights < 1) {
      setError("Check-out must be after check-in.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_id: roomId,
          check_in: checkIn,
          check_out: checkOut,
          guests,
          guest_name: guestName.trim(),
          guest_email: guestEmail.toLowerCase().trim(),
          guest_phone: guestPhone?.trim() ?? null,
          price_lkr: totalLkr,
        }),
      });

      const data = (await res.json()) as {
        booking_id?: string;
        order_id?: string;
        payment_session_id?: string;
        error?: string;
      };

      if (!res.ok || !data.payment_session_id) {
        setError(data.error ?? "Failed to create booking. Please try again.");
        return;
      }

      router.push(
        `/booking/checkout?session_id=${data.payment_session_id}&order_id=${data.order_id}&booking_id=${data.booking_id}`
      );
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleBook}
        disabled={disabled || isLoading || nights < 1}
        className="btn btn-gold w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
        id="book-now-btn"
        aria-label={`Book ${roomName} — ${formatPriceLKR(totalLkr)} for ${nights} night${nights !== 1 ? "s" : ""}`}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Creating Booking…
          </>
        ) : (
          <>
            <ShieldCheck size={18} aria-hidden="true" />
            {nights > 0
              ? `Book & Pay — ${formatPriceLKR(totalLkr)}`
              : "Select Dates to Book"}
          </>
        )}
      </button>

      {error && (
        <div
          role="alert"
          className="mt-3 flex items-start gap-2 text-xs p-3 rounded-lg"
          style={{
            background: "hsl(0 68% 42% / 0.08)",
            color: "hsl(0 50% 35%)",
          }}
        >
          <AlertCircle size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
          {error}
        </div>
      )}

      <p className="text-xs text-center text-[hsl(35_8%_55%)] mt-3">
        50% advance · Remaining at check-in · Free cancellation 7+ days prior
      </p>
    </div>
  );
}
