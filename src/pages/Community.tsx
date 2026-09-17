import React, { useState } from "react";
import { Link, useRoute } from "wouter";
import { Users, Heart, MessageCircleHeart, ArrowLeft, Send } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";

export function Community() {
  const [match, params] = useRoute("/komunitas/:action");
  const action = match ? (params as Record<string, string>).action : null;

  if (action === 'join' || action === 'volunteer' || action === 'titip-doa') {
    return <CommunityForm action={action} />;
  }

  return (
    <div className="flex flex-col w-full fade-in pb-24">
      {/* Page Header */}
      <section className="bg-surface pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary tracking-tight">
            Komunitas Kami
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            Mari bertumbuh bersama. Kamu selalu diterima di sini.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="flex flex-col text-center hover:border-accent/40 group bg-background">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-surface border border-white/5 flex items-center justify-center text-accent mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-text-primary group-hover:text-accent transition-colors" />
              </div>
              <CardTitle className="text-2xl font-serif">Gabung GP</CardTitle>
              <CardDescription className="text-base mt-2">Menjadi bagian dari keluarga pemuda GPIB Jatipon.</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-6">
              <Link href="/komunitas/join">
                <Button variant="primary" className="w-full">Daftar Sekarang</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="flex flex-col text-center hover:border-accent/40 group bg-background">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-surface border border-white/5 flex items-center justify-center text-accent mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-text-primary group-hover:text-accent transition-colors" />
              </div>
              <CardTitle className="text-2xl font-serif">Ambil Bagian</CardTitle>
              <CardDescription className="text-base mt-2">Menjadi relawan dan melayani dengan talenta yang kamu miliki.</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-6">
              <Link href="/komunitas/volunteer">
                <Button variant="outline" className="w-full">Jadi Volunteer</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="flex flex-col text-center hover:border-accent/40 group bg-background border-accent/20">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-surface border border-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageCircleHeart className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl font-serif">Titip Doa</CardTitle>
              <CardDescription className="text-base mt-2">Kami siap mendukungmu dalam doa. Kami sangat menghargai privasimu.</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-6">
              <Link href="/komunitas/titip-doa">
                <Button variant="primary" className="w-full">Tulis Pokok Doa</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CommunityForm({ action }: { action: 'join' | 'volunteer' | 'titip-doa' }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call 
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const getFormDetails = () => {
    switch (action) {
      case 'join':
        return {
          title: 'Formulir Anggota Baru',
          desc: 'Isi data diri di bawah ini untuk bergabung dengan GP Jatipon.',
          fields: ['Nama Lengkap', 'Usia', 'No. WhatsApp', 'Alamat/Sektor Pelayanan'],
        };
      case 'volunteer':
        return {
          title: 'Pendaftaran Volunteer',
          desc: 'Terima kasih atas kerinduanmu untuk melayani. Pilih bidang pelayananmu.',
          fields: ['Nama Lengkap', 'No. WhatsApp', 'Bidang Pelayanan (Musik, Multimedia, Acara, dll)'],
        };
      case 'titip-doa':
        return {
          title: 'Ruang Doa',
          desc: 'Tuliskan pergumulan atau ucapan syukurmu. Kami menghargai privasimu.',
          fields: ['Nama (Boleh Inisial/Anonim)', 'Pokok Doa'],
        };
    }
  };

  const details = getFormDetails();

  if (isSuccess) {
    return (
      <div className="py-24 px-4 text-center max-w-2xl mx-auto fade-in">
        <div className="w-20 h-20 bg-surface border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="h-10 w-10 text-accent" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-4 tracking-tight">Terima Kasih!</h2>
        <p className="text-text-muted mb-8 text-lg max-w-lg mx-auto">
          {action === 'titip-doa' 
            ? 'Pokok doamu telah kami terima (Simulasi). Kami akan mendoakannya.' 
            : 'Data pendaftaranmu telah kami terima (Simulasi). Pengurus GP akan segera menghubungimu.'}
        </p>
        <Link href="/komunitas">
          <Button variant="outline">Kembali ke Komunitas</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full fade-in">
      <Link href="/komunitas">
        <a className="inline-flex items-center text-sm text-text-muted hover:text-accent transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Pilihan Komunitas
        </a>
      </Link>

      <Card className="p-2 md:p-6 bg-surface border-white/5 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-serif">{details.title}</CardTitle>
          <CardDescription className="text-base mt-2">{details.desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {details.fields.map((field, idx) => {
              const fieldId = `field-${idx}`;
              return (
                <div key={idx} className="space-y-2">
                  <label htmlFor={fieldId} className="text-sm font-medium text-text-primary">{field}</label>
                  {field.toLowerCase().includes('doa') || field.toLowerCase().includes('alamat') ? (
                    <Textarea id={fieldId} placeholder={`Masukkan ${field.toLowerCase()}...`} required className="resize-none h-32" />
                  ) : (
                    <Input id={fieldId} type="text" placeholder={`Masukkan ${field.toLowerCase()}...`} required />
                  )}
                </div>
              );
            })}
            
            {/* Honeypot field for basic spam protection (hidden from users) */}
            <input type="text" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <div className="pt-4">
              <Button type="submit" variant="primary" className="w-full h-12 text-base font-medium" disabled={isSubmitting}>
                {isSubmitting ? 'Mengirim...' : 'Kirim Sekarang'} <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4 bg-background border border-white/5 rounded-lg mt-6 text-center">
              <p className="text-xs text-text-muted">
                <strong>Catatan Simulasi:</strong> Formulir ini hanya simulasi untuk tujuan pratinjau antarmuka. Tidak ada data yang benar-benar ditransmisikan, disimpan di database, atau diproses oleh pihak eksternal.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
