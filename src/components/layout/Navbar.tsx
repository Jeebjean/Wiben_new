"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Get path without locale for language switching
  const pathWithoutLocale = pathname.replace(/^\/(en|fr)/, "") || "";

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/community`, label: t("community") },
    { href: `/${locale}/events`, label: t("events") },
    { href: `/${locale}/gallery`, label: t("gallery") },
    { href: `/${locale}/donate`, label: t("donate") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const switchLang = (lang: string) => {
    setLangOpen(false);
    setMobileOpen(false);
    window.location.href = `/${lang}${pathWithoutLocale}`;
  };

  const isActive = (href: string) => pathname === href;

  const navBg = scrolled
    ? "rgba(14,27,14,0.97)"
    : "transparent";
  const navBorder = scrolled ? "1px solid rgba(212,168,83,0.15)" : "1px solid transparent";

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "all 0.3s", backgroundColor: navBg, borderBottom: navBorder, backdropFilter: scrolled ? "blur(12px)" : "none", padding: scrolled ? "0.6rem 0" : "1.2rem 0" }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #d4a853, #b8892f)" }}>
            <span style={{ color: "#0e1b0e", fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.25rem" }}>W</span>
          </div>
          <div className="hidden sm:block">
            <div style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.4rem", color: "#f4efe4", letterSpacing: "0.05em" }}>WIBEN</div>
            <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6rem", color: "#d4a853", letterSpacing: "0.15em", textTransform: "uppercase" }}>Wisconsin · Benin</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden xl:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              style={{
                padding: "0.4rem 0.75rem", borderRadius: "0.375rem", fontSize: "0.82rem",
                fontFamily: "var(--font-jakarta)", fontWeight: isActive(l.href) ? 600 : 400,
                color: isActive(l.href) ? "#d4a853" : "rgba(244,239,228,0.8)",
                borderBottom: isActive(l.href) ? "1px solid #d4a853" : "1px solid transparent",
                transition: "all 0.2s", letterSpacing: "0.02em",
              }}
            >{l.label}</Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden xl:flex items-center gap-3">
          {/* Language switcher */}
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors" style={{ color: "rgba(244,239,228,0.7)", fontFamily: "var(--font-jakarta)", border: "1px solid rgba(212,168,83,0.2)" }}>
              <Globe className="w-3.5 h-3.5" style={{ color: "#d4a853" }} />
              <span style={{ color: "#d4a853", fontWeight: 600, textTransform: "uppercase", fontSize: "0.75rem" }}>{locale}</span>
              <ChevronDown className="w-3 h-3" style={{ transition: "transform 0.2s", transform: langOpen ? "rotate(180deg)" : "none" }} />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-lg overflow-hidden z-50" style={{ backgroundColor: "#1d301d", border: "1px solid rgba(212,168,83,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
                {["en", "fr"].map((l) => (
                  <button key={l} onClick={() => switchLang(l)} className="w-full text-left px-4 py-2.5 text-sm transition-all" style={{ fontFamily: "var(--font-jakarta)", color: locale === l ? "#d4a853" : "rgba(244,239,228,0.7)", backgroundColor: locale === l ? "rgba(212,168,83,0.1)" : "transparent", fontWeight: locale === l ? 600 : 400 }}>
                    {l === "en" ? "🇺🇸 English" : "🇫🇷 Français"}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href={`/${locale}/community`} className="btn-outline-gold text-sm px-4 py-2" style={{ padding: "0.45rem 1rem", fontSize: "0.82rem" }}>{t("become_member")}</Link>
          <Link href={`/${locale}/donate`} className="btn-gold text-sm" style={{ padding: "0.45rem 1rem", fontSize: "0.82rem" }}>{t("donate_now")}</Link>
        </div>

        {/* Mobile menu button */}
        <button className="xl:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "#d4a853" }}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ backgroundColor: "#0e1b0e", borderTop: "1px solid rgba(212,168,83,0.15)" }}>
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{ padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9rem", fontFamily: "var(--font-jakarta)", color: isActive(l.href) ? "#d4a853" : "rgba(244,239,228,0.8)", backgroundColor: isActive(l.href) ? "rgba(212,168,83,0.08)" : "transparent" }}>
                {l.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 flex flex-col gap-2" style={{ borderTop: "1px solid rgba(212,168,83,0.1)" }}>
              <div className="flex gap-2">
                {["en", "fr"].map((l) => (
                  <button key={l} onClick={() => switchLang(l)} className="flex-1 py-2 text-sm rounded-lg" style={{ fontFamily: "var(--font-jakarta)", backgroundColor: locale === l ? "#d4a853" : "rgba(212,168,83,0.08)", color: locale === l ? "#0e1b0e" : "#d4a853", border: "1px solid rgba(212,168,83,0.2)", fontWeight: 600 }}>
                    {l === "en" ? "English" : "Français"}
                  </button>
                ))}
              </div>
              <Link href={`/${locale}/community`} onClick={() => setMobileOpen(false)} className="btn-outline-gold text-center py-3">{t("become_member")}</Link>
              <Link href={`/${locale}/donate`} onClick={() => setMobileOpen(false)} className="btn-gold text-center py-3">{t("donate_now")}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
