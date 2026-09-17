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
      <div className="py-24 text-center">
        <h2 className="text-3xl font-serif text-text-primary mb-4">Kegiatan tidak ditemukan</h2>
        <Link href="/kegiatan">
          <Button variant="outline">Kembali ke Daftar Kegiatan</Button>
        </Link>
      </div>
    );
  }

  const dateObj = new Date(activity.date);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full fade-in">
      <Link href="/kegiatan">
        <a className="inline-flex items-center text-sm text-text-muted hover:text-accent transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Jadwal
        </a>
      </Link>

      <div className="bg-elevated rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="h-48 md:h-64 bg-surface relative flex items-center justify-center border-b border-white/10">
          <div className="absolute inset-0 bg-accent/5 backdrop-blur-3xl" />
          {activity.imageUrl ? (
            <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover relative z-10" />
          ) : (
            <div className="relative z-10 text-center">
              <Calendar className="h-16 w-16 text-white/20 mx-auto mb-2" />
              <span className="text-white/40 text-sm font-medium">Gambar Kegiatan [Placeholder]</span>
            </div>
          )}
        </div>

        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
            <div>
              <div className="flex gap-2 mb-4">
                <Badge variant={activity.status === 'upcoming' ? 'default' : 'secondary'}>
                  {activity.status === 'upcoming' ? 'Segera Hadir' : 'Selesai'}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-text-primary tracking-tight leading-tight mb-4">
                {activity.title}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface/50 rounded-xl p-6 mb-8 border border-white/5">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <div className="text-sm text-text-muted mb-1">Tanggal</div>
                <div className="font-medium text-text-primary">
                  {dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <div className="text-sm text-text-muted mb-1">Waktu</div>
                <div className="font-medium text-text-primary">
                  {dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                </div>
              </div>
            </div>

            <div className="flex items-start md:col-span-2">
              <MapPin className="h-5 w-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <div className="text-sm text-text-muted mb-1">Lokasi</div>
                <div className="font-medium text-text-primary">{activity.location}</div>
              </div>
            </div>
          </div>

          <div className="prose prose-invert prose-blue max-w-none">
            <h3 className="text-xl font-semibold mb-4 text-text-primary">Tentang Kegiatan</h3>
            <div className="text-text-muted leading-relaxed space-y-4">
              <p>{activity.description}</p>
              {/* Additional markdown content would be rendered here */}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
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
