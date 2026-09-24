import React, { useState } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full pb-24 bg-background text-ink-950">
      {/* Page Header */}
      <section className="bg-white pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-border shadow-subtle">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-accent">
              HUBUNGI KAMI
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ink-950 tracking-tight">
            Hubungi Kami
          </h1>
          <p className="text-lg md:text-xl text-ink-700 leading-relaxed max-w-2xl mx-auto">
            Ada pertanyaan atau ingin menjalin kemitraan? Jangan ragu untuk menyapa kami.
          </p>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-surface border-border shadow-subtle rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-1">Informasi Kontak</CardTitle>
                <p className="text-ink-500 text-sm">Informasi di bawah ini merupakan data sementara (placeholder).</p>
              </CardHeader>
              <CardContent className="space-y-6 pt-2">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mr-4 flex-shrink-0 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="mt-0.5">
                    <h4 className="font-bold text-ink-950 text-sm mb-1">Lokasi Gereja</h4>
                    <p className="text-ink-700 text-sm leading-relaxed">
                      GPIB Jemaat "Jatipon" Bekasi<br/>
                      [Alamat Resmi Akan Ditambahkan Nanti]
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mr-4 flex-shrink-0 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="mt-0.5">
                    <h4 className="font-bold text-ink-950 text-sm mb-1">Email</h4>
                    <p className="text-ink-700 text-sm">[Email Resmi Akan Ditambahkan Nanti]</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mr-4 flex-shrink-0 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="mt-0.5">
                    <h4 className="font-bold text-ink-950 text-sm mb-1">Telepon / WhatsApp</h4>
                    <p className="text-ink-700 text-sm">[Nomor Resmi Akan Ditambahkan Nanti]</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="w-full h-44 bg-surface rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-center p-6">
              <MapPin className="h-8 w-8 text-secondary mb-2 opacity-60" />
              <p className="text-ink-500 text-sm">Peta Interaktif Belum Tersedia</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-4 sm:p-8 bg-surface border-border shadow-card rounded-2xl">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl md:text-3xl font-bold">Kirim Pesan</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0 pt-2">
                {isSuccess ? (
                  <div className="py-12 text-center h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-primary/10 border border-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-2 text-ink-950">Pesan Terkirim!</h3>
                    <p className="text-ink-700 text-sm mb-6 max-w-sm mx-auto">
                      Terima kasih telah menghubungi kami. Tim kami akan merespons (Simulasi).
                    </p>
                    <Button variant="outline" onClick={() => setIsSuccess(false)}>Kirim Pesan Lain</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-semibold text-ink-950 uppercase tracking-wider">Nama Lengkap</label>
                        <Input id="name" type="text" placeholder="Masukkan nama..." required />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="contact" className="text-xs font-semibold text-ink-950 uppercase tracking-wider">Email / No. WA</label>
                        <Input id="contact" type="text" placeholder="Kontak yang bisa dihubungi..." required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-xs font-semibold text-ink-950 uppercase tracking-wider">Subjek</label>
                      <Input id="subject" type="text" placeholder="Hal yang ingin ditanyakan..." required />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-semibold text-ink-950 uppercase tracking-wider">Pesan</label>
                      <Textarea id="message" placeholder="Tulis pesan lengkap Anda di sini..." required className="h-32 resize-none" />
                    </div>
                    
                    {/* Honeypot */}
                    <input type="text" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                    <div className="pt-2">
                      <Button type="submit" variant="primary" className="w-full h-11 text-sm font-semibold" disabled={isSubmitting}>
                        {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'} <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-white border border-border rounded-xl mt-4 text-center">
                      <p className="text-xs text-ink-500">
                        <strong className="text-ink-950">Catatan Simulasi:</strong> Formulir ini hanya simulasi. Pesan tidak akan dikirim.
                      </p>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
