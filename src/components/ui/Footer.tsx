import Link from "next/link";
import { MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer
            className="relative overflow-hidden pt-16 pb-8 bg-[#1E3A5F] border-t border-[#D6C3A3]/20"
            aria-label="Site footer"
        >
            <div className="container-luxury">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                    {/* Brand column */}
                    <div className="lg:col-span-1">
                        <Link href="/" aria-label="Loga Guest House Home" className="inline-flex items-center gap-3 mb-6 relative group">
                            <img 
                                src="/logo.png" 
                                alt="Loga Guest House Logo" 
                                className="h-10 sm:h-12 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="flex flex-col leading-none">
                                <span
                                    className="text-3xl sm:text-4xl drop-shadow-md"
                                    style={{ 
                                        fontFamily: "var(--font-script)", 
                                        color: "#FBBF24", // Vibrant gold
                                        textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                                    }}
                                >
                                    Loga
                                </span>
                                <span
                                    className="text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] mt-0.5 pl-0.5"
                                    style={{ 
                                        color: "#E5E7EB", // Light gray
                                        textShadow: "0 1px 2px rgba(0,0,0,0.5)"
                                    }}
                                >
                                    GUEST HOUSE
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6 text-[#F8F5F0]/70">
                            A serene sanctuary where nature, comfort, and Sri Lankan culture come together.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[
                                { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                                { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                            ].map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-[#D6C3A3] hover:bg-[#D6C3A3] hover:text-[#1E3A5F] transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-[#D6C3A3]">
                            Explore
                        </h3>
                        <ul className="space-y-4" role="list">
                            {[
                                { href: "/#experience", label: "Experience" },
                                { href: "/#gallery", label: "Gallery" },
                                { href: "/#contact", label: "Contact Us" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[#F8F5F0]/70 hover:text-[#D6C3A3] transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Location */}
                    <div>
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-[#D6C3A3]">
                            Location
                        </h3>
                        <div className="flex items-start gap-3 text-sm text-[#F8F5F0]/70">
                            <MapPin size={18} className="mt-0.5 shrink-0 text-[#D6C3A3]" />
                            <a 
                                href="https://maps.app.goo.gl/xK6oi4FA1ni6QHvc8"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-[#D6C3A3] transition-colors"
                            >
                                <address className="not-italic leading-relaxed">
                                    Loga Guest House,<br />
                                    Courts Road, Mallakam,<br />
                                    Sri Lanka
                                </address>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-[#F8F5F0]/50"
                >
                    <p>© {new Date().getFullYear()} Loga Guest House. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
