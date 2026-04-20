import { Phone, Mail, MapPin } from "lucide-react";

export function ContactCTASection() {
    return (
        <section
            id="contact"
            className="relative py-20 md:py-32 overflow-hidden bg-[#2F5D50]"
            aria-labelledby="contact-cta-heading"
        >
            <div className="container-luxury relative z-10 grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
                {/* Contact Content */}
                <div>
                    <div className="inline-flex items-center gap-4 mb-6">
                        <span className="w-12 h-[1px] bg-[#D6C3A3]" aria-hidden="true" />
                        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#D6C3A3]">
                            Reach Out
                        </span>
                    </div>

                    <h2
                        id="contact-cta-heading"
                        className="text-[#F8F5F0] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight drop-shadow-sm"
                    >
                        Plan your stay with us directly
                    </h2>

                    <p className="text-[#F8F5F0]/80 text-base md:text-lg leading-relaxed mb-10 font-light">
                        We believe in personalized service from the very first hello. Contact us via WhatsApp, phone, or email, and we'll ensure your stay is perfectly tailored to your needs.
                    </p>

                    {/* Quick contact */}
                    <div className="space-y-6">
                        <a
                            href="https://wa.me/94770000000"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#D6C3A3] text-[#1E3A5F] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#D6C3A3]/90 transition-colors shadow-lg"
                        >
                            WhatsApp Us
                        </a>

                        <div className="flex flex-col gap-4 mt-8">
                            <a
                                href="tel:+94770000000"
                                className="flex items-center gap-4 text-[#F8F5F0] hover:text-[#D6C3A3] transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <Phone size={20} aria-hidden="true" />
                                </div>
                                <span className="text-lg">+94 77 000 0000</span>
                            </a>
                            <a
                                href="mailto:logaguesthouse@gmail.com"
                                className="flex items-center gap-4 text-[#F8F5F0] hover:text-[#D6C3A3] transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <Mail size={20} aria-hidden="true" />
                                </div>
                                <span className="text-lg">logaguesthouse@gmail.com</span>
                            </a>
                            <div className="flex items-center gap-4 text-[#F8F5F0]">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <MapPin size={20} aria-hidden="true" />
                                </div>
                                <span className="text-lg">Loga Guest House, Jaffna, Sri Lanka</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Embed */}
                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125745.10985226164!2d79.94747372986422!3d9.661500000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe53fd7be66aa5%3A0xc7a1d805611e9a3b!2sJaffna%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Loga Guest House Location"
                        className="grayscale hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
