import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "How Loga Guest House collects, uses, and protects your personal information.",
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
            <div className="text-sm text-[hsl(35_8%_38%)] leading-relaxed space-y-2">
                {children}
            </div>
        </section>
    );
}

export default function PrivacyPage() {
    return (
        <>
            <Navbar />
            <main id="main-content">
                <section
                    className="pt-32 pb-14"
                    style={{ background: "hsl(220 25% 8%)" }}
                    aria-label="Privacy policy hero"
                >
                    <div className="container-luxury text-center">
                        <p className="section-eyebrow mb-3" style={{ color: "hsl(18 58% 52%)" }}>Legal</p>
                        <h1
                            className="text-5xl font-bold text-white mb-3"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Privacy <span className="text-gradient-gold">Policy</span>
                        </h1>
                        <p className="text-[hsl(43_35%_90%/0.55)] text-sm">
                            Last updated: <time dateTime="2025-03-18">18 March 2025</time>
                        </p>
                    </div>
                </section>

                <section className="py-16" style={{ background: "hsl(43 35% 96%)" }}>
                    <div className="container-luxury max-w-3xl">
                        <div className="bg-white rounded-2xl border border-[hsl(35_8%_90%)] p-8 sm:p-12">
                            <p className="text-sm text-[hsl(35_8%_38%)] leading-relaxed mb-8">
                                At <strong>Loga Guest House</strong>, we are committed to protecting your privacy.
                                This policy explains what data we collect and how we use it.
                            </p>

                            <Section title="1. Information We Collect">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><strong>Identity:</strong> Full name, passport/NIC (check-in).</li>
                                    <li><strong>Contact:</strong> Email, phone, postal address.</li>
                                    <li><strong>Booking:</strong> Dates, room preferences, special requests.</li>
                                    <li><strong>Payment:</strong> Card type and last four digits — full card numbers are never stored; payments go through Cashfree.</li>
                                    <li><strong>Technical:</strong> IP address, browser, device, and pages visited.</li>
                                </ul>
                            </Section>

                            <Section title="2. How We Use Your Information">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>To process and confirm your reservation.</li>
                                    <li>To communicate booking updates and support requests.</li>
                                    <li>To send marketing emails only if you have opted in.</li>
                                    <li>To comply with Sri Lankan legal and regulatory obligations.</li>
                                    <li>To improve our website through anonymised analytics.</li>
                                </ul>
                            </Section>

                            <Section title="3. Cookies">
                                <p>We use essential cookies for sessions and booking, and anonymised analytics cookies. No personally identifiable data is shared with third parties via cookies. You may disable cookies in browser settings.</p>
                            </Section>

                            <Section title="4. Data Sharing">
                                <p>
                                    We do <strong>not</strong> sell your data. We may share it with Cashfree (payments),
                                    Resend (email confirmations), and Sri Lankan authorities if required by law.
                                </p>
                            </Section>

                            <Section title="5. Data Retention">
                                <p>We retain your data for a minimum of 5 years from your last booking, in compliance with Sri Lankan regulations. You may request deletion of non-legally-required data at any time.</p>
                            </Section>

                            <Section title="6. Your Rights">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Access, correct, or delete the data we hold about you.</li>
                                    <li>Object to or restrict processing.</li>
                                    <li>Withdraw marketing consent at any time.</li>
                                </ul>
                                <p className="mt-2">
                                    To exercise these rights email{" "}
                                    <a href="mailto:logaguesthouse@gmail.com" className="text-[hsl(42_85%_40%)] hover:underline">
                                        logaguesthouse@gmail.com
                                    </a>.
                                </p>
                            </Section>

                            <Section title="7. Security">
                                <p>We use HTTPS, Supabase Row Level Security, and access controls. No internet transmission is 100% secure.</p>
                            </Section>

                            <Section title="8. Children's Privacy">
                                <p>Our site is not directed at children under 13. We do not knowingly collect data from children.</p>
                            </Section>

                            <Section title="9. Changes">
                                <p>We may update this policy periodically. The &quot;Last updated&quot; date above reflects the latest revision.</p>
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
                                <Link href="/terms" className="text-sm font-medium text-[hsl(42_85%_40%)] hover:underline">
                                    Terms &amp; Conditions →
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
