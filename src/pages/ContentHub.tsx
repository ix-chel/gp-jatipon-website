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
    { id: 'boost', label: 'BOOST', href: '/konten/kategori/boost', icon: BookOpen },
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
      <div className="py-24 text-center px-4">
        <h2 className="text-3xl font-serif text-text-primary mb-4">Kategori tidak ditemukan</h2>
        <Link href="/konten">
          <a className="text-accent hover:underline">Kembali ke Semua Konten</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full fade-in pb-24">
      {/* Page Header */}
      <section className="bg-surface pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary tracking-tight">
            Ruang Bertumbuh
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            Nutrisi rohani, opini, dan wawasan untuk perjalanan imanmu.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 w-full">
        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 mb-12 pb-6 border-b border-white/5">
          {categories.map(cat => {
            const isActive = (cat.id === 'all' && !categoryFilter) || (cat.id === activeCategory);
            const Icon = cat.icon;
            
            return (
              <Link key={cat.id} href={cat.href}>
                <a 
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                  "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ring-offset-background",
                  isActive 
                    ? "bg-accent text-background border-accent" 
                    : "bg-surface text-text-muted border-white/10 hover:border-white/20 hover:text-text-primary"
                )}>
                  <Icon className={cn("h-4 w-4 mr-2", isActive ? "text-background" : "text-text-muted")} />
                  {cat.label}
                </a>
              </Link>
            );
          })}
        </div>

        {/* Content Grid */}
        {actualFilteredContents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actualFilteredContents.map(content => (
              <Card key={content.id} className="flex flex-col h-full bg-background border-accent/20 group">
                <div className="h-48 w-full bg-elevated flex items-center justify-center rounded-t-xl relative overflow-hidden border-b border-white/5">
                  <div className="absolute inset-0 bg-accent/5" />
                  {content.category === 'boost' && <BookOpen className="h-10 w-10 text-white/20 relative z-10" />}
                  {content.category === 'podcast' && <Headphones className="h-10 w-10 text-white/20 relative z-10" />}
                  {content.category === 'article' && <FileText className="h-10 w-10 text-white/20 relative z-10" />}
                </div>
                
                <CardHeader className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className="uppercase tracking-wider text-[10px]">
                      {content.category}
                    </Badge>
                    <span className="text-xs text-text-muted">
                      {new Date(content.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-accent transition-colors">
                    <Link href={`/konten/baca/${content.slug}`}><a>{content.title}</a></Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-text-muted line-clamp-3">{content.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-4 border-t border-white/5 mt-auto text-xs text-text-muted flex justify-between items-center">
                  <span>Oleh: <span className="text-text-primary font-medium">{content.author || 'Tim GP'}</span></span>
                  <Link href={`/konten/baca/${content.slug}`}>
                    <a className="text-accent font-medium hover:underline flex items-center">
                      Baca <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 bg-surface rounded-2xl border border-white/5">
            <p className="text-text-muted text-lg">Belum ada konten untuk kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
