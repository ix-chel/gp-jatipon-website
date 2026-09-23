import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "../utils/cn";
import { GpLogo } from "../components/brand/GpLogo";
import { CommunityPhotoSlot } from "../components/brand/CommunityPhotoSlot";

export function Home() {
  // Hero Prototype Gate: Direction A (Warm Ivory) vs Direction B (Dark Youth Editorial)
  const [direction, setDirection] = useState<"A" | "B">("A");
  const [showGateDetails, setShowGateDetails] = useState(false);

  return (
    <div className="flex flex-col w-full min-h-screen">

      {/* =========================================================================
          HERO PROTOTYPE GATE SWITCHER (Section 31 - Pass 2)
          ========================================================================= */}
      <aside aria-label="Prototype switcher" className="bg-[#0D0E11] border-b border-white/10 text-white px-4 py-2.5 sticky top-16 sm:top-20 z-40">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-gold">
              Pass 2: Real Visual Identity &amp; Photography Gate
            </span>
            <span className="text-white/40 hidden sm:inline">|</span>
            <span className="text-white/70 hidden sm:inline">
              GP JATIPON Brand Dominan &middot; Single-Strip Event Dock &middot; Non-Card Hero
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 bg-[#1A1C22] p-1 rounded-lg border border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setDirection("A")}
              className={cn(
                "px-2.5 sm:px-3 py-1.5 rounded-md font-medium text-[11px] sm:text-xs transition-all duration-200 flex items-center gap-1.5 flex-1 sm:flex-initial justify-center",
                direction === "A"
                  ? "bg-[#FBF9F5] text-[#16171A] font-semibold shadow-sm"
                  : "text-white/70 hover:text-white"
              )}
            >
              <span className="w-2 h-2 rounded-full bg-[#C59B27] shrink-0" />
              <span>Direction A: Warm Ivory</span>
            </button>

            <button
              onClick={() => setDirection("B")}
              className={cn(
                "px-2.5 sm:px-3 py-1.5 rounded-md font-medium text-[11px] sm:text-xs transition-all duration-200 flex items-center gap-1.5 flex-1 sm:flex-initial justify-center",
                direction === "B"
                  ? "bg-gold text-[#16171A] font-semibold shadow-sm"
                  : "text-white/70 hover:text-white"
              )}
            >
              <span className="w-2 h-2 rounded-full bg-[#111215] shrink-0" />
              <span>Direction B: Dark Youth</span>
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          DIRECTION A: WARM EDITORIAL COMMUNITY (GP Dominant)
          Atmosphere: Warm Ivory (#FBF9F5) + Charcoal (#16171A) + Controlled Gold (#C59B27)
          ========================================================================= */}
      {direction === "A" && (
        <section className="bg-[#FBF9F5] text-[#16171A] pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-[#E8E5DF] transition-colors duration-300">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Asymmetric 7 / 5 Grid: Left Editorial Proposition, Right Photo Composition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

              {/* Left Column (7 cols): Brand Lockup + Proposition H1 + Copy + CTA */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8">

                {/* 1. GP Brand Lockup (GP JATIPON Primary, GERAKAN PEMUDA Descriptor, GPIB Subordinate) */}
                <div className="flex items-center gap-3.5">
                  <GpLogo size="lg" variant="light" className="shadow-sm" />
                  <div className="flex flex-col">
                    <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#16171A] leading-none">
                      GP JATIPON
                    </span>
                    <span className="font-sans text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-gold mt-1.5 leading-none">
                      GERAKAN PEMUDA
                    </span>
                    <span className="font-sans text-[11px] sm:text-xs text-[#64656C] mt-1 font-normal leading-none">
                      Bagian dari GPIB Jemaat Jatipon Bekasi
                    </span>
                  </div>
                </div>

                {/* 2. Semantic Proposition Headline (H1) */}
                <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-[4.25rem] tracking-[-0.03em] leading-[1.1] text-[#16171A]">
                  Bukan sekadar berkumpul.{" "}
                  <span className="italic font-normal text-gold block sm:inline">
                    Kita bertumbuh bersama.
                  </span>
                </h1>

                {/* 3. Concise Supporting Community Copy (No buzzwords) */}
                <p className="font-sans text-base sm:text-lg text-[#64656C] max-w-xl leading-relaxed">
                  Ruang bertumbuh dalam iman, merawat persahabatan sejati, dan melangkah bersama menghadirkan dampak nyata bagi sesama di Bekasi dan sekitarnya.
                </p>

                {/* 4. Action CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Link href="/kegiatan">
                    <span className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide uppercase bg-gold text-[#16171A] hover:bg-[#AF871C] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer">
                      <span>Ikut Kegiatan</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>

                  <Link href="/tentang-gp">
                    <span className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-[#16171A] bg-transparent border border-[#16171A]/20 hover:border-[#16171A]/60 hover:bg-[#16171A]/5 transition-all duration-200 cursor-pointer">
                      <span>Kenali GP</span>
                    </span>
                  </Link>
                </div>

                {/* 5. Minimal Community Grounding Line */}
                <div className="pt-6 border-t border-[#E8E5DF] flex items-center gap-2 text-xs text-[#64656C]">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Komunitas pemuda terbuka untuk semua &middot; Jatipon, Bekasi</span>
                </div>
              </div>

              {/* Right Column (5 cols): Real Photo Slot + Single-Strip Event Dock */}
              <div className="lg:col-span-5">

                {/* Real Photo Asset Slot (With Recurring GP Corner Motif) */}
                <CommunityPhotoSlot direction="A" />

                {/* Minimalist Single-Strip Event Dock (One Event = One Clean Information Strip) */}
                <div className="mt-4 p-4 rounded-xl border border-[#E8E5DF] bg-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="bg-[#FBF9F5] border border-[#E8E5DF] px-2.5 py-1.5 rounded-md text-center shrink-0">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-gold leading-none">SEP</span>
                      <span className="block text-base font-serif font-bold text-[#16171A] leading-tight">27</span>
                    </div>
                    <div>
                      <h2 className="font-sans font-semibold text-sm text-[#16171A] leading-snug">
                        Ibadah Pemuda &amp; Creative Sharing
                      </h2>
                      <p className="text-[11px] text-[#64656C] mt-0.5">
                        19:00 WIB &middot; Gedung GPIB Jatipon
                      </p>
                    </div>
                  </div>

                  <Link href="/kegiatan">
                    <span className="inline-flex items-center gap-1 font-semibold text-[#16171A] hover:text-gold transition-colors shrink-0 text-xs sm:self-center cursor-pointer">
                      <span>Lihat detail</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* =========================================================================
          DIRECTION B: DARK YOUTH EDITORIAL (GP Dominant)
          Atmosphere: Deep Charcoal (#111215) + Crisp Off-White + Ochre Gold (#C59B27)
          ========================================================================= */}
      {direction === "B" && (
        <section className="bg-[#111215] text-[#FBF9F5] pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-white/10 transition-colors duration-300">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Asymmetric 7 / 5 Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

              {/* Left Column (7 cols): Brand Lockup + Proposition H1 + Copy + CTA */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8">

                {/* 1. GP Brand Lockup */}
                <div className="flex items-center gap-3.5">
                  <GpLogo size="lg" variant="dark" className="shadow-md" />
                  <div className="flex flex-col">
                    <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-none">
                      GP JATIPON
                    </span>
                    <span className="font-sans text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-gold mt-1.5 leading-none">
                      GERAKAN PEMUDA
                    </span>
                    <span className="font-sans text-[11px] sm:text-xs text-[#9496A1] mt-1 font-normal leading-none">
                      Bagian dari GPIB Jemaat Jatipon Bekasi
                    </span>
                  </div>
                </div>

                {/* 2. Semantic Proposition Headline (H1) */}
                <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-[4.25rem] tracking-[-0.03em] leading-[1.08] text-white">
                  Energi, iman, dan{" "}
                  <span className="italic font-light text-gold block sm:inline">
                    panggilan nyata.
                  </span>
                </h1>

                {/* 3. Supporting Youth Community Copy */}
                <p className="font-sans text-base sm:text-lg text-[#9496A1] max-w-xl leading-relaxed">
                  Komunitas bagi generasi muda untuk bertumbuh dalam firman, merawat persahabatan sejati, dan melangkah bersama dengan relevan di tengah kota.
                </p>

                {/* 4. Action CTA Group */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Link href="/kegiatan">
                    <span className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide uppercase bg-gold text-[#111215] hover:bg-[#AF871C] transition-all duration-200 shadow-md cursor-pointer">
                      <span>Ikut Kegiatan</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>

                  <Link href="/tentang-gp">
                    <span className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-white/90 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all duration-200 cursor-pointer">
                      <span>Kenali GP</span>
                    </span>
                  </Link>
                </div>

                {/* 5. Minimal Community Grounding Line */}
                <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-[#9496A1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Komunitas pemuda terbuka untuk semua &middot; Jatipon, Bekasi</span>
                </div>
              </div>

              {/* Right Column (5 cols): Photo Slot + Single-Strip Event Dock */}
              <div className="lg:col-span-5">

                {/* Real Photo Asset Slot */}
                <CommunityPhotoSlot direction="B" />

                {/* Minimalist Single-Strip Event Dock */}
                <div className="mt-4 p-4 rounded-xl border border-white/10 bg-[#16171A] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="bg-[#111215] border border-white/10 px-2.5 py-1.5 rounded-md text-center shrink-0">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-gold leading-none">SEP</span>
                      <span className="block text-base font-serif font-bold text-white leading-tight">27</span>
                    </div>
                    <div>
                      <h2 className="font-sans font-semibold text-sm text-white leading-snug">
                        Ibadah Pemuda &amp; Creative Sharing
                      </h2>
                      <p className="text-[11px] text-[#9496A1] mt-0.5">
                        19:00 WIB &middot; Gedung GPIB Jatipon
                      </p>
                    </div>
                  </div>

                  <Link href="/kegiatan">
                    <span className="inline-flex items-center gap-1 font-semibold text-gold hover:text-white transition-colors shrink-0 text-xs sm:self-center cursor-pointer">
                      <span>Lihat detail</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* =========================================================================
          JEJAK GP — HOMEPAGE ARCHIVE TEASER (Pass 2.5)
          Purpose: Show that GP Jatipon has an ongoing history and documented journey.
          Editorial chronology, generous whitespace, large dates, restrained gold accents,
          authentic photo slots with GP corner marker.
          ========================================================================= */}
      <section className={cn(
        "py-16 sm:py-24 border-b transition-colors duration-300",
        direction === "A"
          ? "bg-[#F4EFE6] text-[#16171A] border-[#E2DDD3]"
          : "bg-[#14161C] text-[#FBF9F5] border-white/10"
      )}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header: Asymmetric Editorial Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-gold">
                  JEJAK GP &middot; ARSIP PERJALANAN
                </span>
              </div>
              <h2 className={cn(
                "font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.15]",
                direction === "A" ? "text-[#16171A]" : "text-white"
              )}>
                Yang sudah kita jalani,{" "}
                <span className="italic font-light text-gold block sm:inline">
                  bagikan, dan tumbuhkan bersama.
                </span>
              </h2>
              <p className={cn(
                "text-sm sm:text-base leading-relaxed pt-1",
                direction === "A" ? "text-[#64656C]" : "text-[#9496A1]"
              )}>
                GP Jatipon bukan hanya tempat mencari kegiatan berikutnya—ini adalah ruang di mana langkah persekutuan, pelayanan, dan cerita iman kita terdokumentasikan.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-start md:items-end gap-1.5">
              <Link href="/arsip">
                <span className={cn(
                  "inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-colors group cursor-pointer",
                  direction === "A"
                    ? "text-[#16171A] hover:text-gold"
                    : "text-gold hover:text-white"
                )}>
                  <span>Lihat seluruh arsip</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <span className={cn(
                "text-[10px] font-mono",
                direction === "A" ? "text-[#64656C]/80" : "text-white/40"
              )}>
                *Catatan pratinjau prototipe (bukan fakta historis)
              </span>
            </div>
          </div>

          {/* 3 Recent Archived Moments: Asymmetric Editorial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Moment 1: Ibadah Pemuda Gabungan */}
            <article className={cn(
              "group rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between",
              direction === "A"
                ? "bg-white/80 border-[#E2DDD3] hover:border-gold/60 shadow-sm"
                : "bg-[#191B22] border-white/10 hover:border-gold/60 shadow-md"
            )}>
              <div className="space-y-4">
                {/* Photo Frame with GP Corner Marker */}
                <div className={cn(
                  "relative aspect-[16/10] rounded-xl overflow-hidden border flex flex-col justify-between p-4",
                  direction === "A"
                    ? "bg-[#EDE8DE] border-[#DCD5C9] text-[#16171A]"
                    : "bg-[#111215] border-white/10 text-white"
                )}>
                  {/* GP Corner Marker */}
                  <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gold">
                      <path d="M0 0H24V24" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-semibold">
                      Dokumentasi Foto
                    </span>
                    <span className={cn(
                      "text-[9px] font-mono uppercase px-2 py-0.5 rounded border",
                      direction === "A" ? "bg-white/70 border-[#DCD5C9] text-[#64656C]" : "bg-white/5 border-white/10 text-white/50"
                    )}>
                      Prototipe
                    </span>
                  </div>
                  <div className="text-center py-2">
                    <span className={cn(
                      "font-display text-base font-semibold block",
                      direction === "A" ? "text-[#16171A]" : "text-white"
                    )}>
                      Ibadah Pemuda Gabungan
                    </span>
                    <span className="font-sans text-[11px] text-gold mt-0.5 block">
                      Dokumentasi Kebersamaan
                    </span>
                  </div>
                  <div className="text-[10px] text-right font-mono opacity-60">
                    GP JATIPON
                  </div>
                </div>

                {/* Content Info */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-gold">
                      Kegiatan
                    </span>
                    <span className={cn(
                      "font-sans text-xs font-semibold",
                      direction === "A" ? "text-[#64656C]" : "text-[#9496A1]"
                    )}>
                      September 2026
                    </span>
                  </div>
                  <h3 className={cn(
                    "font-display text-xl font-bold tracking-tight group-hover:text-gold transition-colors leading-snug",
                    direction === "A" ? "text-[#16171A]" : "text-white"
                  )}>
                    Ibadah Pemuda Gabungan
                  </h3>
                  <p className={cn(
                    "text-xs leading-relaxed line-clamp-2",
                    direction === "A" ? "text-[#64656C]" : "text-[#9496A1]"
                  )}>
                    Perjumpaan pemuda lintas sektor dalam doa, pujian, dan ruang refleksi bersama di Gedung Gereja GPIB Jatipon.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-inherit flex items-center justify-between">
                <span className="text-[11px] font-mono text-gold/80">[Pratinjau Arsip]</span>
                <Link href="/arsip">
                  <span className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium transition-colors cursor-pointer",
                    direction === "A" ? "text-[#16171A] hover:text-gold" : "text-white/80 hover:text-gold"
                  )}>
                    <span>Buka arsip</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </article>

            {/* Moment 2: Aksi Sosial */}
            <article className={cn(
              "group rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between",
              direction === "A"
                ? "bg-white/80 border-[#E2DDD3] hover:border-gold/60 shadow-sm"
                : "bg-[#191B22] border-white/10 hover:border-gold/60 shadow-md"
            )}>
              <div className="space-y-4">
                {/* Photo Frame with GP Corner Marker */}
                <div className={cn(
                  "relative aspect-[16/10] rounded-xl overflow-hidden border flex flex-col justify-between p-4",
                  direction === "A"
                    ? "bg-[#EDE8DE] border-[#DCD5C9] text-[#16171A]"
                    : "bg-[#111215] border-white/10 text-white"
                )}>
                  <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gold">
                      <path d="M0 0H24V24" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-semibold">
                      Dokumentasi Aksi
                    </span>
                    <span className={cn(
                      "text-[9px] font-mono uppercase px-2 py-0.5 rounded border",
                      direction === "A" ? "bg-white/70 border-[#DCD5C9] text-[#64656C]" : "bg-white/5 border-white/10 text-white/50"
                    )}>
                      Prototipe
                    </span>
                  </div>
                  <div className="text-center py-2">
                    <span className={cn(
                      "font-display text-base font-semibold block",
                      direction === "A" ? "text-[#16171A]" : "text-white"
                    )}>
                      Aksi Sosial &amp; Donor Darah
                    </span>
                    <span className="font-sans text-[11px] text-gold mt-0.5 block">
                      Dampak Nyata Komunitas
                    </span>
                  </div>
                  <div className="text-[10px] text-right font-mono opacity-60">
                    GP JATIPON
                  </div>
                </div>

                {/* Content Info */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-gold">
                      Pelayanan
                    </span>
                    <span className={cn(
                      "font-sans text-xs font-semibold",
                      direction === "A" ? "text-[#64656C]" : "text-[#9496A1]"
                    )}>
                      Agustus 2026
                    </span>
                  </div>
                  <h3 className={cn(
                    "font-display text-xl font-bold tracking-tight group-hover:text-gold transition-colors leading-snug",
                    direction === "A" ? "text-[#16171A]" : "text-white"
                  )}>
                    Aksi Sosial Pemuda
                  </h3>
                  <p className={cn(
                    "text-xs leading-relaxed line-clamp-2",
                    direction === "A" ? "text-[#64656C]" : "text-[#9496A1]"
                  )}>
                    Langkah nyata kepedulian bersama warga sekitar dan PMI melalui aksi donor darah serta pembagian paket berkah.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-inherit flex items-center justify-between">
                <span className="text-[11px] font-mono text-gold/80">[Pratinjau Arsip]</span>
                <Link href="/arsip">
                  <span className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium transition-colors cursor-pointer",
                    direction === "A" ? "text-[#16171A] hover:text-gold" : "text-white/80 hover:text-gold"
                  )}>
                    <span>Buka arsip</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </article>

            {/* Moment 3: BOOST */}
            <article className={cn(
              "group rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between",
              direction === "A"
                ? "bg-white/80 border-[#E2DDD3] hover:border-gold/60 shadow-sm"
                : "bg-[#191B22] border-white/10 hover:border-gold/60 shadow-md"
            )}>
              <div className="space-y-4">
                {/* Photo Frame with GP Corner Marker */}
                <div className={cn(
                  "relative aspect-[16/10] rounded-xl overflow-hidden border flex flex-col justify-between p-4",
                  direction === "A"
                    ? "bg-[#EDE8DE] border-[#DCD5C9] text-[#16171A]"
                    : "bg-[#111215] border-white/10 text-white"
                )}>
                  <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gold">
                      <path d="M0 0H24V24" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-semibold">
                      Dokumentasi Renungan
                    </span>
                    <span className={cn(
                      "text-[9px] font-mono uppercase px-2 py-0.5 rounded border",
                      direction === "A" ? "bg-white/70 border-[#DCD5C9] text-[#64656C]" : "bg-white/5 border-white/10 text-white/50"
                    )}>
                      Prototipe
                    </span>
                  </div>
                  <div className="text-center py-2">
                    <span className={cn(
                      "font-display text-base font-semibold block",
                      direction === "A" ? "text-[#16171A]" : "text-white"
                    )}>
                      BOOST Youth Gathering
                    </span>
                    <span className="font-sans text-[11px] text-gold mt-0.5 block">
                      Sharing &amp; Refleksi Iman
                    </span>
                  </div>
                  <div className="text-[10px] text-right font-mono opacity-60">
                    GP JATIPON
                  </div>
                </div>

                {/* Content Info */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-gold">
                      Cerita &amp; Renungan
                    </span>
                    <span className={cn(
                      "font-sans text-xs font-semibold",
                      direction === "A" ? "text-[#64656C]" : "text-[#9496A1]"
                    )}>
                      Juli 2026
                    </span>
                  </div>
                  <h3 className={cn(
                    "font-display text-xl font-bold tracking-tight group-hover:text-gold transition-colors leading-snug",
                    direction === "A" ? "text-[#16171A]" : "text-white"
                  )}>
                    BOOST: Menemukan Terang
                  </h3>
                  <p className={cn(
                    "text-xs leading-relaxed line-clamp-2",
                    direction === "A" ? "text-[#64656C]" : "text-[#9496A1]"
                  )}>
                    Ruang bincang terbuka dan penguatan spiritual di tengah tantangan perkuliahan dan dunia kerja generasi muda.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-inherit flex items-center justify-between">
                <span className="text-[11px] font-mono text-gold/80">[Pratinjau Arsip]</span>
                <Link href="/arsip">
                  <span className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium transition-colors cursor-pointer",
                    direction === "A" ? "text-[#16171A] hover:text-gold" : "text-white/80 hover:text-gold"
                  )}>
                    <span>Buka arsip</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </article>
          </div>

        </div>
      </section>

      {/* =========================================================================
          DEVELOPER GATE STATUS (Compact, Non-Intrusive Drawer / Section)
          Per instruction: Keep compact so it doesn't overpower the hero.
          ========================================================================= */}
      <section className="bg-[#0D0E11] text-white py-6 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono uppercase tracking-wider text-white/80">
                Gate Check: Pass 2.5 Core Product Architecture &amp; Archive
              </span>
              <span className="text-xs text-white/40 hidden md:inline">
                (7 / 7 Criteria Satisfied)
              </span>
            </div>

            <button
              onClick={() => setShowGateDetails(!showGateDetails)}
              className="text-xs font-mono text-gold hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>{showGateDetails ? "Sembunyikan Kriteria" : "Lihat Kriteria Gate"}</span>
              {showGateDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Collapsible Gate Criteria (Remains minimal and out of the way) */}
          {showGateDetails && (
            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs animate-in fade-in duration-200">
              <div className="p-3 rounded-lg bg-[#14161C] border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">1. GP JATIPON Primary Brand</h4>
                  <p className="text-white/60 text-[11px] mt-0.5">
                    GP JATIPON mendominasi brand lockup; GERAKAN PEMUDA sebagai deskriptor.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#14161C] border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">2. Semantic H1 Proposition</h4>
                  <p className="text-white/60 text-[11px] mt-0.5">
                    H1 adalah proposisi komunitas, bukan teks nama brand semata.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#14161C] border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">3. Zero 'Signature Identity' Card</h4>
                  <p className="text-white/60 text-[11px] mt-0.5">
                    Seluruh kartu dekoratif penjelas identitas dihapus dari hero.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#14161C] border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">4. Authentic Photo Slot + Fallback</h4>
                  <p className="text-white/60 text-[11px] mt-0.5">
                    Slot foto 16:10 siap pakai tanpa AI people atau stock generik gereja.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#14161C] border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">5. 1-Motif System: Corner Marker</h4>
                  <p className="text-white/60 text-[11px] mt-0.5">
                    Satu motif berulang terpadu (corner crop GP mark) membingkai foto.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#14161C] border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">6. Single-Strip Minimalist Dock</h4>
                  <p className="text-white/60 text-[11px] mt-0.5">
                    Kegiatan terdekat hadir sebagai strip informasi ringkas, bukan card stack.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#14161C] border border-white/10 flex items-start gap-2.5 md:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">7. Core Product Archive &amp; Jejak GP</h4>
                  <p className="text-white/60 text-[11px] mt-0.5">
                    Fungsi Arsip hadir di navigasi utama, homepage teaser "Jejak GP", dan rute /arsip editorial.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
