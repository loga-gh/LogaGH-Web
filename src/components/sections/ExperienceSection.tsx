"use client";

import { Coffee, Trees, Library, Flower2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function ExperienceSection() {
    const { t } = useLanguage();
    
    const experiences = [
        {
            icon: <Coffee size={32} className="text-[#D6C3A3]" />,
            title: t("experience.items.cuisine.title"),
            description: t("experience.items.cuisine.desc")
        },
        {
            icon: <Trees size={32} className="text-[#D6C3A3]" />,
            title: t("experience.items.nature.title"),
            description: t("experience.items.nature.desc")
        },
        {
            icon: <Library size={32} className="text-[#D6C3A3]" />,
            title: t("experience.items.heritage.title"),
            description: t("experience.items.heritage.desc")
        },
        {
            icon: <Flower2 size={32} className="text-[#D6C3A3]" />,
            title: t("experience.items.ayurveda.title"),
            description: t("experience.items.ayurveda.desc")
        }
    ];

    return (
        <section
            id="experience"
            className="py-20 md:py-32 bg-[#1E3A5F] text-[#F8F5F0]"
            aria-label="Experience Loga Guest House"
        >
            <div className="container-luxury">
                <div className="text-center mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <span className="w-12 h-[1px] bg-[#D6C3A3]" aria-hidden="true" />
                        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#D6C3A3]">
                            {t("experience.eyebrow")}
                        </span>
                        <span className="w-12 h-[1px] bg-[#D6C3A3]" aria-hidden="true" />
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 text-[#F8F5F0] drop-shadow-sm">
                        {t("experience.title")}
                    </h2>
                    <p className="text-base md:text-lg text-[#F8F5F0]/80 max-w-2xl mx-auto font-light leading-relaxed">
                        {t("experience.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {experiences.map((exp, index) => (
                        <div 
                            key={index}
                            className="group bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm cursor-default"
                        >
                            <div className="mb-8 bg-[#1E3A5F] border border-[#D6C3A3]/30 w-16 h-16 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:border-[#D6C3A3] transition-transform duration-500">
                                {exp.icon}
                            </div>
                            <h3 className="text-2xl font-serif font-medium mb-4 text-[#F8F5F0]">
                                {exp.title}
                            </h3>
                            <p className="text-[#F8F5F0]/70 leading-relaxed font-light">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
