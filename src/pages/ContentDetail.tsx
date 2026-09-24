import { useRoute, Link } from "wouter";
import { ArrowLeft, User, Calendar, Share2, Headphones, FileText, BookOpen } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { CONTENTS } from "../data/mock";

export function ContentDetail() {
  const [, params] = useRoute("/konten/baca/:slug");
  const slug = (params as Record<string, string> | null)?.slug;
  const content = CONTENTS.find(c => c.slug === slug);

  if (!content) {
    return (
      <div className="py-24 text-center px-4 bg-background text-ink-950">
        <h2 className="text-3xl font-display font-bold text-ink-950 mb-4">Konten tidak ditemukan</h2>
        <Link href="/konten">
          <Button variant="outline">Kembali ke Semua Konten</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-24 bg-background text-ink-950">
      {/* Page Header */}
      <section className="bg-white/40 pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-3xl mx-auto space-y-6">
          <Link href="/konten">
            <span className="inline-flex items-center text-sm font-semibold text-ink-500 hover:text-primary transition-colors cursor-pointer">
              <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Daftar Konten
            </span>
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-500 mt-6">
            <Badge variant={content.category === 'boost' ? 'accent' : 'default'} className="uppercase tracking-widest text-[10px]">
              {content.category}
            </Badge>
            <div className="flex items-center gap-1.5 border-l border-border pl-3">
              <Calendar className="h-4 w-4 text-primary" />
              {new Date(content.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-1.5 border-l border-border pl-3">
              <User className="h-4 w-4 text-primary" />
              {content.author || 'Tim GP'}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-ink-950 tracking-tight leading-tight mt-4">
            {content.title}
          </h1>
        </div>
      </section>

      <article className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12">
        {content.mediaUrl && content.category === 'podcast' && (
          <div className="mb-12 w-full bg-surface rounded-2xl p-8 flex flex-col items-center justify-center border border-border shadow-subtle">
            <Headphones className="h-12 w-12 text-primary mb-4 opacity-80" />
            <p className="text-ink-950 font-bold mb-2">Podcast Preview</p>
            <div className="text-sm text-ink-700 bg-white px-4 py-2 rounded-lg border border-border max-w-full truncate">
              {content.mediaUrl}
            </div>
            <p className="text-xs text-ink-400 mt-4">[Pemutar eksternal akan dirender di sini]</p>
          </div>
        )}

        {content.imageUrl ? (
          <div className="mb-12 rounded-2xl overflow-hidden border border-border shadow-subtle">
            <img src={content.imageUrl} alt={content.title} className="w-full h-auto object-cover" />
          </div>
        ) : (
          !content.mediaUrl && (
            <div className="mb-12 w-full h-48 bg-surface rounded-2xl border border-border flex items-center justify-center">
              {content.category === 'boost' && <BookOpen className="h-12 w-12 text-primary/30" />}
              {content.category === 'article' && <FileText className="h-12 w-12 text-primary/30" />}
              {content.category === 'podcast' && <Headphones className="h-12 w-12 text-primary/30" />}
            </div>
          )
        )}

        <div className="prose max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-ink-950 prose-a:text-primary prose-p:text-ink-700 prose-p:leading-relaxed">
          {content.category === 'boost' && (
            <div className="border-l-2 border-accent pl-6 py-2 mb-10 text-xl md:text-2xl font-display text-ink-950 italic leading-relaxed bg-white/50 rounded-r-xl">
              "{content.excerpt}"
            </div>
          )}
          
          <div className="space-y-6 text-ink-700 text-base leading-relaxed">
            <p>{content.content}</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" /> Bagikan
          </Button>
        </div>
      </article>
    </div>
  );
}
