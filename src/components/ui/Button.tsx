import React from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-accent text-background hover:bg-accent/90": variant === "primary",
            "bg-elevated text-text-primary hover:bg-elevated/80": variant === "secondary",
            "border border-white/10 bg-transparent hover:bg-white/5 text-text-primary": variant === "outline",
            "hover:bg-white/10 hover:text-text-primary": variant === "ghost",
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 py-2": size === "md",
            "h-12 px-8 py-3 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
