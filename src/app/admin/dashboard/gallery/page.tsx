"use client";
import { useState, useRef } from "react";
import { Plus, Trash2, X, Loader2, FolderPlus, Edit2, Upload, Folder } from "lucide-react";

const initFolders = [
  { id: "meetings", name: "Meetings" },
  { id: "celebrations", name: "Celebrations" },
  { id: "food", name: "Cultural Food" },
  { id: "workshops", name: "Workshops" },
];

const initPhotos = [
  { id: "1", folder: "celebrations", src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&q=70", alt: "Community gathering 2024" },
  { id: "2", folder: "food", src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=70", alt: "Traditional Beninese cuisine" },
  { id: "3", folder: "celebrations", src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&q=70", alt: "Annual celebration 2024" },
  { id: "4", folder: "meetings", src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&q=70", alt: "General assembly" },
  { id: "5", folder: "workshops", src: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=300&q=70", alt: "Community workshop" },
];

export default function AdminGalleryPage() {
  const [folders, setFolders] = useState(initFolders);
  const [photos, setPhotos] = useState(initPhotos);
  const [activeFolder, setActiveFolder] = useState("all");
  const [newFolderName, setNewFolderName] = useState("");
  const [editFolderId, setEditFolderId] = useState<string | null>(null);
  const [editFolderName, setEditFolderName] = useState("");
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(folders[0].id);
  const fileRef = useRef<HTMLInputElement>(null);

  const addFolder = () => {
    if (!newFolderName.trim()) return;
    const id = newFolderName.toLowerCase().replace(/\s+/g, "_");
    setFolders((prev) => [...prev, { id, name: newFolderName.trim() }]);
    setNewFolderName(""); setShowFolderForm(false);
  };

  const deleteFolder = (id: string) => {
    if (!confirm("Delete this folder and all its photos?")) return;
    setFolders((prev) => prev.filter((f) => f.id !== id));
    setPhotos((prev) => prev.filter((p) => p.folder !== id));
    if (activeFolder === id) setActiveFolder("all");
  };

  const saveEditFolder = (id: string) => {
    setFolders((prev) => prev.map((f) => f.id === id ? { ...f, name: editFolderName } : f));
    setEditFolderId(null);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    await new Promise((r) => setTimeout(r, 800));
    const newPhotos = Array.from(files).map((f, i) => ({
      id: Date.now() + i + "",
      folder: selectedFolder,
      src: URL.createObjectURL(f),
      alt: f.name.replace(/\.[^.]+$/, ""),
    }));
    setPhotos((prev) => [...newPhotos, ...prev]);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const filtered = activeFolder === "all" ? photos : photos.filter((p) => p.folder === activeFolder);

  return (
    <div className="space-y-6">
      {/* Folder management */}
      <div className="card-dark p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 700, color: "#f4efe4" }}>
            <Folder className="w-5 h-5" style={{ color: "#d4a853" }} /> Folders
          </h3>
          <button onClick={() => setShowFolderForm(true)} className="btn-outline-gold text-xs" style={{ padding: "0.4rem 0.875rem" }}>
            <FolderPlus className="w-3.5 h-3.5" /> New Folder
          </button>
        </div>

        {showFolderForm && (
          <div className="flex gap-2 mb-4">
            <input value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} placeholder="Folder name..." className="input-dark flex-1" style={{ padding: "0.5rem 0.75rem", fontSize: "0.82rem" }} onKeyDown={(e) => e.key === "Enter" && addFolder()} autoFocus />
            <button onClick={addFolder} className="btn-gold text-sm" style={{ padding: "0.5rem 1rem" }}>Add</button>
            <button onClick={() => setShowFolderForm(false)} style={{ color: "rgba(168,196,168,0.4)" }}><X className="w-5 h-5" /></button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveFolder("all")} className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all" style={{ backgroundColor: activeFolder === "all" ? "#d4a853" : "rgba(212,168,83,0.06)", color: activeFolder === "all" ? "#0e1b0e" : "rgba(212,168,83,0.6)", border: "1px solid rgba(212,168,83,0.15)", fontFamily: "var(--font-jakarta)" }}>
            All ({photos.length})
          </button>
          {folders.map((f) => (
            <div key={f.id} className="flex items-center gap-1 rounded-full" style={{ border: "1px solid rgba(212,168,83,0.15)", backgroundColor: activeFolder === f.id ? "rgba(212,168,83,0.15)" : "rgba(212,168,83,0.04)" }}>
              {editFolderId === f.id ? (
                <input value={editFolderName} onChange={(e) => setEditFolderName(e.target.value)} className="bg-transparent text-sm px-3 py-1 outline-none" style={{ color: "#d4a853", width: "120px", fontFamily: "var(--font-jakarta)" }} onKeyDown={(e) => { if (e.key === "Enter") saveEditFolder(f.id); if (e.key === "Escape") setEditFolderId(null); }} autoFocus />
              ) : (
                <button onClick={() => setActiveFolder(f.id)} className="px-3 py-1.5 text-sm font-semibold" style={{ color: activeFolder === f.id ? "#d4a853" : "rgba(212,168,83,0.55)", fontFamily: "var(--font-jakarta)" }}>
                  {f.name} ({photos.filter((p) => p.folder === f.id).length})
                </button>
              )}
              <button onClick={() => { setEditFolderId(f.id); setEditFolderName(f.name); }} className="p-1 rounded-full" style={{ color: "rgba(168,196,168,0.3)" }}><Edit2 className="w-2.5 h-2.5" /></button>
              <button onClick={() => deleteFolder(f.id)} className="pr-1.5 p-1 rounded-full" style={{ color: "rgba(248,113,113,0.3)" }}><Trash2 className="w-2.5 h-2.5" /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Upload */}
      <div className="card-dark p-5">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 700, color: "#f4efe4" }}>Upload Photos</h3>
          <div className="flex items-center gap-2">
            <label className="label-dark mb-0" style={{ whiteSpace: "nowrap" }}>To folder:</label>
            <select value={selectedFolder} onChange={(e) => setSelectedFolder(e.target.value)} className="input-dark text-sm" style={{ padding: "0.35rem 0.6rem", width: "auto" }}>
              {folders.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
          <label className={`btn-${uploading ? "ghost" : "outline-gold"} text-sm cursor-pointer`} style={{ padding: "0.5rem 1rem" }}>
            {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : <><Upload className="w-4 h-4" /> Upload Photos</>}
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
        </div>
        <div onClick={() => !uploading && fileRef.current?.click()} className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors" style={{ borderColor: "rgba(212,168,83,0.15)", backgroundColor: "rgba(212,168,83,0.02)" }}>
          <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: "rgba(212,168,83,0.25)" }} />
          <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", color: "rgba(168,196,168,0.35)" }}>Click or drag photos to upload to <span style={{ color: "#d4a853" }}>{folders.find((f) => f.id === selectedFolder)?.name}</span></p>
        </div>
      </div>

      {/* Photos grid */}
      <div className="card-dark p-5">
        <p className="mb-4" style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", color: "rgba(168,196,168,0.4)" }}>{filtered.length} photo{filtered.length !== 1 ? "s" : ""}</p>
        {filtered.length === 0 ? (
          <p className="text-center py-10" style={{ color: "rgba(168,196,168,0.25)", fontFamily: "var(--font-jakarta)", fontSize: "0.85rem" }}>No photos yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filtered.map((photo) => (
              <div key={photo.id} className="relative group rounded-xl overflow-hidden aspect-square" style={{ backgroundColor: "rgba(212,168,83,0.04)" }}>
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between p-2" style={{ background: "rgba(8,15,8,0.7)" }}>
                  <div className="self-end">
                    <button onClick={() => setPhotos((prev) => prev.filter((p) => p.id !== photo.id))} className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(248,113,113,0.2)", color: "#f87171" }}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-center truncate w-full" style={{ color: "#d4a853", fontFamily: "var(--font-jakarta)" }}>{photo.alt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
