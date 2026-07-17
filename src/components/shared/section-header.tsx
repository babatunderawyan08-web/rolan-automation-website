import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({ eyebrow, title, subtitle, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 max-w-2xl sm:mb-10 md:mb-12", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Badge variant="secondary" className="mb-3 sm:mb-4">{eyebrow}</Badge>}
      <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base leading-relaxed text-muted sm:mt-4 sm:text-lg">{subtitle}</p>}
    </div>
  );
}
