import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ContactForm, ContactInfoPanel } from "@/components/contact/ContactForm";
import { KolamSVG } from "@/components/ui/KolamSVG";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with Loga Guest House in Jaffna. Send a booking inquiry, ask a question, or request special arrangements. We respond within 2 hours.",
};

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main id="main-content">
                {/* Hero */}
                <section
                    className="relative pt-32 pb-16 overflow-hidden"
                    style={{ background: "hsl(220 25% 8%)" }}
                    aria-label="Contact page hero"
                >
                    <div className="absolute top-16 right-12 opacity-10 pointer-events-none" aria-hidden="true">
                        <KolamSVG size={180} />
                    </div>
                    <div className="container-luxury relative z-10 text-center">
                        <p className="section-eyebrow mb-4" style={{ color: "hsl(18 58% 52%)" }}>
                            We&apos;d Love to Hear From You
                        </p>
                        <h1
                            className="text-5xl sm:text-6xl font-bold text-white mb-4"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Get in{" "}
                            <span className="text-gradient-gold">Touch</span>
                        </h1>
                        <p className="text-[hsl(43_35%_95%/0.6)] max-w-md mx-auto leading-relaxed">
                            Whether you have a question, a special request, or wish to arrange a visit —
                            our team is here to help you plan the perfect stay.
                        </p>
                    </div>
                </section>

                {/* Main contact area */}
                <section
                    className="py-20"
                    style={{ background: "hsl(43 35% 96%)" }}
                    aria-label="Contact form and information"
                >
                    <div className="container-luxury">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                            {/* Info panel */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-sm border border-[hsl(35_8%_90%)] p-8 mb-6">
                                    <h2
                                        className="text-xl font-semibold mb-6"
                                        style={{ fontFamily: "var(--font-playfair)" }}
                                    >
                                        Contact Information
                                    </h2>
                                    <ContactInfoPanel />
                                </div>

                                {/* Google Maps embed placeholder */}
                                <div
                                    className="rounded-2xl overflow-hidden bg-[hsl(35_8%_88%)] flex items-center justify-center"
                                    style={{ height: "200px" }}
                                >
                                    <div className="text-center p-6">
                                        <p className="text-xs text-[hsl(35_8%_50%)] mb-2">📍 Google Maps</p>
                                        <p className="text-xs text-[hsl(35_8%_55%)]">Jaffna, Sri Lanka</p>
                                        <a
                                            href="https://maps.google.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 inline-block text-xs text-[hsl(42_85%_40%)] hover:underline"
                                        >
                                            Open in Google Maps →
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl shadow-sm border border-[hsl(35_8%_90%)] p-8">
                                    <h2
                                        className="text-xl font-semibold mb-2"
                                        style={{ fontFamily: "var(--font-playfair)" }}
                                    >
                                        Send an Inquiry
                                    </h2>
                                    <p className="text-sm text-[hsl(35_8%_50%)] mb-8">
                                        Fill in the form below and we&apos;ll get back to you promptly.
                                    </p>
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
