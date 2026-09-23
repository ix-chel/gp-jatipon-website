import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowUpRight, FolderHeart } from "lucide-react";
import { ARCHIVES } from "../data/mock";
import { cn } from "../utils/cn";
import type { ArchiveCategory } from "../types";

export function Archive() {
  // Chronological layer: "Perjalanan GP" (Years / Periods)
  const periods = [2026, 2025];
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  // Content type categories (separate from the chronological layer)
  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory | "all">("all");

  const categories: { key: ArchiveCategory | "all"; label: string }[] = [
    { key: "all", label: "Semua Format" },
    { key: "kegiatan", label: "Kegiatan" },
    { key: "dokumentasi", label: "Dokumentasi Foto & Video" },
    { key: "cerita", label: "Cerita & Refleksi" },
  ];

  // Filter archives based on chronological year and content category
  const filteredArchives = useMemo(() => {
    return ARCHIVES.filter((item) => {
      const matchYear = selectedYear === "all" || item.year === selectedYear;
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchYear && matchCategory;
    });
  }, [selectedYear, selectedCategory]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FBF9F5] text-[#16171A]">
      {/* =========================================================================
          EDITORIAL PAGE HEADER
          Atmosphere: Warm Ivory + Subtle Gold Eyebrow + Editorial Display Typography
          ========================================================================= */}
      <section className="border-b border-[#E8E5DF] pt-12 sm:pt-16 pb-12 sm:pb-16 bg-[#F4EFE6]/70">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-gold">
                ARSIP &middot; JEJAK PERJALANAN
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-[#16171A]">
              Memori persekutuan, karya, dan{" "}
              <span className="italic font-light text-gold block sm:inline">
                perjalanan kita.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#64656C] leading-relaxed max-w-2xl pt-2">
              Ruang dokumentasi digital yang merawat jejak langkah, perjumpaan pemuda, dan rekaman pelayanan Gerakan Pemuda GPIB Jatipon dari masa ke masa.
            </p>

            {/* Prototype Notice: Explains prototype state transparently */}
            <div className="pt-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/25 text-xs text-[#16171A]">
                <span className="font-mono font-bold text-gold uppercase text-[10px] tracking-wider">
                  [Pratinjau Prototipe]
                </span>
                <span className="text-[#64656C] text-[11px]">
                  Catatan berikut merupakan pratinjau tata letak dan alur arsip (bukan rekaman fakta historis final).
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTROLS: CHRONOLOGICAL LAYER (Perjalanan GP) + CONTENT CATEGORIES
          Separates chronological timeline from content formats per architectural model.
          ========================================================================= */}
      <section className="border-b border-[#E8E5DF] bg-[#FBF9F5] sticky top-16 sm:top-20 z-30 shadow-xs">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* 1. CHRONOLOGICAL LAYER: Perjalanan GP (Timeline Selector) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64656C] shrink-0 mr-1">
                Perjalanan GP:
              </span>
              <button
                onClick={() => setSelectedYear("all")}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0",
                  selectedYear === "all"
                    ? "bg-[#16171A] text-white shadow-sm"
                    : "bg-[#EFECE6] text-[#64656C] hover:text-[#16171A]"
                )}
              >
                Semua Masa
              </button>
              {periods.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 flex items-center gap-1.5",
                    selectedYear === year
                      ? "bg-gold text-[#16171A] shadow-sm"
                      : "bg-[#EFECE6] text-[#64656C] hover:text-[#16171A]"
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
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0",
                    selectedCategory === cat.key
                      ? "bg-[#16171A]/10 text-[#16171A] font-semibold border-b-2 border-gold"
                      : "text-[#64656C] hover:text-[#16171A]"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          ARCHIVE ITEMS: EDITORIAL CHRONOLOGICAL PRESENTATION
          Asymmetric layout with generous whitespace, large dates, real photo slots,
          and restrained gold accents.
          ========================================================================= */}
      <main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        {filteredArchives.length > 0 ? (
          <div className="space-y-12 sm:space-y-16">
            {filteredArchives.map((item) => (
              <article
                key={item.id}
                className="group p-6 sm:p-8 rounded-2xl border border-[#E8E5DF] bg-white hover:border-gold/50 transition-all duration-300 shadow-xs"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column (5 cols): Photo Slot with GP Corner Motif */}
                  <div className="lg:col-span-5">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#DCD5C9] bg-[#EDE8DE] p-4 flex flex-col justify-between">
                      {/* GP Signature Corner Marker */}
                      <div className="absolute top-0 right-0 w-7 h-7 pointer-events-none">
                        <svg viewBox="0 0 28 28" fill="none" className="w-full h-full text-gold">
                          <path d="M0 0H28V28" stroke="currentColor" strokeWidth="2.5" />
                        </svg>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
                          {item.category === "kegiatan" && "Dokumentasi Kegiatan"}
                          {item.category === "dokumentasi" && "Album Dokumentasi"}
                          {item.category === "cerita" && "Kisah Komunitas"}
                        </span>
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/70 border border-[#DCD5C9] text-[#64656C]">
                          Prototipe
                        </span>
                      </div>

                      <div className="text-center py-4">
                        <p className="font-display text-lg font-semibold text-[#16171A]">
                          {item.title}
                        </p>
                        <span className="font-sans text-xs text-gold mt-1 block">
                          GP JATIPON
                        </span>
                      </div>

                      <div className="text-[10px] font-mono text-[#64656C] flex items-center justify-between">
                        <span>Tahun {item.year}</span>
                        <span>{item.dateDisplay}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (7 cols): Editorial Content & Large Date */}
                  <div className="lg:col-span-7 space-y-4">
                    
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gold/15 text-[#977317] border border-gold/30">
                        {item.category.toUpperCase()}
                      </span>
                      <span className="text-sm font-sans font-semibold text-[#64656C]">
                        {item.dateDisplay}
                      </span>
                      <span className="text-[#64656C]/40">&middot;</span>
                      <span className="text-xs font-mono text-[#64656C]/70">
                        Periode {item.year}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#16171A] group-hover:text-gold transition-colors">
                      <Link href={`/arsip/${item.slug}`}>
                        <span className="cursor-pointer">{item.title}</span>
                      </Link>
                    </h2>

                    <p className="text-sm sm:text-base text-[#64656C] leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-3 flex items-center gap-4">
                      <Link href={`/arsip/${item.slug}`}>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#16171A] hover:text-gold transition-colors cursor-pointer">
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
          <div className="py-24 text-center border border-dashed border-[#DCD5C9] rounded-2xl bg-white/60 p-8 max-w-xl mx-auto space-y-3">
            <FolderHeart className="h-12 w-12 text-gold/60 mx-auto" />
            <h3 className="font-display text-xl font-semibold text-[#16171A]">
              Tidak ada arsip yang cocok
            </h3>
            <p className="text-xs text-[#64656C]">
              Coba pilih filter format atau tahun perjalanan yang berbeda.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
