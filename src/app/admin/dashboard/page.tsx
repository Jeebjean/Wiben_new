"use client";
import Link from "next/link";
import { Users, Calendar, Heart, Clock } from "lucide-react";

const stats = [
  { label: "Pending Applications", value: "3", icon: Clock, href: "/admin/dashboard/applications", color: "#fbbf24" },
  { label: "Active Members", value: "47", icon: Users, href: "/admin/dashboard/applications", color: "#4ade80" },
  { label: "Upcoming Events", value: "3", icon: Calendar, href: "/admin/dashboard/events", color: "#60a5fa" },
  { label: "Total Donations", value: "$2,840", icon: Heart, href: "/admin/dashboard/donations", color: "#f87171" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, rgba(212,168,83,0.12), rgba(212,168,83,0.04))", border: "1px solid rgba(212,168,83,0.2)" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 700, color: "#f4efe4", marginBottom: "0.25rem" }}>Welcome back 👋</h2>
        <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.82rem", color: "rgba(168,196,168,0.55)" }}>Here is an overview of WIBEN activity.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card-dark p-5 block transition-all hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
              <s.icon className="w-5 h-5" />
            </div>
            <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.2rem", fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "rgba(168,196,168,0.45)", marginTop: "0.25rem" }}>{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-dark p-5">
          <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 700, color: "#f4efe4", marginBottom: "1rem" }}>Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Add Event", href: "/admin/dashboard/events", icon: "📅" },
              { label: "Upload Photos", href: "/admin/dashboard/gallery", icon: "🖼️" },
              { label: "Publish News", href: "/admin/dashboard/posts", icon: "📰" },
              { label: "Review Applications", href: "/admin/dashboard/applications", icon: "👥" },
            ].map((a) => (
              <Link key={a.label} href={a.href} className="flex items-center gap-3 p-3 rounded-xl transition-all" style={{ backgroundColor: "rgba(212,168,83,0.04)", border: "1px solid rgba(212,168,83,0.1)" }}>
                <span className="text-xl">{a.icon}</span>
                <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", color: "rgba(168,196,168,0.7)", fontWeight: 500 }}>{a.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="card-dark p-5">
          <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 700, color: "#f4efe4", marginBottom: "1rem" }}>Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: "New membership application from Moussa K.", time: "2h ago", color: "#fbbf24" },
              { text: "Annual Celebration event updated", time: "5h ago", color: "#60a5fa" },
              { text: "$100 donation received via Stripe", time: "1d ago", color: "#4ade80" },
              { text: "3 new gallery photos uploaded", time: "2d ago", color: "#d4a853" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: item.color }} />
                <div>
                  <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", color: "rgba(168,196,168,0.7)" }}>{item.text}</p>
                  <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.7rem", color: "rgba(168,196,168,0.3)", marginTop: "0.1rem" }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
