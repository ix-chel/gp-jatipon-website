import { useRoute, Link } from "wouter";
import { ArrowLeft, Camera, Calendar, Tag } from "lucide-react";
import { Button } from "../components/ui/Button";
import { ARCHIVES } from "../data/mock";

export function ArchiveDetail() {
  const [, params] = useRoute("/arsip/:slug");
  const slug = (params as Record<string, string> | null)?.slug;
  const archive = ARCHIVES.find((a) => a.slug === slug);

  if (!archive) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 text-center px-4 bg-[#FBF9F5] text-[#16171A]">
        <h2 className="text-3xl font-display font-semibold mb-4">Arsip tidak ditemukan</h2>
        <p className="text-sm text-[#64656C] mb-6">Dokumen atau catatan perjalanan yang Anda cari tidak tersedia.</p>
        <Link href="/arsip">
          <Button variant="outline">Kembali ke Seluruh Arsip</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FBF9F5] text-[#16171A] pb-24">
      {/* Editorial Page Header */}
      <section className="bg-[#F4EFE6]/80 pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#E8E5DF]">
        <div className="max-w-[1320px] mx-auto space-y-6">
          <Link href="/arsip">
            <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#64656C] hover:text-[#16171A] transition-colors cursor-pointer group">
              <ArrowLeft className="h-3.5 w-3.5 mr-2 transition-transform group-hover:-translate-x-1" />
              Kembali ke Seluruh Arsip
            </span>
          </Link>

          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/15 text-[#977317] border border-gold/30">
                <Tag className="w-3 h-3" />
                {archive.category.toUpperCase()}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFECE6] text-[#64656C]">
                <Calendar className="w-3 h-3" />
                {archive.dateDisplay}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-mono text-gold bg-gold/10 border border-gold/20">
                [Pratinjau Prototipe]
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#16171A] leading-[1.15]">
              {archive.title}
            </h1>

            <p className="text-base sm:text-lg text-[#64656C] leading-relaxed">
              {archive.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Documentation Body & Visual Memory */}
      <main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 w-full">
        {archive.galleryImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {archive.galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square bg-[#EDE8DE] rounded-xl overflow-hidden border border-[#DCD5C9] relative group"
              >
                <img
                  src={img}
                  alt={`${archive.title} - Dokumentasi ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto py-16 px-6 text-center rounded-2xl border border-dashed border-[#DCD5C9] bg-white/70 space-y-4">
            {/* GP Corner Motif on Empty State Slot */}
            <div className="relative aspect-[16/10] max-w-md mx-auto rounded-xl bg-[#EDE8DE] border border-[#DCD5C9] flex flex-col items-center justify-center p-6 text-center">
              <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gold">
                  <path d="M0 0H24V24" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <Camera className="h-10 w-10 text-gold mb-3 opacity-80" />
              <p className="font-display font-semibold text-base text-[#16171A]">
                Dokumentasi Visual Dalam Proses Digitalisasi
              </p>
              <p className="text-xs text-[#64656C] mt-1 max-w-xs">
                Foto dan rekaman memori kegiatan ini akan ditampilkan saat arsip historis resmi diverifikasi.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
