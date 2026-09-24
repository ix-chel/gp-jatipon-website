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
    <div className="flex flex-col w-full pb-24 bg-background text-ink-950">
      {/* Page Header */}
      <section className="bg-white/40 pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ink-950 tracking-tight">
            Komunitas Kami
          </h1>
          <p className="text-lg md:text-xl text-ink-700 leading-relaxed max-w-2xl mx-auto">
            Mari bertumbuh bersama. Kamu selalu diterima di sini.
          </p>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="flex flex-col text-center hover:border-secondary hover:shadow-card transition-all rounded-[18px] bg-surface border-border group">
            <CardHeader className="pt-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Gabung GP</CardTitle>
              <CardDescription className="text-sm mt-2 text-ink-500">Menjadi bagian dari keluarga pemuda GPIB Jatipon.</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-6">
              <Link href="/komunitas/join">
                <Button variant="primary" className="w-full">Daftar Sekarang</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="flex flex-col text-center hover:border-secondary hover:shadow-card transition-all rounded-[18px] bg-surface border-border group">
            <CardHeader className="pt-8">
              <div className="w-16 h-16 rounded-2xl bg-secondary/30 border border-secondary flex items-center justify-center text-primary mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Ambil Bagian</CardTitle>
              <CardDescription className="text-sm mt-2 text-ink-500">Menjadi relawan dan melayani dengan talenta yang kamu miliki.</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-6">
              <Link href="/komunitas/volunteer">
                <Button variant="outline" className="w-full">Jadi Volunteer</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="flex flex-col text-center hover:border-accent/40 hover:shadow-card transition-all rounded-[18px] bg-surface border-border group">
            <CardHeader className="pt-8">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent mx-auto mb-4 group-hover:scale-105 transition-transform">
                <MessageCircleHeart className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl font-bold">Titip Doa</CardTitle>
              <CardDescription className="text-sm mt-2 text-ink-500">Kami siap mendukungmu dalam doa. Kami sangat menghargai privasimu.</CardDescription>
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
      <div className="py-24 px-4 text-center max-w-2xl mx-auto bg-background text-ink-950">
        <div className="w-20 h-20 bg-surface border border-border rounded-full flex items-center justify-center mx-auto mb-6 shadow-subtle">
          <Heart className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-ink-950 mb-4 tracking-tight">Terima Kasih!</h2>
        <p className="text-ink-700 mb-8 text-base max-w-lg mx-auto">
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
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full bg-background text-ink-950">
      <Link href="/komunitas">
        <span className="inline-flex items-center text-sm font-semibold text-ink-500 hover:text-primary transition-colors mb-8 cursor-pointer">
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Pilihan Komunitas
        </span>
      </Link>

      <Card className="p-4 sm:p-8 bg-surface border-border shadow-card rounded-2xl">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl md:text-3xl font-bold">{details.title}</CardTitle>
          <CardDescription className="text-sm mt-1 text-ink-500">{details.desc}</CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-0 pt-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            {details.fields.map((field, idx) => {
              const fieldId = `field-${idx}`;
              return (
                <div key={idx} className="space-y-1.5">
                  <label htmlFor={fieldId} className="text-xs font-semibold text-ink-950 uppercase tracking-wider">{field}</label>
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
              <Button type="submit" variant="primary" className="w-full h-12 text-base font-semibold" disabled={isSubmitting}>
                {isSubmitting ? 'Mengirim...' : 'Kirim Sekarang'} <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4 bg-white border border-border rounded-xl mt-6 text-center shadow-subtle">
              <p className="text-xs text-ink-500 leading-relaxed">
                <strong className="text-ink-950">Catatan Simulasi:</strong> Formulir ini hanya simulasi untuk tujuan pratinjau antarmuka. Tidak ada data yang benar-benar ditransmisikan, disimpan di database, atau diproses oleh pihak eksternal.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
