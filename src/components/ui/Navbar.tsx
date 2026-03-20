"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileOpen]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled
                        ? "bg-[hsl(220_25%_8%/0.95)] backdrop-blur-md shadow-[0_4px_24px_hsl(220_25%_8%/0.3)] py-3"
                        : "bg-transparent py-5"
                )}
            >
                <nav
                    className="container-luxury flex items-center justify-between"
                    aria-label="Main navigation"
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex flex-col leading-none group"
                        aria-label="Loga Guest House — Home"
                    >
                        <span
                            className="font-['var(--font-great-vibes)'] text-3xl"
                            style={{
                                fontFamily: "var(--font-great-vibes)",
                                color: "hsl(42 85% 58%)",
                            }}
                        >
                            Loga
                        </span>
                        <span
                            className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase -mt-1"
                            style={{ color: "hsl(43 35% 95% / 0.7)" }}
                        >
                            Guest House · Jaffna
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center gap-1" role="list">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300",
                                        "text-[hsl(43_35%_95%/0.85)] hover:text-[hsl(42_85%_58%)] hover:bg-[hsl(42_85%_58%/0.1)]"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* CTA + Mobile toggle */}
                    <div className="flex items-center gap-3">
                        <a
                            href="tel:+94XXXXXXXXX"
                            className="hidden sm:flex items-center gap-1.5 text-sm text-[hsl(43_35%_95%/0.7)] hover:text-[hsl(42_85%_58%)] transition-colors"
                            aria-label="Call us"
                        >
                            <Phone size={14} />
                            <span className="text-xs tracking-wide">+94 77 XXX XXXX</span>
                        </a>

                        <Link
                            href="/rooms"
                            className="btn btn-gold hidden md:inline-flex text-sm px-5 py-2.5"
                            id="nav-book-now-btn"
                        >
                            Book Now
                        </Link>

                        {/* Mobile hamburger */}
                        <button
                            type="button"
                            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-[hsl(43_35%_95%)] hover:bg-[hsl(43_35%_95%/0.1)] transition-colors"
                            onClick={() => setIsMobileOpen((v) => !v)}
                            aria-expanded={isMobileOpen}
                            aria-controls="mobile-menu"
                            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                        >
                            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                id="mobile-menu"
                className={cn(
                    "fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-8 transition-all duration-300 md:hidden",
                    "bg-[hsl(220_25%_8%/0.97)] backdrop-blur-xl",
                    isMobileOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
                aria-hidden={!isMobileOpen}
            >
                <ul className="flex flex-col gap-2" role="list">
                    {NAV_LINKS.map((link, i) => (
                        <li
                            key={link.href}
                            style={{ transitionDelay: isMobileOpen ? `${i * 60}ms` : "0ms" }}
                            className={cn(
                                "transition-all duration-300",
                                isMobileOpen
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-4 opacity-0"
                            )}
                        >
                            <Link
                                href={link.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="block py-4 text-2xl font-medium text-[hsl(43_35%_95%)] hover:text-[hsl(42_85%_58%)] transition-colors border-b border-[hsl(43_35%_95%/0.08)]"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto">
                    <Link
                        href="/rooms"
                        onClick={() => setIsMobileOpen(false)}
                        className="btn btn-gold w-full text-center"
                        id="mobile-book-now-btn"
                    >
                        Book Your Stay
                    </Link>
                    <a
                        href="tel:+94XXXXXXXXX"
                        className="mt-3 flex items-center justify-center gap-2 text-[hsl(43_35%_95%/0.6)] text-sm"
                    >
                        <Phone size={14} />
                        +94 77 XXX XXXX
                    </a>
                </div>
            </div>
        </>
    );
}

export default Navbar;
