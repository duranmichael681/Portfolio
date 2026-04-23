import { cn } from "@/lib/cn";

export function GlassCard({ children, className, ...rest }) {
  return (
    <div
      className={cn(
        "glass rounded-card p-6 transition duration-[var(--dur-fast)]",
        "hover:border-border-hot hover:shadow-glow-violet",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
