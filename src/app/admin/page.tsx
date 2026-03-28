"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError("Invalid credentials. Please try again."); setLoading(false); return; }
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #080f08, #0e1b0e, #162416)" }}>
      <div className="w-full max-w-md rounded-2xl p-10" style={{ backgroundColor: "rgba(22,36,22,0.9)", border: "1px solid rgba(212,168,83,0.2)", backdropFilter: "blur(16px)" }}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #d4a853, #b8892f)" }}>
            <Lock className="w-7 h-7" style={{ color: "#0e1b0e" }} />
          </div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 700, color: "#f4efe4" }}>WIBEN Admin</h1>
          <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.82rem", color: "rgba(168,196,168,0.5)", marginTop: "0.25rem" }}>Sign in to the admin dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label-dark">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-dark" placeholder="admin@wiben.org" />
          </div>
          <div>
            <label className="label-dark">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input-dark" placeholder="••••••••" />
          </div>
          {error && <p style={{ color: "#f87171", fontSize: "0.8rem", fontFamily: "var(--font-jakarta)" }}>{error}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full py-3.5">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing in...</> : "Sign In"}
          </button>
        </form>
        <p className="text-center text-xs mt-6" style={{ color: "rgba(168,196,168,0.3)", fontFamily: "var(--font-jakarta)" }}>Protected admin area · Authorized personnel only</p>
      </div>
    </div>
  );
}
