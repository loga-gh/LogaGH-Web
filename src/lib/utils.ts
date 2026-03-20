import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind + conditional classes safely.
 * Usage: cn("base-class", isActive && "active-class", { "other": condition })
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format price in LKR with comma separation
 */
export function formatPriceLKR(amount: number): string {
    return new Intl.NumberFormat("en-LK", {
        style: "currency",
        currency: "LKR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format price in USD
 */
export function formatPriceUSD(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Calculate number of nights between two ISO date strings
 */
export function calculateNights(checkIn: string, checkOut: string): number {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = outDate.getTime() - inDate.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Format date as "15 Jan 2025"
 */
export function formatDisplayDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

/**
 * Format date to YYYY-MM-DD for HTML inputs
 */
export function toInputDate(date: Date): string {
    return date.toISOString().split("T")[0] ?? "";
}

/**
 * Get today's date as YYYY-MM-DD
 */
export function today(): string {
    return toInputDate(new Date());
}

/**
 * Get tomorrow's date as YYYY-MM-DD
 */
export function tomorrow(): string {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return toInputDate(d);
}

/**
 * Capitalize first letter of each word
 */
export function titleCase(str: string): string {
    return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Generate an idempotency key for Cashfree orders
 * Uses booking-relevant data to ensure uniqueness
 */
export function generateIdempotencyKey(
    roomId: string,
    checkIn: string,
    email: string
): string {
    const raw = `${roomId}-${checkIn}-${email}-${Date.now()}`;
    return btoa(raw).replace(/[^a-zA-Z0-9]/g, "").slice(0, 32);
}

/**
 * Truncate text to n characters with ellipsis
 */
export function truncate(text: string, n: number): string {
    if (text.length <= n) return text;
    return text.slice(0, n).trimEnd() + "…";
}

/**
 * Stagger delay for animation lists (in seconds)
 */
export function staggerDelay(index: number, base = 0.1): number {
    return index * base;
}

/**
 * Room category display label
 */
export function roomCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
        deluxe: "Deluxe",
        superior: "Superior",
        suite: "Suite",
        family: "Family Suite",
        heritage: "Heritage Room",
    };
    return labels[category] ?? titleCase(category);
}
