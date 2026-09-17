import { useRoute, Link } from "wouter";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Button } from "../components/ui/Button";
import { ARCHIVES } from "../data/mock";

export function ArchiveDetail() {
  const [, params] = useRoute("/arsip/:slug");
  const slug = (params as Record<string, string> | null)?.slug;
  const archive = ARCHIVES.find(a => a.slug === slug);

  if (!archive) {
    return (
      <div className="py-24 text-center px-4">
        <h2 className="text-3xl font-serif text-text-primary mb-4">Arsip tidak ditemukan</h2>
        <Link href="/arsip">
          <Button variant="outline">Kembali ke Arsip Utama</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full fade-in pb-24">
      {/* Page Header */}
      <section className="bg-surface pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-5xl mx-auto space-y-6">
          <Link href="/arsip">
            <a className="inline-flex items-center text-sm text-text-muted hover:text-accent transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Arsip
            </a>
          </Link>
          
          <div className="mt-6">
            <div className="inline-block text-accent font-bold tracking-widest text-sm mb-3 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
              Tahun {archive.year}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-text-primary tracking-tight leading-tight mb-6">
              {archive.title}
            </h1>
            <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-3xl">
              {archive.description}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 w-full">
        {archive.galleryImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {archive.galleryImages.map((img, idx) => (
              <div key={idx} className="aspect-square bg-surface rounded-xl overflow-hidden border border-white/5 relative group">
                <img src={img} alt={`${archive.title} - Foto ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-surface rounded-2xl border border-white/5 flex flex-col items-center justify-center max-w-3xl mx-auto">
            <ImageIcon className="h-16 w-16 text-text-muted opacity-30 mb-4" />
            <h3 className="text-2xl font-serif text-text-primary mb-2">Album Sedang Disiapkan</h3>
            <p className="text-text-muted text-sm">Foto-foto dokumentasi kegiatan ini akan diunggah segera.</p>
          </div>
        )}
      </div>
    </div>
  );
}
