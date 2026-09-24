import { useState } from "react";
import { cn } from "../../utils/cn";

interface CommunityPhotoSlotProps {
  src?: string;
  alt?: string;
  direction?: "A" | "B";
  className?: string;
}

/**
 * CommunityPhotoSlot
 *
 * Dedicated slot for authentic GP Jatipon youth community photography.
 * - Supports real image asset at `/public/images/gp-community-hero.jpg`.
 * - If the asset is missing, renders an intentional architectural editorial placeholder.
 * - Adheres strictly to the 1-motif system: incorporates the GP corner-crop marker.
 * - Zero AI people, zero generic church stock.
 */
export function CommunityPhotoSlot({
  src = "/images/gp-community-hero.jpg",
  alt = "Komunitas Pemuda GP Jatipon",
  className,
}: CommunityPhotoSlotProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-surface text-ink-950 shadow-subtle group",
        className
      )}
    >
      {/* Real Photo Asset Slot */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
          )}
        />
      )}

      {/* Intentional Editorial Visual Composition (When real photo asset is not yet placed) */}
      {(hasError || !isLoaded) && (
        <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 select-none bg-gradient-to-br from-[#E4F2F6]/90 via-surface to-white relative overflow-hidden">
          {/* Subtle architectural background motifs */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <svg className="w-full h-full" viewBox="0 0 400 250" fill="none" preserveAspectRatio="none">
              <circle cx="200" cy="125" r="90" stroke="#A3CEE0" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="200" cy="125" r="130" stroke="#1C49BA" strokeWidth="0.75" strokeOpacity="0.3" />
              <line x1="40" y1="125" x2="360" y2="125" stroke="#A3CEE0" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="200" y1="20" x2="200" y2="230" stroke="#A3CEE0" strokeWidth="0.75" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Top metadata line */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
                Gerakan Pemuda
              </span>
            </div>
            <span className="text-[10px] font-sans font-medium px-2.5 py-1 rounded-full border bg-white/80 border-border text-ink-500">
              GPIB Jemaat Jatipon
            </span>
          </div>

          {/* Editorial Center Statement */}
          <div className="relative z-10 my-auto py-4 text-center space-y-2.5">
            <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink-950">
              Bertumbuh dalam Iman,{" "}
              <span className="italic font-normal text-primary">
                Berakar dalam Kasih
              </span>
            </p>
            <p className="text-xs sm:text-sm max-w-md mx-auto leading-relaxed text-ink-700">
              Wadah kebersamaan, ruang kreasi, dan langkah nyata melayani bersama pemuda-pemudi di Bekasi.
            </p>
          </div>

          {/* Bottom editorial attribution note */}
          <div className="relative z-10 flex items-center justify-between text-[11px] pt-3 border-t border-border/80 text-ink-500 font-medium">
            <span>Persekutuan &middot; Pelayanan &middot; Kesaksian</span>
            <span className="text-primary font-semibold">Bekasi, Jawa Barat</span>
          </div>
        </div>
      )}

      {/* 
        RECURRING GP MOTIF (1 MOTIF RULE):
        Editorial corner crop marker integrated directly into the photo frame.
      */}
      <div className="absolute top-0 right-0 px-3 py-1.5 rounded-bl-xl border-b border-l border-border flex items-center gap-1.5 bg-white/90 backdrop-blur-md z-10 shadow-subtle">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        <span className="font-display font-bold text-xs tracking-tight text-primary">GP</span>
        <span className="font-sans text-[10px] font-semibold tracking-widest uppercase text-ink-700 opacity-70">
          Jatipon
        </span>
      </div>

      {/* Subtle corner line accent in Terracotta */}
      <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-accent opacity-75 pointer-events-none" />
    </div>
  );
}
