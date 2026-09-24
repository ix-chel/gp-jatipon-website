import React from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          {
            "bg-primary text-white hover:bg-primary-hover shadow-subtle hover:shadow-card": variant === "primary",
            "bg-transparent border border-primary text-primary hover:bg-primary/5": variant === "secondary" || variant === "outline",
            "bg-transparent text-primary hover:bg-primary/5": variant === "ghost",
            "bg-accent text-white hover:bg-accent-hover shadow-subtle": variant === "accent",
            "h-8 px-3.5 text-xs rounded-lg": size === "sm",
            "h-10 px-5 py-2 text-sm": size === "md",
            "h-12 px-7 py-3 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

