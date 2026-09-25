import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, setLocation] = useLocation();
  const { session, loading, roleLoading, isStaff, authError, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !session) {
      setLocation("/admin/login");
    }
  }, [loading, session, setLocation]);

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen bg-[#070b14] flex flex-col justify-center items-center text-slate-400">
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mb-4" />
        <p className="text-xs uppercase tracking-wider font-mono text-slate-500">
          Memuat Sistem Redaksi...
        </p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (!isStaff) {
    return (
      <div className="min-h-screen bg-[#070b14] flex flex-col justify-center items-center px-4 text-center text-slate-300">
        <div className="max-w-md rounded-2xl border border-red-500/30 bg-red-950/20 p-6">
          <h1 className="text-lg font-bold text-white">Akses Admin Ditolak</h1>
          <p className="mt-2 text-sm text-slate-400">
            Akun ini sudah terautentikasi, tetapi belum memiliki peran admin atau editor di
            database GP Jatipon.
          </p>
          {authError && (
            <p className="mt-3 rounded-lg border border-red-500/20 bg-red-950/30 p-3 text-xs text-red-200">
              {authError}
            </p>
          )}
          <button
            type="button"
            onClick={() => void signOut().finally(() => setLocation("/admin/login"))}
            className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-500"
          >
            Keluar
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
