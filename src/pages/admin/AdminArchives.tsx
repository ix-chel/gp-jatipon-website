import React, { useState, useMemo } from "react";
import {
  Archive,
  Plus,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  Images,
  FolderArchive,
  CheckCircle2,
  X,
} from "lucide-react";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { MetricBlock } from "../../components/admin/MetricBlock";
import { EmptyState } from "../../components/admin/EmptyState";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import { ARCHIVES } from "../../data/mock";
import type { ArchiveEntry, ArchiveCategory } from "../../types";

export const AdminArchives: React.FC = () => {
  const [archives, setArchives] = useState<ArchiveEntry[]>(ARCHIVES);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [message, setMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArchive, setEditingArchive] = useState<ArchiveEntry | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formYear, setFormYear] = useState(2026);
  const [formPeriod, setFormPeriod] = useState("2026");
  const [formCategory, setFormCategory] = useState<ArchiveCategory>("kegiatan");
  const [formDescription, setFormDescription] = useState("");
  const [formDateDisplay, setFormDateDisplay] = useState("September 2026");
  const [formCoverImage, setFormCoverImage] = useState("");

  // Delete Dialog
  const [deleteTarget, setDeleteTarget] = useState<ArchiveEntry | null>(null);

  const openCreateModal = () => {
    setEditingArchive(null);
    setFormTitle("");
    setFormYear(2026);
    setFormPeriod("2026");
    setFormCategory("kegiatan");
    setFormDescription("");
    setFormDateDisplay("September 2026");
    setFormCoverImage("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: ArchiveEntry) => {
    setEditingArchive(item);
    setFormTitle(item.title);
    setFormYear(item.year);
    setFormPeriod(item.periodLabel || String(item.year));
    setFormCategory(item.category);
    setFormDescription(item.description);
    setFormDateDisplay(item.dateDisplay);
    setFormCoverImage(item.coverImage || "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingArchive) {
      setArchives((prev) =>
        prev.map((a) =>
          a.id === editingArchive.id
            ? {
                ...a,
                title: formTitle.trim(),
                year: Number(formYear),
                periodLabel: formPeriod.trim() || undefined,
                category: formCategory,
                description: formDescription.trim(),
                dateDisplay: formDateDisplay.trim(),
                coverImage: formCoverImage.trim() || undefined,
              }
            : a
        )
      );
      setMessage("Entri arsip berhasil diperbarui.");
    } else {
      const slug = formTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const newEntry: ArchiveEntry = {
        id: String(Date.now()),
        slug,
        title: formTitle.trim(),
        year: Number(formYear),
        periodLabel: formPeriod.trim() || undefined,
        category: formCategory,
        dateDisplay: formDateDisplay.trim(),
        description: formDescription.trim(),
        coverImage: formCoverImage.trim() || undefined,
        galleryImages: [],
      };
      setArchives((prev) => [newEntry, ...prev]);
      setMessage("Entri arsip baru berhasil didaftarkan.");
    }

    setIsModalOpen(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setArchives((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    setMessage(`Entri arsip "${deleteTarget.title}" berhasil dihapus.`);
    setDeleteTarget(null);
    setTimeout(() => setMessage(null), 3000);
  };

  // Metrics
  const totalEntries = archives.length;
  const totalGalleries = archives.reduce(
    (sum, a) => sum + (a.galleryImages?.length || (a.coverImage ? 1 : 0)),
    0
  );
  const yearsList = useMemo(() => {
    const set = new Set<string>();
    archives.forEach((a) => set.add(String(a.year)));
    set.add("2026");
    return Array.from(set).sort().reverse();
  }, [archives]);

  const filteredArchives = useMemo(() => {
    return archives.filter((a) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = a.title.toLowerCase().includes(q);
        const matchesDesc = a.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc) return false;
      }

      if (categoryFilter !== "all" && a.category !== categoryFilter) {
        return false;
      }

      if (yearFilter !== "all" && String(a.year) !== yearFilter) {
        return false;
      }

      return true;
    });
  }, [archives, search, categoryFilter, yearFilter]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <AdminPageHeader
        eyebrow="Pillar Digital Heritage"
        title="Archive Management"
        description="Pusat inventarisasi rekaman pelayanan, dokumentasi historis, dan arsip digital GP Jatipon."
        actions={
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Entri Arsip</span>
          </button>
        }
      />

      {/* Notification */}
      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Heritage Pillar Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricBlock
          label="TOTAL DOKUMENTASI ARSIP"
          value={totalEntries}
          description="Entri pelayanan tersimpan dan terdokumentasi"
          badge="Katalog"
          highlight={true}
        />
        <MetricBlock
          label="MEDIA & FOTO HISTORIS"
          value={totalGalleries}
          description="Foto dan aset visual dokumentasi pelayanan"
          badge="Galeri"
        />
        <MetricBlock
          label="RENTANG PELAYANAN"
          value={`${yearsList[yearsList.length - 1] || "2024"}–2026`}
          description="Periode jejak langkah kepengurusan GP Jatipon"
          badge="Masa Bakti"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0b101f] border border-[#1a233a] p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {(["all", "kegiatan", "dokumentasi", "cerita"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer shrink-0 ${
                categoryFilter === cat
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              {cat === "all" ? "Semua Arsip" : cat}
            </button>
          ))}
        </div>

        {/* Search & Year */}
        <div className="flex items-center gap-2.5">
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">Semua Tahun</option>
            {yearsList.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari arsip..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Archive Table */}
      <div className="bg-[#0b101f] border border-[#1a233a] rounded-xl overflow-hidden shadow-xs">
        {filteredArchives.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#070b14] text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1a233a]">
                <tr>
                  <th className="px-5 py-3.5">Periode / Tahun</th>
                  <th className="px-5 py-3.5">Judul Entri Arsip</th>
                  <th className="px-5 py-3.5">Kategori</th>
                  <th className="px-5 py-3.5">Dokumentasi</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a233a]/60">
                {filteredArchives.map((a) => (
                  <tr
                    key={a.id}
                    className="hover:bg-slate-900/50 transition-colors"
                  >
                    {/* Period */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-mono text-slate-200 text-xs font-semibold">
                        {a.periodLabel || a.year}
                      </span>
                      <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                        {a.dateDisplay}
                      </p>
                    </td>

                    {/* Title & Description */}
                    <td className="px-5 py-4 max-w-sm sm:max-w-md">
                      <div className="font-semibold text-white text-[13px] line-clamp-1">
                        {a.title}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {a.description}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                        <FolderArchive className="w-3 h-3 text-slate-400" />
                        <span>{a.category}</span>
                      </span>
                    </td>

                    {/* Media count */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                        <Images className="w-3.5 h-3.5 text-slate-500" />
                        <span>
                          {(a.galleryImages?.length || 0) + (a.coverImage ? 1 : 0)} Foto
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right whitespace-nowrap space-x-1.5">
                      <a
                        href={`/arsip/${a.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Buka Arsip Publik"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => openEditModal(a)}
                        className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit Arsip"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(a)}
                        className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                        title="Hapus Entri Arsip"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8">
            <EmptyState
              title="Tidak ada entri arsip yang sesuai"
              description="Daftarkan dokumentasi historis, laporan persekutuan, atau catatan pelayanan jemaat."
              icon={<Archive className="w-5 h-5 text-blue-400" />}
              actionLabel="+ Tambah Entri Arsip"
              onAction={openCreateModal}
            />
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#0c1222] border border-[#1a2540] rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-8 text-slate-100">
            <div className="px-6 py-4 border-b border-[#1a2540] flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                {editingArchive ? "Edit Entri Arsip" : "Tambah Entri Arsip Baru"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Judul Arsip *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Ibadah Pemuda Gabungan"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Tahun *
                  </label>
                  <input
                    type="number"
                    required
                    value={formYear}
                    onChange={(e) => setFormYear(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Label Periode
                  </label>
                  <input
                    type="text"
                    value={formPeriod}
                    onChange={(e) => setFormPeriod(e.target.value)}
                    placeholder="2026 atau 2024–2026"
                    className="w-full px-3 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ArchiveCategory)}
                    className="w-full px-3 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="kegiatan">Kegiatan</option>
                    <option value="dokumentasi">Dokumentasi</option>
                    <option value="cerita">Cerita</option>
                    <option value="boost">Renungan BOOST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Teks Tanggal Tampilan
                </label>
                <input
                  type="text"
                  value={formDateDisplay}
                  onChange={(e) => setFormDateDisplay(e.target.value)}
                  placeholder="Contoh: September 2026"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Deskripsi Arsip
                </label>
                <textarea
                  rows={4}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Catatan historis mengenai kegiatan atau dokumentasi ini..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Gambar Sampul (URL)
                </label>
                <input
                  type="text"
                  value={formCoverImage}
                  onChange={(e) => setFormCoverImage(e.target.value)}
                  placeholder="/images/archives/... atau https://..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-[#1a2540] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors shadow-sm"
                >
                  {editingArchive ? "Perbarui Arsip" : "Simpan Entri Arsip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Entri Arsip"
        message={`Apakah Anda yakin ingin menghapus arsip "${deleteTarget?.title}"?`}
        confirmLabel="Hapus Arsip"
        cancelLabel="Batal"
        isDestructive={true}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
