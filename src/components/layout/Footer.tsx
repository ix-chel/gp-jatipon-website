import { Link } from "wouter";
import { MapPin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-background mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand & Intro */}
          <div className="md:col-span-1">
            <Link href="/">
              <a className="font-serif text-2xl font-bold tracking-tight text-text-primary inline-block mb-4">
                GP Jatipon
              </a>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Rumah digital pemuda Gereja Protestan di Indonesia bagian Barat (GPIB) Jemaat Jatipon Bekasi. Menjangkau, merangkul, dan melayani.
            </p>
            <div className="flex items-center space-x-4 text-text-muted">
              {/* <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Camera className="h-5 w-5" />
              </a> */}
              <Link href="/contact">
                <a className="hover:text-accent transition-colors" aria-label="Contact">
                  <Mail className="h-5 w-5" />
                </a>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4 tracking-wide text-sm uppercase">Navigasi</h3>
            <ul className="space-y-3 text-sm text-text-muted">
              <li><Link href="/tentang-gp"><a className="hover:text-accent transition-colors">Tentang Kami</a></Link></li>
              <li><Link href="/kegiatan"><a className="hover:text-accent transition-colors">Kegiatan & Acara</a></Link></li>
              <li><Link href="/konten/kategori/boost"><a className="hover:text-accent transition-colors">Renungan BOOST</a></Link></li>
              <li><Link href="/arsip"><a className="hover:text-accent transition-colors">Arsip Perjalanan</a></Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4 tracking-wide text-sm uppercase">Komunitas</h3>
            <ul className="space-y-3 text-sm text-text-muted">
              <li><Link href="/komunitas/join"><a className="hover:text-accent transition-colors">Gabung GP</a></Link></li>
              <li><Link href="/komunitas/volunteer"><a className="hover:text-accent transition-colors">Menjadi Volunteer</a></Link></li>
              <li><Link href="/komunitas/titip-doa"><a className="hover:text-accent transition-colors">Titip Doa</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-accent transition-colors">Hubungi Kami</a></Link></li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4 tracking-wide text-sm uppercase">Lokasi</h3>
            <ul className="space-y-3 text-sm text-text-muted">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-accent flex-shrink-0 mt-0.5" />
                <span>
                  GPIB Jemaat "Jatipon" Bekasi<br/>
                  <span className="opacity-70 text-xs mt-1 block">[Alamat Lengkap Akan Ditambahkan Nanti]</span>
                </span>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-text-muted">
          <p>&copy; {currentYear} Gerakan Pemuda GPIB Jatipon Bekasi. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-text-primary transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-text-primary transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
