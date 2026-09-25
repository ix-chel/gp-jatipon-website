import React, { useEffect, useState } from "react";
import { Link, useRoute, useLocation } from "wouter";
import {
  ArrowLeft,
  Eye,
  Edit3,
  Save,
  Send,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import {
  createBoost,
  updateBoost,
  deleteBoost,
  getAllBoostsAdmin,
  formatJakartaDate,
  getJakartaDateString,
} from "../../lib/data/boosts";
import type { BoostStatus } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import { StatusBadge } from "../../components/admin/StatusBadge";

export const BoostEditor: React.FC = () => {
  const [, editParams] = useRoute<{ id: string }>("/boost/:id/edit");
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const boostId = editParams ? editParams.id : undefined;
  const isEditing = Boolean(boostId);

  // View Mode: 'edit' or 'preview'
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  // Form Fields
  const [title, setTitle] = useState("");
  const [scriptureReference, setScriptureReference] = useState("");
  const [scriptureText, setScriptureText] = useState("");
  const [reflection, setReflection] = useState("");
  const [prayer, setPrayer] = useState("");
  const [author, setAuthor] = useState("Tim Pelayanan GP Jatipon");
  const [publishDate, setPublishDate] = useState(getJakartaDateString());
  const [status, setStatus] = useState<BoostStatus>("draft");
  const [coverImage, setCoverImage] = useState("");

  // States
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const todayStr = getJakartaDateString();

  // Load existing boost if editing
  useEffect(() => {
    if (!boostId) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    getAllBoostsAdmin().then(({ data, error }) => {
      if (!isMounted) return;
      if (error) {
        setErrorMessage("Gagal memuat renungan: " + error.message);
      } else {
        const found = data.find((b) => b.id === boostId);
        if (found) {
          setTitle(found.title);
          setScriptureReference(found.scriptureReference);
          setScriptureText(found.scriptureText);
          setReflection(found.reflection);
          setPrayer(found.prayer || "");
          setAuthor(found.author || "Tim Pelayanan GP Jatipon");
          setPublishDate(found.publishDate);
          setStatus(found.status);
          setCoverImage(found.coverImage || "");
        } else {
          setErrorMessage("Renungan tidak ditemukan dalam database.");
        }
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [boostId]);

  // Form submission handler
  const handleSave = async (overrideStatus?: BoostStatus) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const targetStatus = overrideStatus || status;

    if (
      !title.trim() ||
      !scriptureReference.trim() ||
      !scriptureText.trim() ||
      !reflection.trim() ||
      !publishDate
    ) {
      setErrorMessage("Mohon lengkapi seluruh field wajib: Judul, Firman, Ayat, Refleksi, dan Tanggal Terbit.");
      return;
    }

    setSaving(true);
    try {
      if (isEditing && boostId) {
        const { error } = await updateBoost(
          boostId,
          {
            title: title.trim(),
            scriptureReference: scriptureReference.trim(),
            scriptureText: scriptureText.trim(),
            reflection: reflection.trim(),
            prayer: prayer.trim() || undefined,
            author: author.trim() || undefined,
            publishDate,
            status: targetStatus,
            coverImage: coverImage.trim() || undefined,
          },
          user?.id
        );

        if (error) {
          if (error.message.includes("unique_active_boost_publish_date")) {
            setErrorMessage(
              `Sudah ada renungan aktif (published/scheduled) untuk tanggal ${publishDate}. Hanya 1 renungan aktif diperbolehkan per tanggal.`
            );
          } else {
            setErrorMessage(error.message);
          }
          setSaving(false);
          return;
        }

        setStatus(targetStatus);
        setSuccessMessage("Perubahan renungan berhasil disimpan.");
        setTimeout(() => setSuccessMessage(null), 3500);
      } else {
        const { data, error } = await createBoost(
          {
            title: title.trim(),
            scriptureReference: scriptureReference.trim(),
            scriptureText: scriptureText.trim(),
            reflection: reflection.trim(),
            prayer: prayer.trim() || undefined,
            author: author.trim() || undefined,
            publishDate,
            status: targetStatus,
            coverImage: coverImage.trim() || undefined,
          },
          user?.id
        );

        if (error) {
          if (error.message.includes("unique_active_boost_publish_date")) {
            setErrorMessage(
              `Sudah ada renungan aktif (published/scheduled) untuk tanggal ${publishDate}. Hanya 1 renungan aktif diperbolehkan per tanggal.`
            );
          } else {
            setErrorMessage(error.message);
          }
          setSaving(false);
          return;
        }

        setSuccessMessage("Renungan baru berhasil diterbitkan!");
        setTimeout(() => {
          if (data?.id) {
            setLocation(`/boost/${data.id}/edit`);
          } else {
            setLocation("/boost");
          }
        }, 1200);
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!boostId) return;
    setIsDeleting(true);
    try {
      const { error } = await deleteBoost(boostId);
      if (error) {
        setErrorMessage("Gagal menghapus renungan: " + error.message);
      } else {
        setLocation("/boost");
      }
    } catch {
      setErrorMessage("Terjadi kesalahan saat menghapus renungan.");
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-500 animate-pulse text-xs">
        Memuat naskah renungan...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Top Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1a233a]">
        <div className="flex items-center gap-3">
          <Link
            href="/boost"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Daftar BOOST</span>
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <h1 className="text-base font-bold text-white tracking-tight">
            {isEditing ? "Edit Naskah BOOST" : "Tulis BOOST Baru"}
          </h1>
          <StatusBadge status={status} size="sm" />
        </div>

        {/* Tab switch & Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Edit / Preview Toggle */}
          <div className="flex items-center bg-[#070b14] border border-[#1e2c4d] rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "edit"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>EDIT</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>PREVIEW</span>
            </button>
          </div>

          {/* Save Draft */}
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("draft")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5 text-slate-400" />
            <span>Simpan Draf</span>
          </button>

          {/* Publish / Schedule Primary CTA */}
          <button
            type="button"
            disabled={saving}
            onClick={() => {
              const target = publishDate > todayStr ? "scheduled" : "published";
              handleSave(target);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>
              {saving
                ? "Menyimpan..."
                : publishDate > todayStr
                ? "Jadwalkan"
                : "Terbitkan"}
            </span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* MAIN VIEW: EDIT OR PREVIEW */}
      {activeTab === "edit" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: MAIN EDITORIAL CONTENT (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title Field (Editorial Heading) */}
            <div className="bg-[#0b101f] border border-[#1a233a] rounded-xl p-5">
              <label
                htmlFor="boost-title"
                className="block text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-2 font-mono"
              >
                JUDUL RENUNGAN *
              </label>
              <input
                id="boost-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Tetap Berakar dalam Kasih"
                className="w-full bg-transparent border-0 border-b border-[#1e2c4d] pb-2 text-xl sm:text-2xl font-bold text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-sans transition-colors"
              />
            </div>

            {/* Firman & Ayat Section */}
            <div className="bg-[#0b101f] border border-[#1a233a] rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#1a233a] pb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-mono">
                  FIRMAN &amp; REFERENSI ALKITAB
                </span>
              </div>

              {/* Referensi Ayat */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Referensi Ayat Pokok *
                </label>
                <input
                  type="text"
                  required
                  value={scriptureReference}
                  onChange={(e) => setScriptureReference(e.target.value)}
                  placeholder="Contoh: Kolose 2:6–7 atau Mazmur 23:1–6"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 text-sm font-mono transition-colors"
                />
              </div>

              {/* Teks Firman */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Teks Firman Lengkap *
                </label>
                <textarea
                  required
                  rows={4}
                  value={scriptureText}
                  onChange={(e) => setScriptureText(e.target.value)}
                  placeholder="Tuliskan nats ayat Alkitab lengkap..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 text-sm leading-relaxed transition-colors font-serif italic"
                />
              </div>
            </div>

            {/* Refleksi Section (Largest Input Area) */}
            <div className="bg-[#0b101f] border border-[#1a233a] rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#1a233a] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-mono">
                    REFLEKSI / ISI PERENUNGAN *
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  {reflection.split(/\s+/).filter(Boolean).length} kata
                </span>
              </div>

              <p className="text-xs text-slate-400">
                Uraian perenungan firman untuk pemuda. Tulis secara bertutur dan reflektif dengan jarak paragraf yang nyaman.
              </p>

              <textarea
                required
                rows={12}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Mulai menulis refleksi firman... Bagikan pesan spiritual yang menguatkan langkah pemuda dalam keseharian mereka."
                className="w-full px-4 py-3 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 text-[15px] sm:text-base leading-relaxed transition-colors resize-y min-h-[280px]"
              />
            </div>

            {/* Doa Hari Ini Section */}
            <div className="bg-[#0b101f] border border-[#1a233a] rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 border-b border-[#1a233a] pb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-mono">
                  DOA HARI INI (OPSIONAL)
                </span>
              </div>

              <textarea
                rows={3}
                value={prayer}
                onChange={(e) => setPrayer(e.target.value)}
                placeholder="Doa singkat penutup renungan... Contoh: Tuhan Yesus, ajarlah kami untuk tetap berakar di dalam kasih-Mu..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 text-sm leading-relaxed transition-colors"
              />
            </div>

            {/* Cover Image URL */}
            <div className="bg-[#0b101f] border border-[#1a233a] rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 border-b border-[#1a233a] pb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-mono">
                  MEDIA &amp; GAMBAR SAMPUL (OPSIONAL)
                </span>
              </div>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="/images/hero/... atau https://..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 text-xs font-mono transition-colors"
              />
              <p className="text-[11px] text-slate-500">
                Biarkan kosong untuk menggunakan latar default editorial GP Jatipon.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: PUBLICATION CONTROLS (4 cols) */}
          <div className="lg:col-span-4 space-y-5 sticky top-20">
            {/* Publication Settings Card */}
            <div className="bg-[#0b101f] border border-[#1a233a] rounded-xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#1a233a] pb-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Status Publikasi
                </div>
                <StatusBadge status={status} />
              </div>

              {/* Status Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Pilih Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as BoostStatus)}
                  className="w-full px-3 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="draft">Draft (Disimpan sebagai draf)</option>
                  <option value="scheduled">Scheduled (Terjadwal terbit)</option>
                  <option value="published">Published (Terbit untuk umum)</option>
                  <option value="archived">Archived (Arsip)</option>
                </select>
              </div>

              {/* Publish Date */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Tanggal Terbit (WIB) *
                  </label>
                  <button
                    type="button"
                    onClick={() => setPublishDate(todayStr)}
                    className="text-[10px] text-blue-400 hover:underline cursor-pointer"
                  >
                    Set Hari Ini
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  {formatJakartaDate(publishDate, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Author */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Penulis / Redaksi
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Tim Pelayanan GP Jatipon"
                  className="w-full px-3 py-2 rounded-lg bg-[#070b14] border border-[#1e2c4d] text-slate-100 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Publishing Actions */}
              <div className="pt-3 border-t border-[#1a233a] space-y-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    const target =
                      publishDate > todayStr ? "scheduled" : "published";
                    handleSave(target);
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {saving
                    ? "Menyimpan Data..."
                    : publishDate > todayStr
                    ? "Jadwalkan Publikasi"
                    : "Terbitkan Sekarang"}
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSave("draft")}
                  className="w-full py-2 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Simpan sebagai Draf
                </button>
              </div>
            </div>

            {/* Editorial Rule Note */}
            <div className="bg-[#0b101f] border border-[#1a233a] rounded-xl p-4 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Pedoman Redaksi</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Hanya 1 renungan yang dapat aktif (Published/Scheduled) per tanggal sesuai integritas kalender liturgi Sabda Bina Pemuda.
              </p>
            </div>

            {/* Delete button (only if editing existing) */}
            {isEditing && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteOpen(true)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 border border-rose-900/40 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Renungan Ini</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* LIVE PREVIEW VIEW (Resembles actual public BOOST page) */
        <div className="bg-[#0b101f] border border-[#1a233a] rounded-2xl p-6 sm:p-10 shadow-lg">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Header info */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest">
                BOOST · SABDA BINA PEMUDA
              </div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-mono">
                {formatJakartaDate(publishDate, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight pt-2">
                {title || "Judul Renungan Akan Tampil di Sini"}
              </h2>
            </div>

            {/* Scripture Quotation Card */}
            <div className="bg-slate-900/80 border-l-4 border-blue-500 p-5 rounded-r-xl space-y-2">
              <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                {scriptureReference || "Referensi Ayat"}
              </div>
              <blockquote className="text-sm sm:text-base font-serif italic text-slate-200 leading-relaxed">
                "{scriptureText || "Teks firman yang dimasukkan akan tampil di dalam blok kutipan Alkitab ini..."}"
              </blockquote>
            </div>

            {/* Reflection Body */}
            <div className="space-y-4 text-slate-200 leading-relaxed text-base">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 font-mono border-b border-slate-800 pb-2">
                REFLEKSI
              </h3>
              {reflection ? (
                reflection.split("\n\n").map((para, i) => (
                  <p key={i} className="leading-relaxed text-[15px]">
                    {para}
                  </p>
                ))
              ) : (
                <p className="text-slate-500 italic text-sm">
                  Uraian refleksi dan pesan firman akan tampil di bagian ini...
                </p>
              )}
            </div>

            {/* Prayer Card */}
            {prayer && (
              <div className="p-5 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                  DOA HARI INI
                </div>
                <p className="text-sm text-slate-200 italic leading-relaxed">
                  "{prayer}"
                </p>
              </div>
            )}

            {/* Author Footer */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Penulis: {author || "Tim Pelayanan GP Jatipon"}</span>
              <span className="font-mono text-slate-500">Pratinjau Redaksi</span>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Hapus Renungan"
        message={`Apakah Anda yakin ingin menghapus renungan "${title}"? Data yang dihapus tidak dapat dipulihkan.`}
        confirmLabel="Hapus Renungan"
        cancelLabel="Batal"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setIsDeleteOpen(false)}
      />
    </div>
  );
};
