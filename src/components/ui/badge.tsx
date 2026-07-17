import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "accent" | "outline";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        variant === "default" && "bg-secondary/10 text-secondary",
        variant === "secondary" && "bg-background-alt text-muted",
        variant === "accent" && "bg-accent/10 text-accent",
        variant === "outline" && "border border-border text-muted",
        className
      )}
      {...props}
    />
  );
}
