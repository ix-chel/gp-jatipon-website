import { Link } from "wouter";
import { ArrowRight, Compass, Users, HandHeart, Sprout, Archive as ArchiveIcon } from "lucide-react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

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
    <div className="flex flex-col w-full fade-in pb-24">
      {/* Page Header */}
      <section className="bg-surface pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Badge variant="outline" className="uppercase tracking-widest text-[10px] text-accent border-accent/30 bg-accent/5">
            [PROVISIONAL INFO]
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary tracking-tight">
            Tentang GP Jatipon
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            Mengenal lebih dekat komunitas pemuda yang dipanggil untuk membawa terang dan kasih.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16">
        <div className="space-y-6 text-text-muted text-lg leading-relaxed">
          <p>
            <strong className="text-text-primary">Gerakan Pemuda GPIB (GP GPIB)</strong> adalah wadah pelayanan bagi pemuda-pemudi di lingkungan Gereja Protestan di Indonesia bagian Barat. Di Jemaat Jatipon, GP hadir sebagai rumah persekutuan, tempat bertumbuh, dan ruang berkarya bagi generasi muda.
          </p>
          <p>
            Kami menyadari bahwa pemuda masa kini menghadapi tantangan yang kompleks. Oleh karena itu, GP Jatipon berkomitmen untuk tidak sekadar menjadi kegiatan rutin gerejawi, melainkan sebuah komunitas di mana setiap individu dapat berlabuh, didengarkan, dan dibimbing menuju kedewasaan iman.
          </p>
        </div>

        {/* The Journey Section */}
        <div className="pt-8 border-t border-white/5">
          <SectionHeader 
            title="Perjalanan Bersama Kami" 
            subtitle="Lima pilar yang menjadi landasan setiap program dan kehadiran kami." 
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {journeys.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="bg-surface border-white/5 hover:border-accent/20 transition-colors">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-muted text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="pt-16 mt-16 border-t border-white/5 text-center space-y-8">
          <h2 className="text-3xl font-serif text-text-primary">Mari Berjalan Bersama</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Gereja bukan sekadar gedung, melainkan umatnya. Jadilah bagian dari apa yang Tuhan sedang kerjakan di tengah-tengah pemuda Jatipon.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/komunitas/join">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Bergabung Sekarang
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
    </div>
  );
}
