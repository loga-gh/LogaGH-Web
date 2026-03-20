import Image from "next/image";
import { KolamSVG } from "@/components/ui/KolamSVG";

const GALLERY_IMAGES = [
    { src: "/assets/DSC05363.JPG.jpeg", alt: "Heritage Suite — Carved teak bed under palmyra canopy" },
    { src: "/assets/DSC05365.JPG.jpeg", alt: "Heritage corridor with hand-painted tile floors" },
    { src: "/assets/DSC05367.JPG.jpeg", alt: "Sun-drenched private balcony overlooking garden" },
    { src: "/assets/DSC05368.JPG.jpeg", alt: "Lotus Superior Room — serene white-and-gold interiors" },
    { src: "/assets/DSC05370.JPG.jpeg", alt: "Heritage courtyard with morning kolam drawing" },
    { src: "/assets/DSC05371.JPG.jpeg", alt: "Family Suite — vaulted heritage ceiling with brass lamps" },
];

export function GallerySection() {
    return (
        <section
            className="py-24 relative overflow-hidden"
            style={{ background: "hsl(43 35% 96%)" }}
            aria-labelledby="gallery-heading"
        >
            <div className="container-luxury">
                {/* Header */}
                <div className="text-center mb-14">
                    <p className="section-eyebrow mb-3">Visual Journey</p>
                    <div className="divider-gold max-w-xs mx-auto mb-4" aria-hidden="true">
                        <KolamSVG size={32} strokeWidth={1} />
                    </div>
                    <h2
                        id="gallery-heading"
                        className="text-4xl sm:text-5xl font-bold mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        A Glimpse Inside
                    </h2>
                    <p className="text-[hsl(35_8%_45%)] max-w-md mx-auto">
                        Every corner of Loga is a carefully curated composition of heritage and serenity.
                    </p>
                </div>

                {/* Masonry-style gallery grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {GALLERY_IMAGES.map((img, i) => (
                        <div
                            key={i}
                            className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" :
                                    i === 3 ? "col-span-2 md:col-span-1" : ""
                                }`}
                            style={{ aspectRatio: i === 0 ? "1" : i === 3 ? "2/1" : "4/3" }}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes={
                                    i === 0
                                        ? "(max-width: 768px) 100vw, 66vw"
                                        : "(max-width: 768px) 50vw, 33vw"
                                }
                                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                            />
                            {/* Caption overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_25%_8%/0.7)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <p className="text-white text-xs font-medium leading-snug">{img.alt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
