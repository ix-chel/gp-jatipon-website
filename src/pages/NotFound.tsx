import { Link } from "wouter";
import { Button } from "../components/ui/Button";

export function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center py-32 px-4 text-center fade-in">
      <h1 className="text-7xl md:text-9xl font-serif text-accent/20 font-bold mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-serif text-text-primary tracking-tight mb-4">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-lg text-text-muted max-w-md mx-auto mb-8">
        Maaf, halaman yang Anda cari mungkin telah dihapus, diubah namanya, atau tidak tersedia untuk saat ini.
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">Kembali ke Beranda</Button>
      </Link>
    </div>
  );
}
