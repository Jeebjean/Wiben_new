"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, X, Loader2, Calendar, MapPin, Tag, ImageIcon, DollarSign } from "lucide-react";

const mockEvents = [
  { id: "1", title_en: "Annual Beninese Cultural Celebration 2025", date: "2025-08-15T18:00:00Z", location: "Madison Community Center, WI", is_paid: false, price: 0, open_price: false, image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&q=60" },
  { id: "2", title_en: "WIBEN General Assembly 2025", date: "2025-09-20T10:00:00Z", location: "Madison Public Library, WI", is_paid: false, price: 0, open_price: false, image: "" },
  { id: "3", title_en: "Beninese Cuisine Workshop", date: "2025-10-05T14:00:00Z", location: "Goodman Community Center, WI", is_paid: true, price: 0, open_price: true, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&q=60" },
];

const empty = { title_en: "", title_fr: "", description_en: "", description_fr: "", date: "", location: "", is_paid: false, price: 0, open_price: false, capacity: "", image: "" };

export default function AdminEventsPage() {
  const [events, setEvents] = useState(mockEvents);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<any>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((p: any) => ({ ...p, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : type === "number" ? parseFloat(value) || 0 : value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setForm((p: any) => ({ ...p, image: url }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    if (editId) {
      setEvents((prev) => prev.map((ev) => ev.id === editId ? { ...ev, ...form } : ev));
    } else {
      setEvents((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setShowForm(false); setEditId(null); setForm(empty); setImagePreview(""); setSaving(false);
  };

  const getMonth = (d: string) => new Date(d).toLocaleString("en-US", { month: "short" }).toUpperCase();
  const getDay = (d: string) => new Date(d).getDate();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.82rem", color: "rgba(168,196,168,0.4)" }}>{events.length} events</p>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(empty); setImagePreview(""); }} className="btn-gold text-sm" style={{ padding: "0.5rem 1rem" }}>
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(8,15,8,0.95)" }}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl" style={{ backgroundColor: "#0e1b0e", border: "1px solid rgba(212,168,83,0.2)" }}>
            <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid rgba(212,168,83,0.1)" }}>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", fontWeight: 700, color: "#f4efe4" }}>{editId ? "Edit Event" : "New Event"}</h3>
              <button onClick={() => setShowForm(false)} style={{ color: "rgba(168,196,168,0.4)" }}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Image upload */}
              <div>
                <label className="label-dark">Event Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded-lg overflow-hidden flex items-center justify-center" style={{ backgroundColor: "rgba(212,168,83,0.05)", border: "1px dashed rgba(212,168,83,0.2)" }}>
                    {imagePreview || form.image ? (
                      <img src={imagePreview || form.image} alt="" className="w-full h-full object-cover" />
                    ) : <ImageIcon className="w-6 h-6" style={{ color: "rgba(212,168,83,0.3)" }} />}
                  </div>
                  <label className="btn-outline-gold text-xs cursor-pointer" style={{ padding: "0.4rem 0.875rem" }}>
                    Upload Image
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                  {(imagePreview || form.image) && (
                    <button type="button" onClick={() => { setImagePreview(""); setForm((p: any) => ({ ...p, image: "" })); }} style={{ color: "rgba(168,196,168,0.4)", fontSize: "0.75rem", fontFamily: "var(--font-jakarta)" }}>Remove</button>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="label-dark">Title (EN) *</label><input name="title_en" required value={form.title_en} onChange={handleChange} className="input-dark" /></div>
                <div><label className="label-dark">Titre (FR) *</label><input name="title_fr" required value={form.title_fr} onChange={handleChange} className="input-dark" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="label-dark">Description (EN)</label><textarea name="description_en" rows={2} value={form.description_en} onChange={handleChange} className="input-dark" style={{ resize: "none" }} /></div>
                <div><label className="label-dark">Description (FR)</label><textarea name="description_fr" rows={2} value={form.description_fr} onChange={handleChange} className="input-dark" style={{ resize: "none" }} /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="label-dark">Date & Time *</label><input name="date" type="datetime-local" required value={form.date} onChange={handleChange} className="input-dark" /></div>
                <div><label className="label-dark">Location *</label><input name="location" required value={form.location} onChange={handleChange} className="input-dark" /></div>
              </div>

              {/* Pricing section */}
              <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: "rgba(212,168,83,0.04)", border: "1px solid rgba(212,168,83,0.1)" }}>
                <p className="label-dark flex items-center gap-2"><DollarSign className="w-3.5 h-3.5" /> Pricing</p>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="is_paid" checked={form.is_paid} onChange={handleChange} className="w-4 h-4 accent-yellow-400" />
                    <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.82rem", color: "rgba(168,196,168,0.7)" }}>Paid event</span>
                  </label>
                  {form.is_paid && (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="open_price" checked={form.open_price} onChange={handleChange} className="w-4 h-4 accent-yellow-400" />
                      <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.82rem", color: "#d4a853" }}>Pay What You Can (open price)</span>
                    </label>
                  )}
                </div>
                {form.is_paid && !form.open_price && (
                  <div><label className="label-dark">Fixed Price ($)</label><input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} className="input-dark" /></div>
                )}
                {form.is_paid && form.open_price && (
                  <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.78rem", color: "rgba(212,168,83,0.5)" }}>Attendees will enter their own contribution amount during registration.</p>
                )}
              </div>

              <div><label className="label-dark">Capacity (optional)</label><input name="capacity" type="number" min="1" value={form.capacity} onChange={handleChange} placeholder="Unlimited" className="input-dark" /></div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline-gold flex-1">Cancel</button>
                <button type="submit" disabled={saving} className="btn-gold flex-1">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Events list */}
      <div className="space-y-3">
        {events.map((ev) => (
          <div key={ev.id} className="card-dark p-5 flex items-center gap-5">
            {/* Image thumbnail */}
            <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0" style={{ backgroundColor: "rgba(212,168,83,0.05)" }}>
              {ev.image ? <img src={ev.image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-5 h-5" style={{ color: "rgba(212,168,83,0.2)" }} /></div>}
            </div>
            {/* Date */}
            <div className="text-center flex-shrink-0 w-10">
              <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.58rem", fontWeight: 700, color: "#d4a853", letterSpacing: "0.1em" }}>{getMonth(ev.date)}</div>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", fontWeight: 700, color: "#f4efe4", lineHeight: 1 }}>{getDay(ev.date)}</div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate" style={{ fontFamily: "var(--font-cormorant)", color: "#f4efe4", fontSize: "1rem" }}>{ev.title_en}</p>
              <div className="flex flex-wrap gap-3 mt-1 text-xs" style={{ color: "rgba(168,196,168,0.4)", fontFamily: "var(--font-jakarta)" }}>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>
                <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{ev.open_price ? "Pay What You Can" : ev.is_paid ? `$${ev.price}` : "Free"}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => { setForm({ ...ev, capacity: (ev as any).capacity || "" }); setEditId(ev.id); setImagePreview(""); setShowForm(true); }} className="p-2 rounded-lg transition-colors" style={{ color: "rgba(168,196,168,0.4)", backgroundColor: "rgba(212,168,83,0.04)" }}><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => setEvents((prev) => prev.filter((e) => e.id !== ev.id))} className="p-2 rounded-lg transition-colors" style={{ color: "rgba(248,113,113,0.5)", backgroundColor: "rgba(248,113,113,0.04)" }}><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
