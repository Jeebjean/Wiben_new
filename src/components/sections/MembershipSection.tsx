"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Check, Zap, Star } from "lucide-react";

export default function MembershipSection({ locale }: { locale: string }) {
  const t = useTranslations("membership");
  const yearly = t.raw("yearly.benefits") as string[];
  const monthly = t.raw("monthly.benefits") as string[];

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "var(--bg-secondary)", padding: "6rem 0" }}>
      {/* Bg image with overlay */}
      <div className="absolute inset-0 opacity-10">
        <Image src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=1400&q=60" alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--bg-secondary), rgba(22,36,22,0.95))" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="chip-gold mb-4 mx-auto w-fit"><Star className="w-3 h-3" /> Membership</div>
          <h2 className="section-heading mb-4">{t("title")}</h2>
          <p className="section-subheading max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly */}
          <div className="card-dark p-8 flex flex-col">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(212,168,83,0.1)", color: "#d4a853" }}>
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="mb-2" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", fontWeight: 700, color: "#f4efe4" }}>{t("monthly.title")}</h3>
            <p className="text-sm mb-6" style={{ color: "rgba(168,196,168,0.6)", fontFamily: "var(--font-jakarta)" }}>{t("monthly.description")}</p>
            <div className="flex items-end gap-1 mb-8">
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "3.5rem", fontWeight: 700, color: "#d4a853", lineHeight: 1 }}>$20</span>
              <span className="mb-2 text-sm" style={{ color: "rgba(168,196,168,0.5)", fontFamily: "var(--font-jakarta)" }}>{t("monthly.period")}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {monthly.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#d4a853" }} />
                  <span className="text-sm" style={{ color: "rgba(168,196,168,0.75)", fontFamily: "var(--font-jakarta)" }}>{b}</span>
                </li>
              ))}
            </ul>
            <Link href={`/${locale}/community`} className="btn-outline-gold text-center">{t("monthly.cta")}</Link>
          </div>

          {/* Yearly — featured */}
          <div className="relative flex flex-col rounded-2xl p-8 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(212,168,83,0.15) 0%, rgba(212,168,83,0.05) 100%)", border: "1px solid rgba(212,168,83,0.4)" }}>
            <div className="absolute top-0 right-0 px-4 py-1.5 text-xs font-bold rounded-bl-xl" style={{ backgroundColor: "#d4a853", color: "#0e1b0e", fontFamily: "var(--font-jakarta)", letterSpacing: "0.05em" }}>{t("popular")}</div>
            <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(212,168,83,0.15)", color: "#d4a853" }}>
              <Star className="w-5 h-5" />
            </div>
            <h3 className="mb-2" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", fontWeight: 700, color: "#f4efe4" }}>{t("yearly.title")}</h3>
            <p className="text-sm mb-6" style={{ color: "rgba(168,196,168,0.6)", fontFamily: "var(--font-jakarta)" }}>{t("yearly.description")}</p>
            <div className="flex items-end gap-1 mb-2">
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "3.5rem", fontWeight: 700, color: "#d4a853", lineHeight: 1 }}>$200</span>
              <span className="mb-2 text-sm" style={{ color: "rgba(168,196,168,0.5)", fontFamily: "var(--font-jakarta)" }}>{t("yearly.period")}</span>
            </div>
            <p className="text-xs mb-8 font-semibold" style={{ color: "#d4a853", fontFamily: "var(--font-jakarta)" }}>{t("yearly.savings")}</p>
            <ul className="space-y-3 mb-8 flex-1">
              {yearly.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#d4a853" }} />
                  <span className="text-sm" style={{ color: "rgba(168,196,168,0.85)", fontFamily: "var(--font-jakarta)" }}>{b}</span>
                </li>
              ))}
            </ul>
            <Link href={`/${locale}/community`} className="btn-gold text-center">{t("yearly.cta")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
