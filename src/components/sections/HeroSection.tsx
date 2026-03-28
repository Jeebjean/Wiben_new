"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowDown, Users, Heart, Calendar, Star } from "lucide-react";
import Image from "next/image";

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full background image */}
      <Image
        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&q=85"
        alt="WIBEN Community"
        fill className="object-cover object-center"
        priority sizes="100vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,15,8,0.97) 0%, rgba(14,27,14,0.88) 50%, rgba(8,15,8,0.75) 100%)" }} />
      {/* Gold left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(to bottom, transparent, #d4a853, transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          {/* Left content */}
          <div className="lg:col-span-3">
            <div className="chip-gold mb-8">
              <Star className="w-3 h-3" />
              {t("founded")} &nbsp;·&nbsp; {t("nonprofit")}
            </div>

            <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3.5rem, 9vw, 7rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em", color: "#f4efe4", marginBottom: "1.5rem" }}>
              WIBEN
              <span className="block text-shimmer">USA</span>
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "rgba(168,196,168,0.9)", fontFamily: "var(--font-jakarta)", fontWeight: 300 }}>
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/community`} className="btn-gold">
                <Users className="w-4 h-4" /> {t("cta_member")}
              </Link>
              <Link href={`/${locale}/donate`} className="btn-ghost">
                <Heart className="w-4 h-4" /> {t("cta_donate")}
              </Link>
              <Link href={`/${locale}/events`} className="btn-outline-gold">
                <Calendar className="w-4 h-4" /> {t("cta_events")}
              </Link>
            </div>
          </div>

          {/* Right — stats panel */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(22,36,22,0.85)", border: "1px solid rgba(212,168,83,0.2)", backdropFilter: "blur(16px)" }}>
              <div className="grid grid-cols-2 gap-4 mb-5">
                {[
                  { value: "200+", label: "Members", icon: "👥" },
                  { value: "50+", label: "Events", icon: "🎉" },
                  { value: "5+", label: "Years", icon: "📅" },
                  { value: "10+", label: "Cities", icon: "📍" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: "rgba(8,15,8,0.6)" }}>
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 700, color: "#d4a853" }}>{s.value}</div>
                    <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.7rem", color: "rgba(168,196,168,0.6)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Benin flag colors bar */}
              <div className="flex rounded-lg overflow-hidden h-1.5 mb-5">
                <div className="flex-1" style={{ backgroundColor: "#1a6b3a" }} />
                <div className="flex-1" style={{ backgroundColor: "#f8d000" }} />
                <div className="flex-1" style={{ backgroundColor: "#c8102e" }} />
              </div>

              <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.2)" }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#d4a853", fontFamily: "var(--font-jakarta)" }}>Next Event</p>
                <p className="font-semibold" style={{ color: "#f4efe4", fontFamily: "var(--font-cormorant)", fontSize: "1.05rem" }}>Annual Cultural Celebration</p>
                <p className="text-xs mt-1" style={{ color: "rgba(168,196,168,0.6)", fontFamily: "var(--font-jakarta)" }}>Madison, WI · Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,168,83,0.5)" }}>{t("scroll")}</span>
          <ArrowDown className="w-4 h-4 animate-bounce" style={{ color: "#d4a853" }} />
        </div>
      </div>
    </section>
  );
}
