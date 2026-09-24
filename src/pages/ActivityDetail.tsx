import { useRoute, Link } from "wouter";
import { Calendar, MapPin, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ACTIVITIES } from "../data/mock";

export function ActivityDetail() {
  const [, params] = useRoute("/kegiatan/:slug");
  const slug = (params as Record<string, string> | null)?.slug;
  const activity = ACTIVITIES.find(a => a.slug === slug);

  if (!activity) {
    return (
      <div className="py-24 text-center px-4 bg-background text-ink-950">
        <h2 className="text-3xl font-display font-bold text-ink-950 mb-4">Kegiatan tidak ditemukan</h2>
        <Link href="/kegiatan">
          <Button variant="outline">Kembali ke Daftar Kegiatan</Button>
        </Link>
      </div>
    );
  }

  const dateObj = new Date(activity.date);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full bg-background text-ink-950">
      <Link href="/kegiatan">
        <span className="inline-flex items-center text-sm font-semibold text-ink-500 hover:text-primary transition-colors mb-8 cursor-pointer">
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Jadwal
        </span>
      </Link>

      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-card">
        <div className="h-48 md:h-64 bg-white/70 relative flex items-center justify-center border-b border-border">
          {activity.imageUrl ? (
            <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover relative z-10" />
          ) : (
            <div className="relative z-10 text-center">
              <Calendar className="h-16 w-16 text-secondary mx-auto mb-2 opacity-60" />
              <span className="text-ink-500 text-sm font-medium">Gambar Kegiatan [Placeholder]</span>
            </div>
          )}
        </div>

        <div className="p-6 md:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <div className="flex gap-2 mb-4">
                <Badge variant={activity.status === 'upcoming' ? 'default' : 'outline'}>
                  {activity.status === 'upcoming' ? 'Segera Hadir' : 'Selesai'}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-ink-950 tracking-tight leading-tight">
                {activity.title}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl p-6 border border-border shadow-subtle">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-1">Tanggal</div>
                <div className="font-semibold text-ink-950 text-sm">
                  {dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-1">Waktu</div>
                <div className="font-semibold text-ink-950 text-sm">
                  {dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                </div>
              </div>
            </div>

            <div className="flex items-start md:col-span-2 pt-4 border-t border-border/60">
              <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-1">Lokasi</div>
                <div className="font-semibold text-ink-950 text-sm">{activity.location}</div>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-xl font-display font-bold mb-4 text-ink-950">Tentang Kegiatan</h3>
            <div className="text-ink-700 leading-relaxed space-y-4">
              <p>{activity.description}</p>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            {activity.status === 'upcoming' && (
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Daftar Kehadiran
              </Button>
            )}
            <Button variant="outline" size="lg" className="w-full sm:w-auto ml-auto">
              <Share2 className="h-4 w-4 mr-2" /> Bagikan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
