"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Heart, Smartphone, Loader2, CheckCircle, School, Users, Globe } from "lucide-react";

const AMOUNTS = [25, 50, 100, 250, 500];

export default function DonatePage({ params }: { params: { locale: string } }) {
  const t = useTranslations("donate");
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [activePreset, setActivePreset] = useState(50);
  const [tab, setTab] = useState<"stripe" | "paypal" | "zelle">("stripe");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const impacts = [
    { icon: <School className="w-5 h-5" />, amount: "$50", label: "Sponsors a student workshop" },
    { icon: <Users className="w-5 h-5" />, amount: "$100", label: "Funds one community event" },
    { icon: <Globe className="w-5 h-5" />, amount: "$250", label: "Supports 3 months of programs" },
    { icon: <Heart className="w-5 h-5" />, amount: "$500", label: "Funds emergency family assistance" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < 1) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/donations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, amount, method: tab }) });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.checkoutUrl) { window.location.href = data.checkoutUrl; return; }
      setStatus("success");
    } catch { setStatus("error"); }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1400&q=70" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "rgba(8,15,8,0.93)" }} />
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(to bottom, transparent, #d4a853, transparent)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="chip-gold mb-5 w-fit"><Heart className="w-3 h-3" /> Support WIBEN</div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 700, color: "#f4efe4", lineHeight: 1, marginBottom: "1rem" }}>{t("title")}</h1>
          <p style={{ color: "rgba(168,196,168,0.8)", fontFamily: "var(--font-jakarta)", maxWidth: "36rem" }}>{t("subtitle")}</p>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--bg-primary)", padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Impact */}
            <div>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.2rem", fontWeight: 700, color: "#f4efe4", marginBottom: "1rem" }}>{t("impact_title")}</h2>
              <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(168,196,168,0.65)", marginBottom: "2rem", lineHeight: 1.8 }}>{t("impact_desc")}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {impacts.map((imp) => (
                  <div key={imp.label} className="card-dark p-5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(212,168,83,0.1)", color: "#d4a853" }}>{imp.icon}</div>
                    <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 700, color: "#d4a853", lineHeight: 1, marginBottom: "0.25rem" }}>{imp.amount}</div>
                    <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.78rem", color: "rgba(168,196,168,0.55)" }}>{imp.label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(212,168,83,0.06)", border: "1px solid rgba(212,168,83,0.15)" }}>
                <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.82rem", color: "rgba(168,196,168,0.65)" }}>{t("tax_note")}</p>
              </div>
            </div>

            {/* Donation form */}
            {status === "success" ? (
              <div className="card-dark p-12 text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "#4ade80" }} />
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 700, color: "#f4efe4", marginBottom: "0.5rem" }}>{t("thank_you")}</h3>
                <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(168,196,168,0.6)" }}>A receipt has been sent to your email.</p>
              </div>
            ) : (
              <div className="card-dark p-8">
                {/* Amount */}
                <div className="mb-6">
                  <label className="label-dark">{t("amount_label")}</label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {AMOUNTS.map((v) => (
                      <button key={v} type="button" onClick={() => { setActivePreset(v); setAmount(v); setCustom(""); }} className="py-2.5 rounded-lg font-semibold text-sm transition-all" style={{ backgroundColor: activePreset === v ? "#d4a853" : "rgba(212,168,83,0.06)", color: activePreset === v ? "#0e1b0e" : "#d4a853", border: `1px solid ${activePreset === v ? "#d4a853" : "rgba(212,168,83,0.15)"}`, fontFamily: "var(--font-jakarta)" }}>${v}</button>
                    ))}
                    <div className="relative rounded-lg overflow-hidden" style={{ border: `1px solid ${!activePreset ? "rgba(212,168,83,0.5)" : "rgba(212,168,83,0.15)"}` }}>
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold" style={{ color: "#d4a853" }}>$</span>
                      <input type="number" min="1" placeholder="Other" value={custom} onChange={(e) => { setCustom(e.target.value); setActivePreset(0); setAmount(parseFloat(e.target.value) || 0); }} className="w-full bg-transparent py-2.5 text-sm font-semibold outline-none" style={{ paddingLeft: "1.75rem", paddingRight: "0.5rem", color: "#f4efe4", fontFamily: "var(--font-jakarta)" }} />
                    </div>
                  </div>
                </div>

                {/* Method tabs */}
                <div className="mb-6">
                  <label className="label-dark">Payment Method</label>
                  <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(212,168,83,0.15)" }}>
                    {(["stripe", "paypal", "zelle"] as const).map((m) => (
                      <button key={m} type="button" onClick={() => setTab(m)} className="flex-1 py-2.5 text-sm font-semibold transition-colors capitalize" style={{ backgroundColor: tab === m ? "#d4a853" : "transparent", color: tab === m ? "#0e1b0e" : "rgba(212,168,83,0.6)", fontFamily: "var(--font-jakarta)" }}>
                        {m === "stripe" ? t("stripe_title") : m === "paypal" ? t("paypal_title") : t("zelle_title")}
                      </button>
                    ))}
                  </div>
                </div>

                {tab === "zelle" ? (
                  <div className="rounded-xl p-6 text-center" style={{ backgroundColor: "rgba(212,168,83,0.04)", border: "1px solid rgba(212,168,83,0.12)" }}>
                    <Smartphone className="w-10 h-10 mx-auto mb-3" style={{ color: "#d4a853" }} />
                    <p className="text-sm mb-4" style={{ fontFamily: "var(--font-jakarta)", color: "rgba(168,196,168,0.65)" }}>{t("zelle_desc")}</p>
                    {[{ l: "Name", v: t("zelle_name") }, { l: "Email", v: "treasurer@wiben.org" }].map((r) => (
                      <div key={r.l} className="rounded-lg px-4 py-2.5 mb-2" style={{ backgroundColor: "rgba(212,168,83,0.06)" }}>
                        <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.65rem", color: "rgba(168,196,168,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{r.l}</p>
                        <p style={{ fontFamily: "var(--font-jakarta)", fontWeight: 600, color: "#f4efe4", fontSize: "0.9rem" }}>{r.v}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[{ name: "name", label: t("name_label"), type: "text" }, { name: "email", label: t("email_label"), type: "email" }].map((f) => (
                      <div key={f.name}>
                        <label className="label-dark">{f.label} *</label>
                        <input name={f.name} type={f.type} required value={(form as any)[f.name]} onChange={(e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} className="input-dark" />
                      </div>
                    ))}
                    <div>
                      <label className="label-dark">{t("message_label")}</label>
                      <textarea rows={2} value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} className="input-dark" style={{ resize: "none" }} />
                    </div>
                    {status === "error" && <p style={{ color: "#f87171", fontSize: "0.8rem", fontFamily: "var(--font-jakarta)" }}>Something went wrong. Please try again.</p>}
                    <button type="submit" disabled={status === "loading" || !amount} className="btn-gold w-full py-3.5">
                      {status === "loading" ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <><Heart className="w-5 h-5" /> {t("donate_btn")} {amount ? `$${amount}` : ""}</>}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
