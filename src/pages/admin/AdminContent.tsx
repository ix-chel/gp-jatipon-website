import React, { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  Flame,
  FileText,
  Headphones,
  CheckCircle2,
  X,
} from "lucide-react";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { StatusBadge } from "../../components/admin/StatusBadge";
import { EmptyState } from "../../components/admin/EmptyState";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import { CONTENTS } from "../../data/mock";
import type { Content, ContentCategory } from "../../types";

export const AdminContent: React.FC = () => {
  const [items, setItems] = useState<Content[]>(CONTENTS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Notification
  const [message, setMessage] = useState<string | null>(null);

  // Modal / Drawer state for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Content | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<ContentCategory>("article");
  const [formAuthor, setFormAuthor] = useState("Tim Publikasi GP");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formMediaUrl, setFormMediaUrl] = useState("");

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<Content | null>(null);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormCategory("article");
    setFormAuthor("Tim Publikasi GP");
    setFormExcerpt("");
    setFormContent("");
    setFormMediaUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: Content) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormAuthor(item.author || "Tim Publikasi GP");
    setFormExcerpt(item.excerpt);
    setFormContent(item.content);
    setFormMediaUrl(item.mediaUrl || "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formExcerpt.trim()) return;

    if (editingItem) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === editingItem.id
            ? {
                ...i,
                title: formTitle.trim(),
                category: formCategory,
                author: formAuthor.trim(),
                excerpt: formExcerpt.trim(),
                content: formContent.trim(),
                mediaUrl: formMediaUrl.trim() || undefined,
              }
            : i
        )
      );
      setMessage("Konten berhasil diperbarui.");
    } else {
      const slug = formTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const newItem: Content = {
        id: String(Date.now()),
        slug,
        title: formTitle.trim(),
        category: formCategory,
        publishedAt: new Date().toISOString(),
        author: formAuthor.trim(),
        excerpt: formExcerpt.trim(),
        content: formContent.trim(),
        mediaUrl: formMediaUrl.trim() || undefined,
      };
      setItems((prev) => [newItem, ...prev]);
      setMessage("Konten baru berhasil ditambahkan.");
    }

    setIsModalOpen(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setMessage(`Konten "${deleteTarget.title}" berhasil dihapus.`);
    setDeleteTarget(null);
    setTimeout(() => setMessage(null), 3000);
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesExcerpt = item.excerpt.toLowerCase().includes(q);
        if (!matchesTitle && !matchesExcerpt) return false;
      }

      if (categoryFilter !== "all" && item.category !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [items, search, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminPageHeader
        eyebrow="Publikasi Digital"
        title="Content Management"
        description="Kelola artikel opini, podcast, dan publikasi media GP Jatipon."
        actions={
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Konten</span>
          </button>
        }
      />

      {/* Editorial Notice for BOOST distinction */}
      <div className="bg-[#0b101f] border border-blue-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white">
              Ruang Redaksi Khusus BOOST (Renungan Harian)
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Renungan Sabda Bina Pemuda memiliki sistem terdedikasi dengan jadwal kalender liturgi.
            </p>
          </div>
        </div>
        <Link
          href="/boost"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-semibold transition-colors shrink-0"
        >
          <span>Buka Panel BOOST</span>
          <span className="font-mono">→</span>
        </Link>
      </div>

      {/* Notification */}
      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-[#0b101f] border border-[#1a233a] p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Category Tabs */}
          {(["all", "article", "podcast"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              {cat === "all" ? "Semua Kategori" : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari konten..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-[#0b101f] border border-[#1a233a] rounded-xl overflow-hidden shadow-xs">
        {filteredItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#070b14] text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1a233a]">
                <tr>
                  <th className="px-5 py-3.5">Judul</th>
                  <th className="px-5 py-3.5">Kategori</th>
                  <th className="px-5 py-3.5">Penulis</th>
                  <th className="px-5 py-3.5">Terbit</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a233a]/60">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="px-5 py-4 max-w-sm">
                      <div className="font-semibold text-white text-[13px] line-clamp-1">
                        {item.title}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {item.excerpt}
                      </p>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {item.category === "podcast" ? (
                          <Headphones className="w-3 h-3 text-purple-400" />
                        ) : (
                          <FileText className="w-3 h-3 text-blue-400" />
                        )}
                        <span className="capitalize">{item.category}</span>
                      </span>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-slate-400">
                      {item.author || "Tim GP"}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap font-mono text-[11px] text-slate-400">
                      {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <StatusBadge status="published" />
                    </td>

                    <td className="px-5 py-4 text-right whitespace-nowrap space-x-1.5">
                      <a
                        href={`/konten/baca/${item.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Buka Halaman Publik"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit Konten"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                        title="Hapus Konten"
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
              title="Tidak ada konten yang sesuai"
              description="Tambahkan artikel atau podcast baru untuk memperkaya ruang bertumbuh pemuda."
              actionLabel="+ Tambah Konten Baru"
              onAction={openCreateModal}
            />
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#0c1222] border border-[#1a2540] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-8 text-slate-100">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#1a2540] flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                {editingItem ? "Edit Konten" : "Tambah Konten Baru"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Judul Konten *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Pemuda dan Kesehatan Mental"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ContentCategory)}
                    className="w-full px-3 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="article">Artikel & Opini</option>
                    <option value="podcast">Podcast Audio</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Penulis / Host
                  </label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="Tim Pelayanan GP"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Ringkasan / Excerpt *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="Ringkasan singkat artikel atau episode podcast..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Isi Konten Lengkap
                </label>
                <textarea
                  rows={6}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Teks artikel lengkap..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 focus:outline-none focus:border-blue-500 leading-relaxed font-sans"
                />
              </div>

              {formCategory === "podcast" && (
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Media / Spotify Embed URL
                  </label>
                  <input
                    type="text"
                    value={formMediaUrl}
                    onChange={(e) => setFormMediaUrl(e.target.value)}
                    placeholder="https://open.spotify.com/embed/..."
                    className="w-full px-3.5 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* Actions */}
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
                  {editingItem ? "Perbarui Konten" : "Simpan Konten"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Konten"
        message={`Apakah Anda yakin ingin menghapus konten "${deleteTarget?.title}"?`}
        confirmLabel="Hapus Konten"
        cancelLabel="Batal"
        isDestructive={true}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
