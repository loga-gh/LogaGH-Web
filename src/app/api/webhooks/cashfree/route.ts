import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServerClient } from "@/lib/supabase/server";

// POST /api/webhooks/cashfree
// Cashfree sends this after every payment event.
// Docs: https://docs.cashfree.com/docs/webhook-events
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    // ── 1. Verify webhook signature ─────────────────────────────────────────
    // Cashfree signs with HMAC-SHA256 using your secret key.
    const cfSignature = req.headers.get("x-webhook-signature");
    const cfTimestamp = req.headers.get("x-webhook-timestamp");

    if (!cfSignature || !cfTimestamp) {
      return NextResponse.json({ error: "Missing signature headers." }, { status: 400 });
    }

    const secretKey = process.env.CASHFREE_SECRET_KEY ?? "";
    const signedPayload = `${cfTimestamp}${rawBody}`;
    const expectedSig = crypto
      .createHmac("sha256", secretKey)
      .update(signedPayload)
      .digest("base64");

    if (expectedSig !== cfSignature) {
      console.warn("[webhook] Invalid Cashfree signature.");
      return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
    }

    // ── 2. Parse event ───────────────────────────────────────────────────────
    const event = JSON.parse(rawBody) as {
      type: string;
      data: {
        order: {
          order_id: string;
          order_amount: number;
          order_status: string;
        };
        payment?: {
          cf_payment_id: string;
          payment_status: string;
          payment_amount: number;
          payment_method: string;
        };
      };
    };

    const { type, data } = event;
    const orderId = data.order.order_id;

    const supabase = await createServerClient();

    // ── 3. Fetch the booking by cashfree_order_id ────────────────────────────
    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select("id, status, payment_status, total_lkr")
      .eq("cashfree_order_id", orderId)
      .single();

    if (fetchError || !booking) {
      // Not our booking — return 200 to stop Cashfree retrying
      console.warn("[webhook] Booking not found for order:", orderId);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // ── 4. Handle event types ────────────────────────────────────────────────
    switch (type) {
      case "PAYMENT_SUCCESS_WEBHOOK": {
        const payment = data.payment;
        if (!payment) break;

        await supabase
          .from("bookings")
          .update({
            status: "confirmed",
            payment_status: "paid",
            cashfree_payment_id: payment.cf_payment_id,
            paid_at: new Date().toISOString(),
          })
          .eq("id", booking.id);

        console.log(`[webhook] Booking ${booking.id} confirmed. Payment: ${payment.cf_payment_id}`);
        break;
      }

      case "PAYMENT_FAILED_WEBHOOK": {
        await supabase
          .from("bookings")
          .update({
            status: "cancelled",
            payment_status: "failed",
          })
          .eq("id", booking.id);

        console.log(`[webhook] Booking ${booking.id} payment failed.`);
        break;
      }

      case "PAYMENT_USER_DROPPED_WEBHOOK": {
        // User closed the payment sheet without completing
        await supabase
          .from("bookings")
          .update({ payment_status: "failed" })
          .eq("id", booking.id);

        console.log(`[webhook] Booking ${booking.id} user dropped payment.`);
        break;
      }

      default:
        console.log(`[webhook] Unhandled event type: ${type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("[POST /api/webhooks/cashfree]", err);
    // Always return 200 to prevent Cashfree retry storms
    return NextResponse.json({ received: true }, { status: 200 });
  }
}
