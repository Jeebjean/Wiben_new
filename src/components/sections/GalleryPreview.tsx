"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Images } from "lucide-react";

const photos = [
  { id: "1", src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80", alt: "Community gathering", span: "lg:col-span-2 lg:row-span-2" },
  { id: "2", src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", alt: "Cultural food", span: "" },
  { id: "3", src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80", alt: "Celebration", span: "" },
  { id: "4", src: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&q=80", alt: "Performance", span: "" },
  { id: "5", src: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=600&q=80", alt: "Event", span: "" },
];

export default function GalleryPreview({ locale }: { locale: string }) {
  const t = useTranslations("gallery");

  return (
    <section style={{ backgroundColor: "var(--bg-primary)", padding: "6rem 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="chip-gold mb-4"><Images className="w-3 h-3" /> Gallery</div>
            <h2 className="section-heading">{t("title")}</h2>
            <p className="section-subheading mt-2 max-w-lg">{t("subtitle")}</p>
          </div>
          <Link href={`/${locale}/gallery`} className="hidden sm:flex items-center gap-2 text-sm font-semibold" style={{ color: "#d4a853", fontFamily: "var(--font-jakarta)" }}>
            {t("view_full")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:grid-rows-2">
          {photos.map((p) => (
            <div key={p.id} className={`relative overflow-hidden rounded-xl group cursor-pointer ${p.span}`} style={{ aspectRatio: p.span ? "auto" : "4/3", minHeight: p.span ? "320px" : "auto" }}>
              <Image src={p.src} alt={p.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(8,15,8,0.5)" }} />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs font-semibold" style={{ color: "#d4a853", fontFamily: "var(--font-jakarta)" }}>{p.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href={`/${locale}/gallery`} className="btn-outline-gold">{t("view_full")}</Link>
        </div>
      </div>
    </section>
  );
}
