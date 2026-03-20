"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const ContactSchema = z.object({
    name: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    check_in: z.string().optional(),
    check_out: z.string().optional(),
    guests: z.number().min(1).max(10).optional(),
    message: z.string().min(10, "Please tell us a bit more (at least 10 characters)"),
});

type ContactFormValues = z.infer<typeof ContactSchema>;

export function ContactForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormValues>({
        resolver: zodResolver(ContactSchema),
        defaultValues: { guests: 2 },
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        // TODO: POST to /api/contact (Resend email API)
        console.log("Contact form data:", data);
        await new Promise((r) => setTimeout(r, 1500)); // Simulate request
        setIsSubmitted(true);
        setIsSubmitting(false);
        reset();
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16 px-8">
                <div className="w-16 h-16 rounded-full bg-[hsl(140_55%_30%/0.1)] flex items-center justify-center mb-6">
                    <CheckCircle size={32} className="text-[hsl(140_55%_30%)]" />
                </div>
                <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                >
                    Message Received!
                </h3>
                <p className="text-[hsl(35_8%_45%)] max-w-sm leading-relaxed">
                    Thank you for reaching out. We will reply to your inquiry within 2 hours.
                    We look forward to welcoming you to Jaffna.
                </p>
                <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="btn btn-outline text-sm mt-6"
                    style={{ color: "hsl(220 25% 8%)", borderColor: "hsl(35 8% 78%)" }}
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Contact inquiry form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Name */}
                <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold tracking-wide uppercase text-[hsl(35_8%_45%)] mb-1.5">
                        Full Name *
                    </label>
                    <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        className={cn("input-luxury", errors.name && "border-[hsl(0_68%_42%)]")}
                        placeholder="Your name"
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className="mt-1 text-xs text-[hsl(0_68%_42%)]" role="alert">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold tracking-wide uppercase text-[hsl(35_8%_45%)] mb-1.5">
                        Email Address *
                    </label>
                    <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        className={cn("input-luxury", errors.email && "border-[hsl(0_68%_42%)]")}
                        placeholder="your@email.com"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-[hsl(0_68%_42%)]" role="alert">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold tracking-wide uppercase text-[hsl(35_8%_45%)] mb-1.5">
                        Phone Number
                    </label>
                    <input
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        className="input-luxury"
                        placeholder="+94 77 XXX XXXX"
                        {...register("phone")}
                    />
                </div>

                {/* Guests */}
                <div>
                    <label htmlFor="contact-guests" className="block text-xs font-semibold tracking-wide uppercase text-[hsl(35_8%_45%)] mb-1.5">
                        Number of Guests
                    </label>
                    <select
                        id="contact-guests"
                        className="input-luxury"
                        {...register("guests", { valueAsNumber: true })}
                    >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>
                                {n} {n === 1 ? "Guest" : "Guests"}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Check-in */}
                <div>
                    <label htmlFor="contact-check-in" className="block text-xs font-semibold tracking-wide uppercase text-[hsl(35_8%_45%)] mb-1.5">
                        Preferred Check-in
                    </label>
                    <input
                        id="contact-check-in"
                        type="date"
                        className="input-luxury"
                        {...register("check_in")}
                    />
                </div>

                {/* Check-out */}
                <div>
                    <label htmlFor="contact-check-out" className="block text-xs font-semibold tracking-wide uppercase text-[hsl(35_8%_45%)] mb-1.5">
                        Preferred Check-out
                    </label>
                    <input
                        id="contact-check-out"
                        type="date"
                        className="input-luxury"
                        {...register("check_out")}
                    />
                </div>
            </div>

            {/* Message */}
            <div className="mb-6">
                <label htmlFor="contact-message" className="block text-xs font-semibold tracking-wide uppercase text-[hsl(35_8%_45%)] mb-1.5">
                    Your Message *
                </label>
                <textarea
                    id="contact-message"
                    rows={5}
                    className={cn("input-luxury resize-none", errors.message && "border-[hsl(0_68%_42%)]")}
                    placeholder="Tell us about your stay, special requirements, or any questions…"
                    {...register("message")}
                />
                {errors.message && (
                    <p className="mt-1 text-xs text-[hsl(0_68%_42%)]" role="alert">
                        {errors.message.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-gold w-full py-4"
                id="contact-submit-btn"
                aria-label="Send your inquiry"
            >
                <Send size={16} aria-hidden="true" />
                {isSubmitting ? "Sending…" : "Send Inquiry"}
            </button>

            <p className="text-xs text-center text-[hsl(35_8%_55%)] mt-3">
                We typically respond within 2 hours during 8 AM – 9 PM (IST)
            </p>
        </form>
    );
}

export function ContactInfoPanel() {
    const contacts = [
        {
            icon: Phone,
            label: "Call Us",
            value: "+94 77 XXX XXXX",
            href: "tel:+94XXXXXXXXX",
        },
        {
            icon: Mail,
            label: "Email Us",
            value: "logaguesthouse@gmail.com",
            href: "mailto:logaguesthouse@gmail.com",
        },
        {
            icon: MapPin,
            label: "Find Us",
            value: "Jaffna, Northern Province, Sri Lanka 40000",
            href: "https://maps.google.com",
        },
        {
            icon: Clock,
            label: "Office Hours",
            value: "8:00 AM – 9:00 PM (IST) · Every Day",
            href: null,
        },
    ];

    return (
        <ul className="space-y-5" role="list">
            {contacts.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                            background: "hsl(42 85% 58% / 0.1)",
                            color: "hsl(42, 85%, 58%)",
                        }}
                        aria-hidden="true"
                    >
                        <Icon size={18} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold tracking-wide uppercase text-[hsl(35_8%_50%)] mb-0.5">
                            {label}
                        </p>
                        {href ? (
                            <a
                                href={href}
                                className="text-sm text-[hsl(220_25%_10%)] hover:text-[hsl(42_85%_58%)] transition-colors font-medium"
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            >
                                {value}
                            </a>
                        ) : (
                            <p className="text-sm text-[hsl(220_25%_10%)] font-medium">{value}</p>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}
