// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LOGA GUEST HOUSE — TYPESCRIPT TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─── Core Room Types ───────────────────────
export type RoomCategory =
    | "deluxe"
    | "superior"
    | "suite"
    | "family"
    | "heritage";

export interface Room {
    id: string;
    name: string;
    slug: string;
    category: RoomCategory;
    description: string;
    size_sqft: number;
    max_guests: number;
    beds: string; // e.g. "1 King Bed" or "2 Twin Beds"
    floor: number;
    price_lkr: number;
    price_usd: number;
    amenities: string[];
    images: string[]; // Supabase Storage URLs
    thumbnail: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// ─── Booking Types ──────────────────────────
export type BookingStatus =
    | "pending"
    | "confirmed"
    | "cancelled"
    | "completed"
    | "refunded";

export type PaymentStatus =
    | "pending"
    | "paid"
    | "failed"
    | "refunded"
    | "partially_refunded";

export interface Booking {
    id: string;
    room_id: string;
    room?: Room;
    guest_name: string;
    guest_email: string;
    guest_phone: string;
    guest_nationality: string;
    check_in: string; // ISO date string YYYY-MM-DD
    check_out: string;
    nights: number;
    guests: number;
    total_lkr: number;
    total_usd: number;
    status: BookingStatus;
    payment_status: PaymentStatus;
    cashfree_order_id?: string;
    cashfree_payment_id?: string;
    special_requests?: string;
    created_at: string;
    updated_at: string;
}

// ─── Availability ───────────────────────────
export interface BlockedDate {
    id: string;
    room_id: string;
    date: string; // YYYY-MM-DD
    booking_id?: string;
    reason?: string;
}

// ─── Gallery ────────────────────────────────
export interface GalleryImage {
    id: string;
    url: string;
    alt: string;
    category: "room" | "property" | "dining" | "surroundings";
    sort_order: number;
}

// ─── Testimonial ────────────────────────────
export interface Testimonial {
    id: string;
    guest_name: string;
    guest_country: string;
    rating: number; // 1-5
    comment: string;
    room_name?: string;
    stay_date: string;
    is_featured: boolean;
}

// ─── Contact / Inquiry ──────────────────────
export interface ContactInquiry {
    name: string;
    email: string;
    phone?: string;
    check_in?: string;
    check_out?: string;
    guests?: number;
    message: string;
}

// ─── Admin Types ─────────────────────────────
export interface AdminUser {
    id: string;
    email: string;
    role: "admin" | "super_admin";
    created_at: string;
}

// ─── API Response Wrappers ───────────────────
export interface ApiSuccess<T> {
    data: T;
    error: null;
}

export interface ApiError {
    data: null;
    error: {
        message: string;
        code?: string;
    };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ─── Booking Form ────────────────────────────
export interface BookingFormValues {
    room_id: string;
    check_in: string;
    check_out: string;
    guests: number;
    guest_name: string;
    guest_email: string;
    guest_phone: string;
    guest_nationality: string;
    special_requests?: string;
}

// ─── Payment ─────────────────────────────────
export interface CashfreeOrderResponse {
    order_id: string;
    order_status: string;
    payment_session_id: string;
    order_token?: string;
}

export interface CashfreeWebhookPayload {
    data: {
        order: {
            order_id: string;
            order_amount: number;
            order_currency: string;
            order_status: string;
        };
        payment: {
            cf_payment_id: string;
            payment_status: string;
            payment_amount: number;
        };
    };
    event_time: string;
    type: string;
}
