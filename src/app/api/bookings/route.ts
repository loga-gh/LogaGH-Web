import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { generateIdempotencyKey } from "@/lib/utils";
import type { BookingFormValues } from "@/lib/types";

const CASHFREE_API_URL =
  process.env.CASHFREE_ENV === "production"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

const CASHFREE_API_VERSION = "2023-08-01";

// POST /api/bookings
// Body: BookingFormValues + price_lkr
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BookingFormValues & { price_lkr: number };

    // ── 1. Basic validation ──────────────────────────────────────────────────
    const { room_id, check_in, check_out, guests, guest_name, guest_email, guest_phone, price_lkr } = body;

    if (!room_id || !check_in || !check_out || !guest_name || !guest_email || !price_lkr) {
      return NextResponse.json({ error: "Missing required booking fields." }, { status: 400 });
    }

    if (price_lkr < 1000) {
      return NextResponse.json({ error: "Invalid booking amount." }, { status: 400 });
    }

    // ── 2. Verify the room exists and is available ───────────────────────────
    const supabase = await createServerClient();

    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .select("id, name, price_lkr, max_guests, is_active")
      .eq("id", room_id)
      .single();

    if (roomError || !room) {
      return NextResponse.json({ error: "Room not found." }, { status: 404 });
    }

    if (!room.is_active) {
      return NextResponse.json({ error: "This room is currently unavailable." }, { status: 409 });
    }

    // Check no overlapping confirmed bookings
    const { data: overlap } = await supabase
      .from("bookings")
      .select("id")
      .eq("room_id", room_id)
      .in("status", ["confirmed", "pending"])
      .lt("check_in", check_out)
      .gt("check_out", check_in)
      .limit(1);

    if (overlap && overlap.length > 0) {
      return NextResponse.json(
        { error: "Sorry, this room is not available for the selected dates." },
        { status: 409 }
      );
    }

    // ── 3. Create a pending booking in Supabase ──────────────────────────────
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        room_id,
        check_in,
        check_out,
        guests: guests ?? 1,
        guest_name: guest_name.trim(),
        guest_email: guest_email.toLowerCase().trim(),
        guest_phone: guest_phone?.trim() ?? null,
        total_lkr: price_lkr,
        status: "pending",
        payment_status: "unpaid",
      })
      .select("id")
      .single();

    if (bookingError || !booking) {
      console.error("[bookings] Supabase insert error:", bookingError);
      return NextResponse.json({ error: "Failed to create booking." }, { status: 500 });
    }

    // ── 4. Create Cashfree order ─────────────────────────────────────────────
    const orderId = `LOGA-${booking.id}-${Date.now()}`;
    const returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/booking/confirm?order_id=${orderId}&booking_id=${booking.id}`;

    const cashfreePayload = {
      order_id: orderId,
      order_amount: price_lkr,           // LKR amount; Cashfree handles the currency
      order_currency: "LKR",
      customer_details: {
        customer_id: booking.id,
        customer_name: guest_name.trim(),
        customer_email: guest_email.toLowerCase().trim(),
        customer_phone: guest_phone?.trim() ?? "0000000000",
      },
      order_meta: {
        return_url: returnUrl,
        notify_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/cashfree`,
      },
      order_note: `Booking for ${room.name} | ${check_in} → ${check_out}`,
    };

    const cfRes = await fetch(`${CASHFREE_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_APP_ID ?? "",
        "x-client-secret": process.env.CASHFREE_SECRET_KEY ?? "",
        "x-api-version": CASHFREE_API_VERSION,
        "x-idempotency-key": generateIdempotencyKey(room_id, check_in, guest_email),
      },
      body: JSON.stringify(cashfreePayload),
    });

    if (!cfRes.ok) {
      const cfError = await cfRes.text();
      console.error("[cashfree] order create failed:", cfError);
      // Clean up the pending booking
      await supabase.from("bookings").delete().eq("id", booking.id);
      return NextResponse.json({ error: "Payment gateway error. Please try again." }, { status: 502 });
    }

    const cfData = (await cfRes.json()) as {
      cf_order_id: string;
      order_id: string;
      payment_session_id: string;
      order_status: string;
    };

    // ── 5. Store Cashfree order references ──────────────────────────────────
    await supabase
      .from("bookings")
      .update({
        cashfree_order_id: cfData.order_id,
        cashfree_session_id: cfData.payment_session_id,
      })
      .eq("id", booking.id);

    // ── 6. Return session ID to the client so it can open Cashfree checkout ─
    return NextResponse.json(
      {
        booking_id: booking.id,
        order_id: cfData.order_id,
        payment_session_id: cfData.payment_session_id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/bookings]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
