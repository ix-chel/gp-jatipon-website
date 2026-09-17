import { useState, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tentang-gp", label: "Tentang GP" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/konten", label: "Konten" },
  { href: "/komunitas", label: "Komunitas" },
  { href: "/arsip", label: "Arsip" },
  { href: "/contact", label: "Contact" },
];

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const [isActive] = useRoute(href === "/" ? "/" : `${href}/*`);
  
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "text-sm font-medium transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ring-offset-background rounded-sm",
          isActive ? "text-accent" : "text-text-primary"
        )}
      >
        {label}
      </a>
    </Link>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
        isScrolled ? "glass-panel border-white/10" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <a className="font-serif text-2xl font-bold tracking-tight text-text-primary hover:text-accent transition-colors">
                GP Jatipon
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link href="/komunitas/join">
              <Button variant="primary" size="sm">Ikut Bersama Kami</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              className="text-text-primary hover:text-accent p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 w-full glass-panel border-t border-white/10 transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={() => setMobileMenuOpen(false)}
            />
          ))}
          <div className="pt-4 border-t border-white/10">
            <Link href="/komunitas/join">
              <Button variant="primary" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                Ikut Bersama Kami
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
