import { cn } from "../../utils/cn";

interface GpLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
  variant?: "light" | "dark" | "auto";
}

/**
 * GpLogo Placeholder Component
 * 
 * NOTE FOR USER:
 * Replace the contents inside this placeholder with your own SVG / image asset.
 * You can also place your logo at `/public/gp-logo.svg` and change the img src below.
 */
export function GpLogo({ className, size = "md", variant = "auto" }: GpLogoProps) {
  const sizeMap = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    hero: "w-16 h-16 sm:w-20 sm:h-20 text-2xl",
  };

  const variantStyles = {
    auto: "bg-[#16171A] text-[#FBF9F5] border border-white/10 dark:bg-white/10 dark:text-white",
    light: "bg-[#16171A] text-[#FBF9F5] border border-[#16171A]/10",
    dark: "bg-white/10 text-[#FBF9F5] border border-white/15",
  };

  return (
    <div
      data-testid="gp-logo-placeholder"
      className={cn(
        "rounded-xl flex items-center justify-center font-display font-bold tracking-tight select-none transition-transform relative overflow-hidden group shrink-0",
        sizeMap[size],
        variantStyles[variant],
        className
      )}
      title="GP Jatipon Logo Placeholder (Swap with your own logo)"
    >
      {/* 
        [USER LOGO PLACEHOLDER SLOT] 
        Replace this inner content with your own logo:
        e.g. <img src="/gp-logo.svg" alt="GP Jatipon Logo" className="w-full h-full object-contain p-1" />
      */}
      <div className="flex items-center justify-center w-full h-full">
        <span className="font-serif italic font-bold tracking-tighter text-gold">GP</span>
      </div>

      {/* Subtle corner badge marker */}
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-gold rounded-tl-sm opacity-80" />
    </div>
  );
}
