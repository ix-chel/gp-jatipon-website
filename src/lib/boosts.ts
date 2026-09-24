import { supabase } from './supabase';
import type { Boost, BoostStatus } from '../types';
import type { Database } from '../types/database';

type BoostRow = Database['public']['Tables']['boosts']['Row'];

/**
 * Returns the current date in Asia/Jakarta timezone formatted as YYYY-MM-DD.
 * Ensures the date matches Western Indonesia Time (WIB) regardless of client local timezone.
 */
export function getJakartaDateString(date = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(date);
}

/**
 * Formats a YYYY-MM-DD or ISO string into localized Indonesian date format.
 * Example: "24 September 2026"
 */
export function formatJakartaDate(
  dateInput: string | Date,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
): string {
  try {
    let dateObj: Date;
    if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
      // Avoid UTC offset issues by parsing date components explicitly
      const [year, month, day] = dateInput.split('-').map(Number);
      dateObj = new Date(year, month - 1, day, 12, 0, 0);
    } else {
      dateObj = new Date(dateInput);
    }
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      ...options,
    }).format(dateObj);
  } catch {
    return String(dateInput);
  }
}

/**
 * Helper to transform a DB row into the frontend Boost domain model.
 */
export function mapRowToBoost(row: BoostRow): Boost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    scriptureReference: row.scripture_reference,
    scriptureText: row.scripture_text,
    reflection: row.reflection,
    prayer: row.prayer,
    author: row.author,
    publishDate: row.publish_date,
    status: row.status,
    coverImage: row.cover_image,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export interface BoostResponse<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Fetches today's published BOOST for the Homepage Hero.
 * Strictly queries for status = 'published' AND publish_date = CURRENT_DATE (Asia/Jakarta).
 * Will NOT display future/scheduled or draft devotionals.
 */
export async function getTodaysBoost(): Promise<BoostResponse<Boost>> {
  try {
    const todayJakarta = getJakartaDateString();

    const { data, error } = await supabase
      .from('boosts')
      .select('*')
      .eq('publish_date', todayJakarta)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching today\'s boost:', error);
      return { data: null, error: new Error(error.message) };
    }

    if (!data) {
      return { data: null, error: null };
    }

    return { data: mapRowToBoost(data as BoostRow), error: null };
  } catch (err: unknown) {
    console.error('Exception fetching today\'s boost:', err);
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Gagal memuat renungan hari ini'),
    };
  }
}

/**
 * Fetches a single BOOST by its slug.
 */
export async function getBoostBySlug(slug: string): Promise<BoostResponse<Boost>> {
  try {
    const { data, error } = await supabase
      .from('boosts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    if (!data) {
      return { data: null, error: null };
    }

    return { data: mapRowToBoost(data as BoostRow), error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Gagal memuat renungan'),
    };
  }
}

export interface ArchiveBoostFilter {
  year?: number;
  month?: number;
  search?: string;
  limit?: number;
  offset?: number;
}

/**
 * Fetches archived / past devotionals.
 * Only returns devotionals that are:
 * 1. Published and publish_date <= today in Asia/Jakarta
 * 2. Or status = 'archived'
 */
export async function getBoostArchive(
  filter: ArchiveBoostFilter = {}
): Promise<{ data: Boost[]; count: number; error: Error | null }> {
  try {
    const todayJakarta = getJakartaDateString();
    let query = supabase
      .from('boosts')
      .select('*', { count: 'exact' })
      .or(`status.eq.archived,and(status.eq.published,publish_date.lte.${todayJakarta})`)
      .order('publish_date', { ascending: false });

    if (filter.year) {
      const startOfYear = `${filter.year}-01-01`;
      const endOfYear = `${filter.year}-12-31`;
      query = query.gte('publish_date', startOfYear).lte('publish_date', endOfYear);
    }

    if (filter.search && filter.search.trim()) {
      const term = `%${filter.search.trim()}%`;
      query = query.or(
        `title.ilike.${term},scripture_reference.ilike.${term},reflection.ilike.${term}`
      );
    }

    if (filter.limit) {
      const from = filter.offset || 0;
      const to = from + filter.limit - 1;
      query = query.range(from, to);
    }

    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching boost archive:', error);
      return { data: [], count: 0, error: new Error(error.message) };
    }

    return {
      data: (data as BoostRow[]).map(mapRowToBoost),
      count: count || (data ? data.length : 0),
      error: null,
    };
  } catch (err: unknown) {
    return {
      data: [],
      count: 0,
      error: err instanceof Error ? err : new Error('Gagal memuat arsip renungan'),
    };
  }
}

/**
 * Admin: Fetch all boosts including drafts and scheduled devotionals.
 */
export async function getAllBoostsAdmin(statusFilter?: BoostStatus | 'all'): Promise<{
  data: Boost[];
  error: Error | null;
}> {
  try {
    let query = supabase
      .from('boosts')
      .select('*')
      .order('publish_date', { ascending: false });

    if (statusFilter && statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;
    if (error) {
      return { data: [], error: new Error(error.message) };
    }

    return {
      data: (data as BoostRow[]).map(mapRowToBoost),
      error: null,
    };
  } catch (err: unknown) {
    return {
      data: [],
      error: err instanceof Error ? err : new Error('Gagal memuat daftar renungan'),
    };
  }
}

export interface BoostInput {
  title: string;
  scriptureReference: string;
  scriptureText: string;
  reflection: string;
  prayer?: string;
  author?: string;
  publishDate: string; // YYYY-MM-DD
  status: BoostStatus;
  coverImage?: string;
  slug?: string;
}

/**
 * Admin: Helper to generate URL slug from title and date
 */
export function generateBoostSlug(title: string, publishDate: string): string {
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${base}-${publishDate}`;
}

/**
 * Admin: Create a new BOOST entry.
 */
export async function createBoost(
  input: BoostInput,
  userId?: string
): Promise<BoostResponse<Boost>> {
  try {
    const slug = input.slug || generateBoostSlug(input.title, input.publishDate);

    const { data, error } = await supabase
      .from('boosts')
      .insert({
        slug,
        title: input.title.trim(),
        scripture_reference: input.scriptureReference.trim(),
        scripture_text: input.scriptureText.trim(),
        reflection: input.reflection.trim(),
        prayer: input.prayer?.trim() || null,
        author: input.author?.trim() || 'Tim Pelayanan GP Jatipon',
        publish_date: input.publishDate,
        status: input.status,
        cover_image: input.coverImage?.trim() || null,
        created_by: userId || null,
      })
      .select()
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: mapRowToBoost(data as BoostRow), error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Gagal membuat renungan baru'),
    };
  }
}

/**
 * Admin: Update an existing BOOST entry.
 */
export async function updateBoost(
  id: string,
  input: Partial<BoostInput>,
  userId?: string
): Promise<BoostResponse<Boost>> {
  try {
    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
      updated_by: userId || null,
    };

    if (input.title !== undefined) updatePayload.title = input.title.trim();
    if (input.scriptureReference !== undefined)
      updatePayload.scripture_reference = input.scriptureReference.trim();
    if (input.scriptureText !== undefined)
      updatePayload.scripture_text = input.scriptureText.trim();
    if (input.reflection !== undefined)
      updatePayload.reflection = input.reflection.trim();
    if (input.prayer !== undefined) updatePayload.prayer = input.prayer.trim() || null;
    if (input.author !== undefined) updatePayload.author = input.author.trim() || null;
    if (input.publishDate !== undefined) updatePayload.publish_date = input.publishDate;
    if (input.status !== undefined) updatePayload.status = input.status;
    if (input.coverImage !== undefined)
      updatePayload.cover_image = input.coverImage.trim() || null;
    if (input.slug !== undefined) updatePayload.slug = input.slug.trim();

    const { data, error } = await supabase
      .from('boosts')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: mapRowToBoost(data as BoostRow), error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Gagal memperbarui renungan'),
    };
  }
}

/**
 * Admin: Delete a BOOST entry.
 */
export async function deleteBoost(id: string): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.from('boosts').delete().eq('id', id);
    if (error) {
      return { error: new Error(error.message) };
    }
    return { error: null };
  } catch (err: unknown) {
    return {
      error: err instanceof Error ? err : new Error('Gagal menghapus renungan'),
    };
  }
}
