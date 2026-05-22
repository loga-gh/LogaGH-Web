"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const getNearbySights = (t: any) => [
    {
        name: t("nearby.places.nallur.name"),
        description: t("nearby.places.nallur.desc"),
        images: [
            "https://www.worldhindutemples.com/temples/srilanka/nallurkandaswamytemple/3.jpg",
            "https://thumbs.dreamstime.com/b/beautiful-nallur-kandaswamy-kovil-temple-jaffna-sri-lanka-jaffna-sri-lanka-th-january-beautiful-nallur-kandaswamy-kovil-242673928.jpg",
            "https://media.istockphoto.com/id/1256519897/photo/nallur-kandaswamy-temple-jaffna.jpg?s=612x612&w=0&k=20&c=h7C2XqN4xfRfqclMe3W1ERQrpjyOOSYlHo29VhWIbxM=",
            "https://editorial01.shutterstock.com/preview-440/10458949h/f486ae87/Shutterstock_10458949h.jpg"
        ],
        distance: "10 mins",
        url: "https://www.google.com/maps/search/?api=1&query=Nallur+Kandaswamy+Temple,+Temple+Rd,+Nallur,+Jaffna,+Sri+Lanka"
    },
    {
        name: t("nearby.places.fort.name"),
        description: t("nearby.places.fort.desc"),
        images: [
            "https://tse4.mm.bing.net/th/id/OIP.KU1MmKIZvN8Chl2sICspLgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
            "https://1.bp.blogspot.com/-oh9K2AnxoKA/X6eTUZvyX7I/AAAAAAAAE8E/rTSRgYsRqlUsrT-Lj48UTPEKy9du4p52gCPcBGAYYCw/s1011/Jaffna%2BFort%2B-%2BLankapradeepa.JPG",
            "https://www.storyofsrilanka.com/images/sri-lanka-guide/forts-light-houses-and-bridges/jaffna-fort/02.jpg",
            "https://i.ytimg.com/vi/X_Poz-vIQi4/maxresdefault.jpg"
        ],
        distance: "5 mins",
        url: "https://www.google.com/maps/search/?api=1&query=Jaffna+Fort,+Jaffna,+Sri+Lanka"
    },
    {
        name: t("nearby.places.casuarina.name"),
        description: t("nearby.places.casuarina.desc"),
        images: [
            "https://images.squarespace-cdn.com/content/v1/5b31dee870e80290d24d2229/1531099505150-N2536R1MW48VT7ZUEW1H/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/cas+cliffs.jpg",
            "https://i.pinimg.com/736x/0b/f7/85/0bf785375413682a92b95733eb163dd8.jpg",
            "https://ntec.nt.gov.au/__data/assets/image/0006/1397310/Casuarina.png",
            "https://casuarinabeach.com.au/wp-content/uploads/2020/12/Masterplan-1-1980x1036.jpg"
        ],
        distance: "40 mins",
        url: "https://www.google.com/maps/search/?api=1&query=Casuarina+Beach,+Karainagar,+Jaffna,+Sri+Lanka"
    },
    {
        name: t("nearby.places.keerimalai.name"),
        description: t("nearby.places.keerimalai.desc"),
        images: [
            "https://tse3.mm.bing.net/th/id/OIP.rqCex_HNMkUOY7BTf4XxuAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
            "https://sunwayholidays.lk/storage/activity/sunway-9019.jpg",
            "https://www.joonsquare.com/usermanage/image/business/kishkinda-water-park-koppal-11436/kishkinda-water-park-koppal-kishkinda-water-park-003.jpg",
            "https://i.pinimg.com/736x/4f/19/fa/4f19fa94f14f1ebfeb225b5fcb78bb4d.jpg"
        ],
        distance: "35 mins",
        url: "https://www.google.com/maps/search/?api=1&query=Keerimalai+Springs,+Keerimalai,+Jaffna,+Sri+Lanka"
    },
    {
        name: t("nearby.places.nagapooshani.name"),
        description: t("nearby.places.nagapooshani.desc"),
        images: [
            "https://thrillingtravel.in/wp-content/uploads/2021/12/Nagapooshani-amman-temple-jaffna-768x512.jpg",
            "https://c8.alamy.com/comp/D5FHHR/nagapooshani-amman-kovil-nainativu-sri-lanka-D5FHHR.jpg",
            "https://1.bp.blogspot.com/-wpqz_lsK510/XgdS5qiG6GI/AAAAAAABc84/OEhyDC61HlcjdTJBL91xhHdmyJ86IL1eQCLcBGAsYHQ/s1600/2016-08-21.jpg",
            "https://t4.ftcdn.net/jpg/01/92/70/31/360_F_192703125_UXmSkrl9wappN5Pg3mymQMwpSVf9YAqs.jpg"
        ],
        distance: "60 mins",
        url: "https://www.google.com/maps/search/?api=1&query=Nagapooshani+Amman+Temple,+Nainativu,+Jaffna,+Sri+Lanka"
    },
    {
        name: t("nearby.places.nagadeepa.name"),
        description: t("nearby.places.nagadeepa.desc"),
        images: [
            "https://media.gettyimages.com/id/532561771/photo/nagadeepa-rajamaha-viharaya.jpg?s=1024x1024&w=gi&k=20&c=RlP7CK9j1LPS3rg7TWQrBry8-ysS_j2Qb_aqKZV3p04=",
            "https://www.360view.lk/wp-content/uploads/2022/09/Nagadeepa_Purana_Vihara_Photos_By_360viewlk-3-of-41-1024x1536.jpg",
            "https://www.360view.lk/wp-content/uploads/2022/09/Nagadeepa_Purana_Vihara_Photos_By_360viewlk-2-of-41-2048x1365.jpg",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/ba/fc/b4/nagadeepa-rajamaha-viharaya.jpg?w=900&h=500&s=1"
        ],
        distance: "60 mins",
        url: "https://www.google.com/maps/search/?api=1&query=Nagadeepa+Temple,+Nainativu,+Jaffna,+Sri+Lanka"
    }
];

function ImageHoverSlider({ images, alt }: { images: string[]; alt: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovered && images.length > 1) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            }, 1200); // Cycle images slightly faster for a more responsive feel
        } else if (!isHovered) {
            setCurrentIndex(0);
        }
        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    return (
        <div 
            className="relative aspect-[4/3] overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {images.map((src, index) => (
                <Image
                    key={src}
                    src={src}
                    alt={`${alt} image ${index + 1}`}
                    fill
                    unoptimized={true} // Bypasses Next.js strict optimization which caused the 404s
                    className={`object-cover transition-opacity duration-700 ease-in-out ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    } ${isHovered && index === currentIndex ? "scale-105" : "scale-100"}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            ))}
            
            {/* Distance Badge */}
            {/* Rendered outside the loop but inside the slider container so it stays on top */}
            {images.length > 1 && (
                <div className={`absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"} z-10`}>
                    {images.map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-1 rounded-full transition-all duration-300 shadow-sm ${i === currentIndex ? "w-4 bg-[#FBBF24]" : "w-1.5 bg-white/70"}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export function NearbySection() {
    const { t } = useLanguage();
    const nearbySights = getNearbySights(t);

    return (
        <section
            id="nearby"
            className="py-24 bg-[#1E3A5F] text-[#F8F5F0] overflow-hidden"
            aria-labelledby="nearby-heading"
        >
            <div className="container-luxury">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="w-8 h-px bg-[#D6C3A3]" aria-hidden="true" />
                        <span className="text-sm font-semibold tracking-widest uppercase text-[#D6C3A3]">
                            {t("nearby.eyebrow")}
                        </span>
                        <span className="w-8 h-px bg-[#D6C3A3]" aria-hidden="true" />
                    </div>
                    <h2
                        id="nearby-heading"
                        className="text-4xl md:text-5xl font-bold font-serif mb-6 text-[#FBBF24] drop-shadow-sm"
                    >
                        {t("nearby.title")}
                    </h2>
                    <p className="text-lg text-[#F8F5F0]/80 max-w-2xl mx-auto">
                        {t("nearby.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {nearbySights.map((sight) => (
                        <div 
                            key={sight.name} 
                            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 flex flex-col relative"
                        >
                            <ImageHoverSlider images={sight.images} alt={sight.name} />
                            
                            <div className="absolute top-4 right-4 bg-[#1E3A5F]/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#D6C3A3]/30 z-20 pointer-events-none">
                                <MapPin size={14} className="text-[#FBBF24]" />
                                <span className="text-xs font-medium text-[#F8F5F0]">{sight.distance}</span>
                            </div>

                            <div className="p-8 flex flex-col flex-1">
                                <h3 className="text-2xl font-serif font-bold mb-3 text-[#F8F5F0] group-hover:text-[#FBBF24] transition-colors">
                                    {sight.name}
                                </h3>
                                <p className="text-[#F8F5F0]/70 leading-relaxed text-sm mb-6 flex-1">
                                    {sight.description}
                                </p>
                                <a 
                                    href={sight.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center text-sm font-semibold tracking-wide uppercase text-[#D6C3A3] hover:text-[#FBBF24] transition-colors mt-auto"
                                >
                                    {t("nearby.getDirections")} <span className="ml-2">→</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}