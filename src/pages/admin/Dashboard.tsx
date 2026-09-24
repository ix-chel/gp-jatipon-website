import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  Flame,
  Plus,
  FileText,
  Calendar,
  ArrowRight,
  ExternalLink,
  Edit2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { MetricBlock } from "../../components/admin/MetricBlock";
import { StatusBadge } from "../../components/admin/StatusBadge";
import { EmptyState } from "../../components/admin/EmptyState";
import {
  getAllBoostsAdmin,
  formatJakartaDate,
  getJakartaDateString,
} from "../../lib/boosts";
import type { Boost } from "../../types";

export const Dashboard: React.FC = () => {
  const [boosts, setBoosts] = useState<Boost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const todayStr = getJakartaDateString();

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await getAllBoostsAdmin();
      if (err) {
        setError(err.message);
      } else {
        setBoosts(data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat data dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute metrics
  const todayBoost = boosts.find(
    (b) => b.publishDate === todayStr && b.status === "published"
  );
  const scheduledCount = boosts.filter((b) => b.status === "scheduled").length;
  const draftCount = boosts.filter((b) => b.status === "draft").length;
  const archivedCount = boosts.filter((b) => b.status === "archived").length;
  const totalPublications = boosts.length;

  const recentBoosts = boosts.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <AdminPageHeader
        eyebrow="Publishing Overview"
        title="Dashboard"
        description="Ringkasan aktivitas redaksi dan status publikasi sistem GP Jatipon."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
              />
              <span>Segarkan</span>
            </button>
            <Link
              href="/boost/new"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tulis BOOST</span>
            </Link>
          </div>
        }
      />

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>Tidak dapat memuat data redaksi: {error}</span>
          </div>
          <button
            onClick={loadData}
            className="px-2.5 py-1 rounded bg-red-900/50 hover:bg-red-800 text-red-200 text-xs font-medium transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricBlock
          label="BOOST HARI INI"
          value={todayBoost ? "1" : "0"}
          description={
            todayBoost
              ? "Renungan aktif terbit hari ini"
              : "Belum ada renungan terbit hari ini"
          }
          badge={todayBoost ? "Published" : "Belum Terbit"}
          highlight={!!todayBoost}
        />

        <MetricBlock
          label="SCHEDULED"
          value={scheduledCount}
          description="Renungan terjadwal mendatang"
          badge={scheduledCount > 0 ? "Upcoming" : "Kosong"}
        />

        <MetricBlock
          label="DRAFT"
          value={draftCount}
          description="Naskah perlu peninjauan redaksi"
          badge={draftCount > 0 ? "Needs Review" : "Siap"}
        />

        <MetricBlock
          label="ARCHIVE / TOTAL"
          value={archivedCount || totalPublications}
          description={`${totalPublications} publikasi tersimpan dalam database`}
          badge="Records"
        />
      </div>

      {/* Quick Actions Row */}
      <div className="bg-[#0b101f] border border-[#1a233a] rounded-xl p-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
          Aksi Cepat Redaksi
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/boost/new"
            className="group flex items-center justify-between p-3.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">
                  + Tulis BOOST
                </p>
                <p className="text-[11px] text-slate-400">
                  Renungan Sabda Bina Pemuda
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
          </Link>

          <Link
            href="/content"
            className="group flex items-center justify-between p-3.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  + Tambah Konten
                </p>
                <p className="text-[11px] text-slate-400">
                  Artikel & Podcast Pemuda
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
          </Link>

          <Link
            href="/activities"
            className="group flex items-center justify-between p-3.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                  + Tambah Kegiatan
                </p>
                <p className="text-[11px] text-slate-400">
                  Jadwal Ibadah & Event GP
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
          </Link>
        </div>
      </div>

      {/* BOOST Terbaru Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              BOOST Terbaru
            </h2>
            <p className="text-xs text-slate-400">
              Daftar publikasi dan perenungan terkini yang dikelola redaksi.
            </p>
          </div>
          <Link
            href="/boost"
            className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            <span>Lihat Semua Renungan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-[#0b101f] border border-[#1a233a] rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-500 text-xs animate-pulse">
              Memuat data renungan terbaru...
            </div>
          ) : recentBoosts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#070b14] text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1a233a]">
                  <tr>
                    <th className="px-5 py-3.5">Tanggal</th>
                    <th className="px-5 py-3.5">Judul &amp; Referensi</th>
                    <th className="px-5 py-3.5">Penulis</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a233a]/60">
                  {recentBoosts.map((item) => {
                    const isToday = item.publishDate === todayStr;
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-900/50 transition-colors"
                      >
                        {/* Date */}
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-slate-200">
                              {formatJakartaDate(item.publishDate, {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                            {isToday && (
                              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                                Hari Ini
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Title & Scripture */}
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-white leading-snug">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-blue-400/90 font-medium mt-0.5">
                            {item.scriptureReference}
                          </p>
                        </td>

                        {/* Author */}
                        <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">
                          {item.author || "Tim GP"}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <StatusBadge status={item.status} />
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-3.5 text-right whitespace-nowrap space-x-2">
                          {item.status === "published" && (
                            <a
                              href={`/boost/${item.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                              title="Lihat Pratinjau Publik"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <Link
                            href={`/boost/${item.id}/edit`}
                            className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                            title="Edit Renungan"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8">
              <EmptyState
                title="Belum ada renungan yang dipublikasikan"
                description="Mulai langkah redaksi dengan menulis renungan Sabda Bina Pemuda pertama."
                actionLabel="+ Tulis BOOST Sekarang"
                onAction={() => {
                  window.location.href = "/admin/boost/new";
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
