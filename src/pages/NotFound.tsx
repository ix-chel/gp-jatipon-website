import { Link } from "wouter";
import { Button } from "../components/ui/Button";

export function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center py-32 px-4 text-center bg-background text-ink-950">
      <h1 className="text-7xl md:text-9xl font-display text-primary/20 font-extrabold mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-ink-950 tracking-tight mb-4">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-base md:text-lg text-ink-700 max-w-md mx-auto mb-8 leading-relaxed">
        Maaf, halaman yang Anda cari mungkin telah dihapus, diubah namanya, atau tidak tersedia untuk saat ini.
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">Kembali ke Beranda</Button>
      </Link>
    </div>
  );
}
