import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, BookOpen, Calendar, Sparkles } from "lucide-react";
import { GpLogo } from "../components/brand/GpLogo";
import { CommunityPhotoSlot } from "../components/brand/CommunityPhotoSlot";
import { Button } from "../components/ui/Button";
import { getTodaysBoost, formatJakartaDate, getJakartaDateString } from "../lib/boosts";
import type { Boost } from "../types";

export function Home() {
  const [boost, setBoost] = useState<Boost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getTodaysBoost()
      .then(({ data, error: err }) => {
        if (!isMounted) return;
        if (err) {
          console.error("Error loading today's boost:", err);
          setError(err.message);
        } else {
          setBoost(data);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Gagal memuat renungan");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const todayJakartaStr = getJakartaDateString();

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">

      {/* =========================================================================
          HERO SECTION — BOOST DAILY DEVOTIONAL
          First-class editorial devotional experience + GP community anchoring
          Canvas: Ice Background (#E4F2F6) + Jatipon Blue (#1C49BA) + Terracotta Accent (#C8743C)
          ========================================================================= */}
      {/* =========================================================================
          HERO SECTION — BOOST DAILY DEVOTIONAL
          First-class editorial devotional experience + GP community anchoring
          Canvas: Plasma Gradient Background (Backgrounds Supply) + Glass Cards
          ========================================================================= */}
      <section className="relative overflow-hidden bg-[#102438] text-white pt-8 sm:pt-14 pb-14 sm:pb-20 border-b border-indigo-900/50 transition-colors duration-300">
        {/* Animated Plasma Background (Backgrounds Supply) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <iframe
            src="https://backgrounds.supply/gradient-lab/embed#s=eyJtIjoicGxhc21hIiwiYyI6WyIjMTAyNDM4IiwiIzI3Mzk3YSIsIiMzMzIzZDciLCIjOWQ3MWUyIiwiI2UxYjlmMyIsIiMwMDAwMDAiLCIjMDAwMDAwIiwiIzAwMDAwMCJdLCJvIjpbWzAuMzg4MDU0ODQyMDgzMTY0LDAuMDc2NDk5NTUxMDgzNzM3Nl0sWzAuMDQ0MTI1NTU0NDM3Njc1OTE0LDAuMzUwOTQ5MTYzNzg0MzY0MTRdLFstMC4zNjI1MjI1MzQwNTY2MzE4LDAuMDk2Nzc5NTc0Mjk3NDg5M10sWy0wLjEyNDIzNDk5NDk2MTYyODc1LC0wLjMwNzg2NDUxNjcxMzM1ODg1XSxbMC4xMTQ4OTIxNTU4MzQ0NzAyNSwtMC4yNDg0NTI3NjI3MzUyMTIzNl0sWzAsMF0sWzAsMF0sWzAsMF1dLCJuIjozLCJiIjowLjgsImsiOjEuMDUsInMiOjEuMSwiZyI6MC4wMjgsInAiOnsidV96b29tIjoxLjQsInVfY29tcGxleGl0eSI6MywidV9zbW9vdGgiOjAuMzksInVfc3BlZWQiOjAuNH19"
            className="border-0 absolute -top-[5%] -left-[5%] w-[110%] h-[115%] pointer-events-none"
            style={{ border: 0 }}
            loading="lazy"
            allow="fullscreen"
            title="Gradient by Backgrounds Supply"
          />
          {/* Subtle vignette overlay to ensure high contrast and crisp legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#102438]/50 via-transparent to-[#102438]/70 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Asymmetric 7 / 5 Grid: Left Devotional Hero, Right Photo + Event Dock */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column (7 cols): Brand Lockup + Devotional Focus + CTA */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">

              {/* 1. GP Brand Lockup */}
              <div className="flex items-center gap-3.5">
                <GpLogo size="lg" variant="dark" className="shadow-subtle shrink-0 ring-1 ring-white/20" />
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-none drop-shadow-sm">
                      GP JATIPON
                    </span>
                    <span className="font-sans text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-cyan-200 leading-none">
                      GERAKAN PEMUDA
                    </span>
                  </div>
                  <span className="font-sans text-[11px] sm:text-xs text-slate-200/90 mt-1.5 font-normal leading-none drop-shadow-xs">
                    Bagian dari GPIB Jemaat Jatipon Bekasi
                  </span>
                </div>
              </div>

              {/* 2. Primary Devotional Hero Card / Editorial Proposition */}
              <div className="rounded-[20px] border border-white/60 bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-floating space-y-5 text-ink-950">

                {/* Eyebrow & Live Publication Date */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-accent">
                      BOOST &middot; SABDA BINA PEMUDA
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-600">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {formatJakartaDate(boost ? boost.publishDate : todayJakartaStr, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Hero Content States: Loading, Present, Empty */}
                {loading ? (
                  <div className="space-y-4 animate-pulse py-2">
                    <div className="h-5 bg-border/40 rounded w-1/3" />
                    <div className="h-8 bg-border/40 rounded w-4/5" />
                    <div className="h-4 bg-border/30 rounded w-full" />
                    <div className="h-4 bg-border/30 rounded w-2/3" />
                    <div className="h-10 bg-border/40 rounded w-40 mt-4" />
                  </div>
                ) : boost ? (
                  <div className="space-y-4">
                    {/* Scripture Reference Tag */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>{boost.scriptureReference}</span>
                    </div>

                    {/* Primary Scripture Quotation (H1) */}
                    <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-ink-950 leading-[1.3] italic">
                      &ldquo;{boost.scriptureText}&rdquo;
                    </h1>

                    {/* Short Reflection Excerpt */}
                    <p className="font-sans text-sm sm:text-base text-ink-700 leading-relaxed line-clamp-3">
                      {boost.reflection}
                    </p>

                    {/* Action CTAs */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                      <Link href={`/boost/${boost.slug}`}>
                        <Button
                          variant="primary"
                          size="lg"
                          className="w-full sm:w-auto flex items-center justify-center gap-2"
                        >
                          <span>Baca BOOST</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>

                      <Link href="/arsip?format=boost">
                        <Button
                          variant="secondary"
                          size="lg"
                          className="w-full sm:w-auto"
                        >
                          <span>Arsip Renungan</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 py-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                      <BookOpen className="w-3 h-3" />
                      <span>Renungan Harian</span>
                    </div>

                    <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-950 leading-snug">
                      Belum ada renungan untuk hari ini.
                    </h1>

                    <p className="font-sans text-sm sm:text-base text-ink-700 leading-relaxed max-w-lg">
                      {error
                        ? "Terjadi kendala saat memuat renungan hari ini. Kamu tetap dapat mengakses rekaman renungan sebelumnya melalui arsip."
                        : "Tim Pelayanan GP Jatipon sedang menyiapkan renungan berikutnya. Kamu dapat membaca renungan terdahulu di Arsip BOOST."}
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                      <Link href="/arsip?format=boost">
                        <Button
                          variant="primary"
                          size="lg"
                          className="w-full sm:w-auto flex items-center justify-center gap-2"
                        >
                          <span>Jelajahi Arsip BOOST</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>

                      <Link href="/tentang-gp">
                        <Button
                          variant="secondary"
                          size="lg"
                          className="w-full sm:w-auto"
                        >
                          <span>Kenali GP</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

              </div>

              {/* 3. Community Grounding Line */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-200/90">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="drop-shadow-xs">Ruang bertumbuh dalam iman dan persekutuan pemuda &middot; Jatipon, Bekasi</span>
              </div>
            </div>

            {/* Right Column (5 cols): Community Photo Slot + Single-Strip Event Dock */}
            <div className="lg:col-span-5">

              {/* Real Photo Asset Slot (With Recurring GP Corner Motif) */}
              <div className="rounded-2xl overflow-hidden shadow-floating ring-1 ring-white/20">
                <CommunityPhotoSlot />
              </div>

              {/* Minimalist Single-Strip Event Dock */}
              <div className="mt-4 p-4 rounded-xl border border-white/40 bg-white/95 backdrop-blur-md shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-950">
                <div className="flex items-center gap-3.5">
                  <div className="bg-white border border-border px-3 py-1.5 rounded-lg text-center shrink-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-accent leading-none">SEP</span>
                    <span className="block text-base font-display font-extrabold text-primary leading-tight">27</span>
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-sm text-ink-950 leading-snug">
                      Ibadah Pemuda &amp; Creative Sharing
                    </h2>
                    <p className="text-[11px] text-ink-500 mt-0.5">
                      19:00 WIB &middot; Gedung GPIB Jatipon
                    </p>
                  </div>
                </div>

                <Link href="/kegiatan">
                  <span className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-hover transition-colors shrink-0 text-xs sm:self-center cursor-pointer">
                    <span>Lihat detail</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          JEJAK GP — HOMEPAGE ARCHIVE TEASER
          Editorial chronology, generous whitespace, large dates, restrained terracotta accents,
          authentic photo slots with GP corner marker.
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-border bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header: Asymmetric Editorial Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-accent">
                  JEJAK GP &middot; ARSIP PERJALANAN
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-ink-950">
                Yang sudah kita jalani,{" "}
                <span className="italic font-normal text-primary block sm:inline">
                  bagikan, dan tumbuhkan bersama.
                </span>
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-ink-700 pt-1">
                GP Jatipon bukan hanya tempat mencari kegiatan berikutnya—ini adalah ruang di mana langkah persekutuan, pelayanan, dan cerita iman kita terdokumentasikan.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-start md:items-end gap-1.5">
              <Link href="/arsip">
                <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-primary hover:text-primary-hover transition-colors group cursor-pointer">
                  <span>Lihat seluruh arsip</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>

          {/* 3 Recent Archived Moments: Asymmetric Editorial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Moment 1: Ibadah Pemuda Gabungan */}
            <article className="group rounded-[18px] p-5 sm:p-6 border border-border bg-surface hover:border-secondary hover:shadow-card transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Photo Frame with GP Corner Marker */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border bg-white/70 text-ink-950 flex flex-col justify-between p-4">
                  {/* GP Corner Marker */}
                  <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-accent">
                      <path d="M0 0H24V24" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-wider text-accent font-bold">
                      Dokumentasi Foto
                    </span>
                  </div>
                  <div className="text-center py-2">
                    <span className="font-display text-base font-bold text-ink-950 block">
                      Ibadah Pemuda Gabungan
                    </span>
                    <span className="font-sans text-[11px] text-primary mt-0.5 block font-medium">
                      Dokumentasi Kebersamaan
                    </span>
                  </div>
                  <div className="text-[10px] text-right font-mono text-ink-400">
                    GP JATIPON
                  </div>
                </div>

                {/* Content Info */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-accent">
                      Kegiatan
                    </span>
                    <span className="font-sans text-xs font-semibold text-ink-500">
                      September 2026
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink-950 group-hover:text-primary transition-colors leading-snug">
                    Ibadah Pemuda Gabungan
                  </h3>
                  <p className="text-xs text-ink-700 leading-relaxed line-clamp-2">
                    Perjumpaan pemuda lintas sektor dalam doa, pujian, dan ruang refleksi bersama di Gedung Gereja GPIB Jatipon.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-end">
                <Link href="/arsip">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer">
                    <span>Buka arsip</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </article>

            {/* Moment 2: Aksi Sosial */}
            <article className="group rounded-[18px] p-5 sm:p-6 border border-border bg-surface hover:border-secondary hover:shadow-card transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Photo Frame with GP Corner Marker */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border bg-white/70 text-ink-950 flex flex-col justify-between p-4">
                  <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-accent">
                      <path d="M0 0H24V24" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-wider text-accent font-bold">
                      Dokumentasi Aksi
                    </span>
                  </div>
                  <div className="text-center py-2">
                    <span className="font-display text-base font-bold text-ink-950 block">
                      Aksi Sosial &amp; Donor Darah
                    </span>
                    <span className="font-sans text-[11px] text-primary mt-0.5 block font-medium">
                      Dampak Nyata Komunitas
                    </span>
                  </div>
                  <div className="text-[10px] text-right font-mono text-ink-400">
                    GP JATIPON
                  </div>
                </div>

                {/* Content Info */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-accent">
                      Pelayanan
                    </span>
                    <span className="font-sans text-xs font-semibold text-ink-500">
                      Agustus 2026
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink-950 group-hover:text-primary transition-colors leading-snug">
                    Aksi Sosial Pemuda
                  </h3>
                  <p className="text-xs text-ink-700 leading-relaxed line-clamp-2">
                    Langkah nyata kepedulian bersama warga sekitar dan PMI melalui aksi donor darah serta pembagian paket berkah.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-end">
                <Link href="/arsip">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer">
                    <span>Buka arsip</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </article>

            {/* Moment 3: BOOST */}
            <article className="group rounded-[18px] p-5 sm:p-6 border border-border bg-surface hover:border-secondary hover:shadow-card transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Photo Frame with GP Corner Marker */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border bg-white/70 text-ink-950 flex flex-col justify-between p-4">
                  <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-accent">
                      <path d="M0 0H24V24" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-wider text-accent font-bold">
                      Dokumentasi Renungan
                    </span>
                  </div>
                  <div className="text-center py-2">
                    <span className="font-display text-base font-bold text-ink-950 block">
                      BOOST Youth Gathering
                    </span>
                    <span className="font-sans text-[11px] text-primary mt-0.5 block font-medium">
                      Sharing &amp; Refleksi Iman
                    </span>
                  </div>
                  <div className="text-[10px] text-right font-mono text-ink-400">
                    GP JATIPON
                  </div>
                </div>

                {/* Content Info */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-accent">
                      Cerita &amp; Renungan
                    </span>
                    <span className="font-sans text-xs font-semibold text-ink-500">
                      Juli 2026
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink-950 group-hover:text-primary transition-colors leading-snug">
                    BOOST: Menemukan Terang
                  </h3>
                  <p className="text-xs text-ink-700 leading-relaxed line-clamp-2">
                    Ruang bincang terbuka dan penguatan spiritual di tengah tantangan perkuliahan dan dunia kerja generasi muda.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-end">
                <Link href="/arsip?format=boost">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer">
                    <span>Buka arsip BOOST</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </article>
          </div>

        </div>
      </section>

    </div>
  );
}
