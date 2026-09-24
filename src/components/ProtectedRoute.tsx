import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && !session) {
      window.location.replace("/admin/login");
    }
  }, [loading, session]);

  if (loading) {
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

  return <>{children}</>;
};
