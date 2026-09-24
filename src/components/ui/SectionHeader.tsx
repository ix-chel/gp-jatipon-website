import { cn } from "../../utils/cn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({ title, subtitle, eyebrow, align = "left", className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 mb-10",
        {
          "text-left": align === "left",
          "text-center items-center": align === "center",
          "text-right items-end": align === "right",
        },
        className
      )}
    >
      {eyebrow && (
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-xs font-semibold tracking-wider uppercase text-accent">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-display font-bold text-ink-950 tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-ink-500 text-base md:text-lg max-w-2xl leading-relaxed pt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}

