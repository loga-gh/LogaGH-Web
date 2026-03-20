import Image from "next/image";
import { Leaf, Shield, Heart, Coffee, Wifi, MapPin } from "lucide-react";

const FEATURES = [
    {
        icon: Heart,
        title: "Tamil Hospitality",
        description:
            "Greet each dawn with a freshly drawn kolam at your door — a ritual of welcome that has blessed Tamil thresholds for millennia.",
        color: "hsl(0 68% 42%)",
        bg: "hsl(0 68% 42% / 0.08)",
    },
    {
        icon: Shield,
        title: "Heritage Preserved",
        description:
            "Our 1890s Dutch-colonial property has been painstakingly restored — carved teak panels, terracotta tiles, and palmyra motifs intact.",
        color: "hsl(38 80% 40%)",
        bg: "hsl(42 85% 58% / 0.08)",
    },
    {
        icon: Coffee,
        title: "Authentic Breakfast",
        description:
            "Start your day with string hoppers, coconut sambal, and jaggery tea — a traditional Sri Lankan breakfast prepared from scratch.",
        color: "hsl(18 58% 52%)",
        bg: "hsl(18 58% 52% / 0.08)",
    },
    {
        icon: Wifi,
        title: "Modern Comforts",
        description:
            "Heritage aesthetics meet contemporary living — high-speed Wi-Fi, air conditioning, en-suite hot showers, and smart TVs.",
        color: "hsl(175 60% 32%)",
        bg: "hsl(175 60% 32% / 0.08)",
    },
    {
        icon: MapPin,
        title: "Prime Location",
        description:
            "Walk minutes to Nallur Kovil, the Dutch Fort, and Jaffna's legendary market. We are your gateway to the entire peninsula.",
        color: "hsl(220 25% 35%)",
        bg: "hsl(220 25% 35% / 0.08)",
    },
    {
        icon: Leaf,
        title: "Sustainable Hosting",
        description:
            "Solar water heating, rainwater harvesting, and an organic herb garden — luxury that honours the land it stands on.",
        color: "hsl(140 55% 30%)",
        bg: "hsl(140 55% 30% / 0.08)",
    },
];

export function WhyUsSection() {
    return (
        <section
            className="py-24"
            style={{ background: "white" }}
            aria-labelledby="why-us-heading"
        >
            <div className="container-luxury">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: image collage */}
                    <div className="relative">
                        {/* Primary photo */}
                        <div
                            className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_hsl(220_25%_8%/0.2)]"
                            style={{ aspectRatio: "4/5" }}
                        >
                            <Image
                                src="/assets/DSC05370.JPG.jpeg"
                                alt="Loga Guest House interior — heritage carved teak and Tamil decor"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        {/* Floating secondary photo */}
                        <div
                            className="absolute -right-8 -bottom-8 w-2/5 rounded-2xl overflow-hidden shadow-[0_16px_48px_hsl(220_25%_8%/0.25)] border-4 border-white"
                            style={{ aspectRatio: "1" }}
                        >
                            <Image
                                src="/assets/DSC05372.JPG.jpeg"
                                alt="Loga Guest House courtyard"
                                fill
                                sizes="20vw"
                                className="object-cover"
                            />
                        </div>

                        {/* Gold stat pill */}
                        <div
                            className="absolute -left-5 top-1/3 rounded-2xl px-5 py-4 shadow-[0_8px_24px_hsl(42_85%_58%/0.3)]"
                            style={{
                                background: "linear-gradient(135deg, hsl(38 80% 40%), hsl(42 85% 58%))",
                            }}
                        >
                            <p className="text-4xl font-bold text-white leading-none">15+</p>
                            <p className="text-white/80 text-xs mt-1 font-medium tracking-wide uppercase">
                                Years of<br />Heritage Hosting
                            </p>
                        </div>
                    </div>

                    {/* Right: content */}
                    <div>
                        <p className="section-eyebrow mb-3">Why Loga</p>
                        <div className="divider-gold max-w-[10rem] mb-4" aria-hidden="true">
                            <span
                                style={{ color: "hsl(42, 85%, 58%)", fontFamily: "var(--font-great-vibes)" }}
                            >
                                ✦
                            </span>
                        </div>

                        <h2
                            id="why-us-heading"
                            className="text-4xl sm:text-5xl font-bold mb-6"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            A Stay Unlike<br />
                            <span className="text-gradient-gold">Any Other</span>
                        </h2>

                        <p className="text-[hsl(35_8%_45%)] leading-relaxed mb-10 text-base">
                            Loga Guest House is not merely a place to sleep — it is an immersion in
                            living Tamil heritage. Every detail, from the scent of burning camphor
                            at dawn to the carved archways that frame each room, speaks of a culture
                            that takes great pride in welcoming guests.
                        </p>

                        {/* Feature grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {FEATURES.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="flex gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-sm"
                                    style={{ background: feature.bg }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                        style={{ background: `${feature.color}20`, color: feature.color }}
                                        aria-hidden="true"
                                    >
                                        <feature.icon size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm mb-1"
                                            style={{ color: "hsl(220 25% 10%)" }}>
                                            {feature.title}
                                        </h3>
                                        <p className="text-xs leading-relaxed"
                                            style={{ color: "hsl(35 8% 45%)" }}>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
