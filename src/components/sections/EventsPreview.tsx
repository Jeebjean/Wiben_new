"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight, Tag } from "lucide-react";
import { getMonth, getDay } from "@/lib/utils";

const events = [
  { id: "1", title_en: "Annual Beninese Cultural Celebration 2025", title_fr: "Célébration Culturelle Béninoise Annuelle 2025", date: "2025-08-15T18:00:00Z", location: "Madison Community Center, WI", is_paid: false, price: 0, open_price: false, image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80", description_en: "An evening of Beninese music, dance, cuisine and togetherness.", description_fr: "Une soirée de musique, danse, cuisine béninoise et fraternité." },
  { id: "2", title_en: "WIBEN General Assembly 2025", title_fr: "Assemblée Générale WIBEN 2025", date: "2025-09-20T10:00:00Z", location: "Madison Public Library, WI", is_paid: false, price: 0, open_price: false, image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80", description_en: "Annual assembly to review activities and elect board members.", description_fr: "Assemblée annuelle pour revoir les activités et élire les membres." },
  { id: "3", title_en: "Beninese Cuisine Workshop", title_fr: "Atelier de Cuisine Béninoise", date: "2025-10-05T14:00:00Z", location: "Goodman Community Center, WI", is_paid: true, price: 0, open_price: true, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", description_en: "Cook authentic Beninese dishes — pay what you can.", description_fr: "Cuisinez des plats béninois authentiques — prix libre." },
];

export default function EventsPreview({ locale }: { locale: string }) {
  const t = useTranslations("events");

  return (
    <section style={{ backgroundColor: "var(--bg-primary)", padding: "6rem 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="chip-gold mb-4"><Calendar className="w-3 h-3" /> Events</div>
            <h2 className="section-heading">{t("title")}</h2>
          </div>
          <Link href={`/${locale}/events`} className="hidden sm:flex items-center gap-2 text-sm font-semibold transition-all" style={{ color: "#d4a853", fontFamily: "var(--font-jakarta)" }}>
            {t("view_all")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div key={ev.id} className="card-dark overflow-hidden group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image src={ev.image} alt={ev.title_en} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="img-overlay" />
                {/* Date badge */}
                <div className="absolute top-4 left-4 rounded-lg px-3 py-2 text-center" style={{ backgroundColor: "rgba(8,15,8,0.85)", border: "1px solid rgba(212,168,83,0.3)", backdropFilter: "blur(8px)" }}>
                  <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6rem", fontWeight: 700, color: "#d4a853", letterSpacing: "0.1em", textTransform: "uppercase" }}>{getMonth(ev.date, locale)}</div>
                  <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 700, color: "#f4efe4", lineHeight: 1 }}>{getDay(ev.date)}</div>
                </div>
                {/* Price badge */}
                <div className="absolute top-4 right-4">
                  {ev.open_price ? (
                    <span className="chip-gold text-xs" style={{ fontSize: "0.65rem" }}>{t("open_price")}</span>
                  ) : ev.is_paid ? (
                    <span className="chip-gold" style={{ fontSize: "0.65rem" }}>${ev.price}</span>
                  ) : (
                    <span className="badge-green" style={{ fontSize: "0.65rem" }}>{t("free")}</span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-2" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 700, color: "#f4efe4", lineHeight: 1.3 }}>
                  {locale === "fr" ? ev.title_fr : ev.title_en}
                </h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: "rgba(168,196,168,0.65)", fontFamily: "var(--font-jakarta)" }}>
                  {locale === "fr" ? ev.description_fr : ev.description_en}
                </p>
                <div className="flex items-center gap-1.5 mb-4 text-xs" style={{ color: "rgba(168,196,168,0.5)", fontFamily: "var(--font-jakarta)" }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: "#d4a853" }} /> {ev.location}
                </div>
                <Link href={`/${locale}/events`} className="btn-gold w-full text-sm text-center" style={{ padding: "0.6rem" }}>{t("register")}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
