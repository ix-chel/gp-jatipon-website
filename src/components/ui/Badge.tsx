import React from "react";
import { cn } from "../../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
        {
          "border-transparent bg-accent text-background": variant === "default",
          "border-transparent bg-elevated text-text-primary": variant === "secondary",
          "text-text-primary border-white/10": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}
