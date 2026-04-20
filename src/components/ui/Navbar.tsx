"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/#experience", label: "Experience" },
    { href: "/#gallery", label: "Gallery" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
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

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("/#")) {
            e.preventDefault();
            const targetId = href.substring(2);
            const elem = document.getElementById(targetId);
            if (elem) {
                elem.scrollIntoView({ behavior: "smooth" });
                setIsMobileOpen(false);
            }
        }
    };

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled
                        ? "bg-[#1E3A5F]/95 backdrop-blur-md shadow-md py-3"
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
                        className="flex flex-col items-center leading-none group relative"
                        aria-label="Loga Guest House — Home"
                    >
                        <span
                            className="text-5xl sm:text-6xl drop-shadow-md"
                            style={{ 
                                fontFamily: "var(--font-script)", 
                                color: "#FBBF24", // Vibrant gold to match the image
                                textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                            }}
                        >
                            Loga
                        </span>
                        <span
                            className="text-[0.65rem] sm:text-[0.75rem] font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] -mt-2"
                            style={{ 
                                color: "#E5E7EB", // Light gray
                                textShadow: "0 1px 2px rgba(0,0,0,0.5)"
                            }}
                        >
                            GUEST HOUSE · JAFFNA
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center gap-1" role="list">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300",
                                        "text-[#F8F5F0]/85 hover:text-[#D6C3A3]"
                                    )}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* CTA + Mobile toggle */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://wa.me/94770000000"
                            target="_blank"
                            rel="noreferrer"
                            className="btn hidden md:inline-flex text-sm px-5 py-2.5 bg-[#2F5D50] text-[#F8F5F0] hover:bg-[#2F5D50]/90 shadow-md"
                        >
                            Contact for Booking
                        </a>

                        {/* Mobile hamburger */}
                        <button
                            type="button"
                            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-[#F8F5F0] hover:bg-[#F8F5F0]/10 transition-colors"
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
                    "bg-[#1E3A5F]/95 backdrop-blur-xl",
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
                            <a
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="block py-4 text-2xl font-medium text-[#F8F5F0] hover:text-[#D6C3A3] transition-colors border-b border-[#F8F5F0]/10"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto">
                    <a
                        href="https://wa.me/94770000000"
                        target="_blank"
                        rel="noreferrer"
                        className="btn w-full text-center bg-[#2F5D50] text-[#F8F5F0]"
                    >
                        Contact for Booking
                    </a>
                    <a
                        href="tel:+94770000000"
                        className="mt-3 flex items-center justify-center gap-2 text-[#F8F5F0]/60 text-sm"
                    >
                        <Phone size={14} />
                        +94 77 000 0000
                    </a>
                </div>
            </div>
        </>
    );
}

export default Navbar;
