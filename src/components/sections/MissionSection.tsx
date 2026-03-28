"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Shield, Star, Palette, HandHeart } from "lucide-react";

const valueKeys = ["unity", "excellence", "culture", "service"] as const;
const icons = [Shield, Star, Palette, HandHeart];

export default function MissionSection() {
  const t = useTranslations("mission");

  return (
    <section style={{ backgroundColor: "var(--bg-secondary)", padding: "6rem 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top: text + image side by side */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="chip-gold mb-5">{t("title")}</div>
            <h2 className="section-heading mb-4">{t("subtitle")}</h2>
            <div className="gold-line mb-6" />
            <p className="section-subheading mb-8">{t("description")}</p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(["members", "events", "years", "cities"] as const).map((key, i) => (
                <div key={key} className="text-center p-4 rounded-xl" style={{ backgroundColor: "rgba(212,168,83,0.06)", border: "1px solid rgba(212,168,83,0.12)" }}>
                  <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.2rem", fontWeight: 700, color: "#d4a853" }}>
                    {["200+", "50+", "5+", "10+"][i]}
                  </div>
                  <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.68rem", color: "rgba(168,196,168,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>
                    {t(`stats.${key}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="relative h-[480px] hidden lg:block">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80" alt="Community" fill className="object-cover" sizes="50vw" />
              <div className="img-overlay" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-xl overflow-hidden" style={{ border: "3px solid rgba(212,168,83,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
              <Image src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80" alt="Culture" fill className="object-cover" sizes="200px" />
            </div>
            <div className="absolute -top-4 -right-4 rounded-xl px-4 py-3" style={{ backgroundColor: "#d4a853" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.2rem", color: "#0e1b0e" }}>Since 2019</p>
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.65rem", color: "rgba(14,27,14,0.7)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Madison, WI</p>
            </div>
          </div>
        </div>

        {/* Values grid */}
        <div>
          <h3 className="text-center mb-10" style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 600, color: "#f4efe4" }}>{t("values_title")}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {valueKeys.map((key, i) => {
              const Icon = icons[i];
              return (
                <div key={key} className="card-dark p-6">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(212,168,83,0.1)", color: "#d4a853" }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 700, color: "#f4efe4", marginBottom: "0.5rem" }}>{t(`values.${key}.title`)}</h4>
                  <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.82rem", color: "rgba(168,196,168,0.7)", lineHeight: 1.7 }}>{t(`values.${key}.desc`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
