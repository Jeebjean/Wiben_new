"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Check, Users, Loader2, CheckCircle, Shield, Globe, BookOpen, HeartHandshake, Zap } from "lucide-react";

const benefits = [
  { icon: Users, en: "Member network across Wisconsin" },
  { icon: Globe, en: "Cultural events & celebrations" },
  { icon: Shield, en: "Emergency community support" },
  { icon: BookOpen, en: "Educational resources & workshops" },
  { icon: HeartHandshake, en: "Mutual aid & solidarity programs" },
  { icon: Zap, en: "Networking & professional development" },
];

const testimonials = [
  { quote: "WIBEN gave me a home away from home. The community support helped me settle in Madison and thrive.", name: "Fatou M.", role: "Member since 2020", initials: "FM" },
  { quote: "Through WIBEN, I found dear friends and business partners. This association is the backbone of our community.", name: "Kofi A.", role: "Member since 2021", initials: "KA" },
  { quote: "WIBEN connects us to our culture while helping us integrate. I am proud to be part of this family.", name: "Adeline B.", role: "Member since 2019", initials: "AB" },
];

export default function CommunityPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const t = useTranslations("community");
  const mem = useTranslations("membership");
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", city: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const yearlyBenefits = mem.raw("yearly.benefits") as string[];
  const monthlyBenefits = mem.raw("monthly.benefits") as string[];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/membership", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch { setStatus("error"); }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "rgba(8,15,8,0.9)" }} />
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(to bottom, transparent, #d4a853, transparent)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="chip-gold mb-5 w-fit"><Users className="w-3 h-3" /> Community</div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 700, color: "#f4efe4", lineHeight: 1, marginBottom: "1rem" }}>{t("title")}</h1>
          <p style={{ color: "rgba(168,196,168,0.8)", fontFamily: "var(--font-jakarta)", maxWidth: "34rem" }}>{t("hero_subtitle")}</p>
        </div>
      </section>

      {/* Membership plans */}
      <section style={{ backgroundColor: "var(--bg-secondary)", padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 700, color: "#f4efe4", marginBottom: "0.5rem" }}>{mem("title")}</h2>
            <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(168,196,168,0.6)" }}>{mem("subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { title: mem("monthly.title"), price: "$20", period: mem("monthly.period"), benefits: monthlyBenefits, cta: mem("monthly.cta"), featured: false },
              { title: mem("yearly.title"), price: "$200", period: mem("yearly.period"), benefits: yearlyBenefits, cta: mem("yearly.cta"), featured: true },
            ].map((plan) => (
              <div key={plan.title} className="card-dark p-7 flex flex-col" style={plan.featured ? { border: "1px solid rgba(212,168,83,0.4)", background: "rgba(212,168,83,0.04)" } : {}}>
                {plan.featured && <span className="self-start text-xs font-bold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: "#d4a853", color: "#0e1b0e", fontFamily: "var(--font-jakarta)" }}>{mem("popular")}</span>}
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 700, color: "#f4efe4", marginBottom: "0.5rem" }}>{plan.title}</h3>
                <div className="flex items-end gap-1 mb-5">
                  <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "3rem", fontWeight: 700, color: "#d4a853", lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ color: "rgba(168,196,168,0.4)", fontFamily: "var(--font-jakarta)", marginBottom: "0.25rem" }}>{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#d4a853" }} />
                      <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.82rem", color: "rgba(168,196,168,0.7)" }}>{b}</span>
                    </li>
                  ))}
                </ul>
                {plan.featured ? (
                  <a href="#apply" className="btn-gold text-center">{plan.cta}</a>
                ) : (
                  <a href="#apply" className="btn-outline-gold text-center">{plan.cta}</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ backgroundColor: "var(--bg-primary)", padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-10" style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.2rem", fontWeight: 700, color: "#f4efe4" }}>{t("benefits_title")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <div key={i} className="card-dark p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(212,168,83,0.08)", color: "#d4a853" }}>
                  <b.icon className="w-5 h-5" />
                </div>
                <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.85rem", color: "rgba(168,196,168,0.75)" }}>{b.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="relative overflow-hidden" style={{ padding: "5rem 0" }}>
        <Image src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400&q=60" alt="" fill className="object-cover opacity-5" sizes="100vw" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(22,36,22,0.98)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="chip-gold mb-5">Apply Now</div>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 700, color: "#f4efe4", marginBottom: "1rem" }}>{t("membership_title")}</h2>
              <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(168,196,168,0.65)", marginBottom: "2rem" }}>{t("membership_subtitle")}</p>
              <div className="space-y-4">
                {["Submit application below", "Board reviews in 2–3 business days", "Receive approval + payment link by email", "Complete payment to activate membership"].map((s, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #d4a853, #b8892f)", color: "#0e1b0e", fontFamily: "var(--font-cormorant)" }}>0{i + 1}</div>
                    <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.85rem", color: "rgba(168,196,168,0.65)" }}>{s}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(8,15,8,0.6)", border: "1px solid rgba(212,168,83,0.15)" }}>
              {status === "success" ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "#4ade80" }} />
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 700, color: "#f4efe4", marginBottom: "0.5rem" }}>{t("form.success_title")}</h3>
                  <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(168,196,168,0.65)" }}>{t("form.success_desc")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[{ name: "first_name", label: t("form.first_name") }, { name: "last_name", label: t("form.last_name") }].map((f) => (
                      <div key={f.name}>
                        <label className="label-dark">{f.label} *</label>
                        <input name={f.name} type="text" required value={(form as any)[f.name]} onChange={(e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} className="input-dark" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="label-dark">{t("form.email")} *</label>
                    <input name="email" type="email" required value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} className="input-dark" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[{ name: "phone", label: t("form.phone") }, { name: "city", label: t("form.city") }].map((f) => (
                      <div key={f.name}>
                        <label className="label-dark">{f.label} *</label>
                        <input name={f.name} type="text" required value={(form as any)[f.name]} onChange={(e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} className="input-dark" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="label-dark">{t("form.message")}</label>
                    <textarea name="message" rows={3} value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} placeholder={t("form.message_placeholder")} className="input-dark" style={{ resize: "none" }} />
                  </div>
                  {status === "error" && <p style={{ color: "#f87171", fontFamily: "var(--font-jakarta)", fontSize: "0.8rem" }}>{t("form.error")}</p>}
                  <button type="submit" disabled={status === "loading"} className="btn-gold w-full py-3.5">
                    {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> {t("form.submitting")}</> : t("form.submit")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ backgroundColor: "var(--bg-secondary)", padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-10" style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.2rem", fontWeight: 700, color: "#f4efe4" }}>{t("testimonials_title")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t_) => (
              <div key={t_.name} className="card-dark p-6">
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "3rem", color: "#d4a853", lineHeight: 1, marginBottom: "1rem" }}>"</div>
                <p className="italic mb-6" style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.85rem", color: "rgba(168,196,168,0.7)", lineHeight: 1.8 }}>{t_.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #d4a853, #b8892f)", color: "#0e1b0e", fontFamily: "var(--font-cormorant)" }}>{t_.initials}</div>
                  <div>
                    <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.85rem", fontWeight: 600, color: "#f4efe4" }}>{t_.name}</p>
                    <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.72rem", color: "rgba(168,196,168,0.45)" }}>{t_.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
