import React from "react";
import { cn } from "../../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "accent";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        {
          "border-primary/20 bg-primary/10 text-primary": variant === "default",
          "border-secondary/40 bg-secondary/25 text-ink-900": variant === "secondary",
          "border-border text-ink-500 bg-white/70": variant === "outline",
          "border-accent/30 bg-accent/10 text-accent": variant === "accent",
        },
        className
      )}
      {...props}
    />
  );
}

