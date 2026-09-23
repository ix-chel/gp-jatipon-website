import { useState } from "react";
import { cn } from "../../utils/cn";
import { Camera } from "lucide-react";

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
  direction = "A",
  className,
}: CommunityPhotoSlotProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const isLight = direction === "A";

  return (
    <div
      className={cn(
        "relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden border transition-all duration-300 group",
        isLight
          ? "bg-[#F3EFE6] border-[#E2DDD3] text-[#16171A]"
          : "bg-[#14161C] border-white/10 text-white",
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

      {/* Intentional Editorial Fallback Frame (When real photo asset is not yet placed) */}
      {(hasError || !isLoaded) && (
        <div
          className={cn(
            "w-full h-full flex flex-col justify-between p-6 sm:p-8 select-none transition-colors",
            isLight ? "bg-[#F3EFE6]" : "bg-[#14161C]"
          )}
        >
          {/* Top metadata line with subtle camera indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-gold opacity-80" />
              <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-gold">
                Slot Foto Komunitas
              </span>
            </div>
            <span
              className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded border",
                isLight
                  ? "bg-white/60 border-[#E2DDD3] text-[#64656C]"
                  : "bg-white/5 border-white/10 text-white/50"
              )}
            >
              16:10 / 4:3
            </span>
          </div>

          {/* Architectural Viewfinder Center Marker */}
          <div className="my-auto py-4 text-center space-y-2">
            <p
              className={cn(
                "font-display text-lg sm:text-xl font-semibold tracking-tight",
                isLight ? "text-[#16171A]" : "text-white"
              )}
            >
              Dokumentasi Nyata GP Jatipon
            </p>
            <p
              className={cn(
                "text-xs max-w-sm mx-auto leading-relaxed",
                isLight ? "text-[#64656C]" : "text-white/60"
              )}
            >
              Ruang foto kegiatan pemuda (kebersamaan, ibadah, aksi sosial).
              <br />
              <span className="font-mono text-[11px] opacity-80">
                Taruh file: /public/images/gp-community-hero.jpg
              </span>
            </p>
          </div>

          {/* Bottom attribution note */}
          <div
            className={cn(
              "flex items-center justify-between text-[10px] pt-3 border-t",
              isLight
                ? "border-[#E2DDD3] text-[#86878F]"
                : "border-white/10 text-white/40"
            )}
          >
            <span>Candid &middot; Komunitas &middot; Authentic</span>
            <span>Non-AI &middot; Non-Stock</span>
          </div>
        </div>
      )}

      {/* 
        RECURRING GP MOTIF (1 MOTIF RULE):
        Editorial corner crop marker integrated directly into the photo frame.
        Consistent across Direction A & Direction B.
      */}
      <div
        className={cn(
          "absolute top-0 right-0 px-3 py-1.5 rounded-bl-xl border-b border-l flex items-center gap-1.5 backdrop-blur-md z-10",
          isLight
            ? "bg-[#FBF9F5]/90 border-[#E2DDD3] text-[#16171A]"
            : "bg-[#111215]/90 border-white/10 text-white"
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
        <span className="font-serif italic font-bold text-xs tracking-tight text-gold">GP</span>
        <span className="font-sans text-[10px] font-semibold tracking-widest uppercase opacity-70">
          Jatipon
        </span>
      </div>

      {/* Subtle corner line accent */}
      <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-gold opacity-60 pointer-events-none" />
    </div>
  );
}
