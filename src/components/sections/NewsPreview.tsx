"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Newspaper } from "lucide-react";

const posts = [
  { id: "1", title_en: "WIBEN Welcomes 20 New Members in 2025", title_fr: "WIBEN accueille 20 nouveaux membres en 2025", excerpt_en: "We are thrilled to welcome our newest members to the WIBEN family this year.", excerpt_fr: "Nous sommes ravis d'accueillir nos nouveaux membres dans la famille WIBEN cette année.", date: "2025-03-10", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80" },
  { id: "2", title_en: "Cultural Celebration Recap: A Night to Remember", title_fr: "Retour sur la Célébration Culturelle : Une Nuit Mémorable", excerpt_en: "Over 150 community members gathered for an unforgettable evening of Beninese culture.", excerpt_fr: "Plus de 150 membres de la communauté se sont réunis pour une soirée béninoise inoubliable.", date: "2025-01-20", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80" },
  { id: "3", title_en: "WIBEN Partners with Madison Nonprofit Network", title_fr: "WIBEN s'associe au Réseau des ONG de Madison", excerpt_en: "A new partnership to strengthen our community programs and outreach efforts.", excerpt_fr: "Un nouveau partenariat pour renforcer nos programmes communautaires.", date: "2024-11-05", image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80" },
];

export default function NewsPreview({ locale }: { locale: string }) {
  const t = useTranslations("common");

  const fmt = (d: string) => new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(d));

  return (
    <section style={{ backgroundColor: "var(--bg-secondary)", padding: "6rem 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="chip-gold mb-4"><Newspaper className="w-3 h-3" /> News</div>
            <h2 className="section-heading">Latest News</h2>
          </div>
          <Link href={`/${locale}/about`} className="hidden sm:flex items-center gap-2 text-sm font-semibold" style={{ color: "#d4a853", fontFamily: "var(--font-jakarta)" }}>
            {t("view_all")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <article key={p.id} className="card-dark overflow-hidden group cursor-pointer">
              <div className="relative h-44 overflow-hidden">
                <Image src={p.image} alt={p.title_en} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                <div className="img-overlay" />
              </div>
              <div className="p-5">
                <p className="text-xs mb-3" style={{ color: "#d4a853", fontFamily: "var(--font-jakarta)", letterSpacing: "0.05em" }}>{fmt(p.date)}</p>
                <h3 className="mb-2 leading-snug" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 700, color: "#f4efe4" }}>
                  {locale === "fr" ? p.title_fr : p.title_en}
                </h3>
                <p className="text-sm line-clamp-2" style={{ color: "rgba(168,196,168,0.6)", fontFamily: "var(--font-jakarta)" }}>
                  {locale === "fr" ? p.excerpt_fr : p.excerpt_en}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
