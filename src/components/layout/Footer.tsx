"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const links = [
    { href: `/${locale}`, label: nav("home") },
    { href: `/${locale}/about`, label: nav("about") },
    { href: `/${locale}/community`, label: nav("community") },
    { href: `/${locale}/events`, label: nav("events") },
    { href: `/${locale}/gallery`, label: nav("gallery") },
    { href: `/${locale}/donate`, label: nav("donate") },
    { href: `/${locale}/contact`, label: nav("contact") },
  ];

  return (
    <footer style={{ backgroundColor: "#080f08", borderTop: "1px solid rgba(212,168,83,0.15)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #d4a853, #b8892f)" }}>
                <span style={{ color: "#0e1b0e", fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.5rem" }}>W</span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.6rem", color: "#f4efe4", letterSpacing: "0.05em" }}>WIBEN</div>
                <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.65rem", color: "#d4a853", letterSpacing: "0.15em", textTransform: "uppercase" }}>Wisconsin Beninese Association</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: "rgba(168,196,168,0.7)", fontFamily: "var(--font-jakarta)" }}>{t("tagline")}</p>
            <div className="flex gap-3">
              {[
                { href: "https://facebook.com", icon: <Facebook className="w-4 h-4" /> },
                { href: "https://instagram.com", icon: <Instagram className="w-4 h-4" /> },
                { href: "https://youtube.com", icon: <Youtube className="w-4 h-4" /> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center transition-all" style={{ backgroundColor: "rgba(212,168,83,0.1)", color: "#d4a853", border: "1px solid rgba(212,168,83,0.15)" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#d4a853", fontFamily: "var(--font-jakarta)" }}>{t("quick_links")}</p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors" style={{ color: "rgba(168,196,168,0.7)", fontFamily: "var(--font-jakarta)" }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#d4a853", fontFamily: "var(--font-jakarta)" }}>{t("connect")}</p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#d4a853" }} />
                <a href="mailto:contact@wiben.org" className="text-sm" style={{ color: "rgba(168,196,168,0.7)", fontFamily: "var(--font-jakarta)" }}>contact@wiben.org</a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#d4a853" }} />
                <span className="text-sm" style={{ color: "rgba(168,196,168,0.7)", fontFamily: "var(--font-jakarta)" }}>Madison, Wisconsin, USA</span>
              </div>
            </div>
            <p className="text-xs mb-2" style={{ color: "rgba(168,196,168,0.5)", fontFamily: "var(--font-jakarta)" }}>{t("newsletter")}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder={t("newsletter_placeholder")} className="flex-1 input-dark text-xs min-w-0" style={{ padding: "0.5rem 0.75rem" }} />
              <button type="submit" className="btn-gold text-xs" style={{ padding: "0.5rem 0.875rem", whiteSpace: "nowrap" }}>{t("newsletter_btn")}</button>
            </form>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(212,168,83,0.08)", padding: "1rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "rgba(107,138,107,0.6)", fontFamily: "var(--font-jakarta)" }}>© {new Date().getFullYear()} WIBEN. {t("rights")}</p>
          <div className="flex gap-4">
            <Link href={`/${locale}`} className="text-xs" style={{ color: "rgba(107,138,107,0.6)", fontFamily: "var(--font-jakarta)" }}>{t("privacy")}</Link>
            <Link href={`/${locale}`} className="text-xs" style={{ color: "rgba(107,138,107,0.6)", fontFamily: "var(--font-jakarta)" }}>{t("terms")}</Link>
          </div>
        </div>
        <p className="text-center text-xs mt-1" style={{ color: "rgba(107,138,107,0.4)", fontFamily: "var(--font-jakarta)" }}>{t("nonprofit")}</p>
      </div>
    </footer>
  );
}
