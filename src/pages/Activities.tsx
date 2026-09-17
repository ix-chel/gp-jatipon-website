import { Link } from "wouter";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ACTIVITIES } from "../data/mock";

export function Activities() {
  const upcomingActivities = ACTIVITIES.filter(a => a.status === 'upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const completedActivities = ACTIVITIES.filter(a => a.status === 'completed').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col w-full fade-in pb-24">
      {/* Page Header */}
      <section className="bg-surface pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary tracking-tight">
            Kegiatan Kami
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            Ikuti dan libatkan dirimu dalam berbagai kegiatan pelayanan dan persekutuan Gerakan Pemuda Jatipon.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 w-full space-y-24">
        
        {/* Upcoming Activities Section */}
        <section>
          <SectionHeader title="Kegiatan Mendatang" subtitle="Tandai kalendermu dan mari hadir bersama." />
          
          {upcomingActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingActivities.map(activity => (
                <Card key={activity.id} className="flex flex-col h-full bg-background border-accent/20">
                  <CardHeader>
                    <div className="flex items-center text-accent text-sm font-medium mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(activity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <CardTitle className="text-xl hover:text-accent transition-colors">
                      <Link href={`/kegiatan/${activity.slug}`}><a>{activity.title}</a></Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <p className="text-text-muted text-sm">{activity.summary}</p>
                    <div className="flex items-start text-xs text-text-muted bg-surface p-3 rounded-lg border border-white/5">
                      <MapPin className="h-4 w-4 mr-2 text-accent flex-shrink-0 mt-0.5" />
                      <span>{activity.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-white/5 mt-auto">
                    <Link href={`/kegiatan/${activity.slug}`}>
                      <Button variant="primary" className="w-full">
                        Detail Kegiatan
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-4 bg-surface rounded-2xl border border-white/5">
              <Calendar className="h-12 w-12 text-text-muted/30 mx-auto mb-4" />
              <p className="text-text-muted text-lg">Belum ada kegiatan mendatang yang dijadwalkan.</p>
            </div>
          )}
        </section>

        {/* Completed Activities Section */}
        <section>
          <SectionHeader title="Kegiatan Selesai" subtitle="Kilas balik acara yang telah berlangsung." />
          
          {completedActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedActivities.map(activity => (
                <Card key={activity.id} className="flex flex-col h-full bg-surface border-white/5 opacity-80 hover:opacity-100 transition-opacity">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-3">
                      <Badge variant="outline" className="text-[10px] uppercase">Selesai</Badge>
                      <span className="text-xs text-text-muted">
                        {new Date(activity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <CardTitle className="text-lg hover:text-accent transition-colors">
                      <Link href={`/kegiatan/${activity.slug}`}><a>{activity.title}</a></Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-text-muted text-sm line-clamp-2">{activity.summary}</p>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-white/5 mt-auto">
                    <Link href={`/kegiatan/${activity.slug}`}>
                      <a className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors flex items-center">
                        Lihat Arsip <ArrowRight className="ml-1 h-3 w-3" />
                      </a>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 border border-white/5 rounded-2xl border-dashed">
              <p className="text-text-muted text-sm">Tidak ada riwayat kegiatan.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
