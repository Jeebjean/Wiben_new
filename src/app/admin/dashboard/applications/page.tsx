"use client";
import { useState } from "react";
import { CheckCircle, XCircle, Clock, Search } from "lucide-react";

const mockApps = [
  { id: "1", first_name: "Moussa", last_name: "Kaboré", email: "moussa@example.com", phone: "+1 608 555 0101", city: "Madison", message: "I am excited to join WIBEN and contribute to our community.", status: "pending", created_at: "2025-03-20T10:00:00Z" },
  { id: "2", first_name: "Fatou", last_name: "Diallo", email: "fatou@example.com", phone: "+1 414 555 0102", city: "Milwaukee", message: "", status: "pending", created_at: "2025-03-18T14:00:00Z" },
  { id: "3", first_name: "Jean", last_name: "Agossou", email: "jean@example.com", phone: "+1 608 555 0103", city: "Madison", message: "Looking forward to meeting everyone.", status: "approved", created_at: "2025-03-10T09:00:00Z" },
  { id: "4", first_name: "Aïcha", last_name: "Sossou", email: "aicha@example.com", phone: "+1 920 555 0104", city: "Green Bay", message: "", status: "rejected", created_at: "2025-03-05T11:00:00Z" },
];

export default function ApplicationsPage() {
  const [apps, setApps] = useState(mockApps);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    setUpdatingId(id);
    await new Promise((r) => setTimeout(r, 600));
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
    setUpdatingId(null);
  };

  const counts = {
    all: apps.length,
    pending: apps.filter((a) => a.status === "pending").length,
    approved: apps.filter((a) => a.status === "approved").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
  };

  const filtered = apps
    .filter((a) => filter === "all" || a.status === filter)
    .filter((a) => !search || `${a.first_name} ${a.last_name} ${a.email} ${a.city}`.toLowerCase().includes(search.toLowerCase()));

  const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,168,83,0.4)" }} />
          <input
            type="text"
            placeholder="Search by name, email or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-dark w-full"
            style={{ paddingLeft: "2.25rem" }}
          />
        </div>
        <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(212,168,83,0.15)" }}>
          {(["all", "pending", "approved", "rejected"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="px-3 py-2 text-xs font-semibold transition-colors capitalize"
              style={{
                backgroundColor: filter === s ? "#d4a853" : "transparent",
                color: filter === s ? "#0e1b0e" : "rgba(212,168,83,0.5)",
                fontFamily: "var(--font-jakarta)",
              }}
            >
              {s} <span className="opacity-60">({counts[s]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card-dark overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-center py-12" style={{ color: "rgba(168,196,168,0.3)", fontFamily: "var(--font-jakarta)", fontSize: "0.85rem" }}>No applications found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(212,168,83,0.08)" }}>
                  {["Applicant", "Contact", "City", "Date", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(168,196,168,0.35)", fontFamily: "var(--font-jakarta)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app.id} style={{ borderBottom: "1px solid rgba(212,168,83,0.05)" }}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ background: "linear-gradient(135deg, #d4a853, #b8892f)", color: "#0e1b0e", fontFamily: "var(--font-cormorant)" }}>
                          {app.first_name[0]}{app.last_name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ fontFamily: "var(--font-jakarta)", color: "#f4efe4" }}>{app.first_name} {app.last_name}</p>
                          {app.message && <p className="text-xs truncate max-w-[180px]" style={{ color: "rgba(168,196,168,0.4)", fontFamily: "var(--font-jakarta)" }}>{app.message}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm" style={{ color: "rgba(168,196,168,0.7)", fontFamily: "var(--font-jakarta)" }}>{app.email}</p>
                      <p className="text-xs" style={{ color: "rgba(168,196,168,0.35)", fontFamily: "var(--font-jakarta)" }}>{app.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-sm" style={{ color: "rgba(168,196,168,0.6)", fontFamily: "var(--font-jakarta)" }}>{app.city}</td>
                    <td className="px-5 py-4 text-xs" style={{ color: "rgba(168,196,168,0.35)", fontFamily: "var(--font-jakarta)" }}>{fmtDate(app.created_at)}</td>
                    <td className="px-5 py-4">
                      {app.status === "pending" && <span className="badge-amber flex items-center gap-1 w-fit"><Clock className="w-3 h-3" /> Pending</span>}
                      {app.status === "approved" && <span className="badge-green flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" /> Approved</span>}
                      {app.status === "rejected" && <span className="badge-red flex items-center gap-1 w-fit"><XCircle className="w-3 h-3" /> Rejected</span>}
                    </td>
                    <td className="px-5 py-4">
                      {app.status === "pending" && (
                        <div className="flex gap-2">
                          <button onClick={() => updateStatus(app.id, "approved")} disabled={updatingId === app.id} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors" style={{ backgroundColor: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.15)", fontFamily: "var(--font-jakarta)" }}>
                            <CheckCircle className="w-3 h-3" /> Approve
                          </button>
                          <button onClick={() => updateStatus(app.id, "rejected")} disabled={updatingId === app.id} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors" style={{ backgroundColor: "rgba(248,113,113,0.08)", color: "#f87171", border: "1px solid rgba(248,113,113,0.12)", fontFamily: "var(--font-jakarta)" }}>
                            <XCircle className="w-3 h-3" /> Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
