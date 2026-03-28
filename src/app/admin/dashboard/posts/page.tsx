"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, X, Loader2, Globe, ImageIcon } from "lucide-react";

const mockPosts = [
  { id: "1", title_en: "WIBEN Welcomes 20 New Members in 2025", title_fr: "WIBEN accueille 20 nouveaux membres en 2025", content_en: "We are thrilled to welcome our newest members...", content_fr: "Nous sommes ravis d'accueillir nos nouveaux membres...", excerpt_en: "We are thrilled to welcome our newest members to the WIBEN family.", excerpt_fr: "Nous sommes ravis d'accueillir nos nouveaux membres dans la famille WIBEN.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&q=60", is_published: true, created_at: "2025-03-10" },
  { id: "2", title_en: "Cultural Celebration Recap", title_fr: "Retour sur la Célébration Culturelle", content_en: "Over 150 community members gathered...", content_fr: "Plus de 150 membres de la communauté se sont réunis...", excerpt_en: "A recap of our spectacular annual event.", excerpt_fr: "Un retour sur notre événement annuel spectaculaire.", image: "", is_published: false, created_at: "2025-01-20" },
];

const empty = { title_en: "", title_fr: "", content_en: "", content_fr: "", excerpt_en: "", excerpt_fr: "", image: "", is_published: false };

export default function PostsPage() {
  const [posts, setPosts] = useState(mockPosts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<any>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"en" | "fr">("en");
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p: any) => ({ ...p, [e.target.name]: e.target.value }));
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
    await new Promise((r) => setTimeout(r, 700));
    if (editId) {
      setPosts((prev) => prev.map((p) => p.id === editId ? { ...p, ...form } : p));
    } else {
      setPosts((prev) => [{ ...form, id: Date.now().toString(), created_at: new Date().toISOString().split("T")[0] }, ...prev]);
    }
    setShowForm(false); setEditId(null); setForm(empty); setImagePreview(""); setSaving(false);
  };

  const togglePublish = (id: string) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, is_published: !p.is_published } : p));
  };

  const deletePost = (id: string) => {
    if (confirm("Delete this post?")) setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.82rem", color: "rgba(168,196,168,0.4)" }}>{posts.length} posts</p>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(empty); setImagePreview(""); setTab("en"); }} className="btn-gold text-sm" style={{ padding: "0.5rem 1rem" }}>
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(8,15,8,0.95)" }}>
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl" style={{ backgroundColor: "#0e1b0e", border: "1px solid rgba(212,168,83,0.2)" }}>
            <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid rgba(212,168,83,0.1)" }}>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", fontWeight: 700, color: "#f4efe4" }}>{editId ? "Edit Post" : "New Post"}</h3>
              <button onClick={() => setShowForm(false)} style={{ color: "rgba(168,196,168,0.4)" }}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Image upload */}
              <div>
                <label className="label-dark">Featured Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-20 rounded-xl overflow-hidden flex items-center justify-center" style={{ backgroundColor: "rgba(212,168,83,0.04)", border: "1px dashed rgba(212,168,83,0.2)" }}>
                    {(imagePreview || form.image) ? (
                      <img src={imagePreview || form.image} alt="" className="w-full h-full object-cover" />
                    ) : <ImageIcon className="w-7 h-7" style={{ color: "rgba(212,168,83,0.2)" }} />}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="btn-outline-gold text-xs cursor-pointer" style={{ padding: "0.4rem 0.875rem" }}>
                      Upload Image
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {(imagePreview || form.image) && (
                      <button type="button" onClick={() => { setImagePreview(""); setForm((p: any) => ({ ...p, image: "" })); }} className="text-xs" style={{ color: "rgba(248,113,113,0.5)", fontFamily: "var(--font-jakarta)" }}>Remove image</button>
                    )}
                  </div>
                </div>
              </div>

              {/* Language tabs */}
              <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(212,168,83,0.15)" }}>
                {(["en", "fr"] as const).map((l) => (
                  <button key={l} type="button" onClick={() => setTab(l)} className="flex-1 py-2 text-sm font-semibold flex items-center justify-center gap-2" style={{ backgroundColor: tab === l ? "#d4a853" : "transparent", color: tab === l ? "#0e1b0e" : "rgba(212,168,83,0.5)", fontFamily: "var(--font-jakarta)" }}>
                    <Globe className="w-3.5 h-3.5" /> {l === "en" ? "English" : "Français"}
                  </button>
                ))}
              </div>

              {tab === "en" ? (
                <>
                  <div><label className="label-dark">Title (English) *</label><input name="title_en" required value={form.title_en} onChange={handleChange} className="input-dark" /></div>
                  <div><label className="label-dark">Excerpt (English)</label><input name="excerpt_en" value={form.excerpt_en} onChange={handleChange} className="input-dark" placeholder="Short summary shown on listing" /></div>
                  <div><label className="label-dark">Content (English) *</label><textarea name="content_en" required rows={6} value={form.content_en} onChange={handleChange} className="input-dark" style={{ resize: "none" }} /></div>
                </>
              ) : (
                <>
                  <div><label className="label-dark">Titre (Français) *</label><input name="title_fr" required value={form.title_fr} onChange={handleChange} className="input-dark" /></div>
                  <div><label className="label-dark">Extrait (Français)</label><input name="excerpt_fr" value={form.excerpt_fr} onChange={handleChange} className="input-dark" placeholder="Résumé affiché sur la liste" /></div>
                  <div><label className="label-dark">Contenu (Français) *</label><textarea name="content_fr" required rows={6} value={form.content_fr} onChange={handleChange} className="input-dark" style={{ resize: "none" }} /></div>
                </>
              )}

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm((p: any) => ({ ...p, is_published: e.target.checked }))} className="w-4 h-4 accent-yellow-400" />
                <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.82rem", color: "rgba(168,196,168,0.7)" }}>Publish immediately</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline-gold flex-1">Cancel</button>
                <button type="submit" disabled={saving} className="btn-gold flex-1">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : "Save Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts list */}
      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="card-dark p-5 flex items-start gap-4">
            {/* Image */}
            <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0" style={{ backgroundColor: "rgba(212,168,83,0.04)" }}>
              {post.image ? (
                <img src={post.image} alt="" className="w-full h-full object-cover" />
              ) : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-5 h-5" style={{ color: "rgba(212,168,83,0.2)" }} /></div>}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold truncate" style={{ fontFamily: "var(--font-cormorant)", color: "#f4efe4", fontSize: "1rem" }}>{post.title_en}</p>
                <span className={post.is_published ? "badge-green" : "badge-amber"} style={{ whiteSpace: "nowrap" }}>
                  {post.is_published ? "Published" : "Draft"}
                </span>
              </div>
              {post.excerpt_en && <p className="text-xs truncate" style={{ color: "rgba(168,196,168,0.4)", fontFamily: "var(--font-jakarta)" }}>{post.excerpt_en}</p>}
              <p className="text-xs mt-1" style={{ color: "rgba(168,196,168,0.25)", fontFamily: "var(--font-jakarta)" }}>{post.created_at}</p>
            </div>
            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => togglePublish(post.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors" style={{ backgroundColor: post.is_published ? "rgba(251,191,36,0.08)" : "rgba(74,222,128,0.08)", color: post.is_published ? "#fbbf24" : "#4ade80", border: `1px solid ${post.is_published ? "rgba(251,191,36,0.15)" : "rgba(74,222,128,0.15)"}`, fontFamily: "var(--font-jakarta)" }}>
                {post.is_published ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => { setForm({ ...post }); setEditId(post.id); setImagePreview(""); setTab("en"); setShowForm(true); }} className="p-2 rounded-lg" style={{ color: "rgba(168,196,168,0.4)", backgroundColor: "rgba(212,168,83,0.04)" }}><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => deletePost(post.id)} className="p-2 rounded-lg" style={{ color: "rgba(248,113,113,0.4)", backgroundColor: "rgba(248,113,113,0.04)" }}><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
