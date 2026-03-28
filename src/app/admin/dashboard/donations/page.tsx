"use client";
import { useState } from "react";
import { Heart, CreditCard, Smartphone } from "lucide-react";

const mockDonations = [
  { id: "1", name: "Kofi Asante", email: "kofi@example.com", amount: 100, method: "stripe", message: "Keep up the great work!", created_at: "2025-03-22T10:00:00Z" },
  { id: "2", name: "Marie Leblanc", email: "marie@example.com", amount: 50, method: "paypal", message: "", created_at: "2025-03-20T15:00:00Z" },
  { id: "3", name: "John Smith", email: "john@example.com", amount: 250, method: "zelle", message: "For the cultural events", created_at: "2025-03-15T09:00:00Z" },
  { id: "4", name: "Fatima Diallo", email: "fatima@example.com", amount: 25, method: "stripe", message: "", created_at: "2025-03-10T14:00:00Z" },
  { id: "5", name: "Anonymous", email: "anon@example.com", amount: 500, method: "stripe", message: "Stay strong!", created_at: "2025-03-01T11:00:00Z" },
];

const methodIcon = (m: string) => {
  if (m === "stripe") return <CreditCard className="w-3.5 h-3.5" />;
  if (m === "paypal") return <span className="text-xs font-bold">PP</span>;
  return <Smartphone className="w-3.5 h-3.5" />;
};

export default function DonationsPage() {
  const [donations] = useState(mockDonations);
  const total = donations.reduce((s, d) => s + d.amount, 0);
  const byMethod = {
    stripe: donations.filter((d) => d.method === "stripe").reduce((s, d) => s + d.amount, 0),
    paypal: donations.filter((d) => d.method === "paypal").reduce((s, d) => s + d.amount, 0),
    zelle: donations.filter((d) => d.method === "zelle").reduce((s, d) => s + d.amount, 0),
  };
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Raised", value: `$${total.toLocaleString()}`, count: `${donations.length} donations`, color: "#d4a853" },
          { label: "Via Card", value: `$${byMethod.stripe}`, count: `${donations.filter((d) => d.method === "stripe").length} donations`, color: "#60a5fa" },
          { label: "Via PayPal", value: `$${byMethod.paypal}`, count: `${donations.filter((d) => d.method === "paypal").length} donations`, color: "#818cf8" },
          { label: "Via Zelle", value: `$${byMethod.zelle}`, count: `${donations.filter((d) => d.method === "zelle").length} donations`, color: "#4ade80" },
        ].map((s) => (
          <div key={s.label} className="card-dark p-5">
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "rgba(168,196,168,0.35)", fontFamily: "var(--font-jakarta)" }}>{s.label}</p>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: "rgba(168,196,168,0.3)", fontFamily: "var(--font-jakarta)" }}>{s.count}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card-dark overflow-hidden">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(212,168,83,0.08)" }}>
          <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 700, color: "#f4efe4" }}>Donation History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(212,168,83,0.08)" }}>
                {["Donor", "Email", "Amount", "Method", "Message", "Date"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(168,196,168,0.35)", fontFamily: "var(--font-jakarta)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.id} style={{ borderBottom: "1px solid rgba(212,168,83,0.04)" }}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #d4a853, #b8892f)", color: "#0e1b0e", fontFamily: "var(--font-cormorant)" }}>
                        {d.name[0]}
                      </div>
                      <p className="font-semibold text-sm" style={{ fontFamily: "var(--font-jakarta)", color: "#f4efe4" }}>{d.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: "rgba(168,196,168,0.55)", fontFamily: "var(--font-jakarta)" }}>{d.email}</td>
                  <td className="px-5 py-4">
                    <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 700, color: "#d4a853" }}>${d.amount}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="badge-green flex items-center gap-1.5 w-fit capitalize">
                      {methodIcon(d.method)} {d.method}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs max-w-[180px]" style={{ color: "rgba(168,196,168,0.4)", fontFamily: "var(--font-jakarta)" }}>
                    <p className="truncate">{d.message || "—"}</p>
                  </td>
                  <td className="px-5 py-4 text-xs whitespace-nowrap" style={{ color: "rgba(168,196,168,0.35)", fontFamily: "var(--font-jakarta)" }}>{fmtDate(d.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
