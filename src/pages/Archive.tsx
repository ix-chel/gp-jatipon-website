import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { ArrowUpRight, FolderHeart, BookOpen, Search, Sparkles } from "lucide-react";
import { ARCHIVES } from "../data/mock";
import { cn } from "../utils/cn";
import type { ArchiveCategory, Boost } from "../types";
import { getBoostArchive, formatJakartaDate } from "../lib/data/boosts";

export function Archive() {
  // Chronological layer: "Perjalanan GP" (Years / Periods)
  const periods = [2026, 2025];
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  // Read initial category from URL query param if present
  const initialCategory = useMemo<ArchiveCategory | "all">(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fmt = params.get("format") || params.get("category");
      if (fmt === "boost") return "boost";
      if (fmt === "kegiatan" || fmt === "dokumentasi" || fmt === "cerita") return fmt;
    } catch {
      // Fallback
    }
    return "all";
  }, []);

  // Content type categories (separate from the chronological layer)
  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory | "all">(initialCategory);
  const [boosts, setBoosts] = useState<Boost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingBoosts, setLoadingBoosts] = useState(false);

  const categories: { key: ArchiveCategory | "all"; label: string }[] = [
    { key: "all", label: "Semua Format" },
    { key: "boost", label: "BOOST (Renungan Harian)" },
    { key: "kegiatan", label: "Kegiatan" },
    { key: "dokumentasi", label: "Dokumentasi Foto & Video" },
    { key: "cerita", label: "Cerita & Refleksi" },
  ];

  // Fetch real BOOST archive from Supabase
  useEffect(() => {
    let isMounted = true;
    getBoostArchive({
      year: selectedYear === "all" ? undefined : selectedYear,
      search: searchQuery || undefined,
    })
      .then(({ data }) => {
        if (!isMounted) return;
        setBoosts(data);
      })
      .finally(() => {
        if (isMounted) setLoadingBoosts(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedYear, searchQuery]);

  // Filter archives based on chronological year and content category
  const filteredArchives = useMemo(() => {
    return ARCHIVES.filter((item) => {
      const matchYear = selectedYear === "all" || item.year === selectedYear;
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchYear && matchCategory;
    });
  }, [selectedYear, selectedCategory]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-ink-950">
      {/* =========================================================================
          EDITORIAL PAGE HEADER
          Canvas: Ice Background + Subtle Terracotta Eyebrow + Manrope Display Typography
          ========================================================================= */}
      <section className="border-b border-border pt-12 sm:pt-16 pb-12 sm:pb-16 bg-white shadow-subtle">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-accent">
                ARSIP &middot; JEJAK PERJALANAN
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-ink-950">
              Memori persekutuan, karya, dan{" "}
              <span className="italic font-normal text-primary block sm:inline">
                perjalanan kita.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-ink-700 leading-relaxed max-w-2xl pt-2">
              Ruang dokumentasi digital yang merawat jejak langkah, perjumpaan pemuda, dan rekaman pelayanan Gerakan Pemuda GPIB Jatipon dari masa ke masa.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTROLS: CHRONOLOGICAL LAYER (Perjalanan GP) + CONTENT CATEGORIES
          Separates chronological timeline from content formats per architectural model.
          ========================================================================= */}
      <section className="border-b border-border bg-[#E4F2F6]/95 backdrop-blur-md sticky top-16 sm:top-20 z-30 shadow-subtle">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* 1. CHRONOLOGICAL LAYER: Perjalanan GP (Timeline Selector) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-500 shrink-0 mr-1">
                Perjalanan GP:
              </span>
              <button
                onClick={() => setSelectedYear("all")}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer",
                  selectedYear === "all"
                    ? "bg-primary text-white shadow-subtle"
                    : "bg-white/80 text-ink-700 hover:text-primary hover:bg-white border border-border"
                )}
              >
                Semua Masa
              </button>
              {periods.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 flex items-center gap-1.5 cursor-pointer",
                    selectedYear === year
                      ? "bg-primary text-white shadow-subtle"
                      : "bg-white/80 text-ink-700 hover:text-primary hover:bg-white border border-border"
                  )}
                >
                  <span>Tahun {year}</span>
                </button>
              ))}
            </div>

            {/* 2. CATEGORY FORMAT FILTER: Kegiatan, Dokumentasi, Cerita */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer",
                    selectedCategory === cat.key
                      ? "bg-primary/10 text-primary font-bold border-b-2 border-primary"
                      : "text-ink-500 hover:text-ink-950"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>

          {/* BOOST Search Bar when BOOST tab or All tab is active */}
          {(selectedCategory === "boost" || selectedCategory === "all") && (
            <div className="pt-2 flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari renungan berdasarkan ayat, tema, atau judul..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-border focus:outline-none focus:ring-2 focus:ring-primary text-ink-950 placeholder:text-ink-400"
                />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-ink-500 hover:text-ink-950 underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          ARCHIVE ITEMS: EDITORIAL CHRONOLOGICAL PRESENTATION
          ========================================================================= */}
      <main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        {/* Case 1: Viewing Dedicated BOOST Category */}
        {selectedCategory === "boost" ? (
          <div>
            {loadingBoosts ? (
              <div className="space-y-6 animate-pulse">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="p-6 rounded-[18px] border border-border bg-surface h-48" />
                ))}
              </div>
            ) : boosts.length > 0 ? (
              <div className="space-y-8 sm:space-y-10">
                {boosts.map((b) => (
                  <article
                    key={b.id}
                    className="group p-6 sm:p-8 rounded-[18px] border border-border bg-surface hover:border-secondary hover:shadow-card transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left Column (4 cols): Scripture Quote Tile */}
                      <div className="lg:col-span-4">
                        <div className="relative aspect-[16/11] rounded-xl overflow-hidden border border-border bg-white p-5 flex flex-col justify-between">
                          {/* GP Corner Marker */}
                          <div className="absolute top-0 right-0 w-7 h-7 pointer-events-none">
                            <svg viewBox="0 0 28 28" fill="none" className="w-full h-full text-accent">
                              <path d="M0 0H28V28" stroke="currentColor" strokeWidth="2.5" />
                            </svg>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-sans text-[10px] uppercase tracking-wider text-accent font-bold">
                              Renungan Harian
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-ink-500">
                              {b.publishDate.slice(0, 4)}
                            </span>
                          </div>

                          <div className="py-2">
                            <span className="font-serif text-sm italic text-ink-800 line-clamp-3 leading-relaxed">
                              &ldquo;{b.scriptureText}&rdquo;
                            </span>
                          </div>

                          <div className="text-[11px] font-bold text-primary flex items-center justify-between">
                            <span>{b.scriptureReference}</span>
                            <span className="text-[10px] font-mono text-ink-400 font-normal">BOOST</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column (8 cols): Title & Editorial Info */}
                      <div className="lg:col-span-8 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/25 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>BOOST</span>
                          </span>
                          <span className="text-sm font-sans font-semibold text-ink-600">
                            {formatJakartaDate(b.publishDate, {
                              weekday: "short",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          <span className="text-border">&middot;</span>
                          <span className="text-xs text-ink-500 font-medium">
                            {b.author || "Tim Pelayanan GP"}
                          </span>
                        </div>

                        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink-950 group-hover:text-primary transition-colors">
                          <Link href={`/boost/${b.slug}`}>
                            <span className="cursor-pointer">{b.title}</span>
                          </Link>
                        </h2>

                        <p className="text-sm sm:text-base text-ink-700 leading-relaxed line-clamp-2">
                          {b.reflection}
                        </p>

                        <div className="pt-3 flex items-center gap-4">
                          <Link href={`/boost/${b.slug}`}>
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer">
                              <span>Baca Renungan Penuh</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center border border-dashed border-border rounded-2xl bg-surface p-8 max-w-xl mx-auto space-y-3">
                <BookOpen className="h-12 w-12 text-secondary mx-auto" />
                <h3 className="font-display text-xl font-bold text-ink-950">
                  Belum ada renungan yang cocok
                </h3>
                <p className="text-xs text-ink-500">
                  {searchQuery ? `Tidak ada renungan dengan kata kunci "${searchQuery}".` : "Belum ada renungan untuk periode tahun ini."}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Case 2: Standard Archive Items (+ BOOST cards when "Semua Format") */
          <div>
            {filteredArchives.length > 0 || (selectedCategory === "all" && boosts.length > 0) ? (
              <div className="space-y-8 sm:space-y-10">
                {/* When "Semua Format", show recent BOOST entries at the top if relevant */}
                {selectedCategory === "all" && boosts.length > 0 && (
                  <div className="space-y-6 mb-10 pb-8 border-b border-border/80">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-accent">
                          RENUNGAN BOOST TERBARU
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedCategory("boost")}
                        className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                      >
                        Lihat semua renungan ({boosts.length}) &rarr;
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {boosts.slice(0, 2).map((b) => (
                        <article
                          key={b.id}
                          className="group p-5 rounded-[18px] border border-border bg-surface hover:border-secondary hover:shadow-card transition-all duration-300 flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-bold uppercase tracking-wider text-[10px]">
                                BOOST
                              </span>
                              <span className="text-ink-500 font-medium">
                                {formatJakartaDate(b.publishDate, { day: "numeric", month: "short", year: "numeric" })}
                              </span>
                            </div>

                            <h4 className="font-display font-bold text-lg text-ink-950 group-hover:text-primary transition-colors">
                              <Link href={`/boost/${b.slug}`}>
                                <span className="cursor-pointer">{b.title}</span>
                              </Link>
                            </h4>

                            <blockquote className="text-xs italic text-ink-600 line-clamp-2 border-l-2 border-primary/40 pl-3">
                              &ldquo;{b.scriptureText}&rdquo; &middot; <strong>{b.scriptureReference}</strong>
                            </blockquote>
                          </div>

                          <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-end">
                            <Link href={`/boost/${b.slug}`}>
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer">
                                <span>Baca BOOST</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </span>
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {filteredArchives.map((item) => (
                  <article
                    key={item.id}
                    className="group p-6 sm:p-8 rounded-[18px] border border-border bg-surface hover:border-secondary hover:shadow-card transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left Column (5 cols): Photo Slot with GP Corner Motif */}
                      <div className="lg:col-span-5">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border bg-white/70 p-4 flex flex-col justify-between">
                          {/* GP Signature Corner Marker */}
                          <div className="absolute top-0 right-0 w-7 h-7 pointer-events-none">
                            <svg viewBox="0 0 28 28" fill="none" className="w-full h-full text-accent">
                              <path d="M0 0H28V28" stroke="currentColor" strokeWidth="2.5" />
                            </svg>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-sans text-[10px] uppercase tracking-wider text-accent font-bold">
                              {item.category === "kegiatan" && "Dokumentasi Kegiatan"}
                              {item.category === "dokumentasi" && "Album Dokumentasi"}
                              {item.category === "cerita" && "Kisah Komunitas"}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/80 border border-border text-ink-500">
                              {item.year}
                            </span>
                          </div>

                          <div className="text-center py-4">
                            <p className="font-display text-lg font-bold text-ink-950">
                              {item.title}
                            </p>
                            <span className="font-sans text-xs text-primary mt-1 block font-medium">
                              GP JATIPON
                            </span>
                          </div>

                          <div className="text-[10px] font-mono text-ink-500 flex items-center justify-between">
                            <span>Tahun {item.year}</span>
                            <span>{item.dateDisplay}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column (7 cols): Editorial Content & Large Date */}
                      <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/25">
                            {item.category.toUpperCase()}
                          </span>
                          <span className="text-sm font-sans font-semibold text-ink-500">
                            {item.dateDisplay}
                          </span>
                          <span className="text-border">&middot;</span>
                          <span className="text-xs font-mono text-ink-400">
                            Periode {item.year}
                          </span>
                        </div>

                        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink-950 group-hover:text-primary transition-colors">
                          <Link href={`/arsip/${item.slug}`}>
                            <span className="cursor-pointer">{item.title}</span>
                          </Link>
                        </h2>

                        <p className="text-sm sm:text-base text-ink-700 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="pt-3 flex items-center gap-4">
                          <Link href={`/arsip/${item.slug}`}>
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer">
                              <span>Buka rincian dokumentasi</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center border border-dashed border-border rounded-2xl bg-surface p-8 max-w-xl mx-auto space-y-3">
                <FolderHeart className="h-12 w-12 text-secondary mx-auto" />
                <h3 className="font-display text-xl font-bold text-ink-950">
                  Tidak ada arsip yang cocok
                </h3>
                <p className="text-xs text-ink-500">
                  Coba pilih filter format atau tahun perjalanan yang berbeda.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
