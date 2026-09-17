import { Link } from "wouter";
import { ArrowRight, Calendar, Heart, Headphones, FileText } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { ACTIVITIES, CONTENTS } from "../data/mock";

export function Home() {
  const upcomingActivities = ACTIVITIES.filter(a => a.status === 'upcoming').slice(0, 3);
  const latestContents = CONTENTS.slice(0, 3);

  return (
    <div className="flex flex-col w-full fade-in">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center min-h-[85vh] px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5">
          <div className="w-[80vw] h-[80vw] max-w-4xl max-h-4xl rounded-full bg-accent blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="flex flex-col items-center gap-3">
            <Badge variant="outline" className="uppercase tracking-widest text-[10px] text-accent border-accent/30 bg-accent/5">
              [REQUIRES CONFIRMATION]
            </Badge>
            <span className="text-sm font-medium tracking-widest uppercase text-text-muted">
              GERAKAN PEMUDA GPIB JATIPON
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-text-primary tracking-tight leading-[1.1]">
            Bertumbuh Bersama. <span className="text-accent italic block sm:inline">Melayani dengan Kasih.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            Ruang bagi pemuda untuk terhubung, bertumbuh dalam iman, melayani, dan berjalan bersama dalam persekutuan GPIB Jatipon.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/tentang-gp">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Kenali GP Jatipon
              </Button>
            </Link>
            <Link href="/kegiatan">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Lihat Kegiatan <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Short GP Introduction */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-surface border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif text-text-primary tracking-tight">
            Menjangkau, Merangkul, dan Melayani.
          </h2>
          <p className="text-lg text-text-muted leading-relaxed max-w-3xl mx-auto">
            Kami percaya bahwa setiap pemuda dipanggil untuk membawa terang Kristus. Di GP Jatipon, kami membangun komunitas yang saling mendukung, mengembangkan potensi, dan berdampak nyata bagi sesama.
          </p>
        </div>
      </section>

      {/* Upcoming Activities */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <SectionHeader 
              title="Kegiatan Terdekat" 
              subtitle="Mari hadir dan bersekutu bersama." 
              className="mb-0"
            />
            <Link href="/kegiatan">
              <Button variant="ghost" className="text-accent hover:bg-accent/10">
                Semua Kegiatan <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {upcomingActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingActivities.map(activity => (
                <Card key={activity.id} className="flex flex-col h-full group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center text-accent text-sm font-medium mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(activity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors">
                      {activity.title}
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {activity.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-4 border-t border-white/5">
                    <Link href={`/kegiatan/${activity.slug}`}>
                      <a className="text-sm font-medium text-text-primary hover:text-accent transition-colors">
                        Detail Kegiatan &rarr;
                      </a>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-surface rounded-2xl border border-white/5">
              <p className="text-text-muted">Belum ada kegiatan terdekat saat ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Content Spotlight */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <SectionHeader 
              title="Terbaru dari Kami" 
              subtitle="Nutrisi rohani, opini, dan wawasan untuk perjalanan imanmu." 
              className="mb-0"
            />
            <Link href="/konten">
              <Button variant="ghost" className="text-accent hover:bg-accent/10">
                Lihat Semua Konten <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {latestContents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestContents.map(content => (
                <Card key={content.id} className="flex flex-col h-full border-transparent bg-background shadow-none">
                  <div className="h-48 w-full bg-elevated flex items-center justify-center rounded-t-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent/5" />
                    {content.category === 'boost' && <Heart className="h-10 w-10 text-white/20 relative z-10" />}
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
                    <CardTitle className="text-xl line-clamp-2 hover:text-accent transition-colors">
                      <Link href={`/konten/baca/${content.slug}`}><a>{content.title}</a></Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-text-muted line-clamp-3">{content.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-background rounded-2xl border border-white/5">
              <p className="text-text-muted">Belum ada konten saat ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* Community Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-accent text-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight font-bold">
            Kamu Tidak Sendiri.
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Temukan keluarga baru, layani sesama, dan mari kita bertumbuh bersama.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/komunitas/join">
              <Button size="lg" className="bg-background text-accent hover:bg-background/90 font-bold w-full sm:w-auto">
                Gabung Komunitas
              </Button>
            </Link>
            <Link href="/komunitas/titip-doa">
              <Button size="lg" className="border-background text-background hover:bg-background/10 bg-transparent w-full sm:w-auto border">
                Titip Doa
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
