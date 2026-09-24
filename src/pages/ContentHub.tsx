import { Link, useRoute } from "wouter";
import { BookOpen, Headphones, FileText, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { cn } from "../utils/cn";
import { CONTENTS } from "../data/mock";

export function ContentHub() {
  const [, params] = useRoute("/konten/kategori/:category");
  const categoryFilter = (params as Record<string, string> | null)?.category;

  const categories = [
    { id: 'all', label: 'Semua Konten', href: '/konten', icon: BookOpen },
    { id: 'boost', label: 'BOOST (Renungan)', href: '/konten/kategori/boost', icon: BookOpen },
    { id: 'podcast', label: 'Podcast', href: '/konten/kategori/podcast', icon: Headphones },
    { id: 'article', label: 'Artikel', href: '/konten/kategori/article', icon: FileText },
  ];

  const isValidCategory = !categoryFilter || categories.some(c => c.id === categoryFilter);
  const activeCategory = categoryFilter === 'articles' ? 'article' : (categoryFilter || 'all');

  const actualFilteredContents = activeCategory === 'all'
    ? CONTENTS
    : CONTENTS.filter(c => c.category === activeCategory);

  if (!isValidCategory) {
    return (
      <div className="py-24 text-center px-4 bg-background text-ink-950">
        <h2 className="text-3xl font-display font-bold text-ink-950 mb-4">Kategori tidak ditemukan</h2>
        <Link href="/konten">
          <span className="text-primary hover:underline font-semibold cursor-pointer">Kembali ke Semua Konten</span>
        </Link>
      </div>
    );
  }

  const pageTitle = activeCategory === 'boost'
    ? 'Renungan Harian'
    : activeCategory === 'podcast'
      ? 'Jatipon Muda Bersaksi'
      : activeCategory === 'article'
        ? 'Artikel & Opini'
        : 'Ruang Bertumbuh';

  const pageSubtitle = activeCategory === 'boost'
    ? 'Refleksi firman, perenungan iman, dan nutrisi rohani untuk mengawali langkahmu.'
    : 'Nutrisi rohani, opini, dan wawasan untuk perjalanan imanmu.';

  return (
    <div className="flex flex-col w-full pb-24 bg-background text-ink-950">
      {/* Page Header with strong surface contrast */}
      <section className="bg-white pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-border shadow-subtle">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-accent">
              KONTEN &middot; GP JATIPON
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ink-950 tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-ink-700 leading-relaxed max-w-2xl mx-auto">
            {pageSubtitle}
          </p>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 w-full">
        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2.5 mb-12 pb-6 border-b border-border">
          {categories.map(cat => {
            const isActive = (cat.id === 'all' && !categoryFilter) || (cat.id === activeCategory);
            const Icon = cat.icon;

            return (
              <Link key={cat.id} href={cat.href}>
                <span
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                    isActive
                      ? "bg-primary text-white border-primary shadow-subtle"
                      : "bg-white/80 text-ink-700 border-border hover:bg-white hover:text-primary"
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5 mr-2", isActive ? "text-white" : "text-ink-500")} />
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* BOOST transition spotlight banner when category is boost */}
        {categoryFilter === 'boost' && (
          <div className="mb-10 p-6 sm:p-8 rounded-[20px] border border-primary/20 bg-gradient-to-r from-white via-surface to-white shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent font-sans">
                  Pembaruan Fitur: Renungan Harian
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-ink-950">
                BOOST kini hadir langsung di Beranda &amp; Arsip
              </h2>
              <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
                Renungan Sabda Bina Pemuda kini diperbarui setiap hari di Homepage Hero dan tersimpan permanen di Arsip Spiritual GP Jatipon.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link href="/">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-hover transition-colors shadow-subtle cursor-pointer">
                  <span>BOOST Hari Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
              <Link href="/arsip?format=boost">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-white border border-border text-ink-700 hover:text-primary transition-colors cursor-pointer">
                  <span>Buka Arsip BOOST</span>
                </span>
              </Link>
            </div>
          </div>
        )}

        {/* Content Layout Responsive to Content Count */}
        {actualFilteredContents.length === 1 && (
          <div className="max-w-3xl mx-auto">
            {(() => {
              const content = actualFilteredContents[0];
              return (
                <article className="group rounded-[18px] border border-border bg-surface hover:border-secondary hover:shadow-card transition-all duration-300 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                    <div className="md:col-span-5 bg-white/80 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border relative">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                        {content.category === 'boost' && <BookOpen className="h-8 w-8 text-primary" />}
                        {content.category === 'podcast' && <Headphones className="h-8 w-8 text-primary" />}
                        {content.category === 'article' && <FileText className="h-8 w-8 text-primary" />}
                      </div>
                      <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-accent">
                        {content.category === 'boost' ? 'Renungan Unggulan' : 'Konten Pilihan'}
                      </span>
                      <span className="text-xs text-ink-500 mt-1">GP JATIPON</span>
                    </div>

                    <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant={content.category === 'boost' ? 'accent' : 'default'} className="uppercase tracking-wider text-[10px]">
                            {content.category}
                          </Badge>
                          <span className="text-xs text-ink-500 font-medium">
                            {new Date(content.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink-950 group-hover:text-primary transition-colors leading-snug">
                          <Link href={`/konten/baca/${content.slug}`}>{content.title}</Link>
                        </h2>
                        <p className="text-sm sm:text-base text-ink-700 leading-relaxed">
                          {content.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-ink-500">
                        <span>Oleh: <span className="text-ink-950 font-semibold">{content.author || 'Tim GP'}</span></span>
                        <Link href={`/konten/baca/${content.slug}`}>
                          <span className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer text-sm">
                            <span>Baca selengkapnya</span>
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })()}
          </div>
        )}

        {actualFilteredContents.length === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {actualFilteredContents.map(content => (
              <Card key={content.id} className="flex flex-col h-full bg-surface border-border hover:border-secondary hover:shadow-card transition-all duration-300 rounded-[18px] group">
                <div className="h-44 w-full bg-white/70 flex items-center justify-center rounded-t-[18px] relative overflow-hidden border-b border-border">
                  {content.category === 'boost' && <BookOpen className="h-10 w-10 text-primary/40 relative z-10" />}
                  {content.category === 'podcast' && <Headphones className="h-10 w-10 text-primary/40 relative z-10" />}
                  {content.category === 'article' && <FileText className="h-10 w-10 text-primary/40 relative z-10" />}
                </div>

                <CardHeader className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant={content.category === 'boost' ? 'accent' : 'default'} className="uppercase tracking-wider text-[10px]">
                      {content.category}
                    </Badge>
                    <span className="text-xs text-ink-500 font-medium">
                      {new Date(content.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/konten/baca/${content.slug}`}>{content.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-ink-700 line-clamp-3 leading-relaxed">{content.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-4 border-t border-border/60 mt-auto text-xs text-ink-500 flex justify-between items-center">
                  <span>Oleh: <span className="text-ink-950 font-semibold">{content.author || 'Tim GP'}</span></span>
                  <Link href={`/konten/baca/${content.slug}`}>
                    <span className="text-primary font-semibold hover:text-primary-hover flex items-center cursor-pointer">
                      Baca <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {actualFilteredContents.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actualFilteredContents.map(content => (
              <Card key={content.id} className="flex flex-col h-full bg-surface border-border hover:border-secondary hover:shadow-card transition-all duration-300 rounded-[18px] group">
                <div className="h-44 w-full bg-white/70 flex items-center justify-center rounded-t-[18px] relative overflow-hidden border-b border-border">
                  {content.category === 'boost' && <BookOpen className="h-10 w-10 text-primary/40 relative z-10" />}
                  {content.category === 'podcast' && <Headphones className="h-10 w-10 text-primary/40 relative z-10" />}
                  {content.category === 'article' && <FileText className="h-10 w-10 text-primary/40 relative z-10" />}
                </div>

                <CardHeader className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant={content.category === 'boost' ? 'accent' : 'default'} className="uppercase tracking-wider text-[10px]">
                      {content.category}
                    </Badge>
                    <span className="text-xs text-ink-500 font-medium">
                      {new Date(content.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/konten/baca/${content.slug}`}>{content.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-ink-700 line-clamp-3 leading-relaxed">{content.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-4 border-t border-border/60 mt-auto text-xs text-ink-500 flex justify-between items-center">
                  <span>Oleh: <span className="text-ink-950 font-semibold">{content.author || 'Tim GP'}</span></span>
                  <Link href={`/konten/baca/${content.slug}`}>
                    <span className="text-primary font-semibold hover:text-primary-hover flex items-center cursor-pointer">
                      Baca <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {actualFilteredContents.length === 0 && (
          <div className="text-center py-20 px-4 bg-surface rounded-2xl border border-border">
            <p className="text-ink-500 text-lg">Belum ada konten untuk kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
