import React, { useState } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

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
    <div className="flex flex-col w-full fade-in pb-24">
      {/* Page Header */}
      <section className="bg-surface pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Badge variant="outline" className="uppercase tracking-widest text-[10px] text-accent border-accent/30 bg-accent/5">
            [PROVISIONAL INFO]
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary tracking-tight">
            Hubungi Kami
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            Ada pertanyaan atau ingin menjalin kemitraan? Jangan ragu untuk menyapa kami.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-surface border-white/5">
              <CardHeader>
                <CardTitle className="text-2xl font-serif mb-2">Informasi Kontak</CardTitle>
                <p className="text-text-muted text-sm">Informasi di bawah ini merupakan data sementara (placeholder).</p>
              </CardHeader>
              <CardContent className="space-y-8 pt-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-background border border-white/5 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div className="mt-1">
                    <h4 className="font-semibold text-text-primary mb-1">Lokasi Gereja</h4>
                    <p className="text-text-muted text-sm leading-relaxed">
                      GPIB Jemaat "Jatipon" Bekasi<br/>
                      [Alamat Resmi Akan Ditambahkan Nanti]
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-background border border-white/5 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div className="mt-1">
                    <h4 className="font-semibold text-text-primary mb-1">Email</h4>
                    <p className="text-text-muted text-sm">[Email Resmi Akan Ditambahkan Nanti]</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-background border border-white/5 flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div className="mt-1">
                    <h4 className="font-semibold text-text-primary mb-1">Telepon / WhatsApp</h4>
                    <p className="text-text-muted text-sm">[Nomor Resmi Akan Ditambahkan Nanti]</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="w-full h-48 bg-surface rounded-xl border border-white/5 flex flex-col items-center justify-center text-center p-6">
              <MapPin className="h-10 w-10 text-text-muted opacity-30 mb-2" />
              <p className="text-text-muted text-sm">Peta Interaktif Belum Tersedia</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-2 md:p-6 h-full bg-surface border-white/5 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-serif">Kirim Pesan</CardTitle>
              </CardHeader>
              <CardContent>
                {isSuccess ? (
                  <div className="py-16 text-center h-full flex flex-col items-center justify-center fade-in">
                    <div className="w-20 h-20 bg-surface border border-white/5 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="h-10 w-10" />
                    </div>
                    <h3 className="text-3xl font-serif font-semibold mb-4 text-text-primary">Pesan Terkirim!</h3>
                    <p className="text-text-muted text-base mb-8 max-w-sm mx-auto">
                      Terima kasih telah menghubungi kami. Tim kami akan merespons (Simulasi).
                    </p>
                    <Button variant="outline" onClick={() => setIsSuccess(false)}>Kirim Pesan Lain</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-text-primary">Nama Lengkap</label>
                        <Input id="name" type="text" placeholder="Masukkan nama..." required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact" className="text-sm font-medium text-text-primary">Email / No. WA</label>
                        <Input id="contact" type="text" placeholder="Kontak yang bisa dihubungi..." required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-text-primary">Subjek</label>
                      <Input id="subject" type="text" placeholder="Hal yang ingin ditanyakan..." required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-text-primary">Pesan</label>
                      <Textarea id="message" placeholder="Tulis pesan lengkap Anda di sini..." required className="h-32 resize-none" />
                    </div>
                    
                    {/* Honeypot */}
                    <input type="text" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                    <div className="pt-4">
                      <Button type="submit" variant="primary" className="w-full h-12 text-base font-medium" disabled={isSubmitting}>
                        {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'} <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-background border border-white/5 rounded-lg mt-6 text-center">
                      <p className="text-xs text-text-muted">
                        <strong>Catatan Simulasi:</strong> Formulir ini hanya simulasi. Pesan tidak akan dikirim.
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
