"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Heart, Users } from "lucide-react";

export default function CTABanner({ locale }: { locale: string }) {
  const t = useTranslations("nav");

  return (
    <section className="relative overflow-hidden py-24">
      <Image src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1400&q=70" alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,15,8,0.97), rgba(14,27,14,0.92))" }} />
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(to bottom, transparent, #d4a853, transparent)" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <div className="chip-gold mb-6 mx-auto w-fit">Join Us</div>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: "#f4efe4", marginBottom: "1rem", lineHeight: 1.1 }}>
          Be Part of Our Story
        </h2>
        <p className="text-lg mb-10" style={{ color: "rgba(168,196,168,0.8)", fontFamily: "var(--font-jakarta)", fontWeight: 300, lineHeight: 1.7 }}>
          Whether you are Beninese, a friend of Benin, or simply passionate about community — WIBEN welcomes you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/community`} className="btn-gold"><Users className="w-5 h-5" /> {t("become_member")}</Link>
          <Link href={`/${locale}/donate`} className="btn-ghost"><Heart className="w-5 h-5" /> {t("donate_now")}</Link>
        </div>
      </div>
    </section>
  );
}
