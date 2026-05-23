"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const languages = [
    { code: "en", label: "English",  native: "English",  flag: "🇬🇧" },
    { code: "ta", label: "Tamil",    native: "தமிழ்",    flag: "🇱🇰" },
    { code: "ml", label: "Malayalam",native: "മലയാളം",   flag: "🇮🇳" },
    { code: "hi", label: "Hindi",    native: "हिंदी",    flag: "🇮🇳" },
] as const;

/** Google Translate icon — "अ A" symbol */
function TranslateIcon({ size = 18 }: { size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            width={size}
            viewBox="0 -960 960 960"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-38-65-83.5T185-640h82q15 37 39.5 71.5T360-500q51-54 83.5-117.5T486-740H120v-80h360v-80h80v80h360v80H568q-11 85-50.5 163.5T418-434l124 124-43 43-139-139-144 144v62Zm466-192h148l-74-214-74 214Z" />
        </svg>
    );
}

function ChevronDown({ open }: { open: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const current = languages.find((l) => l.code === language) ?? languages[0];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* ── Trigger button ── */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label={`Language: ${current.label}. Click to change`}
                className={cn(
                    "group flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300",
                    "text-sm font-medium select-none",
                    isOpen
                        ? "bg-[#D6C3A3]/25 border-[#D6C3A3]/60 text-[#D6C3A3]"
                        : "bg-white/5 border-white/20 text-[#F8F5F0]/90 hover:bg-[#D6C3A3]/15 hover:border-[#D6C3A3]/40 hover:text-[#D6C3A3]"
                )}
            >
                {/* Translate icon */}
                <span className="flex-shrink-0">
                    <TranslateIcon size={16} />
                </span>

                {/* Flag + short label */}
                <span className="flex items-center gap-1.5 leading-none">
                    <span className="text-base leading-none" aria-hidden="true">{current.flag}</span>
                    <span className="hidden sm:inline tracking-wide">{current.label}</span>
                </span>

                {/* Chevron */}
                <span className="flex-shrink-0 opacity-70">
                    <ChevronDown open={isOpen} />
                </span>
            </button>

            {/* ── Dropdown panel ── */}
            <div
                role="listbox"
                aria-label="Select language"
                className={cn(
                    "absolute right-0 mt-2 w-52 rounded-2xl overflow-hidden z-50",
                    "bg-[#0f2340]/95 backdrop-blur-xl",
                    "border border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)]",
                    "transition-all duration-250 origin-top-right",
                    isOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                )}
            >
                {/* Header */}
                <div className="px-4 pt-3 pb-2 border-b border-white/8">
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#D6C3A3]/70">
                        Select Language
                    </p>
                </div>

                {/* Options */}
                <div className="py-1.5">
                    {languages.map((lang) => {
                        const isActive = language === lang.code;
                        return (
                            <button
                                key={lang.code}
                                type="button"
                                role="option"
                                aria-selected={isActive}
                                onClick={() => { setLanguage(lang.code as any); setIsOpen(false); }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 relative",
                                    isActive
                                        ? "text-[#D6C3A3] bg-[#D6C3A3]/10"
                                        : "text-[#F8F5F0]/75 hover:text-[#F8F5F0] hover:bg-white/6"
                                )}
                            >
                                {/* Flag */}
                                <span className="text-xl w-7 flex-shrink-0 leading-none">{lang.flag}</span>

                                {/* Labels */}
                                <span className="flex flex-col items-start min-w-0">
                                    <span className="font-semibold text-sm leading-tight tracking-wide">
                                        {lang.label}
                                    </span>
                                    <span className={cn(
                                        "text-xs leading-tight mt-0.5",
                                        isActive ? "text-[#D6C3A3]/60" : "text-white/35"
                                    )}>
                                        {lang.native}
                                    </span>
                                </span>

                                {/* Active check */}
                                {isActive && (
                                    <span className="ml-auto flex-shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-[#D6C3A3]"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
