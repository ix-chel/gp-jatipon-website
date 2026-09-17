import { cn } from "../../utils/cn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({ title, subtitle, align = "left", className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-3 mb-10",
        {
          "text-left": align === "left",
          "text-center items-center": align === "center",
          "text-right items-end": align === "right",
        },
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl font-serif text-text-primary tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-muted text-base md:text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
