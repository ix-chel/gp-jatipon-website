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
      <div className="py-24 text-center px-4">
        <h2 className="text-3xl font-serif text-text-primary mb-4">Konten tidak ditemukan</h2>
        <Link href="/konten">
          <Button variant="outline">Kembali ke Semua Konten</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full fade-in pb-24">
      {/* Page Header */}
      <section className="bg-surface pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-3xl mx-auto space-y-6">
          <Link href="/konten">
            <a className="inline-flex items-center text-sm text-text-muted hover:text-accent transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Daftar Konten
            </a>
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mt-6">
            <Badge className="uppercase tracking-widest text-[10px]">{content.category}</Badge>
            <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
              <Calendar className="h-4 w-4" />
              {new Date(content.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
              <User className="h-4 w-4" />
              {content.author || 'Tim GP'}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary tracking-tight leading-tight mt-4">
            {content.title}
          </h1>
        </div>
      </section>

      <article className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12">
        {content.mediaUrl && content.category === 'podcast' && (
          <div className="mb-12 w-full bg-surface rounded-2xl p-8 flex flex-col items-center justify-center border border-white/5">
            <Headphones className="h-12 w-12 text-text-muted mb-4 opacity-50" />
            <p className="text-text-primary font-medium mb-2">Podcast Preview</p>
            <div className="text-sm text-text-muted bg-background px-4 py-2 rounded-lg border border-white/5 max-w-full truncate">
              {content.mediaUrl}
            </div>
            <p className="text-xs text-text-muted/50 mt-4">[Pemutar eksternal akan dirender di sini]</p>
          </div>
        )}

        {content.imageUrl ? (
          <div className="mb-12 rounded-2xl overflow-hidden border border-white/5">
            <img src={content.imageUrl} alt={content.title} className="w-full h-auto object-cover" />
          </div>
        ) : (
          !content.mediaUrl && (
            <div className="mb-12 w-full h-48 bg-surface rounded-2xl border border-white/5 flex items-center justify-center">
              {content.category === 'boost' && <BookOpen className="h-12 w-12 text-text-muted opacity-20" />}
              {content.category === 'article' && <FileText className="h-12 w-12 text-text-muted opacity-20" />}
              {content.category === 'podcast' && <Headphones className="h-12 w-12 text-text-muted opacity-20" />}
            </div>
          )
        )}

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-accent prose-p:text-text-muted prose-p:leading-relaxed">
          {content.category === 'boost' && (
            <div className="border-l-2 border-accent pl-6 py-2 mb-10 text-xl md:text-2xl font-serif text-text-primary italic leading-relaxed">
              "{content.excerpt}"
            </div>
          )}
          
          <div className="space-y-6 text-text-muted">
            <p>{content.content}</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" /> Bagikan
          </Button>
        </div>
      </article>
    </div>
  );
}
