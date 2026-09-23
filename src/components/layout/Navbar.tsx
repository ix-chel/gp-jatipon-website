import { useState, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";
import { GpLogo } from "../brand/GpLogo";

const NAV_LINKS = [
  { href: "/tentang-gp", label: "Tentang" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/konten", label: "Cerita" },
  { href: "/konten/kategori/boost", label: "Renungan" },
  { href: "/arsip", label: "Arsip" },
  { href: "/komunitas", label: "Komunitas" },
];

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const [isActive] = useRoute(href === "/" ? "/" : `${href}*`);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "text-[13px] tracking-normal transition-colors py-1 px-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        isActive
          ? "text-[#16171A] font-semibold border-b-2 border-accent"
          : "text-[#64656C] hover:text-[#16171A] font-medium"
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#16171A]/10 shadow-sm"
          : "bg-[#FBF9F5]/90 backdrop-blur-sm border-b border-[#16171A]/05"
      )}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* GP Dominant Brand Identity (Header Requirement 1 & 5) */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1"
            >
              {/* GP Visual Mark (Placeholder slot for user's logo) */}
              <GpLogo size="md" variant="light" className="group-hover:scale-105 transition-transform" />

              <div className="flex flex-col">
                <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-[#16171A] group-hover:text-accent transition-colors leading-none">
                  GP JATIPON
                </span>
                <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-gold mt-1 leading-none">
                  Gerakan Pemuda
                </span>
                <span className="font-sans text-[10px] tracking-tight text-[#64656C] mt-1 font-normal leading-none">
                  Bagian dari GPIB Jemaat Jatipon Bekasi
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation (Youth Domains) */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* Desktop Primary CTA: Ikut Kegiatan */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/kegiatan">
              <Button
                variant="primary"
                size="sm"
                className="font-semibold shadow-sm hover:shadow-md flex items-center gap-1.5"
              >
                <span>Ikut Kegiatan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              className="text-[#16171A] hover:text-accent p-2 -mr-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#16171A]/10 bg-[#FBF9F5] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2 pt-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#16171A] hover:text-accent py-2 px-3 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-[#16171A]/10">
            <Link href="/kegiatan" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="primary"
                className="w-full justify-center flex items-center gap-2"
              >
                <span>Ikut Kegiatan</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

