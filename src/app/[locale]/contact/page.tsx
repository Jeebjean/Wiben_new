"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Mail, MapPin, Send, CheckCircle, Loader2, Facebook, Instagram } from "lucide-react";

export default function ContactPage({ params }: { params: { locale: string } }) {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch { setStatus("error"); }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=1400&q=70" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "rgba(8,15,8,0.93)" }} />
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(to bottom, transparent, #d4a853, transparent)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="chip-gold mb-5 w-fit"><Mail className="w-3 h-3" /> Contact</div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 700, color: "#f4efe4", lineHeight: 1, marginBottom: "1rem" }}>{t("title")}</h1>
          <p style={{ color: "rgba(168,196,168,0.8)", fontFamily: "var(--font-jakarta)" }}>{t("subtitle")}</p>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--bg-primary)", padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Info */}
            <div>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 700, color: "#f4efe4", marginBottom: "1.5rem" }}>Get In Touch</h2>
              <div className="space-y-5 mb-8">
                {[
                  { icon: <Mail className="w-4 h-4" />, label: t("info.email"), value: "contact@wiben.org", href: "mailto:contact@wiben.org" },
                  { icon: <MapPin className="w-4 h-4" />, label: t("info.address"), value: t("info.address_val"), href: null },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(212,168,83,0.1)", color: "#d4a853" }}>{item.icon}</div>
                    <div>
                      <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.7rem", color: "rgba(168,196,168,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} style={{ fontFamily: "var(--font-jakarta)", color: "#d4a853", fontSize: "0.9rem", fontWeight: 500 }}>{item.value}</a>
                      ) : (
                        <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(168,196,168,0.8)", fontSize: "0.9rem" }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.7rem", color: "rgba(168,196,168,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{t("info.social")}</p>
              <div className="flex gap-3">
                {[
                  { href: "https://facebook.com", icon: <Facebook className="w-4 h-4" /> },
                  { href: "https://instagram.com", icon: <Instagram className="w-4 h-4" /> },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all" style={{ backgroundColor: "rgba(212,168,83,0.1)", color: "#d4a853", border: "1px solid rgba(212,168,83,0.2)" }}>{s.icon}</a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 card-dark p-8">
              {status === "success" ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "#4ade80" }} />
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 700, color: "#f4efe4", marginBottom: "0.5rem" }}>Message Sent!</h3>
                  <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(168,196,168,0.6)" }}>{t("form.success")}</p>
                  <button onClick={() => setStatus("idle")} className="btn-outline-gold mt-6 text-sm">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[{ name: "name", label: t("form.name"), type: "text" }, { name: "email", label: t("form.email"), type: "email" }].map((f) => (
                      <div key={f.name}>
                        <label className="label-dark">{f.label} *</label>
                        <input name={f.name} type={f.type} required value={(form as any)[f.name]} onChange={(e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} className="input-dark" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="label-dark">{t("form.subject")} *</label>
                    <input name="subject" type="text" required value={form.subject} onChange={(e) => setForm(p => ({ ...p, subject: e.target.value }))} className="input-dark" />
                  </div>
                  <div>
                    <label className="label-dark">{t("form.message")} *</label>
                    <textarea name="message" rows={6} required value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} className="input-dark" style={{ resize: "none" }} />
                  </div>
                  {status === "error" && <p style={{ color: "#f87171", fontSize: "0.8rem", fontFamily: "var(--font-jakarta)" }}>{t("form.error")}</p>}
                  <button type="submit" disabled={status === "loading"} className="btn-gold w-full py-3.5">
                    {status === "loading" ? <><Loader2 className="w-5 h-5 animate-spin" /> {t("form.submitting")}</> : <><Send className="w-5 h-5" /> {t("form.submit")}</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
