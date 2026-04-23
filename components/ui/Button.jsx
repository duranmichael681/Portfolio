"use client";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill px-5 py-3 text-body font-medium transition " +
  "duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet";

const variants = {
  primary:
    "bg-violet text-[#0b0b18] hover:brightness-110 hover:shadow-glow-violet hover:-translate-y-px",
  ghost:
    "glass text-ink hover:border-border-hot hover:shadow-glow-violet hover:-translate-y-px",
};

export const Button = forwardRef(function Button(
  { as: As = "button", variant = "primary", className, children, disabled, ...rest },
  ref
) {
  return (
    <As
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={cn(base, variants[variant], disabled && "opacity-50 pointer-events-none", className)}
      {...rest}
    >
      {children}
    </As>
  );
});
