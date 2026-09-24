import React, { useState, useMemo } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  Calendar,
  MapPin,
  CheckCircle2,
  X,
} from "lucide-react";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { StatusBadge } from "../../components/admin/StatusBadge";
import { EmptyState } from "../../components/admin/EmptyState";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import { ACTIVITIES } from "../../data/mock";
import type { Activity } from "../../types";

export const AdminActivities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(ACTIVITIES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [message, setMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formLocation, setFormLocation] = useState("Gedung Gereja GPIB Jatipon");
  const [formSummary, setFormSummary] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formStatus, setFormStatus] = useState<"upcoming" | "completed">("upcoming");

  // Delete Dialog
  const [deleteTarget, setDeleteTarget] = useState<Activity | null>(null);

  const openCreateModal = () => {
    setEditingActivity(null);
    setFormTitle("");
    setFormDate("2026-09-28T18:00:00Z");
    setFormLocation("Gedung Gereja GPIB Jatipon");
    setFormSummary("");
    setFormDescription("");
    setFormStatus("upcoming");
    setIsModalOpen(true);
  };

  const openEditModal = (activity: Activity) => {
    setEditingActivity(activity);
    setFormTitle(activity.title);
    setFormDate(activity.date);
    setFormLocation(activity.location);
    setFormSummary(activity.summary);
    setFormDescription(activity.description);
    setFormStatus(activity.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formLocation.trim()) return;

    if (editingActivity) {
      setActivities((prev) =>
        prev.map((act) =>
          act.id === editingActivity.id
            ? {
                ...act,
                title: formTitle.trim(),
                date: formDate,
                location: formLocation.trim(),
                summary: formSummary.trim(),
                description: formDescription.trim(),
                status: formStatus,
              }
            : act
        )
      );
      setMessage("Kegiatan berhasil diperbarui.");
    } else {
      const slug = formTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const newAct: Activity = {
        id: String(Date.now()),
        slug,
        title: formTitle.trim(),
        date: formDate || new Date().toISOString(),
        location: formLocation.trim(),
        summary: formSummary.trim(),
        description: formDescription.trim(),
        status: formStatus,
      };
      setActivities((prev) => [newAct, ...prev]);
      setMessage("Kegiatan baru berhasil ditambahkan.");
    }

    setIsModalOpen(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setActivities((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    setMessage(`Kegiatan "${deleteTarget.title}" berhasil dihapus.`);
    setDeleteTarget(null);
    setTimeout(() => setMessage(null), 3000);
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = act.title.toLowerCase().includes(q);
        const matchesLoc = act.location.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc) return false;
      }

      if (statusFilter !== "all" && act.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [activities, search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminPageHeader
        eyebrow="Agenda Pelayanan"
        title="Activities Management"
        description="Kelola jadwal ibadah pemuda gabungan, program aksi sosial, dan agenda persekutuan GP Jatipon."
        actions={
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Kegiatan</span>
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

      {/* Filter and Search Bar */}
      <div className="bg-[#0b101f] border border-[#1a233a] p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1">
          {(["all", "upcoming", "completed"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer ${
                statusFilter === st
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              {st === "all"
                ? "Semua Kegiatan"
                : st === "upcoming"
                ? "Mendatang"
                : "Selesai"}
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
            placeholder="Cari kegiatan atau lokasi..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Activities Table */}
      <div className="bg-[#0b101f] border border-[#1a233a] rounded-xl overflow-hidden shadow-xs">
        {filteredActivities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#070b14] text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1a233a]">
                <tr>
                  <th className="px-5 py-3.5">Tanggal</th>
                  <th className="px-5 py-3.5">Nama Kegiatan</th>
                  <th className="px-5 py-3.5">Lokasi</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a233a]/60">
                {filteredActivities.map((act) => (
                  <tr
                    key={act.id}
                    className="hover:bg-slate-900/50 transition-colors"
                  >
                    {/* Date */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-slate-200 font-mono text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {new Date(act.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Title & Summary */}
                    <td className="px-5 py-4 max-w-sm">
                      <div className="font-semibold text-white text-[13px] line-clamp-1">
                        {act.title}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {act.summary}
                      </p>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{act.location}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <StatusBadge status={act.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right whitespace-nowrap space-x-1.5">
                      <a
                        href={`/kegiatan/${act.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Buka Halaman Publik"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => openEditModal(act)}
                        className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit Kegiatan"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(act)}
                        className="inline-flex p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                        title="Hapus Kegiatan"
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
              title="Belum ada kegiatan yang sesuai"
              description="Jadwalkan ibadah pemuda, aksi sosial, atau retreat GP Jatipon."
              actionLabel="+ Tambah Kegiatan"
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
                {editingActivity ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}
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
                  Nama Kegiatan *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Ibadah Pemuda Gabungan September 2026"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Tanggal Kegiatan *
                  </label>
                  <input
                    type="datetime-local"
                    value={formDate ? formDate.slice(0, 16) : ""}
                    onChange={(e) => setFormDate(new Date(e.target.value).toISOString())}
                    className="w-full px-3 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as "upcoming" | "completed")}
                    className="w-full px-3 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="upcoming">Upcoming (Mendatang)</option>
                    <option value="completed">Completed (Selesai)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Lokasi Pelaksanaan *
                </label>
                <input
                  type="text"
                  required
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="Gedung Gereja GPIB Jatipon"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Ringkasan / Tema
                </label>
                <textarea
                  rows={2}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Ringkasan singkat tema ibadah atau kegiatan..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Deskripsi Lengkap
                </label>
                <textarea
                  rows={4}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detail susunan acara dan penjelasan kegiatan..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 focus:outline-none focus:border-blue-500"
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
                  {editingActivity ? "Perbarui Kegiatan" : "Simpan Kegiatan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Kegiatan"
        message={`Apakah Anda yakin ingin menghapus kegiatan "${deleteTarget?.title}"?`}
        confirmLabel="Hapus Kegiatan"
        cancelLabel="Batal"
        isDestructive={true}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
