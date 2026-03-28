import { getTranslations } from "next-intl/server";
import Image from "next/image";
import CTABanner from "@/components/sections/CTABanner";
import { FileText, Download, Users } from "lucide-react";

const board = [
  { name: "Dr. Jean-Baptiste Adjovi", role: "President", initials: "JA" },
  { name: "Marie-Claire Akpovi", role: "Vice President", initials: "MA" },
  { name: "Emmanuel Houessou", role: "Secretary General", initials: "EH" },
  { name: "Roseline Kpode", role: "Treasurer", initials: "RK" },
  { name: "Patrick Agossou", role: "Cultural Director", initials: "PA" },
  { name: "Amina Sossou", role: "Communications Director", initials: "AS" },
];

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const t = await getTranslations("about");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=1400&q=80" alt="" fill className="object-cover object-top" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,15,8,0.97) 50%, rgba(8,15,8,0.75) 100%)" }} />
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(to bottom, transparent, #d4a853, transparent)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="chip-gold mb-5 w-fit">Association</div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 700, color: "#f4efe4", lineHeight: 1, marginBottom: "1rem" }}>{t("title")}</h1>
          <p style={{ color: "rgba(168,196,168,0.8)", fontFamily: "var(--font-jakarta)", maxWidth: "34rem" }}>{t("hero_subtitle")}</p>
        </div>
      </section>

      {/* History / Mission / Vision */}
      <section style={{ backgroundColor: "var(--bg-secondary)", padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {[
              { color: "#d4a853", titleKey: "history_title", textKey: "history" },
              { color: "#4ade80", titleKey: "mission_title", textKey: "mission" },
              { color: "#60a5fa", titleKey: "vision_title", textKey: "vision" },
            ].map((item) => (
              <div key={item.titleKey} className="card-dark p-7">
                <div className="w-8 h-0.5 rounded-full mb-5" style={{ backgroundColor: item.color }} />
                <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 700, color: "#f4efe4", marginBottom: "1rem" }}>{t(item.titleKey as any)}</h2>
                <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.85rem", color: "rgba(168,196,168,0.7)", lineHeight: 1.8 }}>{t(item.textKey as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board — with image bg */}
      <section className="relative overflow-hidden" style={{ padding: "5rem 0" }}>
        <Image src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1400&q=50" alt="" fill className="object-cover opacity-5" sizes="100vw" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(14,27,14,0.97)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="chip-gold mb-4 mx-auto w-fit"><Users className="w-3 h-3" /> Leadership</div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 700, color: "#f4efe4", marginBottom: "0.75rem" }}>{t("board_title")}</h2>
            <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(168,196,168,0.6)" }}>{t("board_subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {board.map((m) => (
              <div key={m.name} className="card-dark p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #d4a853, #b8892f)", color: "#0e1b0e", fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>{m.initials}</div>
                <div>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, color: "#f4efe4", fontSize: "1rem" }}>{m.name}</p>
                  <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "#d4a853", marginTop: "0.125rem" }}>{m.role}</p>
                </div>
              </div>
            ))}
            <div className="card-dark p-5 flex items-center gap-4" style={{ border: "1px dashed rgba(212,168,83,0.2)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(212,168,83,0.06)" }}>
                <span style={{ color: "rgba(212,168,83,0.3)", fontFamily: "var(--font-cormorant)", fontSize: "1.5rem" }}>+</span>
              </div>
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", color: "rgba(168,196,168,0.35)" }}>34 more dedicated board members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section style={{ backgroundColor: "var(--bg-secondary)", padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 700, color: "#f4efe4", marginBottom: "0.75rem" }}>{t("docs_title")}</h2>
          <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(168,196,168,0.6)", marginBottom: "3rem" }}>{t("docs_subtitle")}</p>
          <div className="grid sm:grid-cols-3 gap-5 max-w-2xl mx-auto">
            {[
              { label: t("bylaws"), icon: "📋" },
              { label: t("policies"), icon: "📜" },
              { label: t("annual_report"), icon: "📊" },
            ].map((d) => (
              <button key={d.label} className="card-dark p-6 flex flex-col items-center text-center">
                <div className="text-3xl mb-3">{d.icon}</div>
                <div className="flex items-center gap-1.5 text-sm font-semibold mb-3" style={{ color: "#d4a853", fontFamily: "var(--font-jakarta)" }}>
                  <FileText className="w-3.5 h-3.5" /> {d.label}
                </div>
                <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(168,196,168,0.4)", fontFamily: "var(--font-jakarta)" }}>
                  <Download className="w-3 h-3" /> Download PDF
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <CTABanner locale={locale} />
    </>
  );
}
