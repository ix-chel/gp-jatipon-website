import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ShieldCheck, Lock, Mail, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { session, isStaff, roleLoading, signOut } = useAuth();

  useEffect(() => {
    if (session && isStaff) {
      setLocation("/admin/dashboard");
    }
  }, [session, isStaff, setLocation]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setLocation("/admin/dashboard");
    }
  };

  if (session && roleLoading) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center text-xs uppercase tracking-wider text-slate-400">
        Memeriksa akses redaksi...
      </div>
    );
  }

  if (session && !isStaff) {
    return (
      <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-md rounded-2xl border border-red-500/30 bg-[#0c1222] p-6 text-slate-300">
          <h1 className="text-lg font-bold text-white">Akun belum diberi akses admin</h1>
          <p className="mt-2 text-sm text-slate-400">
            Tambahkan akun ini ke tabel user_roles sebagai admin atau editor sebelum masuk ke
            portal redaksi.
          </p>
          <button
            type="button"
            onClick={() => void signOut()}
            className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-500"
          >
            Keluar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-950/70 border border-blue-500/30 text-blue-400 mb-4 shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400 font-mono mb-1">
          PORTAL REDAKSI
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
          GP Jatipon Admin
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Masuk untuk mengelola BOOST, konten publikasi, dan arsip pelayanan.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#0c1222] py-8 px-6 sm:px-10 border border-[#1a2540] rounded-2xl shadow-2xl">
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Email Redaksi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="editor@gpjatipon.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3.5 py-2.5 bg-[#070b14] border border-[#1e2c4d] rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-3.5 py-2.5 bg-[#070b14] border border-[#1e2c4d] rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#070b14] disabled:opacity-50 transition-all cursor-pointer shadow-md shadow-blue-900/30"
              >
                {isLoading ? "Memverifikasi..." : "Masuk ke Panel Redaksi"}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-[#1a2540] text-center">
            <a
              href="/"
              className="text-xs text-slate-400 hover:text-blue-400 transition-colors"
            >
              ← Kembali ke Beranda Publik
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
