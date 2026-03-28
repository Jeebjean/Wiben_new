"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Folder, Images, X } from "lucide-react";

const folders = [
  { id: "all", name_en: "All", name_fr: "Tout" },
  { id: "meetings", name_en: "Meetings", name_fr: "Réunions" },
  { id: "celebrations", name_en: "Celebrations", name_fr: "Célébrations" },
  { id: "food", name_en: "Cultural Food", name_fr: "Cuisine Culturelle" },
  { id: "workshops", name_en: "Workshops", name_fr: "Ateliers" },
];

const photos = [
  { id: "1", folder: "celebrations", src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80", alt_en: "Community gathering 2024", alt_fr: "Rassemblement communautaire 2024" },
  { id: "2", folder: "food", src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", alt_en: "Traditional Beninese cuisine", alt_fr: "Cuisine béninoise traditionnelle" },
  { id: "3", folder: "celebrations", src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80", alt_en: "Annual celebration 2024", alt_fr: "Célébration annuelle 2024" },
  { id: "4", folder: "meetings", src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80", alt_en: "General assembly", alt_fr: "Assemblée générale" },
  { id: "5", folder: "workshops", src: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=800&q=80", alt_en: "Community workshop", alt_fr: "Atelier communautaire" },
  { id: "6", folder: "meetings", src: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&q=80", alt_en: "Board meeting 2024", alt_fr: "Réunion du conseil 2024" },
  { id: "7", folder: "food", src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", alt_en: "Cooking workshop", alt_fr: "Atelier cuisine" },
  { id: "8", folder: "celebrations", src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80", alt_en: "Independence Day celebration", alt_fr: "Fête de l'indépendance" },
  { id: "9", folder: "workshops", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", alt_en: "Education workshop", alt_fr: "Atelier éducatif" },
];

export default function GalleryPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const t = useTranslations("gallery");
  const [activeFolder, setActiveFolder] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeFolder === "all" ? photos : photos.filter((p) => p.folder === activeFolder);
  const lightboxPhoto = photos.find((p) => p.id === lightbox);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=70" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,15,8,0.95), rgba(14,27,14,0.85))" }} />
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(to bottom, transparent, #d4a853, transparent)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="chip-gold mb-5 w-fit"><Images className="w-3 h-3" /> Gallery</div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 700, color: "#f4efe4", lineHeight: 1, marginBottom: "1rem" }}>{t("title")}</h1>
          <p style={{ color: "rgba(168,196,168,0.8)", fontFamily: "var(--font-jakarta)", maxWidth: "36rem" }}>{t("subtitle")}</p>
        </div>
      </section>

      {/* Folder filter */}
      <section style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid rgba(212,168,83,0.1)", padding: "1.5rem 0", position: "sticky", top: "70px", zIndex: 40, backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <Folder className="w-4 h-4 flex-shrink-0" style={{ color: "#d4a853" }} />
            {folders.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFolder(f.id)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                style={{
                  fontFamily: "var(--font-jakarta)",
                  backgroundColor: activeFolder === f.id ? "#d4a853" : "rgba(212,168,83,0.08)",
                  color: activeFolder === f.id ? "#0e1b0e" : "rgba(212,168,83,0.7)",
                  border: activeFolder === f.id ? "1px solid #d4a853" : "1px solid rgba(212,168,83,0.15)",
                }}
              >
                {locale === "fr" ? f.name_fr : f.name_en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photos grid */}
      <section style={{ backgroundColor: "var(--bg-primary)", padding: "3rem 0 6rem" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24" style={{ color: "rgba(168,196,168,0.4)", fontFamily: "var(--font-jakarta)" }}>{t("no_photos")}</div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {filtered.map((photo) => (
                <div key={photo.id} className="break-inside-avoid cursor-pointer group relative rounded-xl overflow-hidden" onClick={() => setLightbox(photo.id)}>
                  <Image
                    src={photo.src}
                    alt={locale === "fr" ? photo.alt_fr : photo.alt_en}
                    width={400} height={300}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ display: "block" }}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3" style={{ background: "linear-gradient(to top, rgba(8,15,8,0.8), transparent)" }}>
                    <p className="text-xs font-semibold" style={{ color: "#d4a853", fontFamily: "var(--font-jakarta)" }}>
                      {locale === "fr" ? photo.alt_fr : photo.alt_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && lightboxPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(8,15,8,0.97)" }} onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 p-2 rounded-full" style={{ backgroundColor: "rgba(212,168,83,0.15)", color: "#d4a853" }} onClick={() => setLightbox(null)}>
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <Image src={lightboxPhoto.src} alt={locale === "fr" ? lightboxPhoto.alt_fr : lightboxPhoto.alt_en} width={1200} height={800} className="object-contain rounded-xl max-h-[80vh] w-full" style={{ maxHeight: "80vh" }} />
            <p className="text-center mt-3 text-sm" style={{ color: "rgba(212,168,83,0.8)", fontFamily: "var(--font-jakarta)" }}>
              {locale === "fr" ? lightboxPhoto.alt_fr : lightboxPhoto.alt_en}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
