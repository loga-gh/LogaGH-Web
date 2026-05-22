"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const languages = [
    { code: "en", label: "English" },
    { code: "ta", label: "தமிழ்" },
    { code: "ml", label: "മലയാളം" },
    { code: "hi", label: "हिंदी" },
] as const;

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
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
            <button
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1E3A5F]/20 text-[#F8F5F0] hover:bg-[#D6C3A3]/20 hover:text-[#D6C3A3] transition-all border border-[#F8F5F0]/20 shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-label="Select language"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="20" 
                    viewBox="0 -960 960 960" 
                    width="20" 
                    fill="currentColor"
                >
                    <path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-38-65-83.5T185-640h82q15 37 39.5 71.5T360-500q51-54 83.5-117.5T486-740H120v-80h360v-80h80v80h360v80H568q-11 85-50.5 163.5T418-434l124 124-43 43-139-139-144 144v62Zm466-192h148l-74-214-74 214Z"/>
                </svg>
            </button>

            {/* Dropdown */}
            <div
                className={cn(
                    "absolute right-0 mt-2 w-40 rounded-xl bg-[#1E3A5F] border border-[#F8F5F0]/10 shadow-2xl overflow-hidden transition-all duration-200 origin-top-right z-50",
                    isOpen
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                )}
            >
                <div className="py-2" role="menu" aria-orientation="vertical">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            type="button"
                            className={cn(
                                "w-full text-left px-4 py-2 text-sm transition-colors",
                                language === lang.code
                                    ? "bg-[#D6C3A3]/20 text-[#D6C3A3] font-medium"
                                    : "text-[#F8F5F0]/80 hover:bg-[#F8F5F0]/10 hover:text-[#F8F5F0]"
                            )}
                            role="menuitem"
                            onClick={() => {
                                setLanguage(lang.code as any);
                                setIsOpen(false);
                            }}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
