import type { Activity, Content, ArchiveEntry } from '../types';

export const ACTIVITIES: Activity[] = [
  {
    id: '1',
    slug: 'ibadah-pemuda-agustus-2026',
    title: '[GP EVENT TITLE] Ibadah Pemuda Gabungan',
    date: '2026-08-15T18:00:00Z',
    location: 'Gedung Gereja GPIB Jatipon',
    summary: 'Ibadah pemuda bulanan dengan tema khusus.',
    description: 'Ibadah pemuda bulanan dengan tema khusus. [REAL CONTENT REQUIRED]',
    status: 'upcoming',
  },
  {
    id: '2',
    slug: 'donor-darah-pemuda-2026',
    title: '[GP EVENT TITLE] Aksi Sosial: Donor Darah',
    date: '2026-08-20T09:00:00Z',
    location: 'Aula Serbaguna GPIB Jatipon',
    summary: 'Mari berbagi kehidupan melalui aksi donor darah bersama PMI.',
    description: 'Mari berbagi kehidupan melalui aksi donor darah bersama PMI. [REAL CONTENT REQUIRED]',
    status: 'upcoming',
  }
];

export const CONTENTS: Content[] = [
  {
    id: '1',
    slug: 'boost-15-agustus',
    title: '[BOOST] Menemukan Terang dalam Kesibukan',
    category: 'boost',
    publishedAt: '2026-08-15T07:00:00Z',
    author: 'Tim Pelayanan GP',
    excerpt: 'Renungan singkat untuk memulai hari dengan penuh semangat dan pengharapan.',
    content: 'Terkadang di tengah hiruk pikuk kehidupan kota, kita kehilangan arah... [REAL CONTENT REQUIRED]',
  },
  {
    id: '2',
    slug: 'podcast-ep-10',
    title: '[PODCAST] Eps 10: Pemuda dan Kesehatan Mental',
    category: 'podcast',
    publishedAt: '2026-08-10T10:00:00Z',
    author: 'GP Jatipon Podcast',
    excerpt: 'Diskusi mendalam mengenai tantangan mental pemuda di era digital.',
    content: 'Dalam episode kali ini kita membahas bagaimana iman Kristen merespon masalah mental... [REAL CONTENT REQUIRED]',
    mediaUrl: 'https://open.spotify.com/embed/episode/placeholder'
  }
];

export const ARCHIVES: ArchiveEntry[] = [
  {
    id: '1',
    slug: 'ibadah-pemuda-gabungan-sep-2026',
    year: 2026,
    periodLabel: '2026',
    category: 'kegiatan',
    dateDisplay: 'September 2026',
    title: 'Ibadah Pemuda Gabungan',
    description: 'Perjumpaan pemuda lintas sektor dalam doa, pujian, dan ruang refleksi bersama di Gedung Gereja GPIB Jatipon.',
    coverImage: '/images/gp-community-hero.jpg',
    galleryImages: [],
    isPrototype: true
  },
  {
    id: '2',
    slug: 'aksi-sosial-donor-darah-agu-2026',
    year: 2026,
    periodLabel: '2026',
    category: 'kegiatan',
    dateDisplay: 'Agustus 2026',
    title: 'Aksi Sosial & Donor Darah',
    description: 'Langkah nyata kepedulian bersama warga sekitar dan PMI melalui aksi donor darah serta pembagian paket berkah.',
    galleryImages: [],
    isPrototype: true
  },
  {
    id: '3',
    slug: 'dokumentasi-galeri-hut-gp-jul-2026',
    year: 2026,
    periodLabel: '2026',
    category: 'dokumentasi',
    dateDisplay: 'Juli 2026',
    title: 'Dokumentasi Visual: Semarak HUT GP',
    description: 'Rekaman visual dan galeri foto suasana perayaan hari ulang tahun Gerakan Pemuda GPIB di Jemaat Jatipon.',
    galleryImages: [],
    isPrototype: true
  },
  {
    id: '4',
    slug: 'cerita-boost-menemukan-terang-jul-2026',
    year: 2026,
    periodLabel: '2026',
    category: 'cerita',
    dateDisplay: 'Juli 2026',
    title: 'Refleksi BOOST: Menemukan Terang dalam Kesibukan',
    description: 'Catatan sharing dan testimoni pemuda tentang pergumulan iman, studi, serta dunia kerja di tengah dinamika kota.',
    galleryImages: [],
    isPrototype: true
  },
  {
    id: '5',
    slug: 'retreat-pemuda-nov-2025',
    year: 2025,
    periodLabel: '2025',
    category: 'kegiatan',
    dateDisplay: 'November 2025',
    title: 'Retreat Pemuda: Akar yang Teguh',
    description: 'Dokumentasi perjalanan spiritual dan persekutuan intensif pemuda selama 3 hari di kawasan pegunungan Bogor.',
    galleryImages: [],
    isPrototype: true
  },
  {
    id: '6',
    slug: 'dokumentasi-paduan-suara-des-2025',
    year: 2025,
    periodLabel: '2025',
    category: 'dokumentasi',
    dateDisplay: 'Desember 2025',
    title: 'Dokumentasi Paduan Suara GP Menyambut Natal',
    description: 'Arsip audio visual penampilan vokal dan paduan suara Gerakan Pemuda pada ibadah perayaan menyambut Natal.',
    galleryImages: [],
    isPrototype: true
  },
  {
    id: '7',
    slug: 'cerita-jejak-langkah-pemuda-2025',
    year: 2025,
    periodLabel: '2025',
    category: 'cerita',
    dateDisplay: 'Oktober 2025',
    title: 'Kisah Sahabat: Menapaki Satu Dekade Bersama',
    description: 'Kumpulan cerita reflektif dari pengurus dan rekan-rekan pemuda mengenai makna komitmen pelayanan bersama.',
    galleryImages: [],
    isPrototype: true
  }
];

