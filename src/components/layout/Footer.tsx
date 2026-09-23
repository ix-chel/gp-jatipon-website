import { Link } from "wouter";
import { MapPin, Mail } from "lucide-react";
import { GpLogo } from "../brand/GpLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#111215] text-[#FBF9F5] mt-auto">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* GP Dominant Brand Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm group">
              <GpLogo size="md" variant="dark" className="group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-gold transition-colors leading-none">
                    GPIB JATIPON
                  </span>
                  <span className="font-sans text-[11px] font-semibold tracking-wider uppercase text-gold">
                    Gerakan Pemuda
                  </span>
                </div>
                <span className="font-sans text-[10px] tracking-wide text-[#9496A1] mt-0.5 font-normal">
                  Bagian dari GPIB Jemaat Jatipon Bekasi
                </span>
              </div>
            </Link>

            <p className="text-[#9496A1] text-sm leading-relaxed max-w-sm">
              Ruang persekutuan, pertumbuhan iman, dan aksi nyata generasi muda GPIB Jatipon.
              Temukan ruang untuk bertumbuh, melayani, dan hadir bagi sesama.
            </p>

            <div className="flex items-center space-x-3 text-[#9496A1] pt-1">
              <Link href="/contact">
                <span className="hover:text-gold transition-colors p-1.5 rounded-md hover:bg-white/5 inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                  <Mail className="h-4 w-4" />
                  <span>Kontak GP</span>
                </span>
              </Link>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold transition-colors p-1.5 rounded-md hover:bg-white/5 inline-flex items-center gap-1.5 text-xs font-medium"
              >
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Navigation: Jelajahi GP (2 cols) */}
          <div className="md:col-span-2">
            <h3 className="font-sans font-semibold text-white mb-4 tracking-wider text-xs uppercase">
              Jelajahi
            </h3>
            <ul className="space-y-3 text-sm text-[#9496A1]">
              <li>
                <Link href="/tentang-gp">
                  <span className="hover:text-gold transition-colors cursor-pointer">Tentang GP</span>
                </Link>
              </li>
              <li>
                <Link href="/kegiatan">
                  <span className="hover:text-gold transition-colors cursor-pointer">Kegiatan</span>
                </Link>
              </li>
              <li>
                <Link href="/konten">
                  <span className="hover:text-gold transition-colors cursor-pointer">Cerita</span>
                </Link>
              </li>
              <li>
                <Link href="/konten/kategori/boost">
                  <span className="hover:text-gold transition-colors cursor-pointer">Renungan</span>
                </Link>
              </li>
              <li>
                <Link href="/arsip">
                  <span className="hover:text-gold transition-colors cursor-pointer">Arsip GP</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation: Komunitas & Aksi (2 cols) */}
          <div className="md:col-span-2">
            <h3 className="font-sans font-semibold text-white mb-4 tracking-wider text-xs uppercase">
              Komunitas
            </h3>
            <ul className="space-y-3 text-sm text-[#9496A1]">
              <li>
                <Link href="/kegiatan">
                  <span className="hover:text-gold transition-colors cursor-pointer">Ikut Kegiatan</span>
                </Link>
              </li>
              <li>
                <Link href="/komunitas/join">
                  <span className="hover:text-gold transition-colors cursor-pointer">Gabung GP</span>
                </Link>
              </li>
              <li>
                <Link href="/komunitas/volunteer">
                  <span className="hover:text-gold transition-colors cursor-pointer">Menjadi Volunteer</span>
                </Link>
              </li>
              <li>
                <Link href="/komunitas/titip-doa">
                  <span className="hover:text-gold transition-colors cursor-pointer">Titip Doa</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Location / Organizational Context (3 cols) */}
          <div className="md:col-span-3">
            <h3 className="font-sans font-semibold text-white mb-4 tracking-wider text-xs uppercase">
              Sekretariat & Persekutuan
            </h3>
            <div className="space-y-3 text-xs text-[#9496A1]">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2.5 text-gold flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Gedung Pertemuan Pemuda<br />
                  GPIB Jemaat Jatipon Bekasi<br />
                  Jl. Jatipon, Pondok Gede, Bekasi
                </span>
              </div>
              <p className="text-[11px] text-[#64656C] pt-3 border-t border-white/10">
                Gerakan Pemuda bersekutu dan melayani dalam naungan GPIB Jemaat Jatipon Bekasi.
              </p>
            </div>
          </div>

        </div>

        {/* Legal & Subordinate Attribution Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#64656C] gap-4">
          <p>&copy; {currentYear} Gerakan Pemuda GP Jatipon · Bagian dari GPIB Jemaat Jatipon Bekasi</p>
          <div className="flex items-center space-x-6">
            <Link href="/contact">
              <span className="hover:text-[#9496A1] transition-colors cursor-pointer">Hubungi Kami</span>
            </Link>
            <span className="text-white/20">•</span>
            <span className="text-gold font-serif italic">Soli Deo Gloria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

