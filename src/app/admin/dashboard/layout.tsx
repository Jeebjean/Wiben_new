"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { LayoutDashboard, Users, Calendar, Heart, Images, Newspaper, Folder, LogOut, Menu, X } from "lucide-react";

const nav = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/dashboard/applications", icon: Users, label: "Applications" },
  { href: "/admin/dashboard/events", icon: Calendar, label: "Events" },
  { href: "/admin/dashboard/donations", icon: Heart, label: "Donations" },
  { href: "/admin/dashboard/gallery", icon: Images, label: "Gallery" },
  { href: "/admin/dashboard/posts", icon: Newspaper, label: "News" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     if (!session) { router.push("/admin"); return; }
  //     setEmail(session.user.email || "");
  //   });
  // }, []);

  useEffect(() => {
  setEmail("admin@wiben.org");
}, []);

  const logout = async () => { await supabase.auth.signOut(); router.push("/admin"); };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#080f08" }}>
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-60 flex flex-col transition-transform duration-300 ${open ? "" : "-translate-x-full lg:translate-x-0"}`} style={{ backgroundColor: "#0e1b0e", borderRight: "1px solid rgba(212,168,83,0.1)" }}>
        <div className="p-5" style={{ borderBottom: "1px solid rgba(212,168,83,0.1)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #d4a853, #b8892f)" }}>
              <span style={{ color: "#0e1b0e", fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.1rem" }}>W</span>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, color: "#f4efe4", fontSize: "1.1rem", lineHeight: 1 }}>WIBEN</p>
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.62rem", color: "rgba(212,168,83,0.6)", letterSpacing: "0.1em" }}>ADMIN PANEL</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
                style={{ backgroundColor: active ? "rgba(212,168,83,0.12)" : "transparent", color: active ? "#d4a853" : "rgba(168,196,168,0.55)", fontFamily: "var(--font-jakarta)", fontWeight: active ? 600 : 400, borderLeft: active ? "2px solid #d4a853" : "2px solid transparent" }}>
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3" style={{ borderTop: "1px solid rgba(212,168,83,0.1)" }}>
          <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "rgba(212,168,83,0.15)", color: "#d4a853" }}>{email.charAt(0).toUpperCase()}</div>
            <p className="text-xs truncate flex-1" style={{ fontFamily: "var(--font-jakarta)", color: "rgba(168,196,168,0.5)" }}>{email}</p>
          </div>
          <button onClick={logout} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors" style={{ color: "rgba(168,196,168,0.4)", fontFamily: "var(--font-jakarta)" }}>
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {open && <div className="lg:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setOpen(false)} />}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="px-6 py-4 flex items-center gap-4" style={{ backgroundColor: "#0e1b0e", borderBottom: "1px solid rgba(212,168,83,0.08)" }}>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} style={{ color: "#d4a853" }}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.4rem", color: "#f4efe4" }}>
            {nav.find((n) => n.href === pathname)?.label || "Dashboard"}
          </h1>
          <div className="ml-auto">
            <Link href="/en" target="_blank" style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", color: "rgba(212,168,83,0.5)" }}>View Site →</Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
