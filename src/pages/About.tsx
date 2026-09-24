import { Link } from "wouter";
import { ArrowRight, Compass, Users, HandHeart, Sprout, Archive as ArchiveIcon } from "lucide-react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export function About() {
  const journeys = [
    {
      icon: Compass,
      title: "Discover",
      description: "Menemukan identitas dan memanggil pemuda untuk mengenal kasih Kristus secara mendalam."
    },
    {
      icon: Users,
      title: "Connect",
      description: "Membangun relasi antar pemuda dalam persekutuan yang saling mendukung dan menerima."
    },
    {
      icon: HandHeart,
      title: "Participate",
      description: "Mengambil bagian aktif dalam pelayanan gereja dan membawa dampak bagi masyarakat."
    },
    {
      icon: Sprout,
      title: "Grow",
      description: "Bertumbuh secara spiritual, emosional, dan kepemimpinan melalui pemuridan berkelanjutan."
    },
    {
      icon: ArchiveIcon,
      title: "Archive",
      description: "Merawat ingatan, mendokumentasikan perjalanan iman, dan mensyukuri karya Tuhan."
    }
  ];

  return (
    <div className="flex flex-col w-full pb-24 bg-background text-ink-950">
      {/* Page Header */}
      <section className="bg-white pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-border shadow-subtle">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-accent">
              PROFIL PELAYANAN
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ink-950 tracking-tight">
            Tentang GP Jatipon
          </h1>
          <p className="text-lg md:text-xl text-ink-700 leading-relaxed max-w-2xl mx-auto">
            Mengenal lebih dekat komunitas pemuda yang dipanggil untuk membawa terang dan kasih.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16">
        <div className="space-y-6 text-ink-700 text-base sm:text-lg leading-relaxed">
          <p>
            <strong className="text-ink-950 font-bold">Gerakan Pemuda GPIB (GP GPIB)</strong> adalah wadah pelayanan bagi pemuda-pemudi di lingkungan Gereja Protestan di Indonesia bagian Barat. Di Jemaat Jatipon, GP hadir sebagai rumah persekutuan, tempat bertumbuh, dan ruang berkarya bagi generasi muda.
          </p>
          <p>
            Kami menyadari bahwa pemuda masa kini menghadapi tantangan yang kompleks. Oleh karena itu, GP Jatipon berkomitmen untuk tidak sekadar menjadi kegiatan rutin gerejawi, melainkan sebuah komunitas di mana setiap individu dapat berlabuh, didengarkan, dan dibimbing menuju kedewasaan iman.
          </p>
        </div>

        {/* The Journey Section */}
        <div className="pt-8 border-t border-border">
          <SectionHeader 
            eyebrow="Pilar Pelayanan"
            title="Perjalanan Bersama Kami" 
            subtitle="Lima pilar yang menjadi landasan setiap program dan kehadiran kami." 
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {journeys.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="bg-surface border-border hover:border-secondary hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-ink-500 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Feature Block: Intentional Jatipon Blue Grounding Block */}
        <div className="mt-16 rounded-[24px] bg-primary text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-card">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Keluarga Pemuda</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Mari Berjalan Bersama
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed text-base">
            Gereja bukan sekadar gedung, melainkan umatnya. Jadilah bagian dari apa yang Tuhan sedang kerjakan di tengah-tengah pemuda Jatipon.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link href="/komunitas/join">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto font-semibold bg-white text-primary hover:bg-[#E4F2F6] shadow-sm"
              >
                Bergabung Sekarang
              </Button>
            </Link>
            <Link href="/kegiatan">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto flex items-center justify-center border-white/40 text-white hover:bg-white/10"
              >
                <span>Lihat Kegiatan</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
