import React from "react";
import { Link } from "wouter";
import { ArrowLeft, AlertCircle } from "lucide-react";

export const AdminNotFound: React.FC = () => {
  return (
    <div className="py-20 text-center max-w-md mx-auto">
      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-4">
        <AlertCircle className="w-6 h-6 text-blue-400" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">
        Halaman Redaksi Tidak Ditemukan
      </h2>
      <p className="text-xs text-slate-400 mb-6 leading-relaxed">
        Halaman atau menu yang Anda cari tidak tersedia di dalam portal admin GP Jatipon.
      </p>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Dashboard</span>
      </Link>
    </div>
  );
};
