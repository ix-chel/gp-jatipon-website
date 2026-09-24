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
    <div className="flex flex-col w-full pb-24 bg-background text-ink-950">
      {/* Page Header */}
      <section className="bg-white/40 pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ink-950 tracking-tight">
            Kegiatan Kami
          </h1>
          <p className="text-lg md:text-xl text-ink-700 leading-relaxed max-w-2xl mx-auto">
            Ikuti dan libatkan dirimu dalam berbagai kegiatan pelayanan dan persekutuan Gerakan Pemuda Jatipon.
          </p>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 w-full space-y-20">
        
        {/* Upcoming Activities Section */}
        <section>
          <SectionHeader 
            eyebrow="Jadwal Mendatang"
            title="Kegiatan Mendatang" 
            subtitle="Tandai kalendermu dan mari hadir bersama." 
          />
          
          {upcomingActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingActivities.map(activity => (
                <Card key={activity.id} className="flex flex-col h-full bg-surface border-border hover:border-secondary hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center text-accent text-sm font-semibold mb-3">
                      <Calendar className="h-4 w-4 mr-2 text-accent" />
                      {new Date(activity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <CardTitle className="text-xl font-bold hover:text-primary transition-colors">
                      <Link href={`/kegiatan/${activity.slug}`}>{activity.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <p className="text-ink-700 text-sm leading-relaxed">{activity.summary}</p>
                    <div className="flex items-start text-xs text-ink-700 bg-white p-3 rounded-xl border border-border">
                      <MapPin className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>{activity.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-border/60 mt-auto">
                    <Link href={`/kegiatan/${activity.slug}`} className="w-full">
                      <Button variant="primary" className="w-full">
                        Detail Kegiatan
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-4 bg-surface rounded-2xl border border-border">
              <Calendar className="h-12 w-12 text-ink-400 mx-auto mb-4 opacity-50" />
              <p className="text-ink-500 text-lg">Belum ada kegiatan mendatang yang dijadwalkan.</p>
            </div>
          )}
        </section>

        {/* Completed Activities Section */}
        <section>
          <SectionHeader 
            eyebrow="Arsip Kegiatan"
            title="Kegiatan Selesai" 
            subtitle="Kilas balik acara yang telah berlangsung." 
          />
          
          {completedActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedActivities.map(activity => (
                <Card key={activity.id} className="flex flex-col h-full bg-surface border-border opacity-90 hover:opacity-100 hover:border-secondary transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-3">
                      <Badge variant="outline" className="text-[10px] uppercase">Selesai</Badge>
                      <span className="text-xs text-ink-500">
                        {new Date(activity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold hover:text-primary transition-colors">
                      <Link href={`/kegiatan/${activity.slug}`}>{activity.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-ink-700 text-sm line-clamp-2 leading-relaxed">{activity.summary}</p>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-border/60 mt-auto">
                    <Link href={`/kegiatan/${activity.slug}`}>
                      <span className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors flex items-center cursor-pointer">
                        Lihat Arsip <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 border border-dashed border-border rounded-2xl bg-surface/50">
              <p className="text-ink-500 text-sm">Tidak ada riwayat kegiatan.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
