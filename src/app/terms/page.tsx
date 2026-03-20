import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

export const metadata: Metadata = {
    title: "Terms & Conditions",
    description:
        "Read the booking terms, cancellation policy, and conditions of stay at Loga Guest House, Jaffna.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section aria-label={title} className="mb-8">
            <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "var(--font-playfair)", color: "hsl(220 25% 8%)" }}
            >
                {title}
            </h2>
            <div className="text-sm text-[hsl(35_8%_38%)] leading-relaxed space-y-2">{children}</div>
        </section>
    );
}

export default function TermsPage() {
    return (
        <>
            <Navbar />
            <main id="main-content">
                {/* Hero */}
                <section
                    className="pt-32 pb-14"
                    style={{ background: "hsl(220 25% 8%)" }}
                    aria-label="Terms and conditions hero"
                >
                    <div className="container-luxury text-center">
                        <p className="section-eyebrow mb-3" style={{ color: "hsl(18 58% 52%)" }}>Legal</p>
                        <h1
                            className="text-5xl font-bold text-white mb-3"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Terms &amp; <span className="text-gradient-gold">Conditions</span>
                        </h1>
                        <p className="text-[hsl(43_35%_90%/0.55)] text-sm">
                            Last updated: <time dateTime="2025-03-18">18 March 2025</time>
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16" style={{ background: "hsl(43 35% 96%)" }}>
                    <div className="container-luxury max-w-3xl">
                        <div className="bg-white rounded-2xl border border-[hsl(35_8%_90%)] p-8 sm:p-12">
                            <p className="text-sm text-[hsl(35_8%_38%)] leading-relaxed mb-8">
                                Please read these Terms &amp; Conditions carefully before making a reservation
                                at <strong>Loga Guest House</strong>. By completing a booking you agree to be bound
                                by these terms.
                            </p>

                            <Section title="1. Reservations & Booking">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>All reservations are subject to availability and confirmed only upon receipt of a deposit or full payment.</li>
                                    <li>A booking confirmation email will be sent within 2 hours of payment.</li>
                                    <li>Guests must be 18 years or older to make a reservation.</li>
                                    <li>Rates quoted are in Sri Lankan Rupees (LKR) and include applicable taxes unless stated otherwise.</li>
                                </ul>
                            </Section>

                            <Section title="2. Check-in & Check-out">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><strong>Check-in:</strong> 2:00 PM onwards. Early check-in is subject to availability and may incur an additional charge.</li>
                                    <li><strong>Check-out:</strong> 11:00 AM. Late check-out until 2:00 PM is available on request at LKR 2,500 / hour.</li>
                                    <li>Valid photo identification (NIC or Passport) is required at check-in for all guests.</li>
                                    <li>Loga Guest House reserves the right to refuse check-in if valid ID is not presented.</li>
                                </ul>
                            </Section>

                            <Section title="3. Cancellation Policy">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs border-collapse mt-2 mb-2">
                                        <thead>
                                            <tr style={{ background: "hsl(42 85% 58% / 0.1)" }}>
                                                <th className="text-left p-3 border border-[hsl(35_8%_88%)] font-semibold text-[hsl(220 25% 8%)]">Notice Period</th>
                                                <th className="text-left p-3 border border-[hsl(35_8%_88%)] font-semibold text-[hsl(220 25% 8%)]">Refund</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                ["7+ days before check-in", "100% refund"],
                                                ["3–6 days before check-in", "50% refund"],
                                                ["Less than 3 days / no-show", "No refund"],
                                            ].map(([notice, refund]) => (
                                                <tr key={notice} className="even:bg-[hsl(43_35%_97%)]">
                                                    <td className="p-3 border border-[hsl(35_8%_88%)]">{notice}</td>
                                                    <td className="p-3 border border-[hsl(35_8%_88%)] font-medium">{refund}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p>All cancellation requests must be submitted in writing to <a href="mailto:logaguesthouse@gmail.com" className="text-[hsl(42_85%_40%)] hover:underline">logaguesthouse@gmail.com</a>. Refunds are processed within 7–10 business days.</p>
                            </Section>

                            <Section title="4. Payment">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>We accept Visa, Mastercard, and select online wallets via Cashfree Payments.</li>
                                    <li>A 50% advance payment is required to confirm a reservation.</li>
                                    <li>The remaining balance is due at check-in.</li>
                                    <li>Loga Guest House uses SSL encryption and PCI-DSS-compliant processing; card details are never stored on our servers.</li>
                                </ul>
                            </Section>

                            <Section title="5. House Rules">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Smoking is prohibited inside all rooms and indoor common areas.</li>
                                    <li>Quiet hours: 10:00 PM – 7:00 AM.</li>
                                    <li>Pets are not permitted on the premises.</li>
                                    <li>Guests are responsible for any damage to property during their stay.</li>
                                    <li>Outside visitors must be registered at the front desk.</li>
                                    <li>Illegal activities on the premises will result in immediate eviction without refund.</li>
                                </ul>
                            </Section>

                            <Section title="6. Liability">
                                <p>
                                    Loga Guest House is not liable for loss or theft of personal belongings. Secure safes
                                    are available in all rooms. We are not responsible for circumstances beyond our
                                    reasonable control including natural disasters, power outages, or government-imposed
                                    travel restrictions.
                                </p>
                            </Section>

                            <Section title="7. Privacy">
                                <p>
                                    Your personal data is handled in accordance with our{" "}
                                    <Link href="/privacy" className="text-[hsl(42_85%_40%)] hover:underline">
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </Section>

                            <Section title="8. Governing Law">
                                <p>
                                    These Terms are governed by the laws of the Democratic Socialist Republic of Sri Lanka.
                                    Any disputes shall be subject to the jurisdiction of the courts of Jaffna, Sri Lanka.
                                </p>
                            </Section>

                            <Section title="9. Amendments">
                                <p>
                                    Loga Guest House reserves the right to amend these Terms at any time. The version
                                    published on our website at the time of booking shall apply.
                                </p>
                            </Section>

                            <Section title="10. Contact">
                                <address className="not-italic">
                                    <strong>Loga Guest House</strong><br />
                                    Jaffna, Northern Province, Sri Lanka 40000<br />
                                    <a href="mailto:logaguesthouse@gmail.com" className="text-[hsl(42_85%_40%)] hover:underline">
                                        logaguesthouse@gmail.com
                                    </a>
                                </address>
                            </Section>

                            <div className="mt-8 pt-6 border-t border-[hsl(35_8%_90%)] flex gap-6">
                                <Link href="/privacy" className="text-sm font-medium text-[hsl(42_85%_40%)] hover:underline">
                                    Privacy Policy →
                                </Link>
                                <Link href="/contact" className="text-sm font-medium text-[hsl(42_85%_40%)] hover:underline">
                                    Contact Us →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
