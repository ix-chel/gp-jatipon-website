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

export interface ArchiveEntry {
  id: string;
  slug: string;
  year: number;
  title: string;
  description: string;
  coverImage?: string;
  galleryImages: string[];
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
export interface BaseFormResponse {
  status: FormStatus;
  message?: string;
}
