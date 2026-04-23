import { cn } from "@/lib/cn";

export function Chip({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill glass px-3 py-1 text-small text-ink-dim",
        className
      )}
    >
      {children}
    </span>
  );
}
