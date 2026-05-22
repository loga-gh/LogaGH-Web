"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "./translations/en";
import ta from "./translations/ta";
import ml from "./translations/ml";
import hi from "./translations/hi";

type Language = "en" | "ta" | "ml" | "hi";

type TranslationDictionary = typeof en;

const translations: Record<Language, TranslationDictionary> = {
    en,
    ta,
    ml,
    hi,
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string | any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");

    useEffect(() => {
        // Hydrate from localStorage if available
        const savedLang = localStorage.getItem("loga_language") as Language;
        if (savedLang && translations[savedLang]) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("loga_language", lang);
    };

    const t = (path: string): string | any => {
        const keys = path.split(".");
        let current: any = translations[language];
        let fallback: any = translations["en"];

        for (const key of keys) {
            if (current[key] !== undefined) {
                current = current[key];
            } else {
                current = undefined;
            }
            
            if (fallback[key] !== undefined) {
                fallback = fallback[key];
            } else {
                fallback = undefined;
            }
        }

        return current || fallback || path;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            <div dir="ltr">{children}</div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
