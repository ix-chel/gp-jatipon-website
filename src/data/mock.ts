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
    slug: 'retreat-pemuda-2025',
    year: 2025,
    title: '[ARSIP] Retreat Pemuda 2025',
    description: 'Dokumentasi perjalanan spiritual dan kebersamaan di Retreat Pemuda 2025.',
    galleryImages: []
  }
];
