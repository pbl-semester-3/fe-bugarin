import { cn } from "cn";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  className?: string;
}

// Judul halaman desain PT: 30px/700 + deskripsi 12px ink-soft (§3).
export function PageHeader({
  title,
  description,
  badge,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-ink">{title}</h1>
          {badge}
        </div>
        {description && (
          <p className="mt-1 text-xs text-ink-soft">{description}</p>
        )}
      </div>
    </div>
  );
}
