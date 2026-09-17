# GP GPIB Jatipon Bekasi — Phase 2: Technical Architecture (V1)

**Status:** Proposed Architecture  
**Based on:** Phase 1 Product & UX Specification (Revised)  
**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Wouter  

---

## 1. Executive Summary & Core Principles

This technical architecture defines a lightweight, highly maintainable static Single-Page Application (SPA) for the GP GPIB Jatipon Bekasi Website V1.

**Core Architectural Principles:**
- **Zero-Backend V1:** The application is purely static. All data is served from typed mock files (`src/data/`). No databases or authentication systems are implemented in V1.
- **Strict Separation of Concerns:** UI components must never hardcode substantial text or logic. Content belongs in `data/`, structure in `pages/`, and styling in Tailwind utility classes.
- **Progressive Enhancement:** Forms and interactions must fail gracefully and provide clear client-side validation before "simulating" submission.
- **Performance First:** Unused dependencies (e.g., `framer-motion`) will be removed to keep the initial JS bundle minimal.

---

## 2. Recommended Folder & Module Structure

The existing repository structure is generally sound but requires stricter categorization to support future scaling (V2).

```text
src/
├── assets/          # Static media (hero images, logos, placeholders)
├── components/      # Reusable React components
│   ├── layout/      # Navbar, Footer, PageWrapper
│   └── ui/          # Primitives: Button, Card, Badge, Input, Textarea
├── data/            # Static mock data (Content, Activities, Archives)
│   ├── index.ts     # Data exports
│   └── mock.ts      # Replaces placeholder.ts for clarity
├── pages/           # Route-level components (Home, Activities, etc.)
├── types/           # TypeScript domain models
│   └── index.ts
├── utils/           # Helper functions
│   └── cn.ts        # Tailwind class merger (clsx + tailwind-merge)
├── App.tsx          # Global router definitions
├── main.tsx         # React root and DOM injection
└── index.css        # Global CSS variables and Tailwind v4 imports
```

**Improvement from Current State:**
- Rename `placeholder.ts` to `mock.ts` or split it logically to distinguish between temporary UI testing data and "permanent" static church content (e.g. Visi Misi).
- Ensure `pages/` only handle data fetching (from `data/`) and layout composition, delegating UI rendering to `components/ui/`.

---

## 3. TypeScript Domain Models

To ensure strict type safety based on Phase 1 requirements, the following interfaces govern the data layer.

```typescript
// src/types/index.ts

export interface Activity {
  id: string;
  slug: string; // Used for URL routing (e.g. ibadah-pemuda-agustus)
  title: string;
  date: string; // ISO 8601 string (e.g. "2026-08-15T18:00:00Z")
  location: string;
  description: string; // Used for detail page
  summary: string; // Short excerpt for cards
  imageUrl?: string;
  status: 'upcoming' | 'completed'; // Removed 'ongoing' as it's overly complex for V1
}

export type ContentCategory = 'boost' | 'podcast' | 'article';

export interface Content {
  id: string;
  slug: string;
  title: string;
  category: ContentCategory;
  publishedAt: string; // ISO 8601 string
  author?: string;
  excerpt: string;
  content: string; // Markdown-compatible string or HTML
  imageUrl?: string; // Cover image
  mediaUrl?: string; // Optional Spotify iframe URL
}

export interface ArchiveEntry {
  id: string;
  slug: string;
  year: number;
  title: string;
  description: string;
  coverImage?: string;
  galleryImages: string[]; // Array of image URLs
}

// Form State Management Type (Internal Component State)
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface BaseFormResponse {
  status: FormStatus;
  message?: string;
}
```

---

## 4. Routing Strategy & Disambiguation

The current `wouter` implementation in `App.tsx` contains a fragile routing collision where `/konten/:slug` dynamically checks if the slug is a category. We will disambiguate this cleanly:

**Proposed Routing (`App.tsx`):**
```tsx
<Switch>
  <Route path="/" component={Home} />
  <Route path="/tentang-gp" component={About} />
  
  <Route path="/kegiatan" component={Activities} />
  <Route path="/kegiatan/:slug" component={ActivityDetail} />
  
  {/* Disambiguated Content Routing */}
  <Route path="/konten" component={ContentHub} />
  <Route path="/konten/kategori/:category" component={ContentHub} />
  <Route path="/konten/baca/:slug" component={ContentDetail} />
  
  {/* Community Forms */}
  <Route path="/komunitas" component={CommunityHub} />
  <Route path="/komunitas/join" component={JoinForm} />
  <Route path="/komunitas/volunteer" component={VolunteerForm} />
  <Route path="/komunitas/titip-doa" component={PrayerForm} />
  
  <Route path="/arsip" component={Archive} />
  <Route path="/arsip/:slug" component={ArchiveDetail} />
  
  <Route path="/contact" component={Contact} />
  <Route component={NotFound} />
</Switch>
```
*Note on implementation: Wouter `<Link>` components must be updated to match these explicit paths.*

---

## 5. Mock Data Strategy

Since V1 lacks a CMS, the static files in `src/data/` act as the database.
1. **Placeholder Labeling:** All unverified mock data will strictly follow the convention `[PLACEHOLDER] Title`.
2. **Empty States:** The UI will read from the arrays in `src/data/mock.ts`. If an array (e.g., `ACTIVITIES.filter(a => a.status === 'upcoming')`) is empty, the component will render a gracefully designed empty state (e.g., "Belum ada kegiatan terdekat").
3. **Future Replacement:** In Phase 7, the mock arrays will be replaced with verified static data provided by the church, removing the `[PLACEHOLDER]` tags. In V2, these static arrays can simply be swapped for `fetch()` calls.

---

## 6. Form Prototype Architecture

Forms in V1 will **not** attempt external network requests.
1. **Client Validation:** Standard HTML5 validation (`required`, `type="tel"`, `minlength`) combined with simple React state checks before calling `onSubmit`.
2. **Simulated Submission Flow:**
   ```typescript
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     setStatus('submitting');
     // Simulated network delay
     setTimeout(() => {
       setStatus('success');
       // In a real app, this is where fetch('/api/submit') would occur
     }, 1500);
   };
   ```
3. **Honeypot:** A hidden input `<input type="text" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />` will be included. If filled, the submission is silently rejected (bot prevention).

---

## 7. Technical Handling (A11y, Responsive, SEO, Embeds)

- **Accessibility (A11y):** All UI primitives (`Button`, `Input`) will receive explicit `aria-label` attributes if they lack textual content. We rely on Tailwind's `focus-visible` to manage keyboard focus states (`focus-visible:ring-2 focus-visible:ring-accent`).
- **Responsive Layouts:** Tailwind's mobile-first breakpoints (`sm:`, `md:`, `lg:`) will be used exclusively. Hardcoded pixel widths are banned in favor of fluid grids and flexbox.
- **Error States:** A generic `NotFound.tsx` component is triggered by `wouter`'s fallback route.
- **Third-Party Embeds (Spotify/Maps):** Iframes will use `loading="lazy"` and `title="..."` attributes to prevent blocking the main rendering thread and maintain accessibility.
- **SEO in SPA:** Because V1 is a client-side SPA without SSR, we will define a robust `<head>` block in `index.html` featuring standard Open Graph (OG) tags and a comprehensive fallback meta description.

---

## 8. Dependency Review & Optimization

**Current Dependencies:**
- `react`, `react-dom` (v19)
- `@tailwindcss/vite`, `tailwindcss` (v4)
- `wouter` (Lightweight router: Excellent choice for V1)
- `lucide-react` (SVG Icons: Excellent choice)
- `clsx`, `tailwind-merge` (Utility for `cn()` function: Keep)
- ❌ **`framer-motion`**: Identified as an unused, heavy dependency in the current scaffold. CSS animations (`fade-in`) are already handling transitions natively. **Recommendation: Uninstall `framer-motion` to reduce bundle size and complexity.**

---

## 9. Security, Privacy, and Performance

- **Security (XSS Prevention):** React automatically escapes string variables in JSX. We will strictly avoid `dangerouslySetInnerHTML` unless rendering verified, sanitized Markdown from the `data/` folder.
- **Privacy (Titip Doa):** The simulated form handler guarantees zero external transmission. The code will be audited to ensure no `console.log(formData)` or `localStorage.setItem` exists for sensitive inputs.
- **Performance:** Removing `framer-motion`, utilizing `loading="lazy"` on media, and using Vite's optimized build process guarantees near-instant load times.

---

## 10. Architecture Risks & Trade-offs

| Risk | Consequence | Trade-off / Mitigation |
| :--- | :--- | :--- |
| **No Backend** | Forms only simulate submission; users cannot actually reach the committee through the site yet. | **Accepted for V1.** We will clearly label the forms or integrate a simple `mailto:` / direct WhatsApp redirect if stakeholders authorize it in Phase 7. |
| **Client-Side SPA** | Sub-pages (e.g. `/kegiatan/ibadah`) may not unfurl correctly on WhatsApp or Facebook without Server-Side Rendering (SSR). | **Accepted for V1.** Implementing Next.js/SSR is too complex for this phase. Static `index.html` metadata will serve as the global fallback. |
| **Static Data** | Updating a podcast or event requires an engineer to edit `data/mock.ts` and trigger a rebuild. | **Accepted for V1.** A CMS will be scoped for V2 once the static V1 proves its UX value. |

---

## User Review Required
Please review the proposed architecture above.

> [!IMPORTANT]
> - Do you approve the removal of `framer-motion` to optimize performance?
> - Do you approve the routing disambiguation (`/konten/baca/:slug` and `/konten/kategori/:category`)?

If approved, I will proceed to **PHASE 3 — DESIGN SYSTEM & VISUAL FOUNDATION**.
