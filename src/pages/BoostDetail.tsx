import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Calendar, User, Share2, BookOpen, Check, Heart, Sparkles } from "lucide-react";
import { getBoostBySlug, formatJakartaDate } from "../lib/data/boosts";
import type { Boost } from "../types";
import { Button } from "../components/ui/Button";

export function BoostDetail() {
  const [, params] = useRoute("/boost/:slug");
  const slug = (params as Record<string, string> | null)?.slug;

  const [boost, setBoost] = useState<Boost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    getBoostBySlug(slug)
      .then(({ data, error: err }) => {
        if (!isMounted) return;
        if (err || !data) {
          setError(err?.message || "Renungan tidak ditemukan");
          setBoost(null);
        } else {
          setBoost(data);
          document.title = `BOOST: ${data.title} | GP Jatipon`;
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
  }, [slug]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `BOOST: ${boost?.title || "Renungan Harian"}`,
          text: `"${boost?.scriptureText?.slice(0, 100)}..." (${boost?.scriptureReference})`,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignored
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full min-h-[60vh] pb-24 bg-background text-ink-950 animate-pulse">
        <section className="bg-white pt-12 sm:pt-16 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="h-4 w-32 bg-border/60 rounded" />
            <div className="h-10 w-3/4 bg-border/60 rounded" />
            <div className="h-4 w-48 bg-border/40 rounded" />
          </div>
        </section>
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 space-y-6">
          <div className="h-32 bg-surface rounded-2xl border border-border" />
          <div className="h-4 bg-border/40 rounded w-full" />
          <div className="h-4 bg-border/40 rounded w-5/6" />
          <div className="h-4 bg-border/40 rounded w-4/6" />
        </div>
      </div>
    );
  }

  if (error || !boost) {
    return (
      <div className="py-24 text-center px-4 bg-background text-ink-950 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent">
          <BookOpen className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink-950 mb-2">
          Renungan Tidak Ditemukan
        </h2>
        <p className="text-sm text-ink-600 max-w-md mx-auto mb-6">
          {error || "Renungan yang kamu cari belum tersedia, masih dalam draf, atau tautan tidak valid."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button variant="secondary" size="sm">
              Ke Beranda
            </Button>
          </Link>
          <Link href="/arsip?format=boost">
            <Button variant="primary" size="sm">
              Buka Arsip BOOST
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-24 bg-background text-ink-950">
      {/* Editorial Header */}
      <section className="bg-white pt-10 sm:pt-14 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 border-b border-border shadow-subtle">
        <div className="max-w-3xl mx-auto space-y-5">
          {/* Navigation back */}
          <div className="flex items-center justify-between">
            <Link href="/arsip?format=boost">
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink-600 hover:text-primary transition-colors cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                <span>Arsip BOOST</span>
              </span>
            </Link>

            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-400">
              SABDA BINA PEMUDA
            </span>
          </div>

          {/* Devotional Badge & Date */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-sans font-bold tracking-[0.2em] uppercase text-accent">
                BOOST &middot; RENUNGAN HARIAN
              </span>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink-950 tracking-tight leading-[1.15]">
              {boost.title}
            </h1>
          </div>

          {/* Metadata Strip */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-ink-500 pt-1 border-t border-border/60">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span className="font-medium text-ink-700">
                {formatJakartaDate(boost.publishDate, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <span>&middot;</span>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary" />
              <span>{boost.author || "Tim Pelayanan GP Jatipon"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Devotional Content */}
      <article className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-10">
        {/* Optional Cover Image */}
        {boost.coverImage && (
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-subtle aspect-[16/9]">
            <img
              src={boost.coverImage}
              alt={boost.title}
              className="w-full h-full object-cover"
            />
            {/* GP Corner Marker */}
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-accent">
                <path d="M0 0H32V32" stroke="currentColor" strokeWidth="3" />
              </svg>
            </div>
          </div>
        )}

        {/* 1. Scripture Focus Box */}
        <section
          aria-label="Ayat Firman Tuhan"
          className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-white via-surface to-white p-6 sm:p-8 shadow-subtle"
        >
          {/* Subtle decorative watermark */}
          <div className="absolute top-4 right-4 text-primary/10 select-none pointer-events-none">
            <BookOpen className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>{boost.scriptureReference}</span>
            </div>

            <blockquote className="font-serif text-lg sm:text-xl lg:text-2xl text-ink-950 font-normal italic leading-relaxed pt-1">
              &ldquo;{boost.scriptureText}&rdquo;
            </blockquote>
          </div>
        </section>

        {/* 2. Editorial Reflection */}
        <section aria-label="Perenungan" className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <h2 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-ink-500">
              REFLEKSI &middot; PERENUNGAN
            </h2>
          </div>

          <div className="text-ink-800 text-base sm:text-lg leading-relaxed space-y-4 whitespace-pre-line font-sans">
            {boost.reflection}
          </div>
        </section>

        {/* 3. Prayer Box (Doa Hari Ini) */}
        {boost.prayer && (
          <section
            aria-label="Doa Hari Ini"
            className="rounded-2xl border border-border bg-[#F5F9FA] p-6 sm:p-8 space-y-3"
          >
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent fill-accent/20" />
              <h2 className="font-display font-bold text-sm sm:text-base text-ink-950">
                Doa Hari Ini
              </h2>
            </div>

            <p className="font-serif italic text-ink-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              &ldquo;{boost.prayer}&rdquo;
            </p>
          </section>
        )}

        {/* 4. Action Strip & Community Link */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Tautan Disalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-ink-600" />
                <span>Bagikan Renungan</span>
              </>
            )}
          </Button>

          <div className="flex items-center gap-3">
            <Link href="/arsip?format=boost">
              <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                Lihat Arsip BOOST
              </Button>
            </Link>
            <Link href="/">
              <Button variant="primary" size="sm" className="w-full sm:w-auto">
                Beranda
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
