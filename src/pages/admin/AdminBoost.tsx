import React, { useEffect, useState, useMemo } from "react";
import { Link } from "wouter";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Flame,
} from "lucide-react";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { StatusBadge } from "../../components/admin/StatusBadge";
import { EmptyState } from "../../components/admin/EmptyState";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import {
  getAllBoostsAdmin,
  updateBoost,
  deleteBoost,
  formatJakartaDate,
  getJakartaDateString,
} from "../../lib/boosts";
import type { Boost, BoostStatus } from "../../types";
import { useAuth } from "../../contexts/AuthContext";

export const AdminBoost: React.FC = () => {
  const { user } = useAuth();

  const [boosts, setBoosts] = useState<Boost[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<BoostStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Notifications
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Confirm delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<Boost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const todayStr = getJakartaDateString();

  const loadBoosts = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const { data, error } = await getAllBoostsAdmin(
        statusFilter === "all" ? undefined : statusFilter
      );
      if (error) {
        setErrorMessage(error.message);
      } else {
        setBoosts(data);
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Gagal memuat renungan."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBoosts();
  }, [statusFilter]);

  // Handle Quick Publish
  const handleQuickPublish = async (boost: Boost) => {
    const isFuture = boost.publishDate > todayStr;
    const newStatus: BoostStatus = isFuture ? "scheduled" : "published";

    const { error } = await updateBoost(
      boost.id,
      { status: newStatus },
      user?.id
    );
    if (error) {
      if (error.message.includes("unique_active_boost_publish_date")) {
        setErrorMessage(
          `Sudah ada renungan aktif untuk tanggal ${boost.publishDate}. Hanya 1 renungan aktif diperbolehkan per tanggal.`
        );
      } else {
        setErrorMessage(error.message);
      }
    } else {
      setSuccessMessage(
        `Renungan berhasil diubah statusnya menjadi ${newStatus}.`
      );
      loadBoosts();
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  // Handle Delete Confirmation
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const { error } = await deleteBoost(deleteTarget.id);
      if (error) {
        setErrorMessage(`Gagal menghapus renungan: ${error.message}`);
      } else {
        setSuccessMessage("Renungan berhasil dihapus dari sistem.");
        setDeleteTarget(null);
        loadBoosts();
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch {
      setErrorMessage("Terjadi kesalahan saat menghapus renungan.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered & Sorted list
  const filteredBoosts = useMemo(() => {
    let result = boosts.filter((b) => {
      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = b.title.toLowerCase().includes(q);
        const matchesScripture = b.scriptureReference.toLowerCase().includes(q);
        const matchesDate = b.publishDate.includes(q);
        const matchesAuthor = (b.author || "").toLowerCase().includes(q);
        if (!matchesTitle && !matchesScripture && !matchesDate && !matchesAuthor) {
          return false;
        }
      }

      // Year filter
      if (yearFilter !== "all") {
        if (!b.publishDate.startsWith(yearFilter)) {
          return false;
        }
      }

      return true;
    });

    // Sort order
    result.sort((a, b) => {
      if (sortOrder === "newest") {
        return b.publishDate.localeCompare(a.publishDate);
      }
      return a.publishDate.localeCompare(b.publishDate);
    });

    return result;
  }, [boosts, search, yearFilter, sortOrder]);

  // Extract available years for filter dropdown
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    boosts.forEach((b) => {
      const y = b.publishDate.split("-")[0];
      if (y) years.add(y);
    });
    // Ensure 2026 is present
    years.add("2026");
    return Array.from(years).sort().reverse();
  }, [boosts]);

  return (
    <div className="space-y-6">
      {/* Editorial Page Header */}
      <AdminPageHeader
        eyebrow="Renungan Harian"
        title="BOOST"
        description="Kelola Sabda Bina Pemuda yang tampil sebagai BOOST harian di beranda GP Jatipon."
        actions={
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>Preview Website</span>
            </a>
            <Link
              href="/boost/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tulis BOOST</span>
            </Link>
          </div>
        }
      />

      {/* Notifications */}
      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-400 hover:text-emerald-200 text-xs"
          >
            ×
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-red-400 hover:text-red-200 text-xs"
          >
            ×
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-[#0b101f] border border-[#1a233a] p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {(["all", "published", "scheduled", "draft", "archived"] as const).map(
            (s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer shrink-0 ${
                  statusFilter === s
                    ? "bg-blue-600 text-white font-semibold shadow-xs"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                {s === "all" ? "Semua Status" : s}
              </button>
            )
          )}
        </div>

        {/* Search, Year & Sort Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search BOOST..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Year Filter */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">Semua Tahun</option>
            {availableYears.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "newest" | "oldest")
            }
            className="px-2.5 py-1.5 text-xs rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
          </select>

          <button
            onClick={loadBoosts}
            disabled={loading}
            className="p-1.5 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Segarkan data"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Editorial Content Table */}
      <div className="bg-[#0b101f] border border-[#1a233a] rounded-xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-slate-500 animate-pulse text-xs">
            Memuat daftar renungan Sabda Bina Pemuda...
          </div>
        ) : filteredBoosts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#070b14] text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1a233a]">
                <tr>
                  <th className="px-5 py-3.5">Tanggal</th>
                  <th className="px-5 py-3.5">BOOST</th>
                  <th className="px-5 py-3.5">Ayat</th>
                  <th className="px-5 py-3.5">Penulis</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a233a]/60">
                {filteredBoosts.map((item) => {
                  const isToday = item.publishDate === todayStr;
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-900/50 transition-colors ${
                        isToday ? "bg-blue-950/15" : ""
                      }`}
                    >
                      {/* Tanggal */}
                      <td className="px-5 py-4 whitespace-nowrap">
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
                              HARI INI
                            </span>
                          )}
                        </div>
                      </td>

                      {/* BOOST Title */}
                      <td className="px-5 py-4 max-w-xs sm:max-w-md">
                        <Link
                          href={`/boost/${item.id}/edit`}
                          className="font-semibold text-white hover:text-blue-400 transition-colors line-clamp-1 text-[13px]"
                        >
                          {item.title}
                        </Link>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {item.reflection.slice(0, 80)}...
                        </p>
                      </td>

                      {/* Ayat Pokok */}
                      <td className="px-5 py-4 whitespace-nowrap font-medium text-blue-400/90 font-mono text-[11px]">
                        {item.scriptureReference}
                      </td>

                      {/* Penulis */}
                      <td className="px-5 py-4 whitespace-nowrap text-slate-400">
                        {item.author || "Tim GP"}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <StatusBadge status={item.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right whitespace-nowrap space-x-1.5">
                        {/* Public Link */}
                        {item.status === "published" && (
                          <a
                            href={`/boost/${item.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="Buka Halaman Publik"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {/* Quick Publish / Schedule if draft */}
                        {item.status === "draft" && (
                          <button
                            type="button"
                            onClick={() => handleQuickPublish(item)}
                            className="text-[11px] px-2 py-1 rounded bg-blue-950/40 text-blue-300 hover:bg-blue-900/60 border border-blue-500/30 font-medium transition-colors cursor-pointer"
                          >
                            {item.publishDate > todayStr
                              ? "Jadwalkan"
                              : "Terbitkan"}
                          </button>
                        )}

                        {/* Edit Button -> Goes to dedicated editor */}
                        <Link
                          href={`/boost/${item.id}/edit`}
                          className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                          title="Buka Editor Naskah"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                          title="Hapus Renungan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
              title={
                statusFilter === "all"
                  ? "Belum ada renungan yang tersimpan"
                  : `Belum ada renungan dengan status "${statusFilter}"`
              }
              description={
                search.trim()
                  ? `Tidak ada hasil untuk kata kunci "${search}". Coba periksa ejaan atau ubah filter.`
                  : "Mulai menulis naskah Sabda Bina Pemuda untuk panduan doa dan perenungan jemaat."
              }
              icon={<Flame className="w-5 h-5 text-blue-400" />}
              actionLabel="+ Tulis BOOST Baru"
              onAction={() => {
                window.location.href = "/admin/boost/new";
              }}
            />
          </div>
        )}
      </div>

      {/* Confirmation Dialog for Delete */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Renungan BOOST"
        message={`Apakah Anda yakin ingin menghapus renungan "${deleteTarget?.title}"? Tindakan ini bersifat permanen dan akan menghapus catatan ini dari database.`}
        confirmLabel="Hapus Permanen"
        cancelLabel="Batal"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
