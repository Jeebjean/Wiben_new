"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Calendar, MapPin, Tag, Loader2, CheckCircle } from "lucide-react";
import { getMonth, getDay, formatDate } from "@/lib/utils";

const events = [
  { id: "1", title_en: "Annual Beninese Cultural Celebration 2025", title_fr: "Célébration Culturelle Béninoise Annuelle 2025", date: "2025-08-15T18:00:00Z", location: "Madison Community Center, 1245 East Washington Ave, Madison, WI", is_paid: false, price: 0, open_price: false, capacity: 200, registered: 87, image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=85", description_en: "Join us for our annual cultural celebration featuring traditional Beninese music, dance, cuisine, and community fellowship. A night of joy, culture, and togetherness — all are welcome!", description_fr: "Rejoignez-nous pour notre célébration culturelle annuelle avec musique, danse, cuisine béninoise et fraternité. Une nuit de joie, de culture et de convivialité — tous sont les bienvenus !" },
  { id: "2", title_en: "WIBEN General Assembly 2025", title_fr: "Assemblée Générale WIBEN 2025", date: "2025-09-20T10:00:00Z", location: "Madison Public Library, 201 W Mifflin St, Madison, WI", is_paid: false, price: 0, open_price: false, capacity: 100, registered: 45, image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&q=85", description_en: "Annual general assembly for all WIBEN members. Review the year's activities, discuss community matters, and vote on board elections.", description_fr: "Assemblée générale annuelle pour tous les membres WIBEN. Revue des activités, discussions communautaires et élections du conseil." },
  { id: "3", title_en: "Beninese Cuisine Workshop", title_fr: "Atelier de Cuisine Béninoise", date: "2025-10-05T14:00:00Z", location: "Goodman Community Center, 149 Waubesa St, Madison, WI", is_paid: true, price: 0, open_price: true, capacity: 30, registered: 18, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=85", description_en: "Learn to cook authentic Beninese dishes from our community cooks. Pay what you can — everyone is welcome regardless of their means.", description_fr: "Apprenez à cuisiner des plats béninois authentiques. Prix libre — tout le monde est le bienvenu selon ses moyens." },
];

function RegistrationForm({ event, locale }: { event: typeof events[0]; locale: string }) {
  const t = useTranslations("events");
  const [form, setForm] = useState({ name: "", email: "", phone: "", amount: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000)); // demo delay
    setStatus("success");
  };

  if (status === "success") return (
    <div className="text-center py-6">
      <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: "#4ade80" }} />
      <p className="font-bold mb-1" style={{ fontFamily: "var(--font-cormorant)", color: "#f4efe4", fontSize: "1.1rem" }}>Registered!</p>
      <p className="text-xs" style={{ color: "rgba(168,196,168,0.6)", fontFamily: "var(--font-jakarta)" }}>Check your email for confirmation.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h4 className="font-bold mb-4" style={{ fontFamily: "var(--font-cormorant)", color: "#f4efe4", fontSize: "1.1rem" }}>{t("register")}</h4>
      {[
        { name: "name", label: "Full Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone (optional)", type: "tel", required: false },
      ].map((f) => (
        <div key={f.name}>
          <label className="label-dark">{f.label}</label>
          <input name={f.name} type={f.type} required={f.required} value={(form as any)[f.name]} onChange={(e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} className="input-dark" style={{ padding: "0.5rem 0.75rem", fontSize: "0.8rem" }} />
        </div>
      ))}

      {event.open_price && (
        <div>
          <label className="label-dark">{t("enter_amount")}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold" style={{ color: "#d4a853" }}>$</span>
            <input type="number" min="1" placeholder="Your contribution" value={form.amount} onChange={(e) => setForm(p => ({ ...p, amount: e.target.value }))} className="input-dark" style={{ paddingLeft: "1.75rem", padding: "0.5rem 0.75rem 0.5rem 1.75rem", fontSize: "0.8rem" }} />
          </div>
          <p className="text-xs mt-1" style={{ color: "rgba(168,196,168,0.4)", fontFamily: "var(--font-jakarta)" }}>{t("min_amount")}</p>
        </div>
      )}

      {status === "error" && <p className="text-xs" style={{ color: "#f87171" }}>Registration failed. Try again.</p>}

      <button type="submit" disabled={status === "loading"} className="btn-gold w-full text-sm" style={{ padding: "0.65rem", marginTop: "0.5rem" }}>
        {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Registering...</> : event.open_price ? `Register — Pay What You Can` : event.is_paid ? `Register — $${event.price}` : "Register for Free"}
      </button>
    </form>
  );
}

export default function EventsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const t = useTranslations("events");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=70" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "rgba(8,15,8,0.92)" }} />
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(to bottom, transparent, #d4a853, transparent)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="chip-gold mb-5 w-fit"><Calendar className="w-3 h-3" /> Activities</div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 700, color: "#f4efe4", lineHeight: 1, marginBottom: "1rem" }}>{t("title")}</h1>
          <p style={{ color: "rgba(168,196,168,0.8)", fontFamily: "var(--font-jakarta)" }}>{t("subtitle")}</p>
        </div>
      </section>

      {/* Events list */}
      <section style={{ backgroundColor: "var(--bg-primary)", padding: "4rem 0 6rem" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {events.map((ev) => {
            const spotsLeft = (ev.capacity || 0) - ev.registered;
            return (
              <div key={ev.id} className="card-dark overflow-hidden">
                <div className="grid lg:grid-cols-5">
                  {/* Image */}
                  <div className="relative lg:col-span-2 h-56 lg:h-auto overflow-hidden">
                    <Image src={ev.image} alt={ev.title_en} fill className="object-cover" sizes="40vw" />
                    <div className="img-overlay-dark" />
                    <div className="absolute bottom-4 left-4">
                      <div className="rounded-lg px-3 py-2 text-center inline-block" style={{ backgroundColor: "rgba(8,15,8,0.85)", border: "1px solid rgba(212,168,83,0.3)", backdropFilter: "blur(8px)" }}>
                        <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6rem", fontWeight: 700, color: "#d4a853", letterSpacing: "0.12em", textTransform: "uppercase" }}>{getMonth(ev.date, locale)}</div>
                        <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 700, color: "#f4efe4", lineHeight: 1 }}>{getDay(ev.date)}</div>
                      </div>
                    </div>
                    {ev.open_price && (
                      <div className="absolute top-4 right-4 chip-gold">{t("open_price")}</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="mb-3 leading-snug" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", fontWeight: 700, color: "#f4efe4" }}>
                        {locale === "fr" ? ev.title_fr : ev.title_en}
                      </h3>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(168,196,168,0.65)", fontFamily: "var(--font-jakarta)" }}>
                        {locale === "fr" ? ev.description_fr : ev.description_en}
                      </p>
                      <div className="space-y-2">
                        {[
                          { icon: Calendar, text: formatDate(ev.date, locale) },
                          { icon: MapPin, text: ev.location },
                          { icon: Tag, text: ev.open_price ? t("open_price") : ev.is_paid ? `$${ev.price}` : t("free") },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(168,196,168,0.55)", fontFamily: "var(--font-jakarta)" }}>
                            <item.icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#d4a853" }} />
                            {item.text}
                          </div>
                        ))}
                      </div>
                    </div>
                    {ev.capacity && (
                      <div className="mt-5">
                        <div className="flex justify-between text-xs mb-1.5" style={{ color: "rgba(168,196,168,0.4)", fontFamily: "var(--font-jakarta)" }}>
                          <span>{ev.registered} registered</span>
                          <span>{spotsLeft > 0 ? `${spotsLeft} ${t("seats_left")}` : t("sold_out")}</span>
                        </div>
                        <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(212,168,83,0.1)" }}>
                          <div className="h-full rounded-full" style={{ backgroundColor: "#d4a853", width: `${(ev.registered / ev.capacity) * 100}%` }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Registration */}
                  <div className="lg:col-span-1 p-6 lg:p-8 flex flex-col justify-center" style={{ backgroundColor: "rgba(8,15,8,0.4)", borderLeft: "1px solid rgba(212,168,83,0.1)" }}>
                    <RegistrationForm event={ev} locale={locale} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
