import Link from "next/link";
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Youtube,
} from "lucide-react";
import { KolamSVG } from "./KolamSVG";

const FOOTER_LINKS = {
    explore: [
        { href: "/rooms", label: "Our Rooms" },
        { href: "/gallery", label: "Gallery" },
        { href: "/about", label: "Our Story" },
        { href: "/contact", label: "Contact Us" },
    ],
    nearby: [
        { href: "#", label: "Nallur Kovil" },
        { href: "#", label: "Jaffna Fort" },
        { href: "#", label: "Nagadeepa Island" },
        { href: "#", label: "Jaffna Market" },
        { href: "#", label: "Keerimalai Springs" },
    ],
};

export function Footer() {
    return (
        <footer
            className="relative overflow-hidden pt-20 pb-8"
            style={{ background: "hsl(220 25% 6%)" }}
            aria-label="Site footer"
        >
            {/* Decorative kolam top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(42_85%_58%/0.4)] to-transparent" />

            {/* Background kolam watermark */}
            <div className="absolute top-8 right-8 opacity-5 pointer-events-none">
                <KolamSVG size={280} />
            </div>

            <div className="container-luxury">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand column */}
                    <div className="lg:col-span-1">
                        <Link href="/" aria-label="Loga Guest House Home">
                            <span
                                className="block text-4xl mb-2"
                                style={{
                                    fontFamily: "var(--font-great-vibes)",
                                    color: "hsl(42 85% 58%)",
                                }}
                            >
                                Loga
                            </span>
                        </Link>
                        <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-4"
                            style={{ color: "hsl(43 35% 95% / 0.4)" }}>
                            Guest House · Jaffna, Sri Lanka
                        </p>
                        <p className="text-sm leading-relaxed mb-6"
                            style={{ color: "hsl(43 35% 95% / 0.55)" }}>
                            A heritage sanctuary where Tamil tradition meets boutique luxury.
                            Each room is a doorway to the soul of Jaffna.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
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
                                    className="flex items-center justify-center w-9 h-9 rounded-full border border-[hsl(42_85%_58%/0.25)] text-[hsl(43_35%_95%/0.55)] hover:text-[hsl(42_85%_58%)] hover:border-[hsl(42_85%_58%/0.6)] hover:bg-[hsl(42_85%_58%/0.08)] transition-all duration-300"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-6"
                            style={{ color: "hsl(42 85% 58%)" }}>
                            Explore
                        </h3>
                        <ul className="space-y-3" role="list">
                            {FOOTER_LINKS.explore.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm transition-colors duration-200 hover:text-[hsl(42_85%_58%)]"
                                        style={{ color: "hsl(43 35% 95% / 0.55)" }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Nearby */}
                    <div>
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-6"
                            style={{ color: "hsl(42 85% 58%)" }}>
                            Nearby Sights
                        </h3>
                        <ul className="space-y-3" role="list">
                            {FOOTER_LINKS.nearby.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm transition-colors duration-200 hover:text-[hsl(42_85%_58%)]"
                                        style={{ color: "hsl(43 35% 95% / 0.55)" }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-6"
                            style={{ color: "hsl(42 85% 58%)" }}>
                            Get In Touch
                        </h3>
                        <ul className="space-y-4" role="list">
                            <li>
                                <a
                                    href="tel:+94XXXXXXXXX"
                                    className="flex items-start gap-3 text-sm group"
                                    style={{ color: "hsl(43 35% 95% / 0.55)" }}
                                >
                                    <Phone size={15} className="mt-0.5 shrink-0 group-hover:text-[hsl(42_85%_58%)] transition-colors" />
                                    <span className="group-hover:text-[hsl(42_85%_58%)] transition-colors">
                                        +94 77 XXX XXXX
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:logaguesthouse@gmail.com"
                                    className="flex items-start gap-3 text-sm group"
                                    style={{ color: "hsl(43 35% 95% / 0.55)" }}
                                >
                                    <Mail size={15} className="mt-0.5 shrink-0 group-hover:text-[hsl(42_85%_58%)] transition-colors" />
                                    <span className="group-hover:text-[hsl(42_85%_58%)] transition-colors break-all">
                                        logaguesthouse@gmail.com
                                    </span>
                                </a>
                            </li>
                            <li>
                                <div
                                    className="flex items-start gap-3 text-sm"
                                    style={{ color: "hsl(43 35% 95% / 0.55)" }}
                                >
                                    <MapPin size={15} className="mt-0.5 shrink-0" />
                                    <address className="not-italic leading-relaxed">
                                        Loga Guest House,<br />
                                        Jaffna, Northern Province,<br />
                                        Sri Lanka 40000
                                    </address>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs"
                    style={{
                        borderTop: "1px solid hsl(43 35% 95% / 0.08)",
                        color: "hsl(43 35% 95% / 0.35)",
                    }}
                >
                    <p>© {new Date().getFullYear()} Loga Guest House. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-[hsl(42_85%_58%)] transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-[hsl(42_85%_58%)] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
