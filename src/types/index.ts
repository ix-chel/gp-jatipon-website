export interface Activity {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO date string
  location: string;
  description: string;
  summary: string;
  imageUrl?: string;
  status: 'upcoming' | 'completed';
}

export type ContentCategory = 'boost' | 'podcast' | 'article';

export interface Content {
  id: string;
  slug: string;
  title: string;
  category: ContentCategory;
  publishedAt: string; // ISO date string
  author?: string;
  excerpt: string;
  content: string; // Markdown or HTML string
  imageUrl?: string;
  mediaUrl?: string; // e.g. Spotify embed link
}

export type BoostStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export interface Boost {
  id: string;
  slug: string;
  title: string;
  scriptureReference: string;
  scriptureText: string;
  reflection: string;
  prayer?: string | null;
  author?: string | null;
  publishDate: string; // YYYY-MM-DD
  status: BoostStatus;
  coverImage?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ArchiveCategory = 'kegiatan' | 'dokumentasi' | 'cerita' | 'boost';

export interface ArchiveEntry {
  id: string;
  slug: string;
  year: number;
  periodLabel?: string; // e.g. "2026" or "2024–2025"
  category: ArchiveCategory;
  dateDisplay: string;
  title: string;
  description: string;
  coverImage?: string;
  galleryImages: string[];
  isPrototype?: boolean;
  boostSlug?: string; // link to dedicated boost detail if applicable
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
export interface BaseFormResponse {
  status: FormStatus;
  message?: string;
}
